"""Policy Engine — resolves effective policies per client."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field

from .const import OverrideAction, PolicyAction, RuleType
from .models import (
    CurrentContext,
    GlobalState,
    Override,
    Policy,
    PolicyRule,
)

_LOGGER = logging.getLogger(__name__)


@dataclass
class EffectivePolicy:
    """Final resolved policy for a single client."""

    client_name: str
    client_ids: list[str] = field(default_factory=list)
    user_rules: list[str] = field(default_factory=list)
    blocked_services: list[str] = field(default_factory=list)
    dns_rewrites: list[tuple[str, str]] = field(default_factory=list)
    filtering_enabled: bool = True
    parental_enabled: bool = False
    safebrowsing_enabled: bool = False


@dataclass
class ResolvedRule:
    """Intermediate rule with source metadata for cascade resolution."""

    rule: PolicyRule
    source: str  # "profile", "policy", "member", "client", "override"
    priority: int = 0


class PolicyEngine:
    """Evaluates GlobalState + CurrentContext → per-client EffectivePolicy."""

    def resolve(
        self,
        state: GlobalState,
        context: CurrentContext,
    ) -> dict[str, EffectivePolicy]:
        results: dict[str, EffectivePolicy] = {}

        for client in state.clients:
            # 1. Gather all active policies assigned to this client
            active_policies = self._get_active_policies(client.name, state, context)

            # 2. Cascade: profile → policy → member → client
            resolved = self._cascade_policies(active_policies, client.name, state)

            # 3. Apply exceptions (domains to always allow)
            resolved = self._apply_exceptions(resolved, client.name, state)

            # 4. Apply overrides (temporary changes)
            resolved = self._apply_overrides(resolved, client.name, state)

            # 5. Build final EffectivePolicy
            results[client.name] = self._build_effective(resolved, client)

        return results

    # ── Step 1: Find active policies ──────────────────────────

    def _get_active_policies(
        self,
        client_name: str,
        state: GlobalState,
        context: CurrentContext,
    ) -> list[Policy]:
        """Collect all policies that apply to this client and are currently active."""
        policy_ids: set[str] = set()

        # Direct client policies
        client = state.find_client(client_name)
        if client:
            policy_ids.update(client.assigned_policy_ids)

        # Member policies
        for member in state.get_members_for_client(client_name):
            policy_ids.update(member.assigned_policy_ids)

        # Group policies
        for group in state.get_groups_for_client(client_name):
            policy_ids.update(group.assigned_policy_ids)

        active: list[Policy] = []
        for pid in policy_ids:
            policy = state.find_policy(pid)
            if policy is None or not policy.enabled:
                continue
            if policy.is_active(context, context.calendar_events):
                active.append(policy)

        # Sort by priority (higher = checked first)
        active.sort(key=lambda p: p.priority, reverse=True)
        return active

    # ── Step 2: Cascade policies ──────────────────────────────

    def _cascade_policies(
        self,
        policies: list[Policy],
        client_name: str,
        state: GlobalState,
    ) -> list[ResolvedRule]:
        """Merge rules from policies in priority order.

        Later policies override earlier ones for the same target.
        Profile rules are injected first as base layer.
        """
        rules: dict[str, ResolvedRule] = {}  # key = target domain/service

        for policy in reversed(policies):  # lowest priority first = base layer
            # Inject profile rules first
            if policy.profile_id:
                profile = state.find_profile(policy.profile_id)
                if profile:
                    for rule in profile.rules:
                        key = f"{rule.rule_type}:{rule.target}"
                        if key not in rules:
                            rules[key] = ResolvedRule(
                                rule=rule,
                                source="profile",
                                priority=policy.priority,
                            )

            # Policy rules override profile rules
            for rule in policy.rules:
                key = f"{rule.rule_type}:{rule.target}"
                rules[key] = ResolvedRule(
                    rule=rule,
                    source="policy",
                    priority=policy.priority,
                )

            # Policy exceptions are explicit allow rules applied after normal rules.
            for rule in policy.exceptions:
                key = f"{rule.rule_type}:{rule.target}"
                exception_rule = PolicyRule(
                    target=rule.target,
                    action=PolicyAction.ALLOW,
                    rule_type=rule.rule_type,
                )
                rules[key] = ResolvedRule(
                    rule=exception_rule,
                    source="policy_exception",
                    priority=policy.priority + 1000000,
                )

        # Apply in priority order (highest priority wins for same target)
        result: dict[str, ResolvedRule] = {}
        for key, resolved in sorted(
            rules.items(), key=lambda x: x[1].priority, reverse=True
        ):
            if key not in result:
                result[key] = resolved

        return list(result.values())

    # ── Step 3: Apply exceptions ──────────────────────────────

    def _apply_exceptions(
        self,
        resolved: list[ResolvedRule],
        client_name: str,
        state: GlobalState,
    ) -> list[ResolvedRule]:
        """Apply member/client exceptions as explicit ALLOW rules.

        Removing a BLOCK rule is not enough because an independent AdGuard
        blocklist can still match the domain. We therefore emit a higher
        precedence ALLOW rule for each exception.
        """
        exceptions: set[tuple[str, str]] = set()

        client = state.find_client(client_name)
        if client:
            for exception in client.exceptions:
                exceptions.add(("domain", exception.lower()))

        for member in state.get_members_for_client(client_name):
            for exception in member.exceptions:
                exceptions.add(("domain", exception.lower()))

        if not exceptions:
            return resolved

        result = [
            r for r in resolved
            if (r.rule.rule_type.value, r.rule.target.lower()) not in exceptions
        ]

        for rule_type, target in exceptions:
            result.append(
                ResolvedRule(
                    rule=PolicyRule(
                        target=target,
                        action=PolicyAction.ALLOW,
                        rule_type=RuleType.DOMAIN,
                    ),
                    source="exception",
                    priority=2_000_000,
                )
            )
        return result

    # ── Step 4: Apply overrides ───────────────────────────────

    def _apply_overrides(
        self,
        resolved: list[ResolvedRule],
        client_name: str,
        state: GlobalState,
    ) -> list[ResolvedRule]:
        """Apply temporary overrides that supersede normal rules."""
        active_overrides = [
            o
            for o in state.overrides
            if not o.is_expired
            and (
                (o.target_type == "client" and o.target == client_name)
                or (
                    o.target_type == "member"
                    and self._is_member_of(o.target, client_name, state)
                )
            )
        ]

        if not active_overrides:
            return resolved

        for override in active_overrides:
            if override.action == OverrideAction.ALLOW_ALL:
                return []  # Everything allowed → clear all rules
            if override.action == OverrideAction.BLOCK_ALL:
                return [
                    ResolvedRule(
                        rule=PolicyRule(
                            target="*",
                            action=PolicyAction.BLOCK,
                            rule_type=RuleType.DOMAIN,
                        ),
                        source="override",
                        priority=9999,
                    )
                ]
            if override.action == OverrideAction.CUSTOM and override.custom_rules:
                return [
                    ResolvedRule(
                        rule=r,
                        source="override",
                        priority=9999,
                    )
                    for r in override.custom_rules
                ]

        return resolved

    # ── Helpers ───────────────────────────────────────────────

    def _is_member_of(
        self, member_name: str, client_name: str, state: GlobalState
    ) -> bool:
        member = state.find_member(member_name)
        if member is None:
            return False
        return client_name in member.client_names

    def _build_effective(
        self,
        resolved: list[ResolvedRule],
        client,
    ) -> EffectivePolicy:
        """Convert resolved rules into an EffectivePolicy for sync.

        Domain/category/regex rules are emitted with an AdGuard $client
        modifier so a policy assigned through a group/member affects only
        the intended device instead of becoming a global AdGuard rule.

        Service rules are handled through AdGuard's per-client blocked
        services API; only BLOCK actions are sent to that API.
        """
        user_rules: list[str] = []
        blocked_services: list[str] = []
        identities = [str(v).strip() for v in (client.ids or []) if str(v).strip()]

        # Prefer a concrete IP/MAC identity for the $client modifier. For
        # multiple identities, emit one rule per identity.
        identities = identities or [client.name]
        for r in resolved:
            rule = r.rule
            if rule.rule_type == RuleType.SERVICE:
                if rule.action == PolicyAction.BLOCK:
                    blocked_services.append(rule.target)
                # ALLOW is represented by absence from blocked_services.
                continue

            base = rule.to_adguard_rule()
            if not base:
                _LOGGER.warning(
                    "Skipping rule target=%r is_regex=%s action=%s "
                    "(invalid regex or empty result)",
                    rule.target,
                    rule.is_regex,
                    rule.action.value,
                )
                continue

            for identity in identities:
                if "$client=" not in base:
                    scoped = f"{base}$client={identity}"
                else:
                    scoped = base
                user_rules.append(scoped)

        return EffectivePolicy(
            client_name=client.name,
            client_ids=identities,
            user_rules=sorted(set(user_rules)),
            blocked_services=sorted(set(blocked_services)),
            filtering_enabled=True,
        )

