import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GlobalState, Override, Client, Member } from "../data/websocket-api";

@customElement("override-view")
export class OverrideView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _selectedTarget = "";
  @state() private _selectedTargetType: "client" | "member" = "client";
  @state() private _selectedAction = "allow_all";
  @state() private _selectedDuration = "30";

  render() {
    if (!this.state) return html``;

    const targets = this._selectedTargetType === "client"
      ? this.state.clients
      : this.state.members;

    return html`
      <!-- New Override Form -->
      <ha-card>
        <div class="card-header">
          <div class="name">New Override</div>
        </div>
        <div class="card-content">
          <ha-select
            label="Target Type"
            .value=${this._selectedTargetType}
            @change=${(e: any) => {
              this._selectedTargetType = (e.target as HTMLSelectElement).value as any;
              this._selectedTarget = "";
            }}
          >
            <ha-list-item value="client">Client</ha-list-item>
            <ha-list-item value="member">Member</ha-list-item>
          </ha-select>

          <ha-select
            label="Target"
            .value=${this._selectedTarget}
            @change=${(e: any) => { this._selectedTarget = (e.target as HTMLSelectElement).value; }}
          >
            ${this._selectedTargetType === "client"
              ? this.state.clients.map(
                  (c: Client) => html`<ha-list-item value="${c.name}">${c.name}</ha-list-item>`
                )
              : this.state.members.map(
                  (m: Member) => html`<ha-list-item value="${m.name}">${m.name}</ha-list-item>`
                )}
          </ha-select>

          <ha-select
            label="Action"
            .value=${this._selectedAction}
            @change=${(e: any) => { this._selectedAction = (e.target as HTMLSelectElement).value; }}
          >
            <ha-list-item value="allow_all">Allow All</ha-list-item>
            <ha-list-item value="block_all">Block All</ha-list-item>
          </ha-select>

          <ha-select
            label="Duration"
            .value=${this._selectedDuration}
            @change=${(e: any) => { this._selectedDuration = (e.target as HTMLSelectElement).value; }}
          >
            <ha-list-item value="15">15 minutes</ha-list-item>
            <ha-list-item value="30">30 minutes</ha-list-item>
            <ha-list-item value="60">1 hour</ha-list-item>
            <ha-list-item value="120">2 hours</ha-list-item>
            <ha-list-item value="240">4 hours</ha-list-item>
            <ha-list-item value="480">8 hours</ha-list-item>
          </ha-select>

          <div class="form-actions">
            <button
              class="btn btn-primary"
              @click=${this._applyOverride}
              ?disabled=${!this._selectedTarget}
            >Apply Override</button>
          </div>
        </div>
      </ha-card>

      <!-- Active Overrides List -->
      <ha-card>
        <div class="card-header">
          <div class="name">Active Overrides</div>
        </div>
        <div class="card-content">
          ${this.state.overrides.length === 0
            ? html`<p class="empty">No active overrides</p>`
            : html`
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Target</th>
                      <th>Action</th>
                      <th>Expires</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.state.overrides.map(
                      (o: Override) => html`
                        <tr>
                          <td>${o.target} <span class="badge">${o.target_type}</span></td>
                          <td><span class="badge">${o.action}</span></td>
                          <td>${o.expires ? new Date(o.expires).toLocaleTimeString() : "∞"}</td>
                          <td>
                            <ha-icon-button
                              label="Clear"
                              .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                              @click=${() => this._clearOverride(o.id)}
                            ></ha-icon-button>
                          </td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `;
  }

  private async _applyOverride() {
    if (!this._selectedTarget) return;
    try {
      await this.hass.callWS({
        type: "adguard_pc/overrides/set",
        target: this._selectedTarget,
        target_type: this._selectedTargetType,
        action: this._selectedAction,
        duration_minutes: parseInt(this._selectedDuration, 10),
      });
      this._selectedTarget = "";
      this.onStateChanged?.();
      this.onNavigate?.("override");
    } catch (err) {
      console.error("Failed to set override:", err);
    }
  }

  private async _clearOverride(overrideId: string) {
    try {
      await this.hass.callWS({
        type: "adguard_pc/overrides/clear",
        override_id: overrideId,
      });
      this.onStateChanged?.();
      this.onNavigate?.("override");
    } catch (err) {
      console.error("Failed to clear override:", err);
    }
  }

  static styles = css`
    ha-card {
      margin-bottom: 8px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
    }
    .name {
      font-weight: 500;
      font-size: 1.05em;
    }
    .card-content {
      padding: 0 16px 16px;
    }
    ha-select {
      display: block;
      margin-bottom: 12px;
    }
    .form-actions {
      margin-top: 16px;
      text-align: right;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th,
    .data-table td {
      padding: 10px 8px;
      text-align: left;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .data-table th {
      font-weight: 500;
      color: var(--secondary-text-color);
      font-size: 0.85em;
      text-transform: uppercase;
    }
    .badge {
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--code-editor-background-color, #f5f5f5);
      font-size: 0.8em;
    }
    .empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }
    .btn {
      display: inline-flex; align-items: center; padding: 8px 16px;
      border-radius: 8px; border: 1px solid var(--divider-color, #333);
      background: var(--card-background-color, #2a2a2a); color: var(--primary-text-color, #eee);
      cursor: pointer; font-size: 13px;
    }
    .btn:hover { background: var(--secondary-background-color, #333); }
    .btn:disabled { opacity: 0.4; cursor: default; }
    .btn-primary { background: var(--primary-color, #03a9f4); color: #fff; border-color: var(--primary-color, #03a9f4); }
    .btn-primary:hover { opacity: 0.9; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "override-view": OverrideView;
  }
}
