"""AdGuard Parental Control — Home Assistant Integration."""

from __future__ import annotations

import logging
import os

from homeassistant.components.frontend import async_register_built_in_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .adguard_api import AdGuardHomeAPI
from .const import (
    CONF_ADGUARD_URL,
    CONF_PASSWORD,
    CONF_USERNAME,
    CONF_VERIFY_SSL,
    DOMAIN,
    URL_BASE,
)
from .coordinator import AdGuardParentalControlCoordinator
from .services import async_setup_services, async_unload_services
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.SWITCH]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up AdGuard Parental Control from a config entry."""
    session = async_get_clientsession(hass)
    api = AdGuardHomeAPI(
        session=session,
        base_url=entry.data[CONF_ADGUARD_URL],
        username=entry.data[CONF_USERNAME],
        password=entry.data[CONF_PASSWORD],
        verify_ssl=entry.data.get(CONF_VERIFY_SSL, True),
    )

    # Login
    if not await api.login():
        _LOGGER.error("Failed to login to AdGuard Home at %s", entry.data[CONF_ADGUARD_URL])
        return False

    coordinator = AdGuardParentalControlCoordinator(hass, api, entry)
    await coordinator.async_config_entry_first_refresh()

    entry.runtime_data = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await async_setup_services(hass)
    async_register_websocket_commands(hass)
    await _async_register_panel(hass, entry)

    _LOGGER.info("AdGuard Parental Control setup complete")
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        # Remove panel
        try:
            from homeassistant.components.frontend import async_remove_panel

            await async_remove_panel(hass, DOMAIN)
        except Exception:
            pass

        # Unregister services
        await async_unload_services(hass)

    return unload_ok


async def _async_register_panel(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Register the sidebar panel for the frontend dashboard."""
    www_dir = os.path.join(
        os.path.dirname(__file__),
        "www",
    )

    # Ensure www directory exists
    os.makedirs(www_dir, exist_ok=True)

    # Register static file serving for the frontend bundle
    await hass.http.async_register_static_paths(
        [StaticPathConfig(URL_BASE, www_dir, cache_headers=False)]
    )

    try:
        async_register_built_in_panel(
            hass,
            component_name="custom",
            sidebar_title="Parental Control",
            sidebar_icon="mdi:shield-lock",
            frontend_url_path=DOMAIN,
            config={
                "_panel_custom": {
                    "name": "adguard-parental-control",
                    "embed_iframe": False,
                    "trust_external": False,
                    "module_url": f"{URL_BASE}/entrypoint.js",
                }
            },
            require_admin=True,
        )
        _LOGGER.info("Registered Parental Control panel in sidebar")
    except Exception as err:
        _LOGGER.warning("Failed to register panel: %s", err)
