"""DataUpdateCoordinator for AdGuard Parental Control."""

from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

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

        # Load persisted state from config entry data
        stored = entry.data.get("state", {})
        if stored:
            self.state = GlobalState.from_dict(stored)

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

        return self.state

    async def async_force_sync(self) -> SyncResult:
        """Force a full re-sync (called by service)."""
        context = await self.context_resolver.resolve()
        self.override_manager.cleanup_expired()
        effective = self.policy_engine.resolve(self.state, context)
        return await self.sync_engine.force_full_sync(effective)

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
