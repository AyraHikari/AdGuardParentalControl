import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GlobalState } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

export type ListKind = "groups" | "members" | "clients" | "policies" | "profiles";

interface Column {
  label: string;
}

@customElement("list-view")
export class ListView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: String }) public kind: ListKind = "clients";
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _showAdd = false;
  @state() private _newName = "";
  @state() private _newSecondary = "";
  @state() private _deleteTarget: any = null;

  private _icon(path: string, size = 15) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private get _config() {
    switch (this.kind) {
      case "groups":
        return {
          title: "Groups",
          icon: ICONS.groups,
          columns: ["Name", "Members", "Clients", "Policies"] as string[],
          items: this.state.groups,
          nameField: "name",
          rowValues: (g: any) => [g.member_names.length, g.client_names.length, g.assigned_policy_ids.length],
          detailView: "group-detail",
          secondaryLabel: null as string | null,
        };
      case "members":
        return {
          title: "Members",
          icon: ICONS.members,
          columns: ["Name", "Clients", "Policies", "Exceptions"],
          items: this.state.members,
          nameField: "name",
          rowValues: (m: any) => [m.client_names.length, m.assigned_policy_ids.length, m.exceptions.length],
          detailView: "member-detail",
          secondaryLabel: null,
        };
      case "clients":
        return {
          title: "Clients",
          icon: ICONS.clients,
          columns: ["Name", "IDs", "Policies", "Status"],
          items: this.state.clients,
          nameField: "name",
          rowValues: (c: any) => [
            c.ids.length ? c.ids.join(", ") : "—",
            c.assigned_policy_ids.length,
            c.assigned_policy_ids.length ? "Restricted" : "Unrestricted",
          ],
          detailView: "client-detail",
          secondaryLabel: "IP / ID (optional)",
        };
      case "policies":
        return {
          title: "Policies",
          icon: ICONS.policies,
          columns: ["Name", "Priority", "Rules", "Profile"],
          items: this.state.policies,
          nameField: "name",
          rowValues: (p: any) => [p.priority, p.rules.length, this._profileName(p.profile_id)],
          detailView: "policy-detail",
          secondaryLabel: null,
        };
      case "profiles":
      default:
        return {
          title: "Profiles",
          icon: ICONS.profiles,
          columns: ["Name", "Rules", "Default Action"],
          items: this.state.profiles,
          nameField: "name",
          rowValues: (p: any) => [p.rules.length, p.default_action],
          detailView: "profile-detail",
          secondaryLabel: null,
        };
    }
  }

  private _profileName(id: string | null) {
    if (!id) return "None";
    return this.state.profiles.find((p) => p.id === id)?.name || id;
  }

  render() {
    if (!this.state) return html``;
    const cfg = this._config;

    return html`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(cfg.icon, 18)}</div>
            <h2>${cfg.title} <span class="count">(${cfg.items.length})</span></h2>
          </div>
          <button class="btn primary" @click=${() => { this._showAdd = true; }}>
            ${this._icon(ICONS.plus, 14)} Add ${cfg.title.slice(0, -1)}
          </button>
        </div>

        ${cfg.items.length === 0
          ? html`<div class="empty-state">No ${cfg.title.toLowerCase()} configured yet.</div>`
          : this.kind === "policies"
            ? this._renderPolicyList(cfg)
            : this._renderTable(cfg)
        }
      </div>

      ${this._showAdd ? html`
        <div class="modal-scrim" @click=${() => { this._showAdd = false; this._newName = ""; this._newSecondary = ""; }}>
          <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
            <div class="modal-title">Add ${cfg.title.slice(0, -1)}</div>
            <div class="modal-fields">
              <input class="field" placeholder="${cfg.title.slice(0, -1)} name" .value=${this._newName}
                @input=${(e: Event) => { this._newName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._create(); }}
                autofocus
              />
              ${cfg.secondaryLabel
                ? html`<input class="field" placeholder="${cfg.secondaryLabel}" .value=${this._newSecondary}
                    @input=${(e: Event) => { this._newSecondary = (e.target as HTMLInputElement).value; }}
                    @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._create(); }}
                  />`
                : nothing}
            </div>
            <div class="modal-actions">
              <button class="btn" @click=${() => { this._showAdd = false; this._newName = ""; this._newSecondary = ""; }}>Cancel</button>
              <button class="btn primary" .disabled=${!this._newName.trim()} @click=${this._create}>Create</button>
            </div>
          </div>
        </div>
      ` : nothing}

      ${this._deleteTarget ? html`
        <div class="confirm-scrim" @click=${() => { this._deleteTarget = null; }}>
          <div class="confirm-box" @click=${(e: Event) => e.stopPropagation()}>
            <h3>Delete "${this._deleteTarget.name}"?</h3>
            <p>This action cannot be undone. All associated data will be removed.</p>
            <div class="confirm-actions">
              <button class="btn" @click=${() => { this._deleteTarget = null; }}>Cancel</button>
              <button class="btn-danger" @click=${this._deleteItem}>Delete</button>
            </div>
          </div>
        </div>
      ` : nothing}
    `;
  }

  private _renderTable(cfg: any) {
    return html`
      <table class="table">
        <thead>
          <tr>
            ${cfg.columns.map((c: string) => html`<th>${c}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${cfg.items.map((item: any) => {
            const values = cfg.rowValues(item);
            return html`
              <tr class="clickable" @click=${() => this.onNavigate?.(cfg.detailView, item)}>
                <td class="name-cell">${item[cfg.nameField]}</td>
                ${values.map((v: any) => html`<td>${v}</td>`)}
                <td class="menu-cell">
                  <span class="icon-btn">${this._icon(ICONS.chevronRight, 15)}</span>
                </td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  private _renderPolicyList(cfg: any) {
    return html`
      <div class="policy-list">
        ${cfg.items.map((p: any) => {
          const profileName = this._profileName(p.profile_id);
          const enabled = p.enabled !== false;
          const desc = p.description || "";
          return html`
            <div class="policy-card clickable" @click=${() => this.onNavigate?.("policy-detail", p)}>
              <div class="policy-card-main">
                <div class="policy-card-top">
                  <span class="policy-card-name">${p.name || "Untitled"}</span>
                  <label class="toggle-line" @click=${(e: Event) => e.stopPropagation()}>
                    <input type="checkbox" ?checked=${enabled}
                      @change=${(e: Event) => this._togglePolicyEnabled(p, (e.target as HTMLInputElement).checked)} />
                    <span class="toggle-label">${enabled ? "On" : "Off"}</span>
                  </label>
                </div>
                ${desc ? html`<div class="policy-card-desc">${desc.length > 100 ? desc.slice(0, 100) + "…" : desc}</div>` : ""}
                <div class="policy-card-meta">
                  <span class="meta-pill">Priority ${p.priority}</span>
                  <span class="meta-pill">${p.rules.length} rule${p.rules.length === 1 ? "" : "s"}</span>
                  ${p.exceptions?.length ? html`<span class="meta-pill">${p.exceptions.length} exception${p.exceptions.length === 1 ? "" : "s"}</span>` : ""}
                  <span class="meta-pill">${profileName}</span>
                </div>
              </div>
              <div class="policy-card-arrow">${this._icon(ICONS.chevronRight, 15)}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private async _togglePolicyEnabled(p: any, enabled: boolean) {
    try {
      await this.hass.callWS({
        type: "adguard_pc/policies/update",
        policy: { ...p, enabled },
      });
      this.onStateChanged?.();
    } catch (err) {
      console.error("Failed to toggle policy:", err);
    }
  }

  private async _create() {
    if (!this._newName.trim()) return;
    const name = this._newName.trim();
    const secondary = this._newSecondary.trim();
    let msg: Record<string, unknown> | null = null;
    switch (this.kind) {
      case "groups":
        msg = { type: "adguard_pc/groups/create", group: { name, member_names: [], client_names: [], assigned_policy_ids: [] } };
        break;
      case "members":
        msg = { type: "adguard_pc/members/create", member: { name, client_names: [], assigned_policy_ids: [], exceptions: [] } };
        break;
      case "clients":
        msg = { type: "adguard_pc/clients/create", client: { name, ids: secondary ? [secondary] : [], assigned_policy_ids: [], exceptions: [] } };
        break;
      case "policies":
        msg = { type: "adguard_pc/policies/create", policy: { name, rules: [], priority: 0 } };
        break;
      case "profiles":
        msg = { type: "adguard_pc/profiles/create", profile: { name, rules: [], default_action: "block" } };
        break;
    }
    if (msg) {
      try {
        await this.hass.callWS(msg);
      } catch (err) {
        console.error("Create failed:", err);
      }
    }
    this._newName = "";
    this._newSecondary = "";
    this._showAdd = false;
    this.onStateChanged?.();
  }

  private async _deleteItem() {
    if (!this._deleteTarget) return;
    const item = this._deleteTarget;
    this._deleteTarget = null;
    try {
      const kind = this.kind;
      const msgMap: Record<string, { type: string; key: string }> = {
        policies: { type: "adguard_pc/policies/delete", key: "policy_id" },
        groups:    { type: "adguard_pc/groups/delete",    key: "group_id" },
        members:   { type: "adguard_pc/members/delete",   key: "member_id" },
        clients:   { type: "adguard_pc/clients/delete",   key: "client_id" },
        profiles:  { type: "adguard_pc/profiles/delete",  key: "profile_id" },
      };
      const msg = msgMap[kind];
      if (msg) await this.hass.callWS({ type: msg.type, [msg.key]: item.id });
      this.onStateChanged?.();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; flex-wrap: wrap; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }

      .policy-list { display: flex; flex-direction: column; gap: 8px; }
      .policy-card {
        display: flex; align-items: center; gap: 12px;
        background: var(--agpc-card-bg-alt); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-md, 10px); padding: 14px 16px;
        cursor: pointer; transition: border-color .15s, background .15s;
      }
      .policy-card:hover { border-color: var(--agpc-blue); background: rgba(22,119,255,.06); }
      .policy-card-main { flex: 1; min-width: 0; }
      .policy-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .policy-card-name { font-weight: 650; font-size: 14px; color: var(--agpc-text); }
      .policy-card-desc { color: var(--agpc-text-faint); font-size: 12px; margin-top: 4px; line-height: 1.4; }
      .policy-card-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .meta-pill {
        display: inline-block; font-size: 11px; padding: 2px 8px; border-radius: 999px;
        background: rgba(255,255,255,.06); color: var(--agpc-text-faint); font-weight: 500;
      }
      .policy-card-arrow { color: var(--agpc-text-faint); flex-shrink: 0; }
      .policy-card-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .switch-toggle { position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; }
      .switch-toggle input { opacity: 0; width: 0; height: 0; }
      .switch-slider {
        position: absolute; inset: 0; background: #3a4560; border-radius: 20px; transition: background .2s;
      }
      .switch-slider::before {
        content: ""; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px;
        border-radius: 50%; background: #a0aac0; transition: transform .2s, background .2s;
      }
      .switch-toggle input:checked + .switch-slider { background: var(--agpc-green, #20c879); }
      .switch-toggle input:checked + .switch-slider::before { transform: translateX(16px); background: #fff; }
      .btn-delete-sm {
        padding: 4px 10px; font-size: 11px; font-weight: 600;
        background: #451d24; color: #ff6875; border: 1px solid #6b2832;
        border-radius: 6px; cursor: pointer; transition: background .15s;
      }
      .btn-delete-sm:hover { background: #5c2430; }

      .modal-scrim {
        position: fixed; inset: 0; background: rgba(0, 0, 0, 0.55);
        display: flex; align-items: center; justify-content: center; z-index: 50;
      }
      .modal {
        background: var(--agpc-card-bg); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-lg); padding: 24px; width: 380px; max-width: 90vw;
      }
      .modal-title { font-size: 17px; font-weight: 700; color: var(--agpc-text); margin-bottom: 16px; }
      .modal-fields { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
      .modal-fields .field {
        width: 100%; box-sizing: border-box;
        background: var(--agpc-card-bg-alt); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-sm); color: var(--agpc-text);
        padding: 10px 12px; font-size: 13px; font-family: inherit; outline: none;
      }
      .modal-fields .field:focus { border-color: var(--agpc-blue); }
      .modal-fields .field::placeholder { color: var(--agpc-text-faint); }
      .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

      .confirm-scrim {
        position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 60;
      }
      .confirm-box {
        background: var(--agpc-card-bg); border: 1px solid var(--agpc-border); border-radius: var(--agpc-radius-lg);
        padding: 24px; width: 360px; max-width: 90vw; text-align: left;
      }
      .confirm-box h3 { margin: 0 0 8px; font-size: 16px; color: var(--agpc-text); }
      .confirm-box p { margin: 0 0 18px; font-size: 13px; color: var(--agpc-text-faint); }
      .confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .btn-danger {
        background: #b94650; color: #fff; border: 1px solid #b94650; border-radius: 7px;
        padding: 8px 14px; font: 600 11px inherit; cursor: pointer;
      }
      .btn-danger:hover { background: #a03c45; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "list-view": ListView; }
}
