import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ICONS } from "../icons";
import { GlobalState } from "../data/websocket-api";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
  { id: "groups", label: "Groups", icon: ICONS.groups },
  { id: "members", label: "Members", icon: ICONS.members },
  { id: "clients", label: "Clients", icon: ICONS.clients },
  { id: "policies", label: "Policies", icon: ICONS.policies },
  { id: "profiles", label: "Profiles", icon: ICONS.profiles },
  { id: "schedules", label: "Schedules", icon: ICONS.schedules },
  { id: "services", label: "Services", icon: ICONS.services },
  { id: "override", label: "Overrides", icon: ICONS.overrides },
  { id: "logs", label: "Logs", icon: ICONS.logs },
  { id: "settings", label: "Settings", icon: ICONS.settings },
];

// Views that should highlight a given top-level nav entry even when showing a detail page.
const VIEW_TO_NAV: Record<string, string> = {
  dashboard: "dashboard",
  groups: "groups",
  "group-detail": "groups",
  members: "members",
  "member-detail": "members",
  clients: "clients",
  "client-detail": "clients",
  policies: "policies",
  "policy-detail": "policies",
  profiles: "profiles",
  "profile-detail": "profiles",
  schedules: "schedules",
  services: "services",
  override: "override",
  logs: "logs",
  settings: "settings",
};

@customElement("agpc-sidebar")
export class AgpcSidebar extends LitElement {
  @property({ type: String }) public activeView = "dashboard";
  @property({ attribute: false }) public state: GlobalState | null = null;
  @property({ type: Boolean }) public protectionEnabled = true;
  @property({ type: Object }) public onNavigate?: (view: string) => void;
  @property({ type: Object }) public onToggleProtection?: () => void;

  private _icon(path: string) {
    return svg`<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private _badgeFor(id: string): number | undefined {
    if (!this.state) return undefined;
    switch (id) {
      case "groups": return this.state.groups.length || undefined;
      case "members": return this.state.members.length || undefined;
      case "clients": return this.state.clients.length || undefined;
      case "policies": return this.state.policies.length || undefined;
      case "profiles": return this.state.profiles.length || undefined;
      case "override": return this.state.overrides.length || undefined;
      default: return undefined;
    }
  }

  render() {
    const activeNav = VIEW_TO_NAV[this.activeView] || "dashboard";
    return html`
      <div class="brand">
        <div class="brand-icon">${this._icon(ICONS.shield)}</div>
        <div class="brand-text">
          <div class="brand-title">AdGuard</div>
          <div class="brand-sub">Parental Control</div>
        </div>
      </div>

      <nav class="nav">
        ${NAV_ITEMS.map((item) => {
          const badge = this._badgeFor(item.id);
          const active = item.id === activeNav;
          return html`
            <button
              class="nav-item ${active ? "active" : ""}"
              @click=${() => this.onNavigate?.(item.id)}
            >
              <span class="nav-icon">${this._icon(item.icon)}</span>
              <span class="nav-label">${item.label}</span>
              ${badge !== undefined ? html`<span class="nav-badge">${badge}</span>` : ""}
            </button>
          `;
        })}
      </nav>

      <div class="sidebar-footer">
        <button class="protection-row" @click=${() => this.onToggleProtection?.()}>
          <div class="protection-text">
            <span class="protection-label">Protection</span>
            <span class="protection-state ${this.protectionEnabled ? "on" : "off"}">
              ${this.protectionEnabled ? "ENABLED" : "DISABLED"}
            </span>
          </div>
          <div class="switch ${this.protectionEnabled ? "on" : ""}">
            <div class="knob"></div>
          </div>
        </button>
        <div class="home-status">
          <span class="dot"></span>
          <span>AdGuard Home</span>
        </div>
        <div class="home-status sub">Connected</div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 240px;
      min-width: 240px;
      height: 100%;
      background: var(--agpc-sidebar-bg, #0d1220);
      border-right: 1px solid var(--agpc-border, #232a41);
      box-sizing: border-box;
      padding: 18px 14px;
      gap: 8px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 8px 18px;
      margin-bottom: 6px;
      border-bottom: 1px solid var(--agpc-border, #232a41);
    }
    .brand-icon {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: var(--agpc-green-soft, rgba(46,204,113,0.14));
      color: var(--agpc-green, #2ecc71);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .brand-title { font-size: 14.5px; font-weight: 700; color: var(--agpc-text, #e9ecf5); line-height: 1.2; }
    .brand-sub { font-size: 11px; color: var(--agpc-text-dim, #8a92ab); }

    .nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      overflow-y: auto;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: transparent;
      color: var(--agpc-text-dim, #8a92ab);
      padding: 9px 10px;
      border-radius: var(--agpc-radius-sm, 8px);
      font-size: 13.5px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      text-align: left;
    }
    .nav-item:hover { background: rgba(255,255,255,0.04); color: var(--agpc-text, #e9ecf5); }
    .nav-item.active {
      background: var(--agpc-blue-soft, rgba(79,140,255,0.14));
      color: var(--agpc-blue, #4f8cff);
    }
    .nav-icon { display: flex; flex-shrink: 0; }
    .nav-label { flex: 1; }
    .nav-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--agpc-text-faint, #5c6480);
      background: rgba(255,255,255,0.06);
      border-radius: 999px;
      padding: 1px 7px;
    }
    .nav-item.active .nav-badge { color: var(--agpc-blue, #4f8cff); background: rgba(79,140,255,0.18); }

    .sidebar-footer {
      border-top: 1px solid var(--agpc-border, #232a41);
      padding-top: 12px;
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .protection-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 6px 4px;
      font-family: inherit;
    }
    .protection-text { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
    .protection-label { font-size: 12px; color: var(--agpc-text-dim, #8a92ab); }
    .protection-state { font-size: 12.5px; font-weight: 700; letter-spacing: 0.03em; }
    .protection-state.on { color: var(--agpc-green, #2ecc71); }
    .protection-state.off { color: var(--agpc-text-faint, #5c6480); }
    .switch {
      width: 34px;
      height: 20px;
      border-radius: 999px;
      background: rgba(255,255,255,0.1);
      position: relative;
      transition: background 0.15s ease;
      flex-shrink: 0;
    }
    .switch.on { background: var(--agpc-green, #2ecc71); }
    .knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: left 0.15s ease;
    }
    .switch.on .knob { left: 16px; }
    .home-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      color: var(--agpc-text-dim, #8a92ab);
      padding: 0 4px;
    }
    .home-status.sub { color: var(--agpc-text-faint, #5c6480); padding-left: 16px; font-size: 11px; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--agpc-green, #2ecc71); }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "agpc-sidebar": AgpcSidebar; }
}
