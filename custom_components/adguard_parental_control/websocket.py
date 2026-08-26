"""WebSocket API for AdGuard Parental Control frontend."""

from __future__ import annotations

import functools
import logging
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.components.websocket_api import ActiveConnection

from .const import DOMAIN
from .coordinator import AdGuardParentalControlCoordinator
from .models import (
    CalendarCondition,
    ClientConfig,
    Group,
    Member,
    Override,
    Policy,
    PolicyRule,
    Profile,
    TimeSchedule,
    _gen_id,
)

_LOGGER = logging.getLogger(__name__)


def _get_coordinator(hass: HomeAssistant) -> AdGuardParentalControlCoordinator:
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.runtime_data is not None:
            return entry.runtime_data
    raise ValueError("No config entry")


def _safe(func):
    """Wrap a WS handler so exceptions send error instead of killing the connection."""

    @functools.wraps(func)
    async def wrapper(
        hass: HomeAssistant, connection: ActiveConnection, msg: dict
    ) -> None:
        try:
            await func(hass, connection, msg)
        except Exception as err:
            _LOGGER.exception("WebSocket error in %s", msg.get("type", "unknown"))
            connection.send_error(msg["id"], "unhandled_error", str(err))

    return wrapper


@websocket_api.websocket_command({"type": "adguard_pc/state/get"})
@websocket_api.async_response
@_safe
async def ws_get_state(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    connection.send_result(msg["id"], coordinator.state.to_dict())


@websocket_api.websocket_command(
    {
        "type": "adguard_pc/state/update",
        "state": dict,
    }
)
@websocket_api.async_response
@_safe
async def ws_update_state(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    from .models import GlobalState

    new_state = GlobalState.from_dict(msg["state"])
    coordinator.update_state(new_state)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Status ────────────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/status"})
@websocket_api.async_response
@_safe
async def ws_status(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    status = {
        "rules_count": len(coordinator.sync_engine.registry.get_all_rules_flat()),
        "overrides_count": len(coordinator.override_manager.get_active_overrides()),
        "clients_count": len(coordinator.state.clients),
        "policies_count": len(coordinator.state.policies),
        "profiles_count": len(coordinator.state.profiles),
        "groups_count": len(coordinator.state.groups),
        "members_count": len(coordinator.state.members),
    }
    connection.send_result(msg["id"], status)


@websocket_api.websocket_command({"type": "adguard_pc/sync"})
@websocket_api.async_response
@_safe
async def ws_sync(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    result = await coordinator.async_force_sync()
    connection.send_result(msg["id"], {
        "rules_added": result.rules_added,
        "rules_removed": result.rules_removed,
        "services_updated": result.services_updated,
    })


# ── Profiles CRUD ─────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/profiles/list"})
@websocket_api.async_response
@_safe
async def ws_profiles_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    profiles = [_profile_dict(p) for p in coordinator.state.profiles]
    connection.send_result(msg["id"], profiles)


@websocket_api.websocket_command(
    {"type": "adguard_pc/profiles/create", "profile": dict}
)
@websocket_api.async_response
@_safe
async def ws_profiles_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pd = msg["profile"]
    profile = Profile(
        id=pd.get("id") or _gen_id(),
        name=pd.get("name", ""),
        rules=[_rule_from_dict(r) for r in pd.get("rules", [])],
    )
    coordinator.state.profiles.append(profile)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _profile_dict(profile))


@websocket_api.websocket_command(
    {"type": "adguard_pc/profiles/update", "profile": dict}
)
@websocket_api.async_response
@_safe
async def ws_profiles_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pd = msg["profile"]
    pid = pd.get("id", "")
    existing = coordinator.state.find_profile(pid)
    if existing:
        existing.name = pd.get("name", existing.name)
        existing.rules = [_rule_from_dict(r) for r in pd.get("rules", existing.rules)]
        existing.default_action = pd.get("default_action", existing.default_action)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _profile_dict(existing) if existing else None)


@websocket_api.websocket_command(
    {"type": "adguard_pc/profiles/delete", "profile_id": str}
)
@websocket_api.async_response
@_safe
async def ws_profiles_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pid = msg["profile_id"]
    coordinator.state.profiles = [
        p for p in coordinator.state.profiles if p.id != pid
    ]
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Groups CRUD ───────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/groups/list"})
@websocket_api.async_response
@_safe
async def ws_groups_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    groups = [_group_dict(g) for g in coordinator.state.groups]
    connection.send_result(msg["id"], groups)


@websocket_api.websocket_command(
    {"type": "adguard_pc/groups/create", "group": dict}
)
@websocket_api.async_response
@_safe
async def ws_groups_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    gd = msg["group"]
    group = Group(
        id=gd.get("id") or _gen_id(),
        name=gd.get("name", ""),
        member_names=gd.get("member_names", []),
        client_names=gd.get("client_names", []),
        assigned_policy_ids=gd.get("assigned_policy_ids", []),
    )
    coordinator.state.groups.append(group)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _group_dict(group))


@websocket_api.websocket_command(
    {"type": "adguard_pc/groups/update", "group": dict}
)
@websocket_api.async_response
@_safe
async def ws_groups_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    gd = msg["group"]
    gid = gd.get("id", "")
    existing = coordinator.state.find_group(gid)
    if existing:
        existing.name = gd.get("name", existing.name)
        existing.member_names = gd.get("member_names", existing.member_names)
        existing.client_names = gd.get("client_names", existing.client_names)
        existing.assigned_policy_ids = gd.get("assigned_policy_ids", existing.assigned_policy_ids)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _group_dict(existing) if existing else None)


@websocket_api.websocket_command(
    {"type": "adguard_pc/groups/assign_policy", "group_id": str, "policy_id": str}
)
@websocket_api.async_response
@_safe
async def ws_groups_assign_policy(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    """Assign a policy to a group without replacing other group fields."""
    coordinator = _get_coordinator(hass)
    group = coordinator.state.find_group(msg["group_id"])
    policy = coordinator.state.find_policy(msg["policy_id"])
    if group is None:
        raise ValueError("Group not found")
    if policy is None:
        raise ValueError("Policy not found")
    if policy.id not in group.assigned_policy_ids:
        group.assigned_policy_ids.append(policy.id)
        await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _group_dict(group))


@websocket_api.websocket_command(
    {"type": "adguard_pc/groups/delete", "group_id": str}
)
@websocket_api.async_response
@_safe
async def ws_groups_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    gid = msg["group_id"]
    coordinator.state.groups = [
        g for g in coordinator.state.groups if g.id != gid
    ]
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Members CRUD ──────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/members/list"})
@websocket_api.async_response
@_safe
async def ws_members_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    members = [_member_dict(m) for m in coordinator.state.members]
    connection.send_result(msg["id"], members)


@websocket_api.websocket_command(
    {"type": "adguard_pc/members/create", "member": dict}
)
@websocket_api.async_response
@_safe
async def ws_members_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    md = msg["member"]
    member = Member(
        id=md.get("id") or _gen_id(),
        name=md.get("name", ""),
        client_names=md.get("client_names", []),
        assigned_policy_ids=md.get("assigned_policy_ids", []),
        exceptions=md.get("exceptions", []),
    )
    coordinator.state.members.append(member)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _member_dict(member))


@websocket_api.websocket_command(
    {"type": "adguard_pc/members/update", "member": dict}
)
@websocket_api.async_response
@_safe
async def ws_members_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    md = msg["member"]
    mid = md.get("id", "")
    existing = coordinator.state.find_member(mid)
    if existing:
        existing.name = md.get("name", existing.name)
        existing.client_names = md.get("client_names", existing.client_names)
        existing.assigned_policy_ids = md.get("assigned_policy_ids", existing.assigned_policy_ids)
        existing.exceptions = md.get("exceptions", existing.exceptions)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _member_dict(existing) if existing else None)


@websocket_api.websocket_command(
    {"type": "adguard_pc/members/delete", "member_id": str}
)
@websocket_api.async_response
@_safe
async def ws_members_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    mid = msg["member_id"]
    coordinator.state.members = [
        m for m in coordinator.state.members if m.id != mid
    ]
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Member Query Log ───────────────────────────────────────

@websocket_api.websocket_command(
    {
        "type": "adguard_pc/members/querylog",
        "member_id": str,
        "limit": int,
        "search": str,
        "response_status": str,
        "older_than": str,
    }
)
@websocket_api.async_response
@_safe
async def ws_members_querylog(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    """Return recent AdGuard DNS queries belonging to all clients of a member."""
    coordinator = _get_coordinator(hass)
    member = coordinator.state.find_member(msg["member_id"])
    if member is None:
        raise ValueError("Member not found")

    limit = max(1, min(int(msg.get("limit", 50)), 200))
    search = str(msg.get("search", "")).strip().lower()
    response_status = str(msg.get("response_status", "")).strip() or None

    # AGH query-log search understands client IPs. Query each configured
    # client identity and merge the results so one member can have several
    # devices without maintaining a duplicate local DNS log database.
    older_than = str(msg.get("older_than", "")).strip() or None

    queries: list[tuple[str, str]] = []
    for client_name in member.client_names:
        client = coordinator.state.find_client(client_name)
        if not client:
            continue
        for identity in client.ids:
            identity = str(identity).strip()
            if identity:
                queries.append((client_name, identity))

    # If a member has no explicit IP identities, there is nothing reliable
    # to filter on. This avoids accidentally returning another user's log.
    if not queries:
        connection.send_result(msg["id"], {"oldest": "", "data": []})
        return

    import asyncio

    async def fetch(client_name: str, identity: str) -> tuple[str, str, dict]:
        try:
            data = await coordinator.api.get_query_log(
                search=identity,
                older_than=older_than,
                response_status=response_status,
            )
            return client_name, identity, data
        except Exception as err:
            _LOGGER.debug("Query log lookup failed for %s (%s): %s", client_name, identity, err)
            return client_name, identity, {"oldest": "", "data": []}

    results = await asyncio.gather(*(fetch(name, identity) for name, identity in queries))
    merged: list[dict] = []
    seen: set[tuple[str, str, str, str]] = set()
    oldest_values: list[str] = []

    for client_name, identity, payload in results:
        if payload.get("oldest"):
            oldest_values.append(payload["oldest"])
        for item in payload.get("data", []):
            if not isinstance(item, dict):
                continue
            question = item.get("question") or {}
            host = str(question.get("name", "") or question.get("host", ""))
            if search and search not in host.lower() and search not in str(item.get("client", "")).lower():
                continue
            # Keep a stable client name from our own inventory even when AGH
            # returns the raw IP address.
            item = {**item, "member_client": client_name, "client_id": identity}
            key = (str(item.get("time", "")), host, str(item.get("client", "")), str(question.get("type", "")))
            if key not in seen:
                seen.add(key)
                merged.append(item)

    merged.sort(key=lambda x: str(x.get("time", "")), reverse=True)
    merged = merged[:limit]

    # ``oldest`` is only meaningful for a subsequent page. For the merged
    # multi-client view, use the oldest returned entry as a safe cursor.
    cursor = min(oldest_values) if oldest_values else (str(merged[-1].get("time", "")) if merged else "")
    connection.send_result(msg["id"], {"oldest": cursor, "data": merged})


# ── Client Query Log ───────────────────────────────────────

@websocket_api.websocket_command({
    "type": "adguard_pc/clients/querylog",
    "client_id": str,
    "limit": int,
    "search": str,
    "response_status": str,
    "older_than": str,
})
@websocket_api.async_response
@_safe
async def ws_clients_querylog(hass: HomeAssistant, connection: ActiveConnection, msg: dict) -> None:
    """Return recent AdGuard DNS queries for one configured client."""
    coordinator = _get_coordinator(hass)
    client = coordinator.state.find_client(msg["client_id"])
    if client is None:
        raise ValueError("Client not found")
    limit = max(1, min(int(msg.get("limit", 100)), 200))
    search = str(msg.get("search", "")).strip().lower()
    response_status = str(msg.get("response_status", "")).strip() or None
    older_than = str(msg.get("older_than", "")).strip() or None
    identities = [str(identity).strip() for identity in client.ids if str(identity).strip()]
    if not identities:
        connection.send_result(msg["id"], {"oldest": "", "data": []})
        return
    import asyncio
    async def fetch(identity: str) -> dict:
        try:
            return await coordinator.api.get_query_log(search=identity, older_than=older_than, response_status=response_status)
        except Exception as err:
            _LOGGER.debug("Query log lookup failed for %s: %s", identity, err)
            return {"oldest": "", "data": []}
    payloads = await asyncio.gather(*(fetch(identity) for identity in identities))
    merged: list[dict] = []
    seen: set[tuple[str, str, str]] = set()
    oldest_values: list[str] = []
    for identity, payload in zip(identities, payloads):
        if payload.get("oldest"):
            oldest_values.append(str(payload["oldest"]))
        for item in payload.get("data", []):
            if not isinstance(item, dict):
                continue
            question = item.get("question") or {}
            host = str(question.get("name", "") or question.get("host", ""))
            qtype = str(question.get("type", ""))
            if search and search not in host.lower():
                continue
            item = {**item, "client_id": identity, "member_client": client.name}
            key = (str(item.get("time", "")), host, qtype)
            if key not in seen:
                seen.add(key)
                merged.append(item)
    merged.sort(key=lambda x: str(x.get("time", "")), reverse=True)
    merged = merged[:limit]
    cursor = min(oldest_values) if oldest_values else (str(merged[-1].get("time", "")) if merged else "")
    connection.send_result(msg["id"], {"oldest": cursor, "data": merged})


# ── Clients CRUD ──────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/clients/list"})
@websocket_api.async_response
@_safe
async def ws_clients_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    clients = [_client_dict(c) for c in coordinator.state.clients]
    connection.send_result(msg["id"], clients)


@websocket_api.websocket_command(
    {"type": "adguard_pc/clients/create", "client": dict}
)
@websocket_api.async_response
@_safe
async def ws_clients_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    cd = msg["client"]
    client = ClientConfig(
        name=cd["name"],
        ids=cd.get("ids", []),
        assigned_policy_ids=cd.get("assigned_policy_ids", []),
        exceptions=cd.get("exceptions", []),
    )
    coordinator.state.clients.append(client)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _client_dict(client))


@websocket_api.websocket_command(
    {"type": "adguard_pc/clients/update", "client": dict}
)
@websocket_api.async_response
@_safe
async def ws_clients_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    cd = msg["client"]
    cname = cd.get("name", "")
    existing = coordinator.state.find_client(cname)
    if existing:
        existing.ids = cd.get("ids", existing.ids)
        existing.assigned_policy_ids = cd.get("assigned_policy_ids", existing.assigned_policy_ids)
        existing.exceptions = cd.get("exceptions", existing.exceptions)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _client_dict(existing) if existing else None)


@websocket_api.websocket_command(
    {"type": "adguard_pc/clients/delete", "client_id": str}
)
@websocket_api.async_response
@_safe
async def ws_clients_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    cname = msg["client_id"]
    coordinator.state.clients = [
        c for c in coordinator.state.clients if c.name != cname
    ]
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Policies CRUD ─────────────────────────────────────────


@websocket_api.websocket_command({"type": "adguard_pc/policies/list"})
@websocket_api.async_response
@_safe
async def ws_policies_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    policies = [_policy_dict(p) for p in coordinator.state.policies]
    connection.send_result(msg["id"], policies)


@websocket_api.websocket_command(
    {"type": "adguard_pc/policies/create", "policy": dict}
)
@websocket_api.async_response
@_safe
async def ws_policies_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pdd = msg["policy"]
    policy = _policy_from_dict(pdd)
    coordinator.state.policies.append(policy)
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], _policy_dict(policy))


@websocket_api.websocket_command(
    {"type": "adguard_pc/policies/update", "policy": dict}
)
@websocket_api.async_response
@_safe
async def ws_policies_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pdd = msg["policy"]
    pid = pdd.get("id", "")
    _LOGGER.info(
        "ws_policies_update: pid=%s  name=%s  keys=%s",
        pid,
        pdd.get("name"),
        list(pdd.keys()),
    )
    existing = coordinator.state.find_policy(pid)
    if existing:
        existing.name = pdd.get("name", existing.name)
        existing.priority = pdd.get("priority", existing.priority)
        existing.profile_id = pdd.get("profile_id", existing.profile_id)
        existing.description = pdd.get("description", existing.description)
        existing.enabled = pdd.get("enabled", existing.enabled)
        existing.tags = pdd.get("tags", existing.tags) or []
        if "exceptions" in pdd:
            existing.exceptions = [_rule_from_dict(r) for r in pdd["exceptions"]]
        if "rules" in pdd:
            existing.rules = [_rule_from_dict(r) for r in pdd["rules"]]
            _LOGGER.info(
                "ws_policies_update: policy=%s rules=%d %s",
                existing.name,
                len(existing.rules),
                [(r.target, r.action.value, r.rule_type.value) for r in existing.rules],
            )
        if "time_schedule" in pdd:
            tsd = pdd["time_schedule"]
            if tsd:
                existing.time_schedule = TimeSchedule(
                    days=tsd.get("days", []),
                    time_from=tsd.get("time_from"),
                    time_to=tsd.get("time_to"),
                )
            else:
                existing.time_schedule = None
        if "calendar_condition" in pdd:
            ccd = pdd["calendar_condition"]
            if ccd:
                existing.calendar_condition = CalendarCondition(
                    calendar_entity=ccd.get("calendar_entity"),
                    event_match=ccd.get("event_match", []),
                    invert=ccd.get("invert", False),
                )
            else:
                existing.calendar_condition = None
    await coordinator.async_save_state()
    sync_result = await coordinator.async_force_sync()
    _LOGGER.info(
        "ws_policies_update: sync_result rules +%d/-%d services=%d errors=%s",
        sync_result.rules_added,
        sync_result.rules_removed,
        sync_result.services_updated,
        sync_result.errors,
    )
    connection.send_result(msg["id"], _policy_dict(existing) if existing else None)


@websocket_api.websocket_command(
    {"type": "adguard_pc/policies/delete", "policy_id": str}
)
@websocket_api.async_response
@_safe
async def ws_policies_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    pid = msg["policy_id"]
    coordinator.state.policies = [
        p for p in coordinator.state.policies if p.id != pid
    ]
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Services (AdGuard blocked services) ────────────────────

@websocket_api.websocket_command({"type": "adguard_pc/services/list"})
@websocket_api.async_response
@_safe
async def ws_services_list(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    all_data = await coordinator.api.get_all_blocked_services()
    blocked_ids = await coordinator.api.get_blocked_services()
    all_services = all_data.get("blocked_services", []) if isinstance(all_data, dict) else all_data
    all_groups = all_data.get("groups", []) if isinstance(all_data, dict) else []
    # Build group_id → group name map
    group_name_map: dict[str, str] = {}
    for grp in all_groups:
        gid = grp.get("id", "")
        gname = grp.get("name", "")
        if gid and gname:
            group_name_map[gid] = gname
    result = []
    for svc in all_services:
        group_id = svc.get("group_id", "")
        category = group_name_map.get(group_id, group_id) if group_id else ""
        result.append({
            "id": svc.get("id", ""),
            "name": svc.get("name", ""),
            "icon": svc.get("icon_class", "") or svc.get("icon_svg", ""),
            "blocked": svc.get("id", "") in blocked_ids,
            "categories": [category] if category else [],
        })
    connection.send_result(msg["id"], result)

@websocket_api.websocket_command({"type": "adguard_pc/services/blocked"})
@websocket_api.async_response
@_safe
async def ws_services_blocked(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    blocked = await coordinator.api.get_blocked_services()
    connection.send_result(msg["id"], blocked)

@websocket_api.websocket_command(
    {"type": "adguard_pc/services/update", "blocked_ids": list}
)
@websocket_api.async_response
@_safe
async def ws_services_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    await coordinator.api.set_blocked_services(msg["blocked_ids"])
    connection.send_result(msg["id"], None)

# ── Overrides ─────────────────────────────────────────────


@websocket_api.websocket_command(
    {
        "type": "adguard_pc/overrides/set",
        "target": str,
        "target_type": str,
        "action": str,
        "duration_minutes": int,
    }
)
@websocket_api.async_response
@_safe
async def ws_overrides_set(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    from .const import OverrideAction

    override = coordinator.override_manager.create_override(
        target=msg["target"],
        target_type=msg["target_type"],
        action=OverrideAction(msg["action"]),
        duration_minutes=msg.get("duration_minutes", 30),
    )
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], override.id)


@websocket_api.websocket_command(
    {
        "type": "adguard_pc/overrides/clear",
        "override_id": str,
    }
)
@websocket_api.async_response
@_safe
async def ws_overrides_clear(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict
) -> None:
    coordinator = _get_coordinator(hass)
    coordinator.override_manager.clear_override(msg["override_id"])
    await coordinator.async_save_state()
    await coordinator.async_force_sync()
    connection.send_result(msg["id"], None)


# ── Registration ──────────────────────────────────────────────

_ALL_HANDLERS = [
    ws_get_state,
    ws_update_state,
    ws_status,
    ws_sync,
    ws_profiles_list,
    ws_profiles_create,
    ws_profiles_update,
    ws_profiles_delete,
    ws_groups_list,
    ws_groups_create,
    ws_groups_update,
    ws_groups_delete,
    ws_groups_assign_policy,
    ws_members_list,
    ws_members_create,
    ws_members_update,
    ws_members_delete,
    ws_members_querylog,
    ws_clients_querylog,
    ws_clients_list,
    ws_clients_create,
    ws_clients_update,
    ws_clients_delete,
    ws_policies_list,
    ws_policies_create,
    ws_policies_update,
    ws_policies_delete,
    ws_services_list,
    ws_services_blocked,
    ws_services_update,
    ws_overrides_set,
    ws_overrides_clear,
]


def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all WebSocket commands."""
    for handler in _ALL_HANDLERS:
        websocket_api.async_register_command(hass, handler)
    _LOGGER.info("Registered %d WebSocket commands", len(_ALL_HANDLERS))


# ── Serialization helpers ────────────────────────────────────


def _rule_dict(r: PolicyRule) -> dict:
    d = {"target": r.target, "action": r.action.value, "rule_type": r.rule_type.value}
    if r.is_regex:
        d["is_regex"] = True
    return d


def _rule_from_dict(d: dict) -> PolicyRule:
    from .models import _rule_from_dict as _m_rule_from_dict
    return _m_rule_from_dict(d)


def _profile_dict(p: Profile) -> dict:
    return {
        "id": p.id,
        "name": p.name,
        "rules": [_rule_dict(r) for r in p.rules],
        "default_action": p.default_action.value,
    }


def _group_dict(g: Group) -> dict:
    return {
        "id": g.id,
        "name": g.name,
        "member_names": g.member_names,
        "client_names": g.client_names,
        "assigned_policy_ids": g.assigned_policy_ids,
    }


def _member_dict(m: Member) -> dict:
    return {
        "id": m.id,
        "name": m.name,
        "client_names": m.client_names,
        "assigned_policy_ids": m.assigned_policy_ids,
        "exceptions": m.exceptions,
    }


def _client_dict(c: ClientConfig) -> dict:
    return {
        "name": c.name,
        "ids": c.ids,
        "assigned_policy_ids": c.assigned_policy_ids,
        "exceptions": c.exceptions,
    }


def _policy_dict(p: Policy) -> dict:
    ts = None
    if p.time_schedule:
        ts = {
            "days": p.time_schedule.days,
            "time_from": p.time_schedule.time_from,
            "time_to": p.time_schedule.time_to,
        }
    cc = None
    if p.calendar_condition:
        cc = {
            "calendar_entity": p.calendar_condition.calendar_entity,
            "event_match": p.calendar_condition.event_match,
            "invert": p.calendar_condition.invert,
        }
    return {
        "id": p.id,
        "name": p.name,
        "time_schedule": ts,
        "calendar_condition": cc,
        "profile_id": p.profile_id,
        "rules": [_rule_dict(r) for r in p.rules],
        "priority": p.priority,
        "description": p.description,
        "enabled": p.enabled,
        "tags": p.tags,
        "exceptions": [_rule_dict(r) for r in p.exceptions],
    }


def _policy_from_dict(d: dict) -> Policy:
    ts = None
    if d.get("time_schedule"):
        tsd = d["time_schedule"]
        ts = TimeSchedule(
            days=tsd.get("days", []),
            time_from=tsd.get("time_from"),
            time_to=tsd.get("time_to"),
        )
    cc = None
    if d.get("calendar_condition"):
        ccd = d["calendar_condition"]
        cc = CalendarCondition(
            calendar_entity=ccd.get("calendar_entity"),
            event_match=ccd.get("event_match", []),
            invert=ccd.get("invert", False),
        )
    return Policy(
        id=d.get("id") or _gen_id(),
        name=d.get("name", ""),
        time_schedule=ts,
        calendar_condition=cc,
        profile_id=d.get("profile_id"),
        rules=[_rule_from_dict(r) for r in d.get("rules", [])],
        priority=d.get("priority", 0),
        description=d.get("description", ""),
        enabled=d.get("enabled", True),
        tags=d.get("tags", []) or [],
        exceptions=[_rule_from_dict(r) for r in d.get("exceptions", [])],
    )
