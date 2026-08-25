import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Member, GlobalState, QueryLogEntry } from "../data/websocket-api";

const ICONS = {
  arrow: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  trash: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z",
  close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  refresh: "M17.65,6.35C16.2,4.9 14.21,4 12,4C7.58,4 4.01,7.58 4.01,12C4.01,16.42 7.58,20 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z",
};

@customElement("member-view")
export class MemberView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public member!: Member;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _newException = "";
  @state() private _showDeleteConfirm = false;
  @state() private _showAddClient = false;
  @state() private _queryLogs: QueryLogEntry[] = [];
  @state() private _queryLoading = false;
  @state() private _queryLive = true;
  @state() private _querySearch = "";
  @state() private _queryType = "all";
  @state() private _queryClient = "all";
  @state() private _queryError = "";

  private _queryTimer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._startQueryPolling();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopQueryPolling();
  }

  updated(changed: PropertyValues) {
    if (changed.has("member")) this._loadQueryLog();
  }

  render() {
    if (!this.member) return html``;

    const clients = this.member.client_names
      .map((name) => this.state.clients.find((c) => c.name === name))
      .filter(Boolean) as GlobalState["clients"];
    const activePolicies = this._activePolicies();
    const activePolicy = activePolicies[0];
    const blocked = this._blockedServices(activePolicies);
    const allowed = this._allowedServices(activePolicies);
    const statusRestricted = activePolicies.length > 0 && (
      blocked.length > 0 || activePolicies.some((p) => p.rules.some((r) => r.action === "block"))
    );

    return html`
      <div class="page">
        <div class="breadcrumb"><span @click=${() => this.onNavigate?.("members")}>Members</span><span>›</span><strong>${this.member.name}</strong></div>

        <section class="hero card">
          <div class="avatar">${this.member.name.slice(0, 1).toUpperCase()}</div>
          <div class="hero-main">
            <div class="title-line">
              <h1>${this.member.name}</h1>
              <span class="pill green">Active</span>
            </div>
            <div class="hero-meta">
              <span>👥 ${this._groupName()}</span>
              <span>◈ ${activePolicy?.profile_id ? this._profileName(activePolicy.profile_id) : "No profile"}</span>
              <span>▣ ${activePolicies.length} active</span>
              <span>▱ ${clients.length} clients</span>
              <span>⇆ ${this.member.exceptions.length} exceptions</span>
            </div>
          </div>
          <div class="hero-actions">
            <button class="btn" @click=${this._editMember}>✎ Edit Member</button>
            <button class="icon-btn" title="Delete" @click=${() => { this._showDeleteConfirm = true; }}><ha-icon .path=${ICONS.trash}></ha-icon></button>
          </div>
        </section>

        <div class="layout">
          <main class="main-column">
            <div class="grid-3">
              <section class="card stat-card">
                <div class="section-title">Current Status</div>
                <div class="status-row">
                  <strong class=${statusRestricted ? "yellow" : "green-text"}>${statusRestricted ? "RESTRICTED" : "UNRESTRICTED"}</strong>
                  <div class="next-change">${activePolicy ? html`<span>Next change</span><strong>${this._nextChange(activePolicy)}</strong>` : html`<span>No active schedule</span>`}</div>
                </div>
                <div class="subtext">${activePolicy?.name || "No active policy"}${activePolicy?.time_schedule ? html` · ${this._scheduleText(activePolicy)}` : ""}</div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Allowed Services</div>
                <div class="service-line">
                  ${allowed.length ? allowed.slice(0, 3).map((s) => html`<span class="service allowed"><span class="service-dot">✓</span>${s}</span>`) : html`<span class="muted">No explicit allow rules</span>`}
                </div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Blocked Services</div>
                <div class="service-line">
                  ${blocked.length ? blocked.slice(0, 4).map((s) => html`<span class="service blocked"><span class="service-dot">×</span>${s}</span>`) : html`<span class="muted">No explicit blocked services</span>`}
                  ${blocked.length > 4 ? html`<span class="more">+${blocked.length - 4}</span>` : ""}
                </div>
              </section>
            </div>

            <section class="card section-card">
              <div class="section-head"><h2>Assigned Clients (${clients.length})</h2><button class="btn small" @click=${() => this.onNavigate?.("clients")}>Manage Clients</button></div>
              <table class="table">
                <thead><tr><th>CLIENT</th><th>IP ADDRESS</th><th>STATUS</th><th>CURRENT POLICY</th><th>LAST SEEN</th><th></th></tr></thead>
                <tbody>
                  ${clients.map((client) => html`
                    <tr @click=${() => this.onNavigate?.("client-detail", client)}>
                      <td><div class="client-cell"><span class="device-icon">▣</span><div><strong>${client.name}</strong>${client === clients[0] ? html`<small>Primary device</small>` : ""}</div></div></td>
                      <td class="mono">${client.ids[0] || "—"}</td>
                      <td><span class="pill ${statusRestricted ? "yellow-pill" : "green"}">${statusRestricted ? "RESTRICTED" : "NORMAL"}</span></td>
                      <td>${activePolicy?.name || "Default"}<small class="cell-sub">${activePolicy?.time_schedule ? this._scheduleText(activePolicy) : "All day"}</small></td>
                      <td class="last-seen">${this._lastSeen(client.name)}</td>
                      <td class="arrow">›</td>
                    </tr>
                  `)}
                </tbody>
              </table>
              ${!clients.length ? html`<div class="empty">No clients assigned. Add a client below.</div>` : ""}
              <div class="add-row">
                <button class="btn" @click=${() => { this._showAddClient = true; }}>+ Add Client</button>
              </div>
            </section>

            <section class="card section-card">
              <div class="section-head"><h2>Active Policy</h2>${activePolicy ? html`<button class="btn small" @click=${() => this.onNavigate?.("policy-detail", activePolicy)}>View Policy ↗</button>` : ""}</div>
              ${activePolicy ? html`
                <div class="policy-banner">
                  <div class="policy-icon">☾</div>
                  <div class="policy-main"><strong>${activePolicy.name}</strong><span>${this._scheduleText(activePolicy)}</span></div>
                  <span class="pill purple">${this._policyMode(activePolicy)}</span>
                  <div class="policy-meta"><span>Schedule<br><strong>${this._scheduleDays(activePolicy)}</strong></span><span>Profile<br><strong>${activePolicy.profile_id ? this._profileName(activePolicy.profile_id) : "None"}</strong></span></div>
                </div>
              ` : html`<div class="empty">No active policy at the current time.</div>`}
            </section>

            <div class="grid-2">
              <section class="card section-card compact">
                <div class="section-head"><h2>Exceptions (${this.member.exceptions.length})</h2><button class="btn small" @click=${this._addException}>＋ Add Exception</button></div>
                ${this.member.exceptions.length ? this.member.exceptions.map((ex) => html`<div class="exception"><span>${ex}</span><button class="icon-btn" @click=${() => this._removeException(ex)}>×</button></div>`) : html`<div class="empty">No exceptions for this member</div>`}
                <div class="inline-add"><input class="field" placeholder="domain.com" .value=${this._newException} @input=${(e: Event) => this._newException = (e.target as HTMLInputElement).value} @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._addException()}></div>
              </section>
              <section class="card section-card compact">
                <div class="section-head"><h2>Overrides (${this.state.overrides.filter((o) => o.target_type === "member" && o.target === this.member.name && !this._expired(o.expires)).length})</h2><button class="btn small" @click=${() => this.onNavigate?.("override")}>＋ New Override</button></div>
                <div class="empty">No active overrides</div>
              </section>
            </div>
          </main>

          <aside class="query-panel card">
            <div class="query-head">
              <div><h2>DNS Query Log <span>(Live)</span></h2><small>Latest DNS queries for this member</small></div>
              <div class="live-controls"><span class="live-dot ${this._queryLive ? "on" : ""}">● Live</span><button class="icon-btn" title="Pause" @click=${() => { this._queryLive = !this._queryLive; this._queryLive ? this._startQueryPolling() : this._stopQueryPolling(); }}>${this._queryLive ? "Ⅱ" : "▶"}</button></div>
            </div>
            <div class="filters">
              <select class="field" @change=${(e: Event) => { this._queryClient = (e.target as HTMLSelectElement).value; }}>
                <option value="all">All Clients</option>
                ${clients.map((c) => html`<option value="${c.name}">${c.name}</option>`)}
              </select>
              <select class="field" @change=${(e: Event) => { this._queryType = (e.target as HTMLSelectElement).value; }}>
                <option value="all">All Types</option><option value="A">A</option><option value="AAAA">AAAA</option><option value="HTTPS">HTTPS</option><option value="TXT">TXT</option>
              </select>
              <input class="field search" placeholder="Search domain…" .value=${this._querySearch} @input=${(e: Event) => this._querySearch = (e.target as HTMLInputElement).value}>
              <button class="icon-btn" title="Refresh" @click=${this._loadQueryLog}><ha-icon .path=${ICONS.refresh}></ha-icon></button>
            </div>
            ${this._queryError ? html`<div class="query-error">${this._queryError}</div>` : ""}
            <div class="query-table-wrap">
              <table class="table query-table">
                <thead><tr><th>TIME</th><th>CLIENT</th><th>DOMAIN / QUERY</th><th>RESPONSE</th><th>ACTION</th><th>TYPE</th></tr></thead>
                <tbody>
                  ${this._filteredLogs().slice(0, 50).map((q) => html`
                    <tr>
                      <td class="time">${this._formatTime(q.time)}</td>
                      <td>${q.member_client || q.client}</td>
                      <td><strong>${q.question?.host || "—"}</strong></td>
                      <td class="response">${this._response(q)}</td>
                      <td>${this._isBlocked(q) ? html`<span class="pill red">BLOCKED</span>` : html`<span class="pill green">ALLOWED</span>`}</td>
                      <td>${q.question?.type || "A"}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
              ${this._queryLoading && !this._queryLogs.length ? html`<div class="empty loading-log">Loading query log…</div>` : ""}
              ${!this._queryLoading && !this._filteredLogs().length ? html`<div class="empty loading-log">No DNS queries found for this member.</div>` : ""}
            </div>
            <div class="query-foot"><span>Auto-scroll <button class="switch ${this._queryLive ? "on" : ""}" @click=${() => this._queryLive = !this._queryLive}><i></i></button></span><button class="btn small" @click=${() => this.onNavigate?.("logs")}>View Full Logs</button></div>
          </aside>
        </div>

        <section class="card timeline-card">
          <div class="section-head"><h2>Today Activity Timeline</h2><span class="legend"><i class="allowed-dot"></i> Allowed <i class="blocked-dot"></i> Blocked <i class="unknown-dot"></i> Unknown</span></div>
          ${clients.map((client) => html`
            <div class="timeline-row"><div class="timeline-label"><strong>${client.name}</strong><small>${client.ids[0] || ""}</small></div><div class="timeline"><span class="tick t0">00:00</span><span class="tick t4">04:00</span><span class="tick t8">08:00</span><span class="tick t12">12:00</span><span class="tick t16">16:00</span><span class="tick t20">20:00</span><span class="tick t24">24:00</span><div class="bar"><span class="seg allowed"></span><span class="seg blocked"></span><span class="now"></span></div></div></div>
          `)}
        </section>
      </div>

      ${this._showDeleteConfirm ? html`
        <div class="modal-scrim" @click=${() => this._showDeleteConfirm = false}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete member "${this.member.name}"?</h3></div>
          <div class="modal-body"><p>This cannot be undone. Clients and policies will not be deleted.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${() => this._showDeleteConfirm = false}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteMember}>Delete</button>
          </div>
        </div>
      ` : ""}

      ${this._showAddClient ? html`
        <div class="modal-scrim" @click=${() => this._showAddClient = false}></div>
        <div class="modal">
          <div class="modal-head"><h3>Add Client to "${this.member.name}"</h3></div>
          <div class="modal-body">
            ${this.state.clients.filter((c) => !this.member.client_names.includes(c.name)).length === 0
              ? html`<p class="empty">No available clients</p>`
              : this.state.clients
                  .filter((c) => !this.member.client_names.includes(c.name))
                  .map((c) => html`
                    <div class="modal-list-item" @click=${() => { this._addClient(c.name); this._showAddClient = false; }}>
                      <span>${c.name}</span>
                      <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                    </div>
                  `)
            }
          </div>
          <div class="modal-actions">
            <button class="btn" @click=${() => this._showAddClient = false}>Cancel</button>
          </div>
        </div>
      ` : ""}
    `;
  }

  private _activePolicies() {
    const ids = new Set(this.member.assigned_policy_ids);
    for (const group of this.state.groups) if (group.member_names.includes(this.member.name)) group.assigned_policy_ids.forEach((id) => ids.add(id));
    const now = new Date();
    return [...ids].map((id) => this.state.policies.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p && this._scheduleActive(p, now)).sort((a, b) => b.priority - a.priority);
  }

  private _scheduleActive(policy: any, now: Date) {
    if (!policy.time_schedule) return true;
    const days = policy.time_schedule.days || [];
    const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][now.getDay()];
    if (days.length && !days.includes(day)) return false;
    const from = policy.time_schedule.time_from;
    const to = policy.time_schedule.time_to;
    if (!from || !to) return true;
    const cur = now.getHours() * 60 + now.getMinutes();
    const f = this._minutes(from), t = this._minutes(to);
    return f <= t ? cur >= f && cur <= t : cur >= f || cur <= t;
  }

  private _minutes(s: string) { const [h, m] = s.split(":").map(Number); return h * 60 + m; }
  private _scheduleText(p: any) { return p.time_schedule ? `${p.time_schedule.time_from || "00:00"} – ${p.time_schedule.time_to || "24:00"}` : "All day"; }
  private _scheduleDays(p: any) { return p.time_schedule?.days?.length ? p.time_schedule.days.map((d: string) => d.slice(0, 1).toUpperCase() + d.slice(1)).join(" · ") : "Every day"; }
  private _policyMode(p: any) { const allows = p.rules?.filter((r: any) => r.action === "allow").length || 0; return allows ? "ALLOW ONLY" : "RESTRICTED"; }
  private _groupName() { return this.state.groups.find((g) => g.member_names.includes(this.member.name))?.name || "Unassigned"; }
  private _profileName(id: string) { return this.state.profiles.find((p) => p.id === id)?.name || id; }
  private _nextChange(p: any) { return p.time_schedule?.time_to || "—"; }
  private _blockedServices(policies: any[]) { return [...new Set(policies.flatMap((p) => p.rules.filter((r: any) => r.rule_type === "service" && r.action === "block").map((r: any) => r.target)))]; }
  private _allowedServices(policies: any[]) { return [...new Set(policies.flatMap((p) => p.rules.filter((r: any) => r.rule_type === "service" && r.action === "allow").map((r: any) => r.target)))]; }
  private _lastSeen(clientName: string) { const q = this._queryLogs.find((x) => x.member_client === clientName); return q ? `${this._formatTime(q.time)} · Online` : "—"; }
  private _expired(expires: string | null) { return !!expires && new Date(expires).getTime() <= Date.now(); }
  private _editMember() { /* Reserved for the future member editor. */ }

  private _filteredLogs() {
    return this._queryLogs.filter((q) => {
      const host = q.question?.host?.toLowerCase() || "";
      const client = q.member_client || q.client || "";
      const searchOk = !this._querySearch.trim() || host.includes(this._querySearch.trim().toLowerCase());
      const clientOk = this._queryClient === "all" || client === this._queryClient;
      const typeOk = this._queryType === "all" || q.question?.type === this._queryType;
      return searchOk && clientOk && typeOk && !!client;
    });
  }

  private _isBlocked(q: QueryLogEntry) {
    const reason = (q.reason || "").toLowerCase();
    return reason.includes("filtered") || reason.includes("blocked") || reason.includes("blacklist") || reason.includes("parental") || reason.includes("service");
  }
  private _response(q: QueryLogEntry) { return q.answer?.[0]?.value || (this._isBlocked(q) ? "Blocked" : q.status || "—"); }
  private _formatTime(value: string) { const d = new Date(value); return Number.isNaN(d.getTime()) ? value.slice(11, 19) : d.toLocaleTimeString([], { hour12: false }); }

  private _startQueryPolling() { this._stopQueryPolling(); if (this._queryLive) { this._loadQueryLog(); this._queryTimer = window.setInterval(() => this._loadQueryLog(), 5000); } }
  private _stopQueryPolling() { if (this._queryTimer) { window.clearInterval(this._queryTimer); this._queryTimer = undefined; } }
  private async _loadQueryLog() {
    if (!this.member || !this.hass || this._queryLoading) return;
    this._queryLoading = true;
    try {
      const data = await this.hass.callWS({ type: "adguard_pc/members/querylog", member_id: this.member.id, limit: 80, search: "", response_status: "" });
      this._queryLogs = data?.data || [];
      this._queryError = "";
    } catch (err) {
      this._queryError = err instanceof Error ? err.message : "Unable to load AdGuard query log";
    } finally { this._queryLoading = false; }
  }

  private async _handleAddClient(e: Event) { const val = (e.target as HTMLSelectElement).value; if (val) await this._addClient(val); (e.target as HTMLSelectElement).value = ""; }
  private async _addClient(name: string) { if (!name || this.member.client_names.includes(name)) return; const updated = { ...this.member, client_names: [...this.member.client_names, name] }; await this.hass.callWS({ type: "adguard_pc/members/update", member: updated }); this.member = updated; this.onStateChanged?.(); this._loadQueryLog(); }
  private async _removeClient(name: string) { const updated = { ...this.member, client_names: this.member.client_names.filter((c) => c !== name) }; await this.hass.callWS({ type: "adguard_pc/members/update", member: updated }); this.member = updated; this.onStateChanged?.(); this._loadQueryLog(); }
  private async _addException() { if (!this._newException.trim()) return; const updated = { ...this.member, exceptions: [...this.member.exceptions, this._newException.trim()] }; await this.hass.callWS({ type: "adguard_pc/members/update", member: updated }); this.member = updated; this._newException = ""; this.onStateChanged?.(); }
  private async _removeException(ex: string) { const updated = { ...this.member, exceptions: this.member.exceptions.filter((e) => e !== ex) }; await this.hass.callWS({ type: "adguard_pc/members/update", member: updated }); this.member = updated; this.onStateChanged?.(); }
  private _handleDeleteDialog() { this._showDeleteConfirm = false; }
  private async _deleteMember() { await this.hass.callWS({ type: "adguard_pc/members/delete", member_id: this.member.id }); this._showDeleteConfirm = false; this.onStateChanged?.(); this.onNavigate?.("dashboard"); }

  static styles = css`
    :host { display: block; color: var(--agpc-text, #eef2ff); }
    .page { padding: 0 14px 28px; max-width: 1680px; margin: 0 auto; }
    .card { background: var(--agpc-card-bg, #151c31); border: 1px solid var(--agpc-border, #27304a); border-radius: 12px; box-sizing: border-box; }
    .breadcrumb { height: 42px; display:flex; align-items:center; gap:10px; color:var(--agpc-text-faint,#71809f); font-size:13px; }
    .breadcrumb span:first-child { cursor:pointer; }.breadcrumb strong { color:var(--agpc-text,#eef2ff); }
    .hero { min-height:108px; display:flex; align-items:center; padding:18px 20px; gap:18px; }
    .avatar { width:68px; height:68px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(135deg,#3d67a9,#25355c); border:2px solid #536a95; font-size:28px; font-weight:800; }
    .hero-main { flex:1; min-width:0; }.title-line { display:flex; align-items:center; gap:12px; }.title-line h1 { margin:0; font-size:24px; }.hero-meta { display:flex; flex-wrap:wrap; gap:20px; color:#9aa6c0; font-size:12px; margin-top:12px; }.hero-actions { display:flex; gap:8px; align-self:flex-start; }
    .layout { display:grid; grid-template-columns:minmax(0,1fr) 500px; gap:12px; margin-top:12px; align-items:start; }.main-column { min-width:0; }.grid-3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .stat-card { min-height:122px; padding:16px; }.section-title { font-size:13px; font-weight:700; margin-bottom:16px; }.status-row { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }.status-row strong { font-size:16px; }.yellow { color:#f3bd38; }.green-text { color:#2bd88f; }.subtext,.muted { color:#7e8aa4; font-size:12px; margin-top:10px; }.next-change { text-align:right; color:#7e8aa4; font-size:11px; }.next-change strong { display:block; color:#eef2ff; font-size:15px; margin-top:3px; }
    .service-line { display:flex; flex-wrap:wrap; gap:7px; align-items:center; }.service { display:inline-flex; align-items:center; gap:6px; padding:6px 8px; border-radius:8px; background:#11172a; border:1px solid #26304a; font-size:11px; }.service.allowed { color:#42e09a; }.service.blocked { color:#ff6464; }.service-dot { font-weight:900; }.more { font-size:11px; color:#7e8aa4; }
    .section-card { padding:16px; margin-top:12px; }.section-card.compact { min-height:130px; }.section-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }.section-head h2 { margin:0; font-size:15px; }.table { width:100%; border-collapse:collapse; }.table th { text-align:left; font-size:9px; color:#65728f; font-weight:700; letter-spacing:.05em; padding:0 8px 9px; border-bottom:1px solid #29324a; }.table td { padding:10px 8px; border-bottom:1px solid #202942; font-size:11px; color:#cdd5e8; }.table tbody tr { cursor:pointer; }.table tbody tr:hover { background:#18213a; }.table tbody tr:last-child td { border-bottom:0; }.client-cell { display:flex; align-items:center; gap:9px; }.client-cell strong { display:block; color:#f2f5ff; }.client-cell small,.cell-sub { display:block; color:#66738e; font-size:9px; margin-top:3px; }.device-icon { width:27px; height:27px; display:grid; place-items:center; background:#1d2945; border-radius:7px; color:#78a6ff; }.mono { font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }.last-seen { color:#39d991!important; }.arrow { color:#60708f!important; font-size:18px!important; }.add-row { margin-top:12px; }.add-row ha-select { width:100%; }.empty { color:#687691; font-size:12px; font-style:italic; padding:12px 0; }.policy-banner { display:flex; align-items:center; gap:14px; min-height:72px; padding:12px 14px; background:#10182d; border:1px solid #293452; border-radius:9px; }.policy-icon { width:38px; height:38px; border-radius:10px; background:#34285c; color:#c5a6ff; display:grid; place-items:center; font-size:20px; }.policy-main { flex:1; }.policy-main strong { display:block; }.policy-main span { display:block; color:#73809b; font-size:11px; margin-top:4px; }.policy-meta { display:flex; gap:28px; color:#7b87a0; font-size:10px; }.policy-meta strong { color:#d8deed; font-size:11px; }.exception { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #202942; font-size:12px; }.inline-add { margin-top:9px; }.field { background:#10172a; border:1px solid #2b3550; color:#e9edf8; border-radius:7px; padding:8px 9px; font:inherit; box-sizing:border-box; outline:none; }.field:focus { border-color:#4e86ff; }.inline-add .field { width:100%; }
    .query-panel { position:sticky; top:12px; overflow:hidden; }.query-head { display:flex; justify-content:space-between; gap:12px; padding:16px; border-bottom:1px solid #29324a; }.query-head h2 { margin:0; font-size:15px; }.query-head h2 span { color:#75829b; font-weight:500; }.query-head small { display:block; color:#66738e; font-size:10px; margin-top:5px; }.live-controls { display:flex; align-items:flex-start; gap:7px; }.live-dot { color:#71809d; font-size:10px; padding-top:5px; }.live-dot.on { color:#38dc91; }.filters { display:grid; grid-template-columns:1fr 1fr; gap:7px; padding:10px; border-bottom:1px solid #29324a; }.filters .search { grid-column:1 / -1; }.filters .icon-btn { position:absolute; margin-left:448px; margin-top:1px; }.query-table-wrap { max-height:620px; overflow:auto; }.query-table { min-width:620px; }.query-table th { position:sticky; top:0; background:#151c31; z-index:1; }.query-table td { white-space:nowrap; }.query-table .time { color:#7f8ca7; font-variant-numeric:tabular-nums; }.query-table .response { max-width:120px; overflow:hidden; text-overflow:ellipsis; }.query-error { margin:8px 10px 0; padding:8px; border-radius:7px; background:#3a1e2a; color:#ff8c9c; font-size:11px; }.query-foot { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-top:1px solid #29324a; color:#7c88a0; font-size:10px; }.query-foot > span { display:flex; align-items:center; gap:7px; }.switch { width:30px; height:17px; padding:2px; border:0; border-radius:10px; background:#35405a; cursor:pointer; }.switch i { display:block; width:13px; height:13px; border-radius:50%; background:#a1aac0; transition:.15s; }.switch.on { background:#20c981; }.switch.on i { transform:translateX(13px); background:#fff; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; color:var(--agpc-text,#eef2ff); }
    .modal-body p { margin:0 0 16px; color:var(--agpc-text-faint,#7e8aa4); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .modal-list-item { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-bottom:1px solid var(--agpc-border,#27304a); cursor:pointer; border-radius:6px; }
    .modal-list-item:hover { background:var(--agpc-sidebar-hover,#1b253e); }
    .modal-list-item:last-child { border-bottom:none; }
    .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
    .btn-danger:hover { opacity:0.9; }
    .timeline-card { margin-top:12px; padding:16px; }.legend { display:flex; gap:10px; align-items:center; color:#78859e; font-size:10px; }.legend i { width:8px; height:8px; border-radius:2px; display:inline-block; }.allowed-dot { background:#25c987; }.blocked-dot { background:#cf4b55; }.unknown-dot { background:#59637a; }.timeline-row { display:grid; grid-template-columns:150px 1fr; gap:14px; align-items:center; margin:16px 0; }.timeline-label strong { display:block; font-size:11px; }.timeline-label small { color:#65728e; font-size:9px; }.timeline { position:relative; padding-top:18px; }.bar { height:10px; border-radius:5px; background:#283047; overflow:hidden; position:relative; }.seg.allowed { position:absolute; left:0; width:58%; height:100%; background:#20b77c; }.seg.blocked { position:absolute; left:58%; width:31%; height:100%; background:#b94650; }.now { position:absolute; left:73%; top:-5px; width:2px; height:20px; background:#f3c73f; }.tick { position:absolute; top:0; color:#56627b; font-size:8px; transform:translateX(-50%); }.t0{left:0}.t4{left:16.67%}.t8{left:33.33%}.t12{left:50%}.t16{left:66.67%}.t20{left:83.33%}.t24{right:0;transform:none}
    .pill { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:9px; font-weight:800; letter-spacing:.04em; }.pill.green { background:#103c31; color:#34db95; }.pill.red { background:#441d28; color:#ff6875; }.pill.yellow-pill { background:#45381b; color:#f0bd35; }.pill.purple { background:#32294e; color:#bd9bff; }.btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #2e3853; background:#151e34; color:#d8dff0; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }.btn:hover { background:#1b2741; }.btn.small { padding:6px 9px; font-size:10px; }.icon-btn { width:31px; height:31px; display:grid; place-items:center; border:1px solid transparent; border-radius:7px; background:transparent; color:#8390aa; cursor:pointer; }.icon-btn:hover { background:#1b253e; color:#eaf0ff; border-color:#2d3853; }
    @media (max-width:1250px) { .layout { grid-template-columns:1fr; }.query-panel { position:relative; top:auto; }.query-table-wrap { max-height:460px; } }
    @media (max-width:760px) { .page{padding:0 8px 20px}.grid-3,.grid-2{grid-template-columns:1fr}.hero{align-items:flex-start}.hero-actions{margin-left:auto}.hero-meta{gap:10px}.timeline-row{grid-template-columns:1fr}.query-table-wrap{overflow-x:auto}.query-panel{width:100%} }
  `;
}

declare global { interface HTMLElementTagNameMap { "member-view": MemberView; } }
