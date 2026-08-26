"""Data models for AdGuard Parental Control integration."""

from __future__ import annotations

import dataclasses
import datetime as dt
from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from uuid import uuid4

from .const import OverrideAction, PolicyAction, RuleType


def _gen_id() -> str:
    return uuid4().hex[:8]


@dataclass
class CurrentContext:
    """Snapshot of the current runtime context."""

    now: datetime
    weekday: str  # "mon".."sun"
    time_of_day: str  # "HH:MM"
    is_holiday: bool
    is_school_break: bool
    calendar_events: list[str]
    active_profile: str | None


@dataclass
class TimeSchedule:
    """Time-based condition for a policy."""

    days: list[str]  # ["mon", "tue", ...]
    time_from: str | None  # "HH:MM"
    time_to: str | None  # "HH:MM"

    def is_active(self, context: CurrentContext) -> bool:
        """Return whether this schedule is active, including overnight windows."""
        normalized_days = {str(d).lower()[:3] for d in self.days}
        if not normalized_days:
            normalized_days = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"}

        if not self.time_from and not self.time_to:
            return context.weekday in normalized_days

        current = _hhmm_to_minutes(context.time_of_day)

        if not self.time_from:
            # "until HH:MM" applies on the active day.
            return context.weekday in normalized_days and current < _hhmm_to_minutes(self.time_to)

        if not self.time_to:
            # "from HH:MM" applies on the active day.
            return context.weekday in normalized_days and current >= _hhmm_to_minutes(self.time_from)

        start = _hhmm_to_minutes(self.time_from)
        end = _hhmm_to_minutes(self.time_to)

        if start == end:
            return context.weekday in normalized_days

        if start < end:
            return context.weekday in normalized_days and start <= current < end

        # Overnight window, e.g. Mon 21:00 -> 05:00. The post-midnight
        # segment belongs to the previous schedule day.
        if current >= start:
            return context.weekday in normalized_days

        weekday_order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
        try:
            idx = weekday_order.index(context.weekday)
            previous_day = weekday_order[(idx - 1) % 7]
        except ValueError:
            previous_day = context.weekday
        return current < end and previous_day in normalized_days


def _hhmm_to_minutes(value: str) -> int:
    """Convert HH:MM into minutes after midnight."""
    try:
        hour, minute = (int(part) for part in value.split(":", 1))
    except (ValueError, AttributeError):
        return 0
    return max(0, min(23, hour)) * 60 + max(0, min(59, minute))


@dataclass
class CalendarCondition:
    """Calendar-based condition for a policy."""

    calendar_entity: str | None  # HA calendar entity_id
    event_match: list[str]  # keywords to match event summaries
    invert: bool  # True = active when events NOT matching

    def matches(self, events: list[str]) -> bool:
        if not self.event_match:
            return False
        matched = any(
            keyword.lower() in event.lower()
            for event in events
            for keyword in self.event_match
        )
        return not matched if self.invert else matched


@dataclass
class PolicyRule:
    """Single rule within a policy."""

    target: str  # domain, service name, or category
    action: PolicyAction
    rule_type: RuleType
    is_regex: bool = False

    def to_adguard_rule(self) -> str:
        """Convert to AdGuard user rule syntax."""
        if self.is_regex:
            if self.action == PolicyAction.ALLOW:
                return f"@@/{self.target}/"
            return f"/{self.target}/"
        if self.rule_type == RuleType.SERVICE:
            if self.action == PolicyAction.ALLOW:
                return f"@@||{self.target}^"
            return f"||{self.target}^"
        if self.rule_type == RuleType.DOMAIN:
            if self.action == PolicyAction.ALLOW:
                return f"@@||{self.target}^"
            return f"||{self.target}^"
        return ""

    def __post_init__(self) -> None:
        if self.target is None:
            raise ValueError("PolicyRule.target cannot be None")


@dataclass
class Policy:
    """A named set of rules with optional conditions."""

    id: str = field(default_factory=_gen_id)
    name: str = ""
    time_schedule: TimeSchedule | None = None
    calendar_condition: CalendarCondition | None = None
    profile_id: str | None = None
    rules: list[PolicyRule] = field(default_factory=list)
    priority: int = 0
    description: str = ""
    enabled: bool = True
    tags: list[str] = field(default_factory=list)
    exceptions: list[PolicyRule] = field(default_factory=list)

    def is_active(self, context: CurrentContext, events: list[str] | None = None) -> bool:
        """Check if this policy is active given the current context."""
        if self.time_schedule and not self.time_schedule.is_active(context):
            return False
        if self.calendar_condition and events is not None:
            if not self.calendar_condition.matches(events):
                return False
        return True


@dataclass
class ClientConfig:
    """Represents a network client (device) tracked by AdGuard."""

    name: str
    ids: list[str] = field(default_factory=list)  # IP, CIDR, or MAC
    assigned_policy_ids: list[str] = field(default_factory=list)
    exceptions: list[str] = field(default_factory=list)  # domains to always allow


@dataclass
class Member:
    """A logical grouping of clients with shared policy assignments."""

    id: str = field(default_factory=_gen_id)
    name: str = ""
    client_names: list[str] = field(default_factory=list)
    assigned_policy_ids: list[str] = field(default_factory=list)
    exceptions: list[str] = field(default_factory=list)


@dataclass
class Group:
    """A collection of members and/or clients with shared policy assignments."""

    id: str = field(default_factory=_gen_id)
    name: str = ""
    member_names: list[str] = field(default_factory=list)
    client_names: list[str] = field(default_factory=list)
    assigned_policy_ids: list[str] = field(default_factory=list)


@dataclass
class Profile:
    """A named set of rules used as a template across policies."""

    id: str = field(default_factory=_gen_id)
    name: str = ""
    rules: list[PolicyRule] = field(default_factory=list)
    default_action: PolicyAction = PolicyAction.BLOCK


@dataclass
class Override:
    """A temporary override that supersedes normal policy resolution."""

    id: str = field(default_factory=_gen_id)
    target: str = ""  # member or client name
    target_type: str = "client"  # "client" or "member"
    action: OverrideAction = OverrideAction.ALLOW_ALL
    custom_rules: list[PolicyRule] = field(default_factory=list)
    expires: datetime | None = None
    created_at: datetime = field(default_factory=datetime.now)

    @property
    def is_expired(self) -> bool:
        if self.expires is None:
            return False
        return datetime.now() > self.expires


def _serialize_value(obj: object) -> object:
    """Recursively serialize a value for JSON storage."""
    if isinstance(obj, StrEnum):
        return str(obj.value)
    if isinstance(obj, (dt.datetime,)):
        return obj.isoformat()
    if dataclasses.is_dataclass(obj) and not isinstance(obj, type):
        result = {}
        for f in dataclasses.fields(obj):
            val = getattr(obj, f.name)
            if val is None:
                continue
            result[f.name] = _serialize_value(val)
        return result
    if isinstance(obj, list):
        return [_serialize_value(item) for item in obj]
    if isinstance(obj, dict):
        return {k: _serialize_value(v) for k, v in obj.items()}
    if isinstance(obj, set):
        return sorted([_serialize_value(item) for item in obj])
    return obj


def _serialize_dataclass(obj: object) -> dict:
    """Serialize a dataclass to a JSON-safe dict."""
    return _serialize_value(obj)  # type: ignore[return-value]


@dataclass
class GlobalState:
    """Top-level state container persisted across restarts."""

    profiles: list[Profile] = field(default_factory=list)
    groups: list[Group] = field(default_factory=list)
    members: list[Member] = field(default_factory=list)
    clients: list[ClientConfig] = field(default_factory=list)
    policies: list[Policy] = field(default_factory=list)
    overrides: list[Override] = field(default_factory=list)
    calendar_entities: list[str] = field(default_factory=list)

    def find_profile(self, profile_id: str) -> Profile | None:
        for p in self.profiles:
            if p.id == profile_id:
                return p
        return None

    def find_policy(self, policy_id: str) -> Policy | None:
        for p in self.policies:
            if p.id == policy_id:
                return p
        return None

    def find_member(self, member_id: str) -> Member | None:
        for m in self.members:
            if m.id == member_id:
                return m
        return None

    def find_group(self, group_id: str) -> Group | None:
        for g in self.groups:
            if g.id == group_id:
                return g
        return None

    def find_client(self, client_name: str) -> ClientConfig | None:
        for c in self.clients:
            if c.name == client_name:
                return c
        return None

    def get_members_for_client(self, client_name: str) -> list[Member]:
        return [
            m for m in self.members if client_name in m.client_names
        ]

    def get_groups_for_client(self, client_name: str) -> list[Group]:
        members = self.get_members_for_client(client_name)
        member_names = {m.name for m in members}
        return [
            g
            for g in self.groups
            if client_name in g.client_names
            or any(mn in member_names for mn in g.member_names)
        ]

    def to_dict(self) -> dict:
        """Serialize entire state to dict (JSON-safe)."""
        return _serialize_dataclass(self)

    @classmethod
    def from_dict(cls, data: dict) -> GlobalState:
        """Deserialize state from dict."""
        state = cls()
        if not data:
            return state

        for pd in data.get("profiles", []):
            state.profiles.append(
                Profile(
                    id=pd["id"],
                    name=pd["name"],
                    rules=[_rule_from_dict(r) for r in pd.get("rules", [])],
                    default_action=PolicyAction(pd.get("default_action", "block")),
                )
            )

        for gd in data.get("groups", []):
            state.groups.append(
                Group(
                    id=gd["id"],
                    name=gd["name"],
                    member_names=gd.get("member_names", []),
                    client_names=gd.get("client_names", []),
                    assigned_policy_ids=gd.get("assigned_policy_ids", []),
                )
            )

        for md in data.get("members", []):
            state.members.append(
                Member(
                    id=md["id"],
                    name=md["name"],
                    client_names=md.get("client_names", []),
                    assigned_policy_ids=md.get("assigned_policy_ids", []),
                    exceptions=md.get("exceptions", []),
                )
            )

        for cd in data.get("clients", []):
            state.clients.append(
                ClientConfig(
                    name=cd["name"],
                    ids=cd.get("ids", []),
                    assigned_policy_ids=cd.get("assigned_policy_ids", []),
                    exceptions=cd.get("exceptions", []),
                )
            )

        for pid in data.get("policies", []):
            ts = None
            if pid.get("time_schedule"):
                tsd = pid["time_schedule"]
                ts = TimeSchedule(
                    days=tsd.get("days", []),
                    time_from=tsd.get("time_from"),
                    time_to=tsd.get("time_to"),
                )
            cc = None
            if pid.get("calendar_condition"):
                ccd = pid["calendar_condition"]
                cc = CalendarCondition(
                    calendar_entity=ccd.get("calendar_entity"),
                    event_match=ccd.get("event_match", []),
                    invert=ccd.get("invert", False),
                )
            state.policies.append(
                Policy(
                    id=pid["id"],
                    name=pid["name"],
                    time_schedule=ts,
                    calendar_condition=cc,
                    profile_id=pid.get("profile_id"),
                    rules=[_rule_from_dict(r) for r in pid.get("rules", [])],
                    priority=pid.get("priority", 0),
                    description=pid.get("description", ""),
                    enabled=pid.get("enabled", True),
                    tags=pid.get("tags", []) or [],
                    exceptions=[_rule_from_dict(r) for r in pid.get("exceptions", [])],
                )
            )

        for od in data.get("overrides", []):
            custom = [_rule_from_dict(r) for r in od.get("custom_rules", [])]
            expires = None
            if od.get("expires"):
                expires = dt.datetime.fromisoformat(od["expires"])
            created = dt.datetime.fromisoformat(od["created_at"]) if od.get("created_at") else dt.datetime.now()
            state.overrides.append(
                Override(
                    id=od["id"],
                    target=od["target"],
                    target_type=od.get("target_type", "client"),
                    action=OverrideAction(od.get("action", "allow_all")),
                    custom_rules=custom,
                    expires=expires,
                    created_at=created,
                )
            )

        state.calendar_entities = data.get("calendar_entities", [])
        return state


def _rule_from_dict(d: dict) -> PolicyRule:
    return PolicyRule(
        target=d["target"],
        action=PolicyAction(d["action"]),
        rule_type=RuleType(d["rule_type"]),
        is_regex=bool(d.get("is_regex", False)),
    )
