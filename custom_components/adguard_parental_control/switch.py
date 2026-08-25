"""Switch entities for AdGuard Parental Control."""

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity
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
    entities: list[SwitchEntity] = [ProtectionSwitch(coordinator, entry)]
    async_add_entities(entities)


class _BaseSwitch(CoordinatorEntity[AdGuardParentalControlCoordinator], SwitchEntity):
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


class ProtectionSwitch(_BaseSwitch):
    _attr_name = "Protection"
    _attr_unique_id = "adguard_pc_protection"

    def __init__(
        self,
        coordinator: AdGuardParentalControlCoordinator,
        entry: ConfigEntry,
    ) -> None:
        super().__init__(coordinator, entry)
        self._is_on: bool | None = None

    @property
    def is_on(self) -> bool | None:
        return self._is_on

    async def async_turn_on(self, **kwargs) -> None:
        await self.coordinator.api.set_protection(True)
        self._is_on = True
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs) -> None:
        await self.coordinator.api.set_protection(False)
        self._is_on = False
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        try:
            status = await self.coordinator.api.get_protection_status()
            self._is_on = status.get("protection_enabled", True)
        except Exception:
            self._is_on = None
