import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Client, GlobalState } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

interface ClientRow {
  client: Client;
  owner: string;
  restricted: boolean;
  currentPolicy: string;
  nextChange: string;
}

@customElement("dashboard-view")
export class DashboardView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  private _icon(path: string, size = 20) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private _ownerFor(client: Client): string {
    const member = this.state.members.find((m) => m.client_names.includes(client.name));
    if (member) return member.name;
    const group = this.state.groups.find((g) => g.client_names.includes(client.name));
    if (group) return group.name;
    return "Unassigned";
  }

  private _clientRows(): ClientRow[] {
    return this.state.clients.map((client) => {
      const restricted = client.assigned_policy_ids.length > 0;
      const policy = restricted
        ? this.state.policies.find((p) => p.id === client.assigned_policy_ids[0])
        : undefined;
      let nextChange = "-";
      if (policy?.time_schedule?.time_to) {
        nextChange = policy.time_schedule.time_to;
      }
      return {
        client,
        owner: this._ownerFor(client),
        restricted,
        currentPolicy: policy ? policy.name : "Default",
        nextChange,
      };
    });
  }

  private _blockedCategoryRules(): { target: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const policy of this.state.policies) {
      for (const rule of policy.rules) {
        if (rule.rule_type === "category" && rule.action === "block") {
          counts.set(rule.target, (counts.get(rule.target) || 0) + 1);
        }
      }
    }
    for (const profile of this.state.profiles) {
      for (const rule of profile.rules) {
        if (rule.rule_type === "category" && rule.action === "block") {
          counts.set(rule.target, (counts.get(rule.target) || 0) + 1);
        }
      }
    }
    return Array.from(counts.entries())
      .map(([target, count]) => ({ target, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private _blockedDomainRules(): { target: string; source: string }[] {
    const rows: { target: string; source: string }[] = [];
    for (const policy of this.state.policies) {
      for (const rule of policy.rules) {
        if (rule.rule_type === "domain" && rule.action === "block") {
          rows.push({ target: rule.target, source: policy.name });
        }
      }
    }
    for (const profile of this.state.profiles) {
      for (const rule of profile.rules) {
        if (rule.rule_type === "domain" && rule.action === "block") {
          rows.push({ target: rule.target, source: profile.name });
        }
      }
    }
    return rows.slice(0, 6);
  }

  private _totalRules(): number {
    const policyRules = this.state.policies.reduce((sum, p) => sum + p.rules.length, 0);
    const profileRules = this.state.profiles.reduce((sum, p) => sum + p.rules.length, 0);
    return policyRules + profileRules;
  }

  render() {
    if (!this.state) return html``;
    const rows = this._clientRows();
    const onlineCount = rows.filter((r) => r.restricted).length;
    const activePolicies = this.state.policies.filter((p) => p.rules.length > 0 || p.profile_id);
    const blockedCategories = this._blockedCategoryRules();
    const blockedDomains = this._blockedDomainRules();

    return html`
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.clients.length}</div>
            <div class="stat-icon blue">${this._icon(ICONS.clients)}</div>
          </div>
          <div class="stat-label">Clients</div>
          <div class="stat-sub">Online ${onlineCount}</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.policies.length}</div>
            <div class="stat-icon green">${this._icon(ICONS.policies)}</div>
          </div>
          <div class="stat-label">Policies</div>
          <div class="stat-sub">Active ${activePolicies.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this._totalRules()}</div>
            <div class="stat-icon yellow">${this._icon(ICONS.shield)}</div>
          </div>
          <div class="stat-label">Rules</div>
          <div class="stat-sub">In Effect</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.overrides.length}</div>
            <div class="stat-icon purple">${this._icon(ICONS.clock)}</div>
          </div>
          <div class="stat-label">Overrides</div>
          <div class="stat-sub">Active</div>
        </div>
      </div>

      <div class="card clients-card">
        <div class="card-head">
          <h2>Clients Status</h2>
          <button class="link-btn" @click=${() => this.onNavigate?.("clients")}>View all</button>
        </div>
        ${rows.length === 0
          ? html`<div class="empty-state">No clients configured yet.</div>`
          : html`
              <table class="table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Member</th>
                    <th>Status</th>
                    <th>Current Policy</th>
                    <th>Next Change</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.slice(0, 6).map(
                    (row) => html`
                      <tr class="clickable" @click=${() => this.onNavigate?.("client-detail", row.client)}>
                        <td>
                          <div class="client-cell">
                            <span class="client-icon">${this._icon(ICONS.laptop, 16)}</span>
                            <div>
                              <div class="client-name">${row.client.name}</div>
                              <div class="client-ip">${row.client.ids[0] || "—"}</div>
                            </div>
                          </div>
                        </td>
                        <td>${row.owner}</td>
                        <td>
                          <span class="badge ${row.restricted ? "red" : "green"}">
                            ${row.restricted ? "Restricted" : "Unrestricted"}
                          </span>
                        </td>
                        <td>${row.currentPolicy}</td>
                        <td>${row.nextChange}</td>
                        <td class="menu-cell">
                          <span class="icon-btn">${this._icon(ICONS.dots, 16)}</span>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `}
      </div>

      <div class="bottom-grid">
        <div class="card mini-card">
          <div class="card-head"><h2>Active Policies</h2></div>
          <div class="mini-body">
            <div class="mini-icon blue">${this._icon(ICONS.schedules, 22)}</div>
            <div>
              <div class="mini-value">${activePolicies.length} <span class="mini-of">/ ${this.state.policies.length}</span></div>
              <div class="mini-caption">${activePolicies.slice(0, 2).map((p) => p.name).join(", ") || "No active policies"}</div>
            </div>
          </div>
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Categories</h2></div>
          ${blockedCategories.length === 0
            ? html`<div class="empty-state">No blocked categories yet.</div>`
            : html`
                <ul class="rank-list">
                  ${blockedCategories.map(
                    (c) => html`
                      <li>
                        <span class="rank-icon">${this._icon(ICONS.category, 16)}</span>
                        <span class="rank-label">${c.target}</span>
                        <span class="rank-count">${c.count}</span>
                      </li>
                    `
                  )}
                </ul>
              `}
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Domains</h2></div>
          ${blockedDomains.length === 0
            ? html`<div class="empty-state">No blocked domains yet.</div>`
            : html`
                <ul class="rank-list">
                  ${blockedDomains.map(
                    (d) => html`
                      <li>
                        <span class="rank-icon">${this._icon(ICONS.domain, 16)}</span>
                        <span class="rank-label">${d.target}</span>
                        <span class="rank-count muted">${d.source}</span>
                      </li>
                    `
                  )}
                </ul>
              `}
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 16px;
        margin-bottom: 20px;
      }
      .stat-card {
        background: var(--agpc-card-bg);
        border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-lg);
        padding: 18px 18px 16px;
      }
      .stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
      .stat-value { font-size: 28px; font-weight: 700; color: var(--agpc-text); line-height: 1; }
      .stat-icon {
        width: 38px; height: 38px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .stat-icon.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
      .stat-icon.green { background: var(--agpc-green-soft); color: var(--agpc-green); }
      .stat-icon.yellow { background: var(--agpc-yellow-soft); color: var(--agpc-yellow); }
      .stat-icon.purple { background: rgba(167,139,250,0.14); color: #a78bfa; }
      .stat-label { margin-top: 10px; font-size: 13px; color: var(--agpc-text-dim); font-weight: 600; }
      .stat-sub { margin-top: 2px; font-size: 12px; color: var(--agpc-text-faint); }

      .card { padding: 18px 20px 8px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .card-head h2 { font-size: 15px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .link-btn {
        border: none; background: transparent; color: var(--agpc-blue);
        font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit;
      }
      .link-btn:hover { text-decoration: underline; }

      .clients-card .table { margin-top: 6px; }
      .client-cell { display: flex; align-items: center; gap: 10px; }
      .client-icon {
        width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.05);
        display: flex; align-items: center; justify-content: center; color: var(--agpc-text-dim); flex-shrink: 0;
      }
      .client-name { font-weight: 600; color: var(--agpc-text); font-size: 13.5px; }
      .client-ip { font-size: 11.5px; color: var(--agpc-text-faint); font-family: var(--code-font-family); }
      .menu-cell { text-align: right; }

      .bottom-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 16px;
      }
      .mini-card { padding-bottom: 16px; }
      .mini-body { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
      .mini-icon {
        width: 44px; height: 44px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .mini-icon.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
      .mini-value { font-size: 22px; font-weight: 700; color: var(--agpc-text); }
      .mini-of { font-size: 15px; color: var(--agpc-text-faint); font-weight: 500; }
      .mini-caption { font-size: 12px; color: var(--agpc-text-dim); margin-top: 2px; }

      .rank-list { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
      .rank-list li { display: flex; align-items: center; gap: 10px; }
      .rank-icon { color: var(--agpc-text-dim); display: flex; flex-shrink: 0; }
      .rank-label { flex: 1; font-size: 13px; color: var(--agpc-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .rank-count { font-size: 12.5px; font-weight: 700; color: var(--agpc-text); }
      .rank-count.muted { font-weight: 500; color: var(--agpc-text-faint); font-size: 11.5px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "dashboard-view": DashboardView; }
}
