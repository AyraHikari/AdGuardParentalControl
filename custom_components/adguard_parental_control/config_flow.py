"""Config Flow for AdGuard Parental Control."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult

from .adguard_api import AdGuardHomeAPI
from .const import (
    CONF_ADGUARD_URL,
    CONF_PASSWORD,
    CONF_USERNAME,
    CONF_VERIFY_SSL,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)

STEP_USER_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_ADGUARD_URL): str,
        vol.Required(CONF_USERNAME): str,
        vol.Required(CONF_PASSWORD): str,
        vol.Optional(CONF_VERIFY_SSL, default=True): bool,
    }
)


class AdGuardParentalControlConfigFlow(
    config_entries.ConfigFlow, domain=DOMAIN
):
    """Handle a config flow for AdGuard Parental Control."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Step 1: User provides AdGuard Home credentials."""
        errors: dict[str, str] = {}

        if user_input is not None:
            # Test connection using HA aiohttp session
            from homeassistant.helpers.aiohttp_client import async_get_clientsession

            session = async_get_clientsession(self.hass)
            api = AdGuardHomeAPI(
                session=session,
                base_url=user_input[CONF_ADGUARD_URL],
                username=user_input[CONF_USERNAME],
                password=user_input[CONF_PASSWORD],
                verify_ssl=user_input.get(CONF_VERIFY_SSL, True),
            )
            try:
                # Login first, then test connection
                if not await api.login():
                    errors["base"] = "cannot_connect"
                else:
                    status = await api.get_protection_status()
                    if status:
                        # Connection successful
                        await self.async_set_unique_id(user_input[CONF_ADGUARD_URL])
                        self._abort_if_unique_id_configured()
                        return self.async_create_entry(
                            title=user_input[CONF_ADGUARD_URL],
                            data=user_input,
                        )
                    errors["base"] = "cannot_connect"
            except Exception as err:
                _LOGGER.error("Connection test failed: %s", err)
                errors["base"] = "cannot_connect"

        return self.async_show_form(
            step_id="user",
            data_schema=STEP_USER_SCHEMA,
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> AdGuardParentalControlOptionsFlow:
        return AdGuardParentalControlOptionsFlow(config_entry)


class AdGuardParentalControlOptionsFlow(
    config_entries.OptionsFlow
):
    """Options flow for polling interval and calendar config."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self._config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self._config_entry.options
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        "poll_interval",
                        default=options.get("poll_interval", 30),
                    ): vol.All(int, vol.Range(min=10, max=300)),
                    vol.Optional(
                        "calendar_entities",
                        default=options.get("calendar_entities", []),
                    ): vol.All(list, vol.Length(min=0)),
                }
            ),
        )
