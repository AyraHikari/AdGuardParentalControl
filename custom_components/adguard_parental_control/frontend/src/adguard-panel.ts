import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AdguardWebsocketApi, GlobalState, Client, Policy, Group, Member, Profile } from "./data/websocket-api";

type ViewType = "dashboard" | "client-detail" | "policy-detail" | "override" | "group-detail" | "member-detail" | "profile-detail";

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
    if (view === "dashboard" || view === "override") {
      this._loadState();
    }
    this.requestUpdate();
  };

  render() {
    if (this._loading) {
      return html`
        <ha-card>
          <div class="loading">
            <ha-progress-spinner></ha-progress-spinner>
            <p>Loading AdGuard Parental Control...</p>
          </div>
        </ha-card>
      `;
    }

    if (!this._state) {
      return html`
        <ha-card>
          <div class="loading">
            <p>Failed to load state. Check your AdGuard Home connection.</p>
          </div>
        </ha-card>
      `;
    }

    return html`
      <hass-subpage .hass=${this.hass} .narrow=${false} .header=${this._viewTitle}>
        ${this._view !== "dashboard"
          ? html`
              <ha-icon-button
                slot="toolbar-icon"
                label="Back"
                .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
                @click=${() => this._navigate("dashboard")}
              ></ha-icon-button>
            `
          : nothing}
        ${this._renderContent()}
      </hass-subpage>
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
      default:
        return "Parental Control";
    }
  }

  private _renderContent() {
    switch (this._view) {
      case "dashboard":
        return html`<dashboard-view
          .state=${this._state!}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></dashboard-view>`;
      case "client-detail":
        return html`<client-view
          .state=${this._state!}
          .hass=${this.hass}
          .client=${this._selectedClient!}
          .onNavigate=${this._navigate}
        ></client-view>`;
      case "policy-detail":
        return html`<policy-view
          .state=${this._state!}
          .hass=${this.hass}
          .policy=${this._selectedPolicy!}
          .onNavigate=${this._navigate}
        ></policy-view>`;
      case "group-detail":
        return html`<group-view
          .state=${this._state!}
          .hass=${this.hass}
          .group=${this._selectedGroup!}
          .onNavigate=${this._navigate}
        ></group-view>`;
      case "member-detail":
        return html`<member-view
          .state=${this._state!}
          .hass=${this.hass}
          .member=${this._selectedMember!}
          .onNavigate=${this._navigate}
        ></member-view>`;
      case "profile-detail":
        return html`<profile-view
          .state=${this._state!}
          .hass=${this.hass}
          .profile=${this._selectedProfile!}
          .onNavigate=${this._navigate}
        ></profile-view>`;
      case "override":
        return html`<override-view
          .state=${this._state!}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></override-view>`;
      default:
        return html`<dashboard-view
          .state=${this._state!}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></dashboard-view>`;
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      gap: 16px;
    }
    ha-progress-spinner {
      --mdc-spinner-size: 48px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "adguard-parental-control": AdguardPanel;
  }
}
