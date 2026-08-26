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
        self._registered_clients: set[str] = set()

    @property
    def registry(self) -> RuleRegistry:
        return self._registry

    async def sync(self, effective_policies: dict[str, EffectivePolicy]) -> SyncResult:
        """Delta-sync effective policies to AdGuard Home.

        Integration-managed DNS rules are identifiable by the $client modifier.
        Existing global/user rules that do not contain that modifier are kept
        intact, so syncing parental policies cannot erase the user's own
        AdGuard Home custom rules.
        """
        result = SyncResult()

        try:
            new_registry = RuleRegistry()
            for client_name, policy in effective_policies.items():
                new_registry.set_client_rules(client_name, set(policy.user_rules))
                _LOGGER.info(
                    "sync: client=%s  rules=%d  services=%s",
                    client_name,
                    len(policy.user_rules),
                    policy.blocked_services,
                )
                for r in policy.user_rules:
                    _LOGGER.info("  rule: %s", r)

            old_managed = self._registry.get_all_rules_flat()
            new_managed = new_registry.get_all_rules_flat()
            _LOGGER.info(
                "sync: old_managed=%d  new_managed=%d  equal=%s",
                len(old_managed),
                len(new_managed),
                old_managed == new_managed,
            )

            if old_managed != new_managed:
                existing = set(await self._api.get_user_rules())
                unmanaged = {rule for rule in existing if "$client=" not in rule}
                _LOGGER.info(
                    "sync: existing_rules=%d  (unmanaged=%d, managed_new=%d)",
                    len(existing),
                    len(unmanaged),
                    len(new_managed),
                )
                combined = sorted(unmanaged | new_managed)
                _LOGGER.info(
                    "sync: pushing %d rules to AdGuard: %s",
                    len(combined),
                    combined,
                )
                await self._api.set_user_rules(combined)
                result.rules_added = len(new_managed - old_managed)
                result.rules_removed = len(old_managed - new_managed)
                _LOGGER.info(
                    "sync: pushed +%d / -%d rules",
                    result.rules_added,
                    result.rules_removed,
                )

            # Always reconcile service state. This handles a restart where the
            # previous in-memory service cache is empty, and it also repairs
            # state changed outside this integration.
            for client_name, policy in effective_policies.items():
                prev = self._previous_client_services.get(client_name)
                # Also run when rules exist but client may not be registered
                # in AdGuard Home yet (required for $client= modifier).
                needs_register = (
                    prev != policy.blocked_services
                    or prev is None
                    or client_name not in self._registered_clients
                )
                if needs_register:
                    try:
                        await self._sync_client_blocked_services(client_name, policy)
                        result.services_updated += 1
                        self._registered_clients.add(client_name)
                    except Exception as err:
                        msg = f"Failed syncing services for {client_name}: {err}"
                        _LOGGER.warning(msg)
                        result.errors.append(msg)
                self._previous_client_services[client_name] = list(policy.blocked_services)

            # Remove service settings from clients that no longer exist in the
            # desired policy set but were previously managed by this engine.
            removed_clients = set(self._previous_client_services) - set(effective_policies)
            for client_name in removed_clients:
                try:
                    empty_policy = EffectivePolicy(client_name=client_name)
                    await self._sync_client_blocked_services(client_name, empty_policy)
                except Exception as err:
                    _LOGGER.debug("Failed clearing services for removed client %s: %s", client_name, err)
                self._previous_client_services.pop(client_name, None)

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
        """Apply per-client blocked services in AdGuard Home.

        The integration registers the client by its configured identity if it
        is not already present in AdGuard. When at least one service is blocked,
        global service settings are disabled for that client. When the policy
        has no service blocks, global service settings are restored.
        """
        adguard_clients = await self._api.get_clients()
        adguard_client = None

        for remote in (adguard_clients or []):
            remote_ids = [str(v).strip() for v in (remote.get("ids") or []) if str(v).strip()]
            if remote.get("name") == client_name or any(
                identity in remote_ids for identity in policy.client_ids
            ):
                adguard_client = remote
                break

        if adguard_client is None and policy.client_ids:
            payload = {
                "name": client_name,
                "ids": policy.client_ids,
                "blocked_services": list(policy.blocked_services),
                "use_global_settings": not bool(policy.blocked_services),
            }
            _LOGGER.info("Registering client %s in AdGuard Home for policy enforcement", client_name)
            await self._api.add_client(payload)
            return

        if adguard_client is None:
            _LOGGER.warning(
                "Client %s has no AdGuard identity; cannot sync blocked services",
                client_name,
            )
            return

        adguard_name = str(adguard_client.get("name") or client_name)
        data = {
            "ids": adguard_client.get("ids", []),
            "blocked_services": list(policy.blocked_services),
            "use_global_settings": not bool(policy.blocked_services),
        }
        _LOGGER.info(
            "Updating client %s (adguard_name=%s) ids=%s services=%s",
            client_name,
            adguard_name,
            data["ids"],
            data["blocked_services"],
        )
        await self._api.update_client(adguard_name, data)

    async def force_full_sync(self, effective_policies: dict[str, EffectivePolicy]) -> SyncResult:
        """Force a full sync by clearing the registry first."""
        self._registry = RuleRegistry()
        self._previous_client_services = {}
        self._registered_clients = set()
        return await self.sync(effective_policies)
