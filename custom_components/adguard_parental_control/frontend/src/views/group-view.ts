import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Group, GlobalState } from "../data/websocket-api";

@customElement("group-view")
export class GroupView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public group!: Group;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _showDeleteConfirm = false;

  render() {
    if (!this.group) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.group.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${() => { this._showDeleteConfirm = true; }}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">${this.group.member_names.length} members · ${this.group.client_names.length} clients · ${this.group.assigned_policy_ids.length} policies</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm ? html`
        <div class="modal-scrim" @click=${() => this._showDeleteConfirm = false}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete group "${this.group.name}"?</h3></div>
          <div class="modal-body"><p>This cannot be undone.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${() => this._showDeleteConfirm = false}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteGroup}>Delete</button>
          </div>
        </div>
      ` : ""}

      <!-- Members -->
      <ha-card>
        <div class="card-header">
          <div class="name">Members (${this.group.member_names.length})</div>
        </div>
        <div class="card-content">
          ${this.group.member_names.length === 0 ? html`<p class="empty">No members assigned</p>` : ""}
          ${this.group.member_names.map(
            (mn) => html`
              <div class="list-item">
                <span class="item-text">${mn}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${() => this._removeMember(mn)}
                ></ha-icon-button>
              </div>
            `
          )}
          <div class="add-row">
            <ha-select label="Add member" .value=${""}
                @change=${(e: any) => {
                  const val = (e.target as HTMLSelectElement).value;
                  if (val) this._addMember(val);
                  (e.target as HTMLSelectElement).value = "";
                }}
              >
                ${this.state.members
                  .filter((m) => !this.group.member_names.includes(m.name))
                  .map((m) => html`<ha-list-item value="${m.name}">${m.name}</ha-list-item>`)}
              </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Clients -->
      <ha-card>
        <div class="card-header">
          <div class="name">Clients (${this.group.client_names.length})</div>
        </div>
        <div class="card-content">
          ${this.group.client_names.length === 0 ? html`<p class="empty">No clients assigned</p>` : ""}
          ${this.group.client_names.map(
            (cn) => html`
              <div class="list-item">
                <span class="item-text">${cn}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${() => this._removeClient(cn)}
                ></ha-icon-button>
              </div>
            `
          )}
          <div class="add-row">
            <ha-select label="Add client" .value=${""}
              @change=${(e: any) => {
                const val = (e.target as HTMLSelectElement).value;
                if (val) this._addClient(val);
                (e.target as HTMLSelectElement).value = "";
              }}
            >
              ${this.state.clients
                .filter((c) => !this.group.client_names.includes(c.name))
                .map((c) => html`<ha-list-item value="${c.name}">${c.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Assigned Policies -->
      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.group.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.group.assigned_policy_ids.length === 0 ? html`<p class="empty">No policies assigned</p>` : ""}
          ${this.group.assigned_policy_ids.map(
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
              @change=${(e: any) => {
                const val = (e.target as HTMLSelectElement).value;
                if (val) this._addPolicy(val);
                (e.target as HTMLSelectElement).value = "";
              }}
            >
              ${this.state.policies
                .filter((p) => !this.group.assigned_policy_ids.includes(p.id))
                .map((p) => html`<ha-list-item value="${p.id}">${p.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _handleDeleteDialog() { this._showDeleteConfirm = false; }

  private async _addMember(name: string) {
    if (!name || this.group.member_names.includes(name)) return;
    const updated: Group = { ...this.group, member_names: [...this.group.member_names, name] };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _removeMember(name: string) {
    const updated: Group = { ...this.group, member_names: this.group.member_names.filter((m) => m !== name) };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _addClient(name: string) {
    if (!name || this.group.client_names.includes(name)) return;
    const updated: Group = { ...this.group, client_names: [...this.group.client_names, name] };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _removeClient(name: string) {
    const updated: Group = { ...this.group, client_names: this.group.client_names.filter((c) => c !== name) };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _addPolicy(id: string) {
    if (!id || this.group.assigned_policy_ids.includes(id)) return;
    const updated: Group = { ...this.group, assigned_policy_ids: [...this.group.assigned_policy_ids, id] };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _removePolicy(id: string) {
    const updated: Group = { ...this.group, assigned_policy_ids: this.group.assigned_policy_ids.filter((p) => p !== id) };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this.group = updated;
    this.onStateChanged?.();
  }

  private async _deleteGroup() {
    await this.hass.callWS({ type: "adguard_pc/groups/delete", group_id: this.group.id });
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
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-row { margin-top: 8px; }
    ha-select { width: 100%; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--card-background-color,#1e1e1e); border:1px solid var(--divider-color,#333); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; }
    .modal-body p { margin:0 0 16px; color:var(--secondary-text-color,#999); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .btn { display:inline-flex; align-items:center; padding:8px 16px; border-radius:8px; border:1px solid var(--divider-color,#333); background:var(--card-background-color,#2a2a2a); color:var(--primary-text-color,#eee); cursor:pointer; font-size:13px; }
    .btn:hover { background:var(--secondary-background-color,#333); }
    .btn-danger { background:var(--error-color,#f44336); color:#fff; border-color:var(--error-color,#f44336); }
    .btn-danger:hover { opacity:0.9; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "group-view": GroupView; }
}
