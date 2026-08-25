import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AdguardWebsocketApi, GlobalState, Client, Policy, Group, Member, Profile } from "./data/websocket-api";
import { themeVars } from "./styles/theme";
import "./components/sidebar";
import "./components/topbar";
import "./views/dashboard-view";
import "./views/client-view";
import "./views/policy-view";
import "./views/override-view";
import "./views/group-view";
import "./views/member-view";
import "./views/profile-view";
import "./views/list-view";
import "./views/placeholder-view";

type ViewType =
  | "dashboard"
  | "client-detail"
  | "policy-detail"
  | "override"
  | "group-detail"
  | "member-detail"
  | "profile-detail"
  | "groups"
  | "members"
  | "clients"
  | "policies"
  | "profiles"
  | "schedules"
  | "services"
  | "logs"
  | "settings";

const PLACEHOLDER_INFO: Record<string, { title: string; description: string }> = {
  schedules: {
    title: "Schedules",
    description: "Dedicated schedule management is coming soon. For now, schedules can be attached to a policy from its detail page.",
  },
  services: { title: "Services", description: "A catalog of blockable services will show up here in a future update." },
  logs: { title: "Logs", description: "Query and activity logs will appear here once log streaming is wired up." },
  settings: { title: "Settings", description: "Integration and sync settings will be available here soon." },
};

@customElement("adguard-parental-control")
export class AdguardPanel extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _view: ViewType = "dashboard";
  @state() private _state: GlobalState | null = null;
  @state() private _selectedClient: Client | null = null;
  @state() private _selectedPolicy: Policy | null = null;
  @state() private _selectedGroup: Group | null = null;
  @state() private _selectedMember: Member | null = null;
  @state() private _selectedProfile: Profile | null = null;
  @state() private _loading = true;
  @state() private _syncing = false;
  @state() private _protectionEnabled = true;
  @state() private _lastSync: string | null = null;

  private _api: AdguardWebsocketApi | null = null;

  updated(changed: PropertyValues) {
    if (changed.has("hass") && this.hass && !this._api) {
      this._api = new AdguardWebsocketApi(this.hass);
      this._loadState();
    }
  }

  private async _loadState() {
    if (!this._api) return;
    try {
      this._state = await this._api.getState();
      this._lastSync = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (err) {
      console.error("Failed to load state:", err);
    } finally {
      this._loading = false;
    }
  }

  private _navigate = (view: string, detail?: any) => {
    this._view = view as ViewType;
    if (view === "client-detail" && detail) this._selectedClient = detail;
    if (view === "policy-detail" && detail) this._selectedPolicy = detail;
    if (view === "group-detail" && detail) this._selectedGroup = detail;
    if (view === "member-detail" && detail) this._selectedMember = detail;
    if (view === "profile-detail" && detail) this._selectedProfile = detail;
    this._loadState();
    this.requestUpdate();
  };

  private _sync = async () => {
    if (!this.hass || this._syncing) return;
    this._syncing = true;
    try {
      await this.hass.callWS({ type: "adguard_pc/sync" });
      await this._loadState();
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      this._syncing = false;
    }
  };

  render() {
    if (this._loading) {
      return html`
        <div class="shell">
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading AdGuard Parental Control…</p>
          </div>
        </div>
      `;
    }

    if (!this._state) {
      return html`
        <div class="shell">
          <div class="loading">
            <p>Failed to load state. Check your AdGuard Home connection.</p>
          </div>
        </div>
      `;
    }

    const isDetail = this._view.endsWith("-detail") || this._view === "override";

    return html`
      <div class="shell">
        <agpc-sidebar
          .activeView=${this._view}
          .state=${this._state}
          .protectionEnabled=${this._protectionEnabled}
          .onNavigate=${(v: string) => this._navigate(v)}
          .onToggleProtection=${() => { this._protectionEnabled = !this._protectionEnabled; }}
        ></agpc-sidebar>
        <div class="main">
          <agpc-topbar
            .title=${this._viewTitle}
            .showBack=${isDetail}
            .lastSync=${this._view === "dashboard" ? this._lastSync : null}
            .syncing=${this._syncing}
            .onBack=${() => this._navigate("dashboard")}
            .onRefresh=${this._sync}
          ></agpc-topbar>
          <div class="content">${this._renderContent()}</div>
        </div>
      </div>
    `;
  }

  private get _viewTitle(): string {
    switch (this._view) {
      case "client-detail":
        return this._selectedClient?.name || "Client";
      case "policy-detail":
        return this._selectedPolicy?.name || "Policy";
      case "group-detail":
        return this._selectedGroup?.name || "Group";
      case "member-detail":
        return this._selectedMember?.name || "Member";
      case "profile-detail":
        return this._selectedProfile?.name || "Profile";
      case "override":
        return "Overrides";
      case "groups":
        return "Groups";
      case "members":
        return "Members";
      case "clients":
        return "Clients";
      case "policies":
        return "Policies";
      case "profiles":
        return "Profiles";
      case "schedules":
        return "Schedules";
      case "services":
        return "Services";
      case "logs":
        return "Logs";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  }

  private _renderContent() {
    switch (this._view) {
      case "dashboard":
        return html`<dashboard-view .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`;
      case "client-detail":
        return html`<client-view .state=${this._state!} .hass=${this.hass} .client=${this._selectedClient!} .onNavigate=${this._navigate}></client-view>`;
      case "policy-detail":
        return html`<policy-view .state=${this._state!} .hass=${this.hass} .policy=${this._selectedPolicy!} .onNavigate=${this._navigate}></policy-view>`;
      case "group-detail":
        return html`<group-view .state=${this._state!} .hass=${this.hass} .group=${this._selectedGroup!} .onNavigate=${this._navigate}></group-view>`;
      case "member-detail":
        return html`<member-view .state=${this._state!} .hass=${this.hass} .member=${this._selectedMember!} .onNavigate=${this._navigate}></member-view>`;
      case "profile-detail":
        return html`<profile-view .state=${this._state!} .hass=${this.hass} .profile=${this._selectedProfile!} .onNavigate=${this._navigate}></profile-view>`;
      case "override":
        return html`<override-view .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></override-view>`;
      case "groups":
        return html`<list-view kind="groups" .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></list-view>`;
      case "members":
        return html`<list-view kind="members" .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></list-view>`;
      case "clients":
        return html`<list-view kind="clients" .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></list-view>`;
      case "policies":
        return html`<list-view kind="policies" .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></list-view>`;
      case "profiles":
        return html`<list-view kind="profiles" .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></list-view>`;
      case "schedules":
      case "services":
      case "logs":
      case "settings": {
        const info = PLACEHOLDER_INFO[this._view];
        return html`<placeholder-view .title=${info.title} .description=${info.description}></placeholder-view>`;
      }
      default:
        return html`<dashboard-view .state=${this._state!} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`;
    }
  }

  static styles = [
    themeVars,
    css`
      .shell {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        height: 100%;
      }
      .content {
        flex: 1;
        overflow-y: auto;
      }
      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 16px;
        color: var(--agpc-text-dim);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid var(--agpc-border);
        border-top-color: var(--agpc-blue);
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "adguard-parental-control": AdguardPanel;
  }
}
