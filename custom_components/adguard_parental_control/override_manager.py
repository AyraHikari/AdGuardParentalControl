"""Override Manager — handles temporary policy overrides."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta

from .const import OverrideAction
from .models import GlobalState, Override, PolicyRule

_LOGGER = logging.getLogger(__name__)

# Default duration options in minutes
DURATION_OPTIONS = [15, 30, 60, 120]


class OverrideManager:
    """Manages temporary overrides on the GlobalState."""

    def __init__(self, state: GlobalState) -> None:
        self._state = state

    def create_override(
        self,
        target: str,
        target_type: str,
        action: OverrideAction,
        duration_minutes: int,
        custom_rules: list[PolicyRule] | None = None,
    ) -> Override:
        """Create and register a new override."""
        expires = datetime.now() + timedelta(minutes=duration_minutes)
        override = Override(
            target=target,
            target_type=target_type,
            action=action,
            custom_rules=custom_rules or [],
            expires=expires,
            created_at=datetime.now(),
        )
        self._state.overrides.append(override)
        _LOGGER.info(
            "Override created: %s %s → %s (expires %s)",
            target_type,
            target,
            action.value,
            expires.isoformat(),
        )
        return override

    def clear_override(self, override_id: str) -> bool:
        """Remove an override by ID. Returns True if found."""
        for i, o in enumerate(self._state.overrides):
            if o.id == override_id:
                removed = self._state.overrides.pop(i)
                _LOGGER.info("Override cleared: %s", removed.id)
                return True
        return False

    def clear_overrides_for(self, target: str, target_type: str | None = None) -> int:
        """Remove all overrides for a target. Returns count removed."""
        before = len(self._state.overrides)
        if target_type:
            self._state.overrides = [
                o for o in self._state.overrides
                if not (o.target == target and o.target_type == target_type)
            ]
        else:
            self._state.overrides = [
                o for o in self._state.overrides if o.target != target
            ]
        removed = before - len(self._state.overrides)
        if removed:
            _LOGGER.info("Cleared %d overrides for %s (%s)", removed, target, target_type or "any")
        return removed

    def get_active_overrides(self) -> list[Override]:
        """Return non-expired overrides."""
        return [o for o in self._state.overrides if not o.is_expired]

    def cleanup_expired(self) -> list[str]:
        """Remove expired overrides. Returns list of removed IDs."""
        expired_ids: list[str] = []
        remaining: list[Override] = []
        for o in self._state.overrides:
            if o.is_expired:
                expired_ids.append(o.id)
                _LOGGER.debug("Override expired: %s", o.id)
            else:
                remaining.append(o)
        self._state.overrides = remaining
        return expired_ids
