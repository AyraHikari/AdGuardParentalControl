"""Sync Engine — delta-based sync of effective policies to AdGuard Home API.

Rules scoped by client IP/LAN name via RuleRegistry, NOT by comment markers.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field

from .adguard_api import AdGuardHomeAPI
from .policy_engine import EffectivePolicy

_LOGGER = logging.getLogger(__name__)


@dataclass
class SyncResult:
    """Result of a sync operation."""

    rules_added: int = 0
    rules_removed: int = 0
    services_updated: int = 0
    errors: list[str] = field(default_factory=list)


@dataclass
class RuleRegistry:
    """Maps client identity to its assigned rules.

    Scoping is by client name (matching AdGuard registered client),
    NOT by comment markers in the rule text.
    """

    client_rules: dict[str, set[str]] = field(default_factory=dict)

    def get_all_rules_flat(self) -> set[str]:
        all_rules: set[str] = set()
        for rules in self.client_rules.values():
            all_rules.update(rules)
        return all_rules

    def set_client_rules(self, client_name: str, rules: set[str]) -> None:
        self.client_rules[client_name] = rules

    def remove_client(self, client_name: str) -> None:
        self.client_rules.pop(client_name, None)

    def diff(self, other: RuleRegistry) -> tuple[set[str], set[str]]:
        """Return (rules_to_add, rules_to_remove) by comparing with other."""
        old_flat = other.get_all_rules_flat()
        new_flat = self.get_all_rules_flat()
        return new_flat - old_flat, old_flat - new_flat


class AdGuardSyncEngine:
    """Pushes effective policies to AdGuard Home with minimal API calls."""

    def __init__(self, api: AdGuardHomeAPI) -> None:
        self._api = api
        self._registry = RuleRegistry()
        self._previous_client_services: dict[str, list[str]] = {}

    @property
    def registry(self) -> RuleRegistry:
        return self._registry

    async def sync(self, effective_policies: dict[str, EffectivePolicy]) -> SyncResult:
        """Delta-sync effective policies to AdGuard Home."""
        result = SyncResult()

        try:
            # 1. Build new registry from effective policies
            new_registry = RuleRegistry()
            for client_name, policy in effective_policies.items():
                new_registry.set_client_rules(client_name, set(policy.user_rules))

            # 2. Diff rules
            rules_to_add, rules_to_remove = new_registry.diff(self._registry)

            if rules_to_add or rules_to_remove:
                _LOGGER.debug(
                    "Rule sync: +%d / -%d rules",
                    len(rules_to_add),
                    len(rules_to_remove),
                )
                all_rules = sorted(new_registry.get_all_rules_flat())
                await self._api.set_user_rules(all_rules)
                result.rules_added = len(rules_to_add)
                result.rules_removed = len(rules_to_remove)

            # 3. Per-client blocked services
            for client_name, policy in effective_policies.items():
                prev = self._previous_client_services.get(client_name)
                if prev != policy.blocked_services:
                    try:
                        await self._sync_client_blocked_services(client_name, policy)
                        result.services_updated += 1
                    except Exception as err:
                        msg = f"Failed syncing services for {client_name}: {err}"
                        _LOGGER.warning(msg)
                        result.errors.append(msg)
                self._previous_client_services[client_name] = policy.blocked_services

            self._registry = new_registry

        except Exception as err:
            msg = f"Sync error: {err}"
            _LOGGER.error(msg)
            result.errors.append(msg)

        return result

    async def _sync_client_blocked_services(
        self,
        client_name: str,
        policy: EffectivePolicy,
    ) -> None:
        """Push blocked services for a specific client.

        Resolves client_name against AdGuard registered clients and
        updates via /control/clients/update.
        """
        adguard_clients = await self._api.get_clients()
        adguard_name = None

        for client in adguard_clients:
            if client.get("name") == client_name:
                adguard_name = client.get("name")
                break
            # Match by IP or other IDs
            ids = client.get("ids", [])
            if client_name in ids:
                adguard_name = client.get("name")
                break

        if adguard_name is None:
            _LOGGER.debug("Client %s not found in AdGuard, skipping services sync", client_name)
            return

        await self._api.update_client(
            adguard_name,
            {"blocked_services": policy.blocked_services},
        )

    async def force_full_sync(self, effective_policies: dict[str, EffectivePolicy]) -> SyncResult:
        """Force a full sync by clearing the registry first."""
        self._registry = RuleRegistry()
        self._previous_client_services = {}
        return await self.sync(effective_policies)
