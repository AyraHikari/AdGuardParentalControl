import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile, Group, Member, Client, Policy, GlobalState } from "../data/websocket-api";

@customElement("dashboard-view")
export class DashboardView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  @state() private _showAddPolicy = false;
  @state() private _newPolicyName = "";
  @state() private _showAddClient = false;
  @state() private _newClientName = "";
  @state() private _newClientId = "";
  @state() private _showAddProfile = false;
  @state() private _newProfileName = "";
  @state() private _showAddGroup = false;
  @state() private _newGroupName = "";
  @state() private _showAddMember = false;
  @state() private _newMemberName = "";
  @state() private _syncing = false;

  render() {
    if (!this.state) return html``;

    return html`
      <!-- Active Policy Card -->
      <ha-card class="active-policy-card">
        <div class="card-header">
          <div class="name">Active Policy</div>
          <div class="actions">
            <mwc-button raised label="Sync Now" @click=${this._syncNow} .disabled=${this._syncing}>
              ${this._syncing ? "Syncing..." : "Sync Now"}
            </mwc-button>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-row">
            <span class="stat-label">Policies</span>
            <span class="stat-value">${this.state.policies.length}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Clients</span>
            <span class="stat-value">${this.state.clients.length}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Active Overrides</span>
            <span class="stat-value">${this.state.overrides.length}</span>
          </div>
        </div>
      </ha-card>

      <!-- Policies Section -->
      <div class="section-header">
        <h2>Policies</h2>
        <ha-icon-button label="Add Policy"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${() => { this._showAddPolicy = !this._showAddPolicy; }}
        ></ha-icon-button>
      </div>
      ${this._showAddPolicy ? html`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Policy name" .value=${this._newPolicyName}
                @input=${(e: Event) => { this._newPolicyName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._createPolicy(); }}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createPolicy}
                .disabled=${!this._newPolicyName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      ` : ""}
      <div class="card-grid">
        ${this.state.policies.map(
          (p) => html`
            <ha-card class="clickable" @click=${() => this.onNavigate?.("policy-detail", p)}>
              <div class="card-header">
                <div class="name">${p.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
                    @click=${(e: Event) => { e.stopPropagation(); this._deletePolicy(p); }}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">Priority ${p.priority} - ${p.rules.length} rules${p.profile_id ? " - " + this._getProfileName(p.profile_id) : ""}</p>
              </div>
            </ha-card>
          `
        )}
      </div>

      <!-- Profiles Section -->
      <div class="section-header">
        <h2>Profiles</h2>
        <ha-icon-button label="Add Profile"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${() => { this._showAddProfile = !this._showAddProfile; }}
        ></ha-icon-button>
      </div>
      ${this._showAddProfile ? html`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Profile name" .value=${this._newProfileName}
                @input=${(e: Event) => { this._newProfileName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._createProfile(); }}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createProfile}
                .disabled=${!this._newProfileName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      ` : ""}
      <div class="card-grid">
        ${this.state.profiles.map(
          (p) => html`
            <ha-card class="clickable" @click=${() => this.onNavigate?.("profile-detail", p)}>
              <div class="card-header">
                <div class="name">${p.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${(e: Event) => { e.stopPropagation(); this._deleteProfile(p); }}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${p.rules.length} rules - ${p.default_action}</p>
              </div>
            </ha-card>
          `
        )}
      </div>

      <!-- Clients Section -->
      <div class="section-header">
        <h2>Clients</h2>
        <ha-icon-button label="Add Client"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${() => { this._showAddClient = !this._showAddClient; }}
        ></ha-icon-button>
      </div>
      ${this._showAddClient ? html`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Client name" .value=${this._newClientName}
                @input=${(e: Event) => { this._newClientName = (e.target as HTMLInputElement).value; }}
              ></ha-textfield>
              <ha-textfield label="IP / ID (optional)" .value=${this._newClientId}
                @input=${(e: Event) => { this._newClientId = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._createClient(); }}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createClient}
                .disabled=${!this._newClientName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      ` : ""}
      <div class="card-grid">
        ${this.state.clients.map(
          (c) => html`
            <ha-card class="clickable" @click=${() => this.onNavigate?.("client-detail", c)}>
              <div class="card-header">
                <div class="name">${c.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${(e: Event) => { e.stopPropagation(); this._deleteClient(c); }}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <div class="id-list">
                  ${c.ids.length === 0 ? html`<span class="empty">No IDs</span>` : c.ids.map((id) => html`<span class="id-badge">${id}</span>`)}
                </div>
              </div>
            </ha-card>
          `
        )}
      </div>

      <!-- Groups Section -->
      <div class="section-header">
        <h2>Groups</h2>
        <ha-icon-button label="Add Group"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${() => { this._showAddGroup = !this._showAddGroup; }}
        ></ha-icon-button>
      </div>
      ${this._showAddGroup ? html`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Group name" .value=${this._newGroupName}
                @input=${(e: Event) => { this._newGroupName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._createGroup(); }}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createGroup}
                .disabled=${!this._newGroupName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      ` : ""}
      <div class="card-grid">
        ${this.state.groups.length === 0 ? html`<p class="empty">No groups configured</p>` : ""}
        ${this.state.groups.map(
          (g) => html`
            <ha-card class="clickable" @click=${() => this.onNavigate?.("group-detail", g)}>
              <div class="card-header">
                <div class="name">${g.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${(e: Event) => { e.stopPropagation(); this._deleteGroup(g); }}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${g.member_names.length} members - ${g.client_names.length} clients</p>
              </div>
            </ha-card>
          `
        )}
      </div>

      <!-- Members Section -->
      <div class="section-header">
        <h2>Members</h2>
        <ha-icon-button label="Add Member"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${() => { this._showAddMember = !this._showAddMember; }}
        ></ha-icon-button>
      </div>
      ${this._showAddMember ? html`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Member name" .value=${this._newMemberName}
                @input=${(e: Event) => { this._newMemberName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._createMember(); }}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createMember}
                .disabled=${!this._newMemberName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      ` : ""}
      <div class="card-grid">
        ${this.state.members.length === 0 ? html`<p class="empty">No members configured</p>` : ""}
        ${this.state.members.map(
          (m) => html`
            <ha-card class="clickable" @click=${() => this.onNavigate?.("member-detail", m)}>
              <div class="card-header">
                <div class="name">${m.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${(e: Event) => { e.stopPropagation(); this._deleteMember(m); }}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${m.client_names.length} clients - ${m.assigned_policy_ids.length} policies</p>
              </div>
            </ha-card>
          `
        )}
      </div>

      <!-- Overrides Section -->
      <div class="section-header">
        <h2>Overrides</h2>
        <mwc-button raised label="Manage" @click=${() => this.onNavigate?.("override")}></mwc-button>
      </div>
      <ha-card>
        <div class="card-content">
          ${this.state.overrides.length === 0
            ? html`<p class="empty">No active overrides</p>`
            : html`
                <table class="data-table">
                  <thead><tr><th>Target</th><th>Action</th><th>Expires</th><th></th></tr></thead>
                  <tbody>
                    ${this.state.overrides.map((o) => html`
                      <tr>
                        <td>${o.target} <span class="badge">${o.target_type}</span></td>
                        <td><span class="badge">${o.action}</span></td>
                        <td>${o.expires ? new Date(o.expires).toLocaleTimeString() : "\u221e"}</td>
                        <td>
                          <ha-icon-button label="Clear"
                            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                            @click=${() => this._clearOverride(o.id)}
                          ></ha-icon-button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `;
  }

  private _getProfileName(profileId: string): string {
    const p = this.state.profiles.find(pr => pr.id === profileId);
    return p?.name || profileId;
  }

  // ── Sync ──────────────────────────────────────────────────

  private async _syncNow() {
    this._syncing = true;
    try {
      await this.hass.callWS({ type: "adguard_pc/sync" });
      this.onNavigate?.("dashboard");
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      this._syncing = false;
    }
  }

  // ── Create ────────────────────────────────────────────────

  private async _createPolicy() {
    if (!this._newPolicyName.trim()) return;
    await this.hass.callWS({
      type: "adguard_pc/policies/create",
      policy: { name: this._newPolicyName.trim(), rules: [], priority: 0 },
    });
    this._newPolicyName = "";
    this._showAddPolicy = false;
    this._reloadState();
  }

  private async _createClient() {
    if (!this._newClientName.trim()) return;
    await this.hass.callWS({
      type: "adguard_pc/clients/create",
      client: {
        name: this._newClientName.trim(),
        ids: this._newClientId.trim() ? [this._newClientId.trim()] : [],
        assigned_policy_ids: [],
        exceptions: [],
      },
    });
    this._newClientName = "";
    this._newClientId = "";
    this._showAddClient = false;
    this._reloadState();
  }

  private async _createProfile() {
    if (!this._newProfileName.trim()) return;
    await this.hass.callWS({
      type: "adguard_pc/profiles/create",
      profile: { name: this._newProfileName.trim(), rules: [], default_action: "block" },
    });
    this._newProfileName = "";
    this._showAddProfile = false;
    this._reloadState();
  }

  private async _createGroup() {
    if (!this._newGroupName.trim()) return;
    await this.hass.callWS({
      type: "adguard_pc/groups/create",
      group: { name: this._newGroupName.trim(), member_names: [], client_names: [], assigned_policy_ids: [] },
    });
    this._newGroupName = "";
    this._showAddGroup = false;
    this._reloadState();
  }

  private async _createMember() {
    if (!this._newMemberName.trim()) return;
    await this.hass.callWS({
      type: "adguard_pc/members/create",
      member: { name: this._newMemberName.trim(), client_names: [], assigned_policy_ids: [], exceptions: [] },
    });
    this._newMemberName = "";
    this._showAddMember = false;
    this._reloadState();
  }

  private async _reloadState() {
    try {
      this.state = await this.hass.callWS({ type: "adguard_pc/state/get" });
    } catch (err) {
      console.error("Failed to reload state:", err);
    }
  }

  // ── Delete ────────────────────────────────────────────────

  private async _deleteProfile(p: Profile) {
    await this.hass.callWS({ type: "adguard_pc/profiles/delete", profile_id: p.id });
    this._reloadState();
  }

  private async _deleteGroup(g: Group) {
    await this.hass.callWS({ type: "adguard_pc/groups/delete", group_id: g.id });
    this._reloadState();
  }

  private async _deleteMember(m: Member) {
    await this.hass.callWS({ type: "adguard_pc/members/delete", member_id: m.id });
    this._reloadState();
  }

  private async _deleteClient(c: Client) {
    await this.hass.callWS({ type: "adguard_pc/clients/delete", client_id: c.name });
    this._reloadState();
  }

  private async _deletePolicy(p: Policy) {
    await this.hass.callWS({ type: "adguard_pc/policies/delete", policy_id: p.id });
    this._reloadState();
  }

  private async _clearOverride(overrideId: string) {
    await this.hass.callWS({ type: "adguard_pc/overrides/clear", override_id: overrideId });
    this._reloadState();
  }

  static styles = css`
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin: 20px 0 8px; }
    h2 { font-size: 1.2em; font-weight: 500; margin: 0; }
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .card-meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .actions { display: flex; gap: 4px; }
    .clickable { cursor: pointer; }
    .clickable:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
    .active-policy-card { border-left: 4px solid var(--success-color, #4caf50); }
    .stat-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .stat-label { color: var(--secondary-text-color); }
    .stat-value { font-weight: 500; }
    .id-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .id-badge { padding: 3px 8px; background: var(--code-editor-background-color, #f5f5f5); border-radius: 4px; font-size: 0.85em; font-family: var(--code-font-family, monospace); }
    .add-form { padding: 8px 0; display: flex; flex-direction: column; gap: 8px; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.8em; }
    .empty { color: var(--secondary-text-color); font-style: italic; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "dashboard-view": DashboardView; }
}
