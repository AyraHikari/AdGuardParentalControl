# AdGuard Parental Control

A Home Assistant custom integration for managing AdGuard Home parental control policies via a visual dashboard.

## Features

- **Complex policy engine** with cascade resolution: Profile → Group → Member → Client → Override
- **Time-based schedules** — weekday/holiday awareness with configurable time windows
- **Calendar integration** — pull events from Home Assistant calendar entities (school breaks, holidays)
- **Profile templates** — reusable rule sets applied across multiple policies
- **Temporary overrides** — manual allow/block with configurable expiry
- **Dashboard UI** — built-in sidebar panel with full CRUD for policies, clients, profiles
- **Delta sync** — minimal AdGuard Home API calls via RuleRegistry diffing

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant
2. Go to **Integrations** → **Custom repositories**
3. Add this repository URL and select **Integration** as the category
4. Search for **AdGuard Parental Control** and install
5. Restart Home Assistant

### Manual

1. Copy `custom_components/adguard_parental_control/` to your Home Assistant `config/custom_components/` directory
2. Restart Home Assistant

## Setup

1. Go to **Settings** → **Devices & Services** → **Add Integration**
2. Search for **AdGuard Parental Control**
3. Enter your AdGuard Home URL, username, and password
4. Configure polling interval in integration options

## Architecture

```
GlobalState
├── Profiles (reusable rule templates)
├── Groups → Members → Clients
├── Policies (with schedule + calendar conditions)
├── Overrides (temporary manual changes)
└── Calendar Entities (HA integration)
```

### Policy Resolution

```
Profile rules (base layer)
  ↓
Policy rules (override profile)
  ↓
Exceptions (domains always allowed)
  ↓
Overrides (temporary manual changes)
  ↓
Effective Policy → synced to AdGuard Home
```

## Dashboard

The sidebar panel provides:

- **Dashboard** — overview of all entities with create/delete/sync
- **Policy Detail** — edit rules, schedules, calendar conditions
- **Client Detail** — manage exceptions and assigned policies
- **Override Manager** — create temporary block/allow overrides

## Services

| Service | Description |
|---------|-------------|
| `adguard_parental_control.apply_policies` | Force re-evaluate and push all policies |
| `adguard_parental_control.set_override` | Create a temporary override |
| `adguard_parental_control.clear_override` | Remove an override by ID |
| `adguard_parental_control.clear_overrides_for` | Remove all overrides for a target |
| `adguard_parental_control.sync_clients` | Sync client list from AdGuard Home |

## Entities

- **Sensor**: Active Rules, Active Overrides, Next Override Expiry
- **Switch**: Protection (AdGuard Home DNS protection toggle)

## Requirements

- Home Assistant 2024.1+
- AdGuard Home with web interface enabled
- HACS (for installation)

## License

MIT
