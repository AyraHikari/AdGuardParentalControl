import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Group, GlobalState } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

const GROUP_EDIT_ICON = "M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.61L18.39,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z";
const GROUP_ACTIVITY_ICON = "M3,13H5V11H3V13M3,17H5V15H3V17M3,9H5V7H3V9M7,13H21V11H7V13M7,17H21V15H7V17M7,7V9H21V7H7Z";
const GROUP_EXTERNAL_ICON = "M14,3V5H17.59L7.5,15.09L8.91,16.5L19,6.41V10H21V3H14M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V12H19V19Z";

@customElement("group-view")
export class GroupView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public group!: Group;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _showDeleteConfirm = false;
  @state() private _showAddClient = false;
  @state() private _showAddMember = false;
  @state() private _showAddPolicy = false;
  @state() private _showDeleteMemberConfirm: string | null = null;
  @state() private _tab = "overview";

  private _icon(path: string, size = 18) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private get _members() {
    return this.group ? this.state.members.filter((m) => this.group.member_names.includes(m.name)) : [];
  }

  private get _clients() {
    return this.group ? this.state.clients.filter((c) => this.group.client_names.includes(c.name)) : [];
  }

  private get _policies() {
    return this.group
      ? this.state.policies.filter((p) => this.group.assigned_policy_ids.includes(p.id))
      : [];
  }

  private _setTab(tab: string) {
    this._tab = tab;
  }

  render() {
    if (!this.group) return html``;

    return html`
      <div class="page">
        ${this._renderHeader()}
        ${this._renderTabs()}
        ${this._tab === "overview" ? this._renderOverview() : nothing}
        ${this._tab === "members" ? this._renderMembersTab() : nothing}
        ${this._tab === "clients" ? this._renderClientsTab() : nothing}
        ${this._tab === "policies" ? this._renderPoliciesTab() : nothing}
        ${this._tab === "overrides" ? this._renderOverridesTab() : nothing}
        ${this._tab === "activity" ? this._renderActivityTab() : nothing}
      </div>

      ${this._showDeleteConfirm ? this._renderDeleteModal() : nothing}
      ${this._showAddClient ? this._renderAddClientModal() : nothing}
      ${this._showAddMember ? this._renderAddMemberModal() : nothing}
      ${this._showAddPolicy ? this._renderAddPolicyModal() : nothing}
      ${this._showDeleteMemberConfirm ? this._renderDeleteMemberModal() : nothing}
    `;
  }

  private _renderHeader() {
    return html`
      <section class="hero card">
        <div class="hero-main">
          <div class="hero-icon">${this._icon(ICONS.groups, 32)}</div>
          <div class="hero-copy">
            <div class="title-line">
              <h1>${this.group.name}</h1>
              <span class="status-badge active">Active</span>
            </div>
            <div class="description">
              ${this.group.name === "Parents"
                ? "Group for parents and adults in the family."
                : "Group for related members and clients."}
            </div>

            <div class="stats">
              <div class="stat">
                <span class="stat-icon">${this._icon(ICONS.members, 16)}</span>
                <div><b>${this._members.length}</b><span>Members</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(ICONS.clients, 16)}</span>
                <div><b>${this._clients.length}</b><span>Clients</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(ICONS.policies, 16)}</span>
                <div><b>${this._policies.length}</b><span>Policies</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(ICONS.overrides, 16)}</span>
                <div><b>0</b><span>Overrides</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-actions">
          <button class="btn" @click=${() => this._tab = "overview"}>${this._icon(GROUP_EDIT_ICON, 15)} Edit Group</button>
          <button class="btn danger" @click=${() => { this._showDeleteConfirm = true; }}>
            ${this._icon(ICONS.delete, 15)} Delete Group
          </button>
        </div>
      </section>
    `;
  }

  private _renderTabs() {
    const tabs = [
      ["overview", "Overview"],
      ["members", "Members"],
      ["clients", "Clients"],
      ["policies", "Policies"],
      ["overrides", "Override Rules"],
      ["activity", "Activity"],
    ];

    return html`
      <nav class="tabs" aria-label="Group sections">
        ${tabs.map(([key, label]) => html`
          <button class=${this._tab === key ? "tab active" : "tab"} @click=${() => this._setTab(key)}>
            ${label}
          </button>
        `)}
      </nav>
    `;
  }

  private _renderOverview() {
    const defaultPolicy = this._policies[0];
    return html`
      <div class="overview-grid">
        <section class="card info-card">
          <div class="section-head">
            <div><h2>Group Information</h2></div>
            <button class="icon-text-btn">${this._icon(GROUP_EDIT_ICON, 14)} Edit</button>
          </div>
          <div class="kv">
            <div><span>Name</span><strong>${this.group.name}</strong></div>
            <div><span>Description</span><strong>${this.group.name === "Parents" ? "Group for parents and adults in the family." : "Group for related members and clients."}</strong></div>
            <div><span>Status</span><strong><span class="status-badge active">Active</span></strong></div>
            <div><span>Priority</span><strong>0</strong></div>
            <div><span>Default Profile</span><strong>None</strong></div>
          </div>
        </section>

        <section class="card policy-card">
          <div class="section-head">
            <div><h2>Default Policy</h2><p>Policy inherited by members and clients in this group.</p></div>
          </div>
          ${defaultPolicy ? html`
            <div class="default-policy">
              <div class="default-policy-icon">${this._icon(ICONS.policies, 26)}</div>
              <div class="default-policy-copy">
                <strong>${defaultPolicy.name}</strong>
                <span>${defaultPolicy.rules.length} rule${defaultPolicy.rules.length === 1 ? "" : "s"} · Priority ${defaultPolicy.priority}</span>
              </div>
              <button class="btn primary" @click=${() => this.onNavigate?.("policy-detail", defaultPolicy)}>View Policy</button>
            </div>
          ` : html`
            <div class="empty-large">
              <div class="empty-icon">${this._icon(ICONS.policies, 28)}</div>
              <strong>No default policy assigned</strong>
              <span>New clients and members in this group will not have a default policy.</span>
              <button class="btn primary" @click=${() => this._tab = "policies"}>
                ${this._icon(ICONS.plus, 15)} Assign Default Policy
              </button>
            </div>
          `}
        </section>

        <section class="card clients-card">
          <div class="section-head">
            <div><h2>Clients (${this._clients.length})</h2></div>
            <button class="icon-text-btn" @click=${() => this._setTab("clients")}>Manage Clients ${this._icon(ICONS.chevronRight, 14)}</button>
          </div>
          ${this._clients.length
            ? this._clients.slice(0, 4).map((client, index) => html`
                <div class="client-row" @click=${() => this.onNavigate?.("client-detail", client)}>
                  <div class="client-avatar">${this._icon(ICONS.clients, 18)}</div>
                  <div class="client-main">
                    <strong>${client.name}</strong>
                    ${index === 0 ? html`<span class="primary-pill">Primary device</span>` : nothing}
                    <span>${client.ids?.[0] || "No ID"}</span>
                  </div>
                  <div class=${"online " + (index === 0 ? "on" : "off")}>${index === 0 ? "Online" : "Offline"} <i></i></div>
                  ${this._icon(ICONS.chevronRight, 14)}
                </div>
              `)
            : html`<div class="empty-inline">No clients assigned.</div>`}
          <button class="btn small" @click=${() => this._showAddClient = true}>${this._icon(ICONS.plus, 14)} Add Client</button>
        </section>

        <section class="card inheritance-card">
          <div class="section-head"><div><h2>Inheritance</h2><p>Settings inherited by members and clients.</p></div></div>
          ${[
            ["Profile", "None"],
            ["Allowed Services", "Inherit from policies"],
            ["Blocked Services", "Inherit from policies"],
            ["Safe Search", "Inherit from policies"],
            ["YouTube Restricted Mode", "Inherit from policies"],
            ["DNS Blocklists", "Inherit from system"],
          ].map(([label, value]) => html`
            <div class="inherit-row">
              <span>${label}</span>
              <div><strong>${value}</strong>${this._icon(ICONS.chevronRight, 14)}</div>
            </div>
          `)}
        </section>

        <section class="card quick-card">
          <div class="section-head"><h2>Quick Actions</h2></div>
          ${[
            ["Add Member", "Add a member to this group", ICONS.members, () => this._setTab("members")],
            ["Assign Policy", "Assign a policy to this group", ICONS.policies, () => this._setTab("policies")],
            ["Add Override", "Add an override rule for this group", ICONS.overrides, () => this._setTab("overrides")],
            ["View Activity", "View group activity and logs", GROUP_ACTIVITY_ICON, () => this._setTab("activity")],
          ].map(([title, desc, icon, action]) => html`
            <button class="quick-action" @click=${action as any}>
              <span class="quick-icon">${this._icon(icon as string, 18)}</span>
              <span class="quick-copy"><strong>${title}</strong><small>${desc}</small></span>
              ${this._icon(ICONS.chevronRight, 14)}
            </button>
          `)}
        </section>

        <section class="card activity-card">
          <div class="section-head"><div><h2>Recent Activity</h2></div></div>
          <div class="timeline">
            <div class="timeline-item"><span class="dot green"></span><div><strong>Group loaded</strong><small>Current group configuration</small></div></div>
            ${this._clients.slice(0, 3).map((c) => html`
              <div class="timeline-item"><span class="dot blue"></span><div><strong>${c.name} in group</strong><small>Configured client</small></div></div>
            `)}
            ${this._policies.slice(0, 2).map((p) => html`
              <div class="timeline-item"><span class="dot blue"></span><div><strong>${p.name} assigned</strong><small>Policy currently associated</small></div></div>
            `)}
          </div>
          <button class="full-link" @click=${() => this._setTab("activity")}>View Full Activity ${this._icon(GROUP_EXTERNAL_ICON, 13)}</button>
        </section>
      </div>
    `;
  }

  private _renderMembersTab() {
    return html`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Members (${this._members.length})</h2><p>People assigned to this group.</p></div>
          <button class="btn primary" @click=${() => (this._showAddMember = true)}>${this._icon(ICONS.plus, 15)} Add Member</button>
        </div>
        ${this._members.length ? this._members.map((m) => html`
          <div class="tab-row" @click=${() => this.onNavigate?.("member-detail", m)}>
            <div class="row-icon">${this._icon(ICONS.members, 18)}</div>
            <div class="row-main"><strong>${m.name}</strong><span>${m.client_names.length} clients · ${m.assigned_policy_ids.length} policies</span></div>
            <button class="icon-btn" @click=${(e: Event) => { e.stopPropagation(); this._showDeleteMemberConfirm = m.name; }}>${this._icon(ICONS.delete, 16)}</button>
            ${this._icon(ICONS.chevronRight, 15)}
          </div>
        `) : html`<div class="empty-state">No members assigned.</div>`}
      </section>
    `;
  }

  private _renderClientsTab() {
    return html`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Clients (${this._clients.length})</h2><p>Devices directly assigned to this group.</p></div>
          <button class="btn primary" @click=${() => this._showAddClient = true}>${this._icon(ICONS.plus, 15)} Add Client</button>
        </div>
        ${this._clients.length ? this._clients.map((client) => html`
          <div class="tab-row" @click=${() => this.onNavigate?.("client-detail", client)}>
            <div class="row-icon">${this._icon(ICONS.clients, 18)}</div>
            <div class="row-main"><strong>${client.name}</strong><span>${client.ids?.join(", ") || "No ID"}</span></div>
            <button class="icon-btn" @click=${(e: Event) => { e.stopPropagation(); this._removeClient(client.name); }}>${this._icon(ICONS.close, 16)}</button>
          </div>
        `) : html`<div class="empty-state">No clients assigned.</div>`}
      </section>
    `;
  }

  private _renderPoliciesTab() {
    return html`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Policies (${this._policies.length})</h2><p>Policies assigned to this group.</p></div>
          <button class="btn primary" @click=${() => (this._showAddPolicy = true)}>${this._icon(ICONS.plus, 15)} Add Policy</button>
        </div>
        ${this._policies.length ? this._policies.map((policy, index) => html`
          <div class="policy-row" @click=${() => this.onNavigate?.("policy-detail", policy)}>
            <div class="priority">${index + 1}</div>
            <div class="row-main"><strong>${policy.name}</strong><span>${policy.rules.length} rules · Priority ${policy.priority}</span></div>
            <span class="status-badge active">Assigned</span>
            ${this._icon(ICONS.chevronRight, 15)}
          </div>
        `) : html`
          <div class="empty-large compact">
            <div class="empty-icon">${this._icon(ICONS.policies, 24)}</div>
            <strong>No policies assigned</strong>
            <span>Assign a policy to control this group's inherited behavior.</span>
          </div>
        `}
      </section>
    `;
  }

  private _renderOverridesTab() {
    return html`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Override Rules</h2><p>Temporary or high-priority group overrides.</p></div>
        </div>
        <div class="empty-large compact">
          <div class="empty-icon">${this._icon(ICONS.overrides, 24)}</div>
          <strong>No group overrides</strong>
          <span>Current model applies overrides at member/client scope.</span>
        </div>
      </section>
    `;
  }

  private _renderActivityTab() {
    return html`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Activity</h2><p>Current configuration activity for this group.</p></div>
        </div>
        <div class="activity-list">
          <div class="activity-row"><span class="dot green"></span><div><strong>Group is active</strong><small>${this._members.length} members · ${this._clients.length} clients · ${this._policies.length} policies</small></div></div>
          ${this._clients.map((client) => html`
            <div class="activity-row"><span class="dot blue"></span><div><strong>${client.name}</strong><small>Assigned client · ${client.ids?.join(", ") || "No ID"}</small></div></div>
          `)}
          ${this._policies.map((policy) => html`
            <div class="activity-row"><span class="dot purple"></span><div><strong>${policy.name}</strong><small>Assigned policy · ${policy.rules.length} rules</small></div></div>
          `)}
        </div>
      </section>
    `;
  }

  private _renderDeleteModal() {
    return html`
      <div class="modal-scrim" @click=${() => this._showDeleteConfirm = false}></div>
      <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-head"><h3>Delete group "${this.group.name}"?</h3></div>
        <div class="modal-body"><p>This cannot be undone.</p></div>
        <div class="modal-actions">
          <button class="btn" @click=${() => this._showDeleteConfirm = false}>Cancel</button>
          <button class="btn danger" @click=${this._deleteGroup}>Delete</button>
        </div>
      </div>
    `;
  }

  private _renderAddClientModal() {
    const available = this.state.clients.filter((c) => !this.group.client_names.includes(c.name));
    return html`
      <div class="modal-scrim" @click=${() => this._showAddClient = false}></div>
      <div class="modal wide-modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-head"><h3>Add Client to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${available.length === 0
            ? html`<div class="empty-state">No available clients.</div>`
            : available.map((c) => html`
                <button class="modal-list-item" @click=${() => { this._addClient(c.name); this._showAddClient = false; }}>
                  <span><strong>${c.name}</strong><small>${c.ids?.join(", ") || "No ID"}</small></span>
                  ${this._icon(ICONS.chevronRight, 15)}
                </button>
              `)}
        </div>
        <div class="modal-actions"><button class="btn" @click=${() => this._showAddClient = false}>Cancel</button></div>
      </div>
    `;
  }

  private async _addClient(name: string) {
    if (!name || this.group.client_names.includes(name)) return;
    const updated: Group = { ...this.group, client_names: [...this.group.client_names, name] };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    await this.onStateChanged?.();
  }

  private async _removeClient(name: string) {
    const updated: Group = { ...this.group, client_names: this.group.client_names.filter((c) => c !== name) };
    // Auto-remove members whose clients are all gone from the group
    for (const member of this._members) {
      const remainingInGroup = member.client_names.filter((cn) => updated.client_names.includes(cn));
      if (remainingInGroup.length === 0) {
        updated.member_names = updated.member_names.filter((mn) => mn !== member.name);
        try {
          await this.hass.callWS({ type: "adguard_pc/members/delete", member_id: member.id });
        } catch { /* best-effort */ }
      }
    }
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    await this.onStateChanged?.();
  }

  private async _deleteGroup() {
    await this.hass.callWS({ type: "adguard_pc/groups/delete", group_id: this.group.id });
    this._showDeleteConfirm = false;
    await this.onStateChanged?.();
    this.onNavigate?.("groups");
  }

  private _renderAddMemberModal() {
    const available = this.state.members.filter((m) => !this.group.member_names.includes(m.name));
    return html`
      <div class="modal-scrim" @click=${() => (this._showAddMember = false)}></div>
      <div class="modal wide-modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-head"><h3>Add Member to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${available.length === 0
            ? html`<div class="empty-state">No available members.</div>`
            : available.map((m) => html`
                <button class="modal-list-item" @click=${() => { this._addMember(m.name); this._showAddMember = false; }}>
                  <span><strong>${m.name}</strong><small>${m.client_names.length} clients · ${m.assigned_policy_ids.length} policies</small></span>
                  ${this._icon(ICONS.chevronRight, 15)}
                </button>
              `)}
        </div>
        <div class="modal-actions"><button class="btn" @click=${() => (this._showAddMember = false)}>Cancel</button></div>
      </div>
    `;
  }

  private async _addMember(name: string) {
    if (!name || this.group.member_names.includes(name)) return;
    // Membership is independent from the group's direct client assignments.
    // Do not copy/delete member clients when changing group membership.
    const updated: Group = {
      ...this.group,
      member_names: [...this.group.member_names, name],
    };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    await this.onStateChanged?.();
  }

  private _renderAddPolicyModal() {
    const available = this.state.policies.filter((p) => !this.group.assigned_policy_ids.includes(p.id));
    return html`
      <div class="modal-scrim" @click=${() => (this._showAddPolicy = false)}></div>
      <div class="modal wide-modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-head"><h3>Add Policy to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${available.length === 0
            ? html`<div class="empty-state">No available policies.</div>`
            : available.sort((a, b) => b.priority - a.priority).map((p) => html`
                <button class="modal-list-item" @click=${async () => {
                  try {
                    await this._addPolicy(p.id);
                    this._showAddPolicy = false;
                  } catch (err) {
                    console.error("Failed to assign policy to group", err);
                  }
                }}>
                  <span><strong>${p.name}</strong><small>Priority ${p.priority} · ${p.rules.length} rules</small></span>
                  ${this._icon(ICONS.chevronRight, 15)}
                </button>
              `)}
        </div>
        <div class="modal-actions"><button class="btn" @click=${() => (this._showAddPolicy = false)}>Cancel</button></div>
      </div>
    `;
  }

  private async _addPolicy(policyId: string) {
    if (!policyId || this.group.assigned_policy_ids.includes(policyId)) return;
    await this.hass.callWS({
      type: "adguard_pc/groups/assign_policy",
      group_id: this.group.id,
      policy_id: policyId,
    });
    await this.onStateChanged?.();
  }

  private async _deleteMember(memberName: string) {
    if (!this.group.member_names.includes(memberName)) return;
    // Remove only the relationship between this member and this group.
    // The Member entity, its clients, policies and exceptions remain intact.
    const updated: Group = {
      ...this.group,
      member_names: this.group.member_names.filter((mn) => mn !== memberName),
    };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this._showDeleteMemberConfirm = null;
    await this.onStateChanged?.();
  }

  private _renderDeleteMemberModal() {
    return html`
      <div class="modal-scrim" @click=${() => (this._showDeleteMemberConfirm = null)}></div>
      <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-head"><h3>Remove member "${this._showDeleteMemberConfirm}"?</h3></div>
        <div class="modal-body"><p>This only removes the member from this group. The member, their clients, policies, and exceptions will remain unchanged.</p></div>
        <div class="modal-actions">
          <button class="btn" @click=${() => (this._showDeleteMemberConfirm = null)}>Cancel</button>
          <button class="btn danger" @click=${() => this._showDeleteMemberConfirm && this._deleteMember(this._showDeleteMemberConfirm)}>Remove from Group</button>
        </div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display:block; padding: 0 0 34px; color: var(--agpc-text); }
      .page { max-width: 1480px; margin: 0 auto; padding: 0 14px 34px; box-sizing: border-box; }
      .card { background:var(--agpc-card-bg, #151c31); border:1px solid var(--agpc-border, #27304a); border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.14); }
      .hero { padding: 22px 24px 20px; display:flex; justify-content:space-between; gap:24px; margin-bottom: 0; }
      .hero-main { display:flex; gap:18px; min-width:0; }
      .hero-icon { width:88px; height:88px; border-radius:50%; display:grid; place-items:center; background: linear-gradient(145deg,#2fcf67,#1f9c4c); color:#fff; flex:0 0 auto; box-shadow:0 10px 28px rgba(38,193,96,.22); }
      .hero-copy { min-width:0; }
      .title-line { display:flex; align-items:center; gap:10px; }
      h1 { margin:0; font-size:28px; letter-spacing:-.02em; }
      .description { margin-top:8px; color:var(--agpc-text-dim); font-size:14px; }
      .status-badge { display:inline-flex; align-items:center; padding:5px 9px; border-radius:8px; font-size:11px; font-weight:700; }
      .status-badge.active { color:#49e187; background:rgba(52,211,112,.12); }
      .stats { display:flex; gap:24px; margin-top:18px; flex-wrap:wrap; }
      .stat { display:flex; align-items:center; gap:8px; padding-right:24px; border-right:1px solid var(--agpc-border); }
      .stat:last-child { border-right:none; }
      .stat-icon { color:var(--agpc-text-dim); display:grid; }
      .stat div { display:grid; gap:2px; }
      .stat b { font-size:16px; }
      .stat span { font-size:12px; color:var(--agpc-text-dim); }
      .hero-actions { display:flex; gap:10px; align-items:flex-start; }
      .btn { display:inline-flex; align-items:center; gap:8px; padding:9px 13px; border:1px solid var(--agpc-border); background:rgba(255,255,255,.02); color:var(--agpc-text); border-radius:9px; cursor:pointer; font:inherit; font-size:13px; }
      .btn:hover { background:rgba(255,255,255,.05); }
      .btn.primary { background:var(--agpc-blue); border-color:var(--agpc-blue); color:#fff; }
      .btn.danger { border-color:rgba(248,113,113,.35); color:#ff8d8d; background:rgba(248,113,113,.04); }
      .btn.small { margin-top:12px; padding:7px 10px; font-size:12px; }
      .tabs { display:flex; gap:28px; padding:0 12px; border-bottom:1px solid var(--agpc-border); margin:2px 0 20px; }
      .tab { position:relative; border:0; background:none; color:var(--agpc-text-dim); padding:14px 6px 12px; cursor:pointer; font:inherit; font-size:13px; }
      .tab.active { color:var(--agpc-blue); }
      .tab.active::after { content:""; position:absolute; left:0; right:0; bottom:-1px; height:2px; background:var(--agpc-blue); border-radius:2px; }
      .overview-grid { display:grid; grid-template-columns: 1.1fr 1.1fr 1.1fr; gap:16px; }
      .info-card,.policy-card,.clients-card,.inheritance-card,.quick-card,.activity-card,.tab-card { padding:16px; }
      .inheritance-card { grid-column: 1; }
      .quick-card { grid-column: 2; }
      .activity-card { grid-column: 3; }
      .section-head { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom:14px; }
      .section-head h2 { margin:0; font-size:17px; }
      .section-head p { margin:5px 0 0; color:var(--agpc-text-dim); font-size:12px; }
      .icon-text-btn { background:none; border:0; color:var(--agpc-blue); cursor:pointer; display:inline-flex; gap:5px; align-items:center; font:inherit; font-size:12px; padding:3px 0; }
      .kv { display:grid; gap:16px; }
      .kv > div { display:grid; gap:5px; }
      .kv span { color:var(--agpc-text-dim); font-size:12px; }
      .kv strong { font-size:14px; font-weight:500; }
      .default-policy { display:flex; align-items:center; gap:14px; min-height:170px; padding:18px; background:rgba(255,255,255,.015); border:1px solid var(--agpc-border); border-radius:12px; }
      .default-policy-icon { width:52px; height:52px; border-radius:14px; display:grid; place-items:center; background:rgba(44,126,255,.14); color:var(--agpc-blue); flex:0 0 auto; }
      .default-policy-copy { flex:1; display:grid; gap:5px; min-width:0; }
      .default-policy-copy strong { font-size:14px; }
      .default-policy-copy span { color:var(--agpc-text-dim); font-size:12px; }
      .empty-large { min-height:170px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; text-align:center; color:var(--agpc-text-dim); }
      .empty-large strong { color:var(--agpc-text); font-size:14px; }
      .empty-large span { max-width:300px; font-size:12px; }
      .empty-large.compact { min-height:250px; }
      .empty-icon { width:52px; height:52px; border-radius:14px; background:rgba(44,126,255,.10); color:var(--agpc-blue); display:grid; place-items:center; margin-bottom:4px; }
      .client-row { display:flex; align-items:center; gap:10px; padding:11px 0; border-bottom:1px solid var(--agpc-border); cursor:pointer; }
      .client-row:last-of-type { border-bottom:none; }
      .client-avatar { width:34px; height:34px; border-radius:9px; background:rgba(255,255,255,.05); display:grid; place-items:center; color:var(--agpc-text-dim); }
      .client-main { flex:1; min-width:0; display:grid; gap:3px; }
      .client-main strong { font-size:13px; }
      .client-main span { font-size:11px; color:var(--agpc-text-dim); }
      .primary-pill { display:inline-flex; width:max-content; padding:2px 6px; border-radius:6px; background:rgba(44,126,255,.12); color:#7eb3ff !important; }
      .online { font-size:11px; display:flex; align-items:center; gap:5px; white-space:nowrap; }
      .online i { width:7px; height:7px; border-radius:50%; background:#6d7687; display:block; }
      .online.on { color:#41d97d; }
      .online.on i { background:#2bd36f; }
      .online.off { color:var(--agpc-text-dim); }
      .inherit-row { display:flex; justify-content:space-between; gap:10px; padding:10px 0; border-bottom:1px solid var(--agpc-border); font-size:12px; }
      .inherit-row:last-child { border-bottom:none; }
      .inherit-row > span { color:var(--agpc-text-dim); }
      .inherit-row div { display:flex; align-items:center; gap:8px; text-align:right; }
      .inherit-row strong { font-size:12px; font-weight:500; }
      .quick-action { width:100%; display:flex; align-items:center; gap:11px; padding:11px 0; border:0; background:none; color:var(--agpc-text); border-bottom:1px solid var(--agpc-border); cursor:pointer; text-align:left; }
      .quick-action:last-child { border-bottom:none; }
      .quick-icon { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; color:var(--agpc-blue); background:rgba(44,126,255,.10); flex:0 0 auto; }
      .quick-copy { flex:1; display:grid; gap:3px; }
      .quick-copy strong { font-size:13px; }
      .quick-copy small { color:var(--agpc-text-dim); font-size:11px; }
      .timeline-item { display:flex; gap:10px; padding:0 0 14px; }
      .dot { width:8px; height:8px; border-radius:50%; margin-top:5px; flex:0 0 auto; }
      .dot.green { background:#38d979; }
      .dot.blue { background:#4d8bff; }
      .dot.purple { background:#9b7cff; }
      .timeline-item div { display:grid; gap:3px; }
      .timeline-item strong { font-size:12px; }
      .timeline-item small { color:var(--agpc-text-dim); font-size:11px; }
      .full-link { width:100%; margin-top:4px; padding-top:11px; border:0; border-top:1px solid var(--agpc-border); background:none; color:var(--agpc-text); cursor:pointer; font:inherit; font-size:12px; }
      .tab-card { min-height:420px; }
      .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
      .btn-danger:hover { opacity:0.9; }
      .tab-row,.policy-row { display:flex; align-items:center; gap:12px; padding:14px 4px; border-bottom:1px solid var(--agpc-border); cursor:pointer; }
      .tab-row:last-child,.policy-row:last-child { border-bottom:none; }
      .row-icon { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; background:rgba(255,255,255,.05); color:var(--agpc-text-dim); }
      .row-main { flex:1; display:grid; gap:4px; min-width:0; }
      .row-main strong { font-size:13px; }
      .row-main span { color:var(--agpc-text-dim); font-size:11px; }
      .icon-btn { border:0; background:none; color:var(--agpc-text-dim); cursor:pointer; display:grid; place-items:center; padding:5px; }
      .priority { width:24px; height:24px; border-radius:7px; display:grid; place-items:center; background:rgba(255,255,255,.05); color:var(--agpc-text-dim); font-size:11px; }
      .empty-state,.empty-inline { color:var(--agpc-text-dim); font-size:12px; padding:18px 0; }
      .activity-row { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--agpc-border); }
      .activity-row:last-child { border-bottom:none; }
      .activity-row > div { display:grid; gap:3px; }
      .activity-row strong { font-size:13px; }
      .activity-row small { color:var(--agpc-text-dim); font-size:11px; }
      .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,.58); z-index:999; }
      .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card,#121827); border:1px solid var(--agpc-border,#26324a); border-radius:14px; padding:20px; min-width:340px; max-width:420px; box-shadow:0 18px 64px rgba(0,0,0,.45); }
      .wide-modal { min-width:420px; max-width:520px; }
      .modal-head h3 { margin:0; font-size:16px; }
      .modal-body { margin-top:14px; max-height:60vh; overflow-y:auto; }
      .modal-body p { margin:0; color:var(--agpc-text-dim); font-size:12px; }
      .modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:18px; }
      .modal-list-item { width:100%; display:flex; justify-content:space-between; align-items:center; padding:12px; margin-bottom:7px; background:rgba(255,255,255,.02); border:1px solid var(--agpc-border); border-radius:10px; color:var(--agpc-text); cursor:pointer; text-align:left; }
      .modal-list-item:hover { background:rgba(255,255,255,.05); }
      .modal-list-item span { display:grid; gap:4px; }
      .modal-list-item small { color:var(--agpc-text-dim); font-size:11px; }
      @media (max-width: 1180px) { .overview-grid { grid-template-columns: 1fr 1fr; } .activity-card { grid-column: 1 / -1; } }
      @media (max-width: 780px) { .page { padding:0 10px 24px; } .hero { flex-direction:column; } .overview-grid { grid-template-columns: 1fr; } .inheritance-card,.quick-card,.activity-card { grid-column:auto; } .tabs { gap:16px; padding:0 4px; overflow:auto; } .stats { gap:14px; } .stat { padding-right:14px; } .wide-modal,.modal { min-width:0; width:min(92vw, 520px); } }
    `,
  ];
}

declare global { interface HTMLElementTagNameMap { "group-view": GroupView; } }
