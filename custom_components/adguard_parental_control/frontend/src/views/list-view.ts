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

  @state() private _showAdd = false;
  @state() private _newName = "";
  @state() private _newSecondary = "";

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
          <button class="btn primary" @click=${() => { this._showAdd = !this._showAdd; }}>
            ${this._icon(ICONS.plus, 14)} Add ${cfg.title.slice(0, -1)}
          </button>
        </div>

        ${this._showAdd
          ? html`
              <div class="add-form">
                <input class="field" placeholder="${cfg.title.slice(0, -1)} name" .value=${this._newName}
                  @input=${(e: Event) => { this._newName = (e.target as HTMLInputElement).value; }}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._create(); }}
                />
                ${cfg.secondaryLabel
                  ? html`<input class="field" placeholder="${cfg.secondaryLabel}" .value=${this._newSecondary}
                      @input=${(e: Event) => { this._newSecondary = (e.target as HTMLInputElement).value; }}
                      @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._create(); }}
                    />`
                  : nothing}
                <button class="btn primary" .disabled=${!this._newName.trim()} @click=${this._create}>Create</button>
              </div>
            `
          : nothing}

        ${cfg.items.length === 0
          ? html`<div class="empty-state">No ${cfg.title.toLowerCase()} configured yet.</div>`
          : html`
              <table class="table">
                <thead>
                  <tr>
                    ${cfg.columns.map((c) => html`<th>${c}</th>`)}
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
            `}
      </div>
    `;
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
    if (msg) await this.hass.callWS(msg);
    this._newName = "";
    this._newSecondary = "";
    this._showAdd = false;
    this._reload();
  }

  private async _reload() {
    try {
      this.state = await this.hass.callWS({ type: "adguard_pc/state/get" });
    } catch (err) {
      console.error("Failed to reload state:", err);
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
      .add-form { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
      .add-form .field { flex: 1; min-width: 160px; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "list-view": ListView; }
}
