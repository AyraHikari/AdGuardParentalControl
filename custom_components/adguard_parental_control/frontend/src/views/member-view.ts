import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Member, GlobalState } from "../data/websocket-api";

@customElement("member-view")
export class MemberView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public member!: Member;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  @state() private _newException = "";
  @state() private _showDeleteConfirm = false;

  render() {
    if (!this.member) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.member.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${() => { this._showDeleteConfirm = true; }}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">${this.member.client_names.length} clients · ${this.member.assigned_policy_ids.length} policies · ${this.member.exceptions.length} exceptions</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm ? html`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete member "${this.member.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${() => { this._showDeleteConfirm = false; }}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteMember}>Delete</mwc-button>
        </ha-dialog>
      ` : ""}

      <!-- Clients -->
      <ha-card>
        <div class="card-header">
          <div class="name">Clients (${this.member.client_names.length})</div>
        </div>
        <div class="card-content">
          ${this.member.client_names.length === 0 ? html`<p class="empty">No clients assigned</p>` : ""}
          ${this.member.client_names.map(
            (cn) => html`
              <div class="list-item">
                <span class="item-text clickable" @click=${() => {
                  const client = this.state.clients.find((c) => c.name === cn);
                  if (client) this.onNavigate?.("client-detail", client);
                }}>
                  ${cn}
                  <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                </span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${() => this._removeClient(cn)}
                ></ha-icon-button>
              </div>
            `
          )}
          <div class="add-row">
            <ha-select label="Add client" .value=${""}
              @selected=${(e: any) => {
                if (e.detail.value) this._addClient(e.detail.value);
              }}
            >
              ${this.state.clients
                .filter((c) => !this.member.client_names.includes(c.name))
                .map((c) => html`<ha-list-item value="${c.name}">${c.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Assigned Policies -->
      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.member.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.member.assigned_policy_ids.length === 0 ? html`<p class="empty">No policies assigned</p>` : ""}
          ${this.member.assigned_policy_ids.map(
            (pid) => {
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
            }
          )}
          <div class="add-row">
            <ha-select label="Assign policy" .value=${""}
              @selected=${(e: any) => {
                if (e.detail.value) this._addPolicy(e.detail.value);
              }}
            >
              ${this.state.policies
                .filter((p) => !this.member.assigned_policy_ids.includes(p.id))
                .map((p) => html`<ha-list-item value="${p.id}">${p.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Exceptions -->
      <ha-card>
        <div class="card-header">
          <div class="name">Exceptions (${this.member.exceptions.length})</div>
        </div>
        <div class="card-content">
          ${this.member.exceptions.map(
            (ex) => html`
              <div class="list-item">
                <span class="item-text">${ex}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${() => this._removeException(ex)}
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

  private _handleDeleteDialog() { this._showDeleteConfirm = false; }

  private async _addClient(name: string) {
    if (!name || this.member.client_names.includes(name)) return;
    const updated: Member = { ...this.member, client_names: [...this.member.client_names, name] };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
  }

  private async _removeClient(name: string) {
    const updated: Member = { ...this.member, client_names: this.member.client_names.filter((c) => c !== name) };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
  }

  private async _addPolicy(id: string) {
    if (!id || this.member.assigned_policy_ids.includes(id)) return;
    const updated: Member = { ...this.member, assigned_policy_ids: [...this.member.assigned_policy_ids, id] };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
  }

  private async _removePolicy(id: string) {
    const updated: Member = { ...this.member, assigned_policy_ids: this.member.assigned_policy_ids.filter((p) => p !== id) };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
  }

  private async _addException() {
    if (!this._newException.trim()) return;
    const updated: Member = { ...this.member, exceptions: [...this.member.exceptions, this._newException.trim()] };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
    this._newException = "";
  }

  private async _removeException(ex: string) {
    const updated: Member = { ...this.member, exceptions: this.member.exceptions.filter((e) => e !== ex) };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this.member = updated;
  }

  private async _deleteMember() {
    await this.hass.callWS({ type: "adguard_pc/members/delete", member_id: this.member.id });
    this._showDeleteConfirm = false;
    this.onNavigate?.("dashboard");
  }

  static styles = css`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    ha-textfield { flex: 1; }
    ha-select { width: 100%; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "member-view": MemberView; }
}
