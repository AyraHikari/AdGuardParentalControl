"""Constants for AdGuard Parental Control integration."""

from enum import StrEnum

DOMAIN = "adguard_parental_control"

# Config keys
CONF_ADGUARD_URL = "adguard_url"
CONF_USERNAME = "username"
CONF_PASSWORD = "password"
CONF_VERIFY_SSL = "verify_ssl"

# Frontend panel
URL_BASE = "/adguard-parental-control"
FRONTEND_URL_PATH = "adguard-parental-control"

# Storage
STORAGE_KEY = f"{DOMAIN}.storage"
STORAGE_VERSION = 1

# Defaults
DEFAULT_POLL_INTERVAL = 30  # seconds


class PolicyAction(StrEnum):
    """Action for a policy rule."""

    BLOCK = "block"
    ALLOW = "allow"
    INHERIT = "inherit"


class RuleType(StrEnum):
    """Type of rule target."""

    DOMAIN = "domain"
    SERVICE = "service"
    CATEGORY = "category"


class OverrideAction(StrEnum):
    """Action for an override."""

    ALLOW_ALL = "allow_all"
    BLOCK_ALL = "block_all"
    CUSTOM = "custom"
