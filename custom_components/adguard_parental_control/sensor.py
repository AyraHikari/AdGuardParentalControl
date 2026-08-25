"""Sensor entities for AdGuard Parental Control."""

from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from homeassistant.helpers.entity import DeviceInfo

from .const import DOMAIN
from .coordinator import AdGuardParentalControlCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    coordinator: AdGuardParentalControlCoordinator = entry.runtime_data
    async_add_entities([
        ActiveRulesSensor(coordinator, entry),
        ActiveOverridesSensor(coordinator, entry),
        NextOverrideExpirySensor(coordinator, entry),
    ])


class _BaseSensor(CoordinatorEntity[AdGuardParentalControlCoordinator], SensorEntity):
    _attr_has_entity_name = True
    _attr_device_info = DeviceInfo(
        identifiers={(DOMAIN, "adguard_parental_control")},
        name="AdGuard Parental Control",
        manufacturer="AdGuard",
    )

    def __init__(
        self,
        coordinator: AdGuardParentalControlCoordinator,
        entry: ConfigEntry,
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry


class ActiveRulesSensor(_BaseSensor):
    _attr_name = "Active Rules"
    _attr_unique_id = "adguard_pc_active_rules"
    _attr_native_unit_of_measurement = "rules"

    @property
    def native_value(self) -> int:
        return len(self.coordinator.sync_engine.registry.get_all_rules_flat())


class ActiveOverridesSensor(_BaseSensor):
    _attr_name = "Active Overrides"
    _attr_unique_id = "adguard_pc_active_overrides"
    _attr_native_unit_of_measurement = "overrides"

    @property
    def native_value(self) -> int:
        return len(self.coordinator.override_manager.get_active_overrides())


class NextOverrideExpirySensor(_BaseSensor):
    _attr_name = "Next Override Expiry"
    _attr_unique_id = "adguard_pc_next_override_expiry"

    @property
    def native_value(self) -> str | None:
        active = self.coordinator.override_manager.get_active_overrides()
        if not active:
            return None
        expires = [o.expires for o in active if o.expires]
        if not expires:
            return None
        return min(expires).isoformat()
