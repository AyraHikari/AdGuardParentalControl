import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Policy, PolicyRule, GlobalState } from "../data/websocket-api";

@customElement("policy-view")
export class PolicyView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public policy!: Policy;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  @state() private _showAddRule = false;
  @state() private _newRuleTarget = "";
  @state() private _newRuleAction: "block" | "allow" = "block";
  @state() private _newRuleType: "domain" | "service" | "category" = "domain";
  @state() private _showAddSchedule = false;
  @state() private _schedDays: string[] = ["mon", "tue", "wed", "thu", "fri"];
  @state() private _schedFrom = "08:00";
  @state() private _schedTo = "20:00";
  @state() private _showAddCalendar = false;
  @state() private _calEntity = "";
  @state() private _calMatch = "";
  @state() private _showDeleteConfirm = false;

  render() {
    if (!this.policy) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.policy.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${() => { this._showDeleteConfirm = true; }}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">Priority: ${this.policy.priority} - Profile: ${this._getProfileName()}</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm ? html`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete policy "${this.policy.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${() => { this._showDeleteConfirm = false; }}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deletePolicy}>Delete</mwc-button>
        </ha-dialog>
      ` : ""}

      <ha-card>
        <div class="card-header">
          <div class="name">Profile Template</div>
        </div>
        <div class="card-content">
          <div class="info-section">
            <p><strong>Current:</strong> ${this._getProfileName()}</p>
            <div class="add-row">
              <ha-select label="Assign profile" .value=${this.policy.profile_id || ""}
                @selected=${(e: any) => { if (e.detail.value !== undefined) this._assignProfile(e.detail.value); }}
              >
                <ha-list-item value="">None</ha-list-item>
                ${this.state.profiles.map((p) => html`
                  <ha-list-item value="${p.id}">${p.name}</ha-list-item>
                `)}
              </ha-select>
            </div>
          </div>
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Rules (${this.policy.rules.length})</div>
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
          ${this.policy.rules.length === 0
            ? html`<p class="empty">No rules defined</p>`
            : html`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.policy.rules.map((r, i) => html`
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

      <ha-card>
        <div class="card-header">
          <div class="name">Schedule</div>
          <ha-icon-button label="Edit Schedule"
            .path=${this.policy.time_schedule ? "M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z" : "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${() => { this._showAddSchedule = !this._showAddSchedule; }}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.policy.time_schedule && !this._showAddSchedule
            ? html`
                <div class="info-section">
                  <p><strong>Days:</strong> ${this.policy.time_schedule.days.join(", ") || "All"}</p>
                  <p><strong>Time:</strong> ${this.policy.time_schedule.time_from || "00:00"} - ${this.policy.time_schedule.time_to || "23:59"}</p>
                  <mwc-button label="Remove" @click=${this._removeSchedule}></mwc-button>
                </div>
              `
            : this._showAddSchedule
            ? this._renderScheduleForm()
            : html`<p class="empty">No schedule - active at all times</p>`}
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Calendar Condition</div>
          <ha-icon-button label="Edit Calendar"
            .path=${this.policy.calendar_condition ? "M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z" : "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${() => { this._showAddCalendar = !this._showAddCalendar; }}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.policy.calendar_condition && !this._showAddCalendar
            ? html`
                <div class="info-section">
                  <p><strong>Entity:</strong> ${this.policy.calendar_condition.calendar_entity || "None"}</p>
                  <p><strong>Match:</strong> ${this.policy.calendar_condition.event_match.join(", ") || "None"}</p>
                  <p><strong>Invert:</strong> ${this.policy.calendar_condition.invert ? "Yes" : "No"}</p>
                  <mwc-button label="Remove" @click=${this._removeCalendar}></mwc-button>
                </div>
              `
            : this._showAddCalendar
            ? this._renderCalendarForm()
            : html`<p class="empty">No calendar condition</p>`}
        </div>
      </ha-card>
    `;
  }

  private _renderScheduleForm() {
    const allDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return html`
      <div class="add-form">
        <div class="day-chips">
          ${allDays.map(d => html`
            <button class="chip ${this._schedDays.includes(d) ? "active" : ""}"
              @click=${() => this._toggleDay(d)}>${d}</button>
          `)}
        </div>
        <ha-textfield label="From (HH:MM)" .value=${this._schedFrom}
          @input=${(e: Event) => { this._schedFrom = (e.target as HTMLInputElement).value; }}
        ></ha-textfield>
        <ha-textfield label="To (HH:MM)" .value=${this._schedTo}
          @input=${(e: Event) => { this._schedTo = (e.target as HTMLInputElement).value; }}
        ></ha-textfield>
        <mwc-button raised label="Save Schedule" @click=${this._saveSchedule}></mwc-button>
        <mwc-button label="Cancel" @click=${() => { this._showAddSchedule = false; }}></mwc-button>
      </div>
    `;
  }

  private _renderCalendarForm() {
    return html`
      <div class="add-form">
        <ha-select label="Calendar Entity" .value=${this._calEntity}
          @selected=${(e: any) => { this._calEntity = e.detail.value; }}
        >
          ${this.state.calendar_entities.map(eid => html`
            <ha-list-item value="${eid}">${eid}</ha-list-item>
          `)}
        </ha-select>
        <ha-textfield label="Event keywords (comma-separated)" .value=${this._calMatch}
          @input=${(e: Event) => { this._calMatch = (e.target as HTMLInputElement).value; }}
        ></ha-textfield>
        <mwc-button raised label="Save Condition" @click=${this._saveCalendar}></mwc-button>
        <mwc-button label="Cancel" @click=${() => { this._showAddCalendar = false; }}></mwc-button>
      </div>
    `;
  }

  private _getProfileName(): string {
    if (!this.policy.profile_id) return "None";
    const p = this.state.profiles.find(pr => pr.id === this.policy.profile_id);
    return p?.name || this.policy.profile_id;
  }

  private _toggleDay(day: string) {
    this._schedDays = this._schedDays.includes(day)
      ? this._schedDays.filter(d => d !== day)
      : [...this._schedDays, day];
  }

  private async _addRule() {
    if (!this._newRuleTarget.trim()) return;
    const newRule: PolicyRule = {
      target: this._newRuleTarget.trim(),
      action: this._newRuleAction,
      rule_type: this._newRuleType,
    };
    const updated: Policy = { ...this.policy, rules: [...this.policy.rules, newRule] };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
    this._newRuleTarget = "";
    this._showAddRule = false;
  }

  private async _removeRule(index: number) {
    const rules = this.policy.rules.filter((_, i) => i !== index);
    const updated: Policy = { ...this.policy, rules };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
  }

  private async _saveSchedule() {
    const updated: Policy = {
      ...this.policy,
      time_schedule: { days: this._schedDays, time_from: this._schedFrom, time_to: this._schedTo },
    };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
    this._showAddSchedule = false;
  }

  private async _removeSchedule() {
    const updated: Policy = { ...this.policy, time_schedule: null };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
  }

  private async _saveCalendar() {
    const updated: Policy = {
      ...this.policy,
      calendar_condition: {
        calendar_entity: this._calEntity || null,
        event_match: this._calMatch.split(",").map(s => s.trim()).filter(Boolean),
        invert: false,
      },
    };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
    this._showAddCalendar = false;
  }

  private async _removeCalendar() {
    const updated: Policy = { ...this.policy, calendar_condition: null };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
  }

  private async _deletePolicy() {
    await this.hass.callWS({ type: "adguard_pc/policies/delete", policy_id: this.policy.id });
    this._showDeleteConfirm = false;
    this.onNavigate?.("dashboard");
  }

  private async _assignProfile(profileId: string) {
    const updated: Policy = { ...this.policy, profile_id: profileId || null };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this.policy = updated;
  }

  private _handleDeleteDialog() { this._showDeleteConfirm = false; }

  static styles = css`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .target-cell { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.85em; }
    .action-block { color: var(--error-color, #f44336); font-weight: 500; }
    .action-allow { color: var(--success-color, #4caf50); font-weight: 500; }
    .empty { color: var(--secondary-text-color); font-style: italic; }
    .add-form { padding: 12px 0; display: flex; flex-direction: column; gap: 8px; }
    .day-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip { padding: 6px 12px; border-radius: 16px; border: 1px solid var(--divider-color, #e0e0e0); background: transparent; cursor: pointer; font-size: 0.85em; }
    .chip.active { background: var(--primary-color, #03a9f4); color: white; border-color: var(--primary-color, #03a9f4); }
    .info-section p { margin: 4px 0; }
    .add-row { margin-top: 8px; }
    ha-select { width: 100%; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "policy-view": PolicyView; }
}
