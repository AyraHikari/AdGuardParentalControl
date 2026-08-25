import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile, PolicyRule, GlobalState } from "../data/websocket-api";

@customElement("profile-view")
export class ProfileView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public profile!: Profile;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _showAddRule = false;
  @state() private _newRuleTarget = "";
  @state() private _newRuleAction: "block" | "allow" = "block";
  @state() private _newRuleType: "domain" | "service" | "category" = "domain";
  @state() private _showDeleteConfirm = false;

  render() {
    if (!this.profile) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.profile.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${() => { this._showDeleteConfirm = true; }}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <div class="meta-row">
            <span class="meta">Default: <strong>${this.profile.default_action}</strong></span>
            <mwc-button dense label="Toggle Default" @click=${this._toggleDefault}></mwc-button>
          </div>
        </div>
      </ha-card>

      ${this._showDeleteConfirm ? html`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete profile "${this.profile.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${() => { this._showDeleteConfirm = false; }}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteProfile}>Delete</mwc-button>
        </ha-dialog>
      ` : ""}

      <!-- Rules -->
      <ha-card>
        <div class="card-header">
          <div class="name">Rules (${this.profile.rules.length})</div>
          <ha-icon-button label="Add Rule"
            .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${() => { this._showAddRule = !this._showAddRule; }}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this._showAddRule ? html`
            <div class="add-form">
              <ha-textfield label="Target (domain)" .value=${this._newRuleTarget}
                @input=${(e: Event) => { this._newRuleTarget = (e.target as HTMLInputElement).value; }}
              ></ha-textfield>
              <ha-select label="Action" .value=${this._newRuleAction}
                @selected=${(e: any) => { this._newRuleAction = e.detail.value; }}
              >
                <ha-list-item value="block">Block</ha-list-item>
                <ha-list-item value="allow">Allow</ha-list-item>
              </ha-select>
              <ha-select label="Type" .value=${this._newRuleType}
                @selected=${(e: any) => { this._newRuleType = e.detail.value; }}
              >
                <ha-list-item value="domain">Domain</ha-list-item>
                <ha-list-item value="service">Service</ha-list-item>
                <ha-list-item value="category">Category</ha-list-item>
              </ha-select>
              <mwc-button raised label="Add" @click=${this._addRule} .disabled=${!this._newRuleTarget.trim()}></mwc-button>
            </div>
          ` : ""}
          ${this.profile.rules.length === 0
            ? html`<p class="empty">No rules defined</p>`
            : html`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.profile.rules.map((r, i) => html`
                      <tr>
                        <td><span class="badge">${r.rule_type}</span></td>
                        <td class="target-cell">${r.target}</td>
                        <td><span class=${r.action === "block" ? "action-block" : "action-allow"}>${r.action}</span></td>
                        <td>
                          <ha-icon-button label="Remove"
                            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                            @click=${() => this._removeRule(i)}
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

  private _handleDeleteDialog() { this._showDeleteConfirm = false; }

  private async _toggleDefault() {
    const newAction = this.profile.default_action === "block" ? "allow" : "block";
    const updated: Profile = { ...this.profile, default_action: newAction as "block" | "allow" };
    await this.hass.callWS({ type: "adguard_pc/profiles/update", profile: updated });
    this.profile = updated;
    this.onStateChanged?.();
  }

  private async _addRule() {
    if (!this._newRuleTarget.trim()) return;
    const newRule: PolicyRule = {
      target: this._newRuleTarget.trim(),
      action: this._newRuleAction,
      rule_type: this._newRuleType,
    };
    const updated: Profile = { ...this.profile, rules: [...this.profile.rules, newRule] };
    await this.hass.callWS({ type: "adguard_pc/profiles/update", profile: updated });
    this.profile = updated;
    this._newRuleTarget = "";
    this._showAddRule = false;
    this.onStateChanged?.();
  }

  private async _removeRule(index: number) {
    const rules = this.profile.rules.filter((_, i) => i !== index);
    const updated: Profile = { ...this.profile, rules };
    await this.hass.callWS({ type: "adguard_pc/profiles/update", profile: updated });
    this.profile = updated;
    this.onStateChanged?.();
  }

  private async _deleteProfile() {
    await this.hass.callWS({ type: "adguard_pc/profiles/delete", profile_id: this.profile.id });
    this._showDeleteConfirm = false;
    this.onStateChanged?.();
    this.onNavigate?.("dashboard");
  }

  static styles = css`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta-row { display: flex; justify-content: space-between; align-items: center; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .target-cell { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.85em; }
    .action-block { color: var(--error-color, #f44336); font-weight: 500; }
    .action-allow { color: var(--success-color, #4caf50); font-weight: 500; }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-form { padding: 12px 0; display: flex; flex-direction: column; gap: 8px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "profile-view": ProfileView; }
}
