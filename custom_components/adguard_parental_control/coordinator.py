"""DataUpdateCoordinator for AdGuard Parental Control."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.event import async_track_point_in_time

from .adguard_api import AdGuardHomeAPI
from .calendar_adapter import CalendarAdapter
from .const import DOMAIN, DEFAULT_POLL_INTERVAL
from .context_resolver import ContextResolver
from .models import GlobalState
from .override_manager import OverrideManager
from .policy_engine import PolicyEngine
from .sync_engine import AdGuardSyncEngine, SyncResult

_LOGGER = logging.getLogger(__name__)


class AdGuardParentalControlCoordinator(DataUpdateCoordinator[GlobalState]):
    """Coordinator that polls, resolves policies, and syncs to AdGuard."""

    config_entry: ConfigEntry

    def __init__(
        self,
        hass: HomeAssistant,
        api: AdGuardHomeAPI,
        entry: ConfigEntry,
    ) -> None:
        self.api = api
        self.entry = entry
        self.state = GlobalState()
        self.policy_engine = PolicyEngine()
        self.calendar_adapter = CalendarAdapter(hass)
        self.override_manager = OverrideManager(self.state)
        self.sync_engine = AdGuardSyncEngine(api)
        self.context_resolver: ContextResolver | None = None
        self._schedule_handles: list = []

        # Load persisted state from config entry data
        stored = entry.data.get("state", {})
        if stored:
            self.state = GlobalState.from_dict(stored)

        # Clean orphaned policy references from clients, members, groups
        policy_ids = {p.id for p in self.state.policies}
        for c in self.state.clients:
            c.assigned_policy_ids = [pid for pid in c.assigned_policy_ids if pid in policy_ids]
        for m in self.state.members:
            m.assigned_policy_ids = [pid for pid in m.assigned_policy_ids if pid in policy_ids]
        for g in self.state.groups:
            g.assigned_policy_ids = [pid for pid in g.assigned_policy_ids if pid in policy_ids]

        self._init_context_resolver(hass)

        # Use poll_interval from options if set
        poll_interval = entry.options.get("poll_interval", DEFAULT_POLL_INTERVAL)

        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(seconds=poll_interval),
        )

    def _init_context_resolver(self, hass: HomeAssistant) -> None:
        self.context_resolver = ContextResolver(hass, self.state.calendar_entities)

    async def _async_update_data(self) -> GlobalState:
        """Main update loop: resolve context → apply policies → sync to AdGuard."""
        if self.context_resolver is None:
            self._init_context_resolver(self.hass)

        # 1. Resolve current context
        context = await self.context_resolver.resolve()

        # 2. Clean up expired overrides
        expired = self.override_manager.cleanup_expired()
        if expired:
            _LOGGER.debug("Cleaned up %d expired overrides", len(expired))

        # 3. Resolve effective policies for all clients
        effective = self.policy_engine.resolve(self.state, context)

        # 4. Sync to AdGuard Home
        sync_result = await self.sync_engine.sync(effective)
        if sync_result.errors:
            _LOGGER.warning("Sync errors: %s", sync_result.errors)

        # 5. Auto-save state after sync
        await self.async_save_state()

        # 6. Schedule time-boundary triggers for schedule changes
        self._reschedule_time_triggers()

        return self.state

    async def async_force_sync(self) -> SyncResult:
        """Force a full re-sync (called by service)."""
        _LOGGER.info("async_force_sync: starting resolve")
        context = await self.context_resolver.resolve()
        self.override_manager.cleanup_expired()
        effective = self.policy_engine.resolve(self.state, context)
        _LOGGER.info(
            "async_force_sync: resolved %d client policies",
            len(effective),
        )
        result = await self.sync_engine.force_full_sync(effective)
        _LOGGER.info(
            "async_force_sync: done — +%d/-%d rules, %d services, %d errors",
            result.rules_added,
            result.rules_removed,
            result.services_updated,
            len(result.errors),
        )
        self._reschedule_time_triggers()
        return result

    async def async_save_state(self) -> None:
        """Persist state to config entry."""
        self.hass.config_entries.async_update_entry(
            self.entry,
            data={**self.entry.data, "state": self.state.to_dict()},
        )

    def update_state(self, new_state: GlobalState) -> None:
        """Replace the entire state (called from websocket API)."""
        self.state = new_state
        self.override_manager = OverrideManager(self.state)
        if self.context_resolver:
            self.context_resolver = ContextResolver(self.hass, self.state.calendar_entities)
        self._reschedule_time_triggers()

    # ── Time-boundary scheduling ───────────────────────────

    def _reschedule_time_triggers(self) -> None:
        """Cancel old and schedule new callbacks at policy time boundaries."""
        for h in self._schedule_handles:
            h.cancel()
        self._schedule_handles.clear()

        if self.context_resolver is None:
            return

        now = datetime.now()
        transitions = self._compute_next_transitions(now)

        for t in transitions:
            handle = async_track_point_in_time(
                self.hass, self._on_time_transition, t,
            )
            self._schedule_handles.append(handle)
            _LOGGER.debug("Schedule trigger queued: %s", t.isoformat())

        if transitions:
            _LOGGER.info(
                "Time-boundary scheduler: %d triggers queued, next=%s",
                len(transitions),
                transitions[0].isoformat(),
            )

    def _compute_next_transitions(self, now: datetime) -> list[datetime]:
        """Collect upcoming time_from/time_to boundaries from all enabled policies."""
        transitions: list[datetime] = []
        for policy in self.state.policies:
            if not policy.enabled or not policy.time_schedule:
                continue
            sched = policy.time_schedule
            for day_offset in range(2):  # today + tomorrow
                day = now.date() + timedelta(days=day_offset)
                for field_val in (sched.time_from, sched.time_to):
                    if not field_val:
                        continue
                    try:
                        hour, minute = (int(x) for x in field_val.split(":", 1))
                        t = datetime.combine(
                            day,
                            datetime.min.time().replace(
                                hour=min(hour, 23),
                                minute=min(minute, 59),
                            ),
                        )
                        if t > now:
                            transitions.append(t)
                    except (ValueError, AttributeError):
                        pass
        return sorted(set(transitions))

    async def _on_time_transition(self, now: datetime) -> None:
        """Fire at exact schedule boundary — immediate sync."""
        _LOGGER.info("Time boundary reached at %s — forcing sync", now.isoformat())
        if self.context_resolver is None:
            self._init_context_resolver(self.hass)
        await self.async_force_sync()
