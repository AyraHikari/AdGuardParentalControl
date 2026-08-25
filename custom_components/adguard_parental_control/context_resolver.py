"""Context Resolver — builds CurrentContext from HA state."""

from __future__ import annotations

from datetime import datetime, timedelta

from homeassistant.core import HomeAssistant

from .calendar_adapter import CalendarAdapter
from .models import CurrentContext

_WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]


class ContextResolver:
    """Resolves the current runtime context from Home Assistant state."""

    def __init__(self, hass: HomeAssistant, calendar_entities: list[str]) -> None:
        self._hass = hass
        self._calendar_entities = calendar_entities
        self._calendar_adapter = CalendarAdapter(hass)

    async def resolve(self) -> CurrentContext:
        now = datetime.now()
        weekday = _WEEKDAYS[now.weekday()]
        time_of_day = now.strftime("%H:%M")

        # Use CalendarAdapter for richer event fetching
        window_start = now
        window_end = now + timedelta(hours=1)
        cal_events = await self._calendar_adapter.get_events(
            self._calendar_entities, window_start, window_end
        )
        event_names = self._calendar_adapter.get_event_names(cal_events)

        is_holiday = self._calendar_adapter.is_holiday(cal_events)
        is_school_break = self._calendar_adapter.is_school_break(cal_events)

        return CurrentContext(
            now=now,
            weekday=weekday,
            time_of_day=time_of_day,
            is_holiday=is_holiday,
            is_school_break=is_school_break,
            calendar_events=event_names,
            active_profile=None,
        )
