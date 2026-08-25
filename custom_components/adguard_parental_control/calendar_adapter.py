"""Calendar Adapter — bridges HA calendar entities for policy context."""

from __future__ import annotations

from datetime import datetime, timedelta

from homeassistant.core import HomeAssistant


class CalendarEvent:
    """Simplified calendar event."""

    def __init__(self, summary: str, start: datetime, end: datetime) -> None:
        self.summary = summary
        self.start = start
        self.end = end


class CalendarAdapter:
    """Fetches and interprets calendar events from HA."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass

    async def get_events(
        self,
        entity_ids: list[str],
        start: datetime,
        end: datetime,
    ) -> list[CalendarEvent]:
        """Fetch all events from given calendar entities within the time window."""
        events: list[CalendarEvent] = []
        now = datetime.now()

        for entity_id in entity_ids:
            # Fetch events via calendar.list_events service
            try:
                cal_data = await self._hass.services.async_call(
                    "calendar",
                    "list_events",
                    {
                        "entity_id": entity_id,
                        "start_date_time": start.isoformat(),
                        "end_date_time": end.isoformat(),
                    },
                    blocking=True,
                    return_response=True,
                )
                # HA returns {"entity_id": {"events": [...]}}
                if cal_data and isinstance(cal_data, dict):
                    for _cal_id, payload in cal_data.items():
                        evts = (
                            payload.get("events", [])
                            if isinstance(payload, dict)
                            else payload
                        )
                        if isinstance(evts, list):
                            for evt in evts:
                                events.append(
                                    CalendarEvent(
                                        summary=evt.get("summary", ""),
                                        start=(
                                            datetime.fromisoformat(evt["start"])
                                            if isinstance(evt.get("start"), str)
                                            else now
                                        ),
                                        end=(
                                            datetime.fromisoformat(evt["end"])
                                            if isinstance(evt.get("end"), str)
                                            else now
                                        ),
                                    )
                                )
            except Exception:
                # Fallback: read current state attributes
                state = self._hass.states.get(entity_id)
                if state is not None:
                    attrs = state.attributes
                    summary = attrs.get("message") or attrs.get("summary", "")
                    if summary:
                        events.append(
                            CalendarEvent(
                                summary=summary,
                                start=now,
                                end=now + timedelta(hours=1),
                            )
                        )

        return events

    def is_holiday(self, events: list[CalendarEvent], date: datetime | None = None) -> bool:
        """Check if any event indicates a holiday."""
        for event in events:
            if "holiday" in event.summary.lower() or "ferie" in event.summary.lower():
                return True
        return False

    def is_school_break(self, events: list[CalendarEvent], date: datetime | None = None) -> bool:
        """Check if any event indicates school break."""
        for event in events:
            if "school break" in event.summary.lower() or "ferier" in event.summary.lower():
                return True
        return False

    def get_event_names(self, events: list[CalendarEvent]) -> list[str]:
        """Extract event summary names."""
        return [e.summary for e in events if e.summary]
