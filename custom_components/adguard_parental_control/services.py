"""HA Services for AdGuard Parental Control."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN
from .coordinator import AdGuardParentalControlCoordinator
from .const import OverrideAction

_LOGGER = logging.getLogger(__name__)

SERVICE_APPLY_POLICIES = "apply_policies"
SERVICE_SET_OVERRIDE = "set_override"
SERVICE_CLEAR_OVERRIDE = "clear_override"
SERVICE_CLEAR_OVERRIDES_FOR = "clear_overrides_for"
SERVICE_SYNC_CLIENTS = "sync_clients"

SCHEMA_SET_OVERRIDE = vol.Schema(
    {
        vol.Required("target"): cv.string,
        vol.Required("target_type"): vol.In(["client", "member"]),
        vol.Required("action"): vol.In(["allow_all", "block_all", "custom"]),
        vol.Optional("duration_minutes", default=30): vol.All(
            int, vol.Range(min=1, max=1440)
        ),
        vol.Optional("custom_rules"): vol.All(
            vol.Length(min=1),
            [
                {
                    vol.Required("target"): cv.string,
                    vol.Required("action"): vol.In(["block", "allow"]),
                    vol.Required("rule_type"): vol.In(["domain", "service", "category"]),
                }
            ],
        ),
    }
)

SCHEMA_CLEAR_OVERRIDE = vol.Schema(
    {
        vol.Required("override_id"): cv.string,
    }
)

SCHEMA_CLEAR_OVERRIDES_FOR = vol.Schema(
    {
        vol.Required("target"): cv.string,
        vol.Optional("target_type", default="client"): vol.In(["client", "member"]),
    }
)


def _get_coordinator(hass: HomeAssistant) -> AdGuardParentalControlCoordinator:
    """Get the coordinator from the first config entry."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.runtime_data is not None:
            return entry.runtime_data
    raise ValueError("No config entry found")


async def async_setup_services(hass: HomeAssistant) -> None:
    """Register all services."""

    async def handle_apply_policies(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass)
        await coordinator.async_force_sync()
        await coordinator.async_save_state()

    async def handle_set_override(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass)
        from .models import PolicyRule

        custom_rules = None
        if "custom_rules" in call.data:
            custom_rules = [
                PolicyRule(
                    target=r["target"],
                    action=r["action"],
                    rule_type=r["rule_type"],
                )
                for r in call.data["custom_rules"]
            ]

        coordinator.override_manager.create_override(
            target=call.data["target"],
            target_type=call.data["target_type"],
            action=OverrideAction(call.data["action"]),
            duration_minutes=call.data.get("duration_minutes", 30),
            custom_rules=custom_rules,
        )
        await coordinator.async_force_sync()
        await coordinator.async_save_state()

    async def handle_clear_override(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass)
        coordinator.override_manager.clear_override(call.data["override_id"])
        await coordinator.async_force_sync()
        await coordinator.async_save_state()

    async def handle_clear_overrides_for(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass)
        coordinator.override_manager.clear_overrides_for(
            target=call.data["target"],
            target_type=call.data.get("target_type"),
        )
        await coordinator.async_force_sync()
        await coordinator.async_save_state()

    async def handle_sync_clients(call: ServiceCall) -> None:
        coordinator = _get_coordinator(hass)
        await coordinator.async_request_refresh()

    hass.services.async_register(DOMAIN, SERVICE_APPLY_POLICIES, handle_apply_policies)
    hass.services.async_register(
        DOMAIN, SERVICE_SET_OVERRIDE, handle_set_override, schema=SCHEMA_SET_OVERRIDE
    )
    hass.services.async_register(
        DOMAIN, SERVICE_CLEAR_OVERRIDE, handle_clear_override, schema=SCHEMA_CLEAR_OVERRIDE
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_CLEAR_OVERRIDES_FOR,
        handle_clear_overrides_for,
        schema=SCHEMA_CLEAR_OVERRIDES_FOR,
    )
    hass.services.async_register(DOMAIN, SERVICE_SYNC_CLIENTS, handle_sync_clients)

async def async_unload_services(hass: HomeAssistant) -> None:
    """Unregister all services."""
    for service_name in [
        SERVICE_APPLY_POLICIES,
        SERVICE_SET_OVERRIDE,
        SERVICE_CLEAR_OVERRIDE,
        SERVICE_CLEAR_OVERRIDES_FOR,
        SERVICE_SYNC_CLIENTS,
    ]:
        hass.services.async_remove(DOMAIN, service_name)
