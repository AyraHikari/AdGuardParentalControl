import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Client, GlobalState } from "../data/websocket-api";

@customElement("client-view")
export class ClientView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public client!: Client;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  @state() private _newException = "";
  @state() private _showDeleteConfirm = false;

  render() {
    if (!this.client) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.client.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${() => { this._showDeleteConfirm = true; }}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <div class="identity">
            ${this.client.ids.map((id) => html`<span class="id-badge">${id}</span>`)}
          </div>
        </div>
      </ha-card>

      ${this._showDeleteConfirm ? html`
        <ha-dialog open @closed=${() => { this._showDeleteConfirm = false; }}>
          <p>Delete client "${this.client.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${() => { this._showDeleteConfirm = false; }}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteClient}>Delete</mwc-button>
        </ha-dialog>
      ` : ""}

      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.client.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.client.assigned_policy_ids.length === 0
            ? html`<p class="empty">No policies assigned</p>`
            : this.client.assigned_policy_ids.map((pid) => {
                const policy = this.state.policies.find((p) => p.id === pid);
                return html`
                  <div class="list-item">
                    <span class="item-text clickable" @click=${() => this.onNavigate?.("policy-detail", policy)}>
                      ${policy?.name || pid}
                      <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                    </span>
                    <ha-icon-button label="Unassign"
                      .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                      @click=${() => this._removePolicy(pid)}
                    ></ha-icon-button>
                  </div>
                `;
              })}
          <div class="add-row">
            <ha-select label="Assign policy" .value=${""}
              @selected=${(e: any) => {
                if (e.detail.value) this._addPolicy(e.detail.value);
              }}
            >
              ${this.state.policies
                .filter((p) => !this.client.assigned_policy_ids.includes(p.id))
                .map((p) => html`<ha-list-item value="${p.id}">${p.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Exceptions (${this.client.exceptions.length})</div>
        </div>
        <div class="card-content">
          ${this.client.exceptions.map(
            (ex, i) => html`
              <div class="list-item">
                <span class="exception-text">${ex}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${() => this._removeException(i)}
                ></ha-icon-button>
              </div>
            `
          )}
          <div class="add-row">
            <ha-textfield label="Add exception domain" .value=${this._newException}
              @input=${(e: Event) => { this._newException = (e.target as HTMLInputElement).value; }}
              @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._addException(); }}
            ></ha-textfield>
            <ha-icon-button label="Add"
              .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
              @click=${this._addException}
            ></ha-icon-button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private async _addException() {
    if (!this._newException.trim()) return;
    const updated: Client = {
      ...this.client,
      exceptions: [...this.client.exceptions, this._newException.trim()],
    };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
    this._newException = "";
  }

  private async _removeException(index: number) {
    const exceptions = this.client.exceptions.filter((_, i) => i !== index);
    const updated: Client = { ...this.client, exceptions };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
  }

  private async _addPolicy(id: string) {
    if (!id || this.client.assigned_policy_ids.includes(id)) return;
    const updated: Client = { ...this.client, assigned_policy_ids: [...this.client.assigned_policy_ids, id] };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
  }

  private async _removePolicy(id: string) {
    const updated: Client = { ...this.client, assigned_policy_ids: this.client.assigned_policy_ids.filter((p) => p !== id) };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
  }

  private async _deleteClient() {
    await this.hass.callWS({ type: "adguard_pc/clients/delete", client_id: this.client.name });
    this._showDeleteConfirm = false;
    this.onNavigate?.("dashboard");
  }

  static styles = css`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .identity { display: flex; gap: 8px; flex-wrap: wrap; }
    .id-badge { padding: 4px 10px; background: var(--code-editor-background-color, #f5f5f5); border-radius: 6px; font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; }
    .add-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    ha-textfield { flex: 1; }
    ha-select { width: 100%; margin-top: 8px; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "client-view": ClientView; }
}
