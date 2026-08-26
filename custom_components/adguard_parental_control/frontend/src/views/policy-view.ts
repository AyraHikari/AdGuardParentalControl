import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GlobalState, Policy, PolicyRule, ServiceInfo } from "../data/websocket-api";

type Tab = "general" | "rules" | "schedule" | "calendar" | "exceptions" | "preview";

@customElement("policy-view")
export class PolicyView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public policy!: Policy;
  @property({ type: Boolean }) public narrow = false;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _tab: Tab = "general";
  @state() private _draft: Policy | null = null;
  @state() private _dirty = false;
  @state() private _showDeleteConfirm = false;
  @state() private _showAddRule = false;
  @state() private _showAddException = false;
  @state() private _newRuleTarget = "";
  @state() private _newRuleAction: "block" | "allow" = "block";
  @state() private _newRuleType: "domain" | "service" | "category" = "domain";
  @state() private _newRuleIsRegex = false;
  @state() private _newExceptionTarget = "";
  @state() private _newExceptionType: "domain" | "service" | "category" = "domain";
  @state() private _newExceptionIsRegex = false;
  @state() private _availableServices: ServiceInfo[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._loadServices();
  }

  protected updated(changed: Map<PropertyKey, unknown>) {
    if (changed.has("policy")) {
      this._draft = this._clonePolicy(this.policy);
      this._dirty = false;
    }
    if (changed.has("hass") && this.hass && !this._availableServices.length) {
      this._loadServices();
    }
  }

  private get _p(): Policy {
    return this._draft || this.policy;
  }

  render() {
    if (!this.policy) return html``;

    return html`
      <div class="page">
        ${this._renderHeader()}
        ${this._renderTabs()}
        <div class="content">
          ${this._tab === "general" ? this._renderGeneral() : ""}
          ${this._tab === "rules" ? this._renderRules() : ""}
          ${this._tab === "schedule" ? this._renderSchedule() : ""}
          ${this._tab === "calendar" ? this._renderCalendar() : ""}
          ${this._tab === "exceptions" ? this._renderExceptions() : ""}
          ${this._tab === "preview" ? this._renderPreview() : ""}
        </div>
      </div>

      ${this._showDeleteConfirm ? html`
        <div class="modal-scrim" @click=${() => (this._showDeleteConfirm = false)}></div>
        <div class="modal" role="dialog" aria-modal="true">
          <h3>Delete policy?</h3>
          <p>"${this._p.name}" will be removed and unassigned from all groups, members and clients.</p>
          <div class="modal-actions">
            <button class="btn" @click=${() => (this._showDeleteConfirm = false)}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deletePolicy}>Delete</button>
          </div>
        </div>
      ` : ""}
    `;
  }

  private _renderHeader() {
    return html`
      <div class="breadcrumb"><span @click=${() => this.onNavigate?.("policies")}>Policies</span><span>›</span><strong>${this._p.name || "Untitled"}</strong></div>
      <section class="hero card">
        <div class="hero-icon">☾</div>
        <div class="hero-main">
          <div class="title-line">
            <h1>${this._p.name || "Untitled"}</h1>
            <label class="policy-status-switch ${this._p.enabled !== false ? "enabled" : "disabled"}" title=${this._p.enabled !== false ? "Disable policy" : "Enable policy"} @click=${(e: Event) => e.stopPropagation()}>
              <input type="checkbox" .checked=${this._p.enabled !== false} @change=${this._onEnabledChange} />
              <span class="switch-slider"></span>
              <strong>${this._p.enabled !== false ? "ENABLED" : "DISABLED"}</strong>
            </label>
          </div>
          <div class="hero-meta">
            <span>Priority: ${this._p.priority}</span>
            <span>Profile: ${this._getProfileName()}</span>
            <span>Rules: ${this._p.rules.length}${this._p.exceptions?.length ? ` + ${this._p.exceptions.length} exceptions` : ""}</span>
            <span>Applies to: ${this._getAppliesTo()}</span>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn" @click=${() => this._resetDraft()} ?disabled=${!this._dirty}>Cancel</button>
          <button class="btn primary" @click=${this._saveDraft} ?disabled=${!this._dirty}>Save</button>
          <button class="btn btn-hero-delete" @click=${() => (this._showDeleteConfirm = true)}>Delete</button>
        </div>
      </section>
    `;
  }

  private _renderTabs() {
    const tabs: Array<[Tab, string]> = [
      ["general", "General"],
      ["rules", `Rules${this._p.rules.length ? ` (${this._p.rules.length})` : ""}`],
      ["schedule", "Schedule"],
      ["calendar", "Calendar Condition"],
      ["exceptions", `Exceptions${this._p.exceptions?.length ? ` (${this._p.exceptions.length})` : ""}`],
      ["preview", "Preview"],
    ];
    return html`
      <nav class="tabs" aria-label="Policy sections">
        ${tabs.map(([id, label]) => html`
          <button class=${this._tab === id ? "tab active" : "tab"} @click=${() => (this._tab = id)}>${label}</button>
        `)}
      </nav>
    `;
  }

  private _renderGeneral() {
    const applies = this._getAppliesTo();
    return html`
      <div class="grid">
        <section class="card">
          <div class="card-title">Basic Information</div>
          <div class="card-body">
            <label>Name</label>
            <input class="input" .value=${this._p.name} @input=${this._onNameInput} />
            <label>Description <span class="muted">optional</span></label>
            <textarea class="textarea" maxlength="200" .value=${this._p.description || ""} @input=${this._onDescriptionInput}></textarea>
            <div class="form-row three">
              <div>
                <label>Priority</label>
                <div class="stepper">
                  <input class="input" type="number" .value=${String(this._p.priority)} @input=${this._onPriorityInput} />
                  <button @click=${() => this._setPriority(this._p.priority - 1)}>−</button>
                  <button @click=${() => this._setPriority(this._p.priority + 1)}>+</button>
                </div>
              </div>
              <div>
                <label>Profile</label>
                <select class="select" .value=${this._p.profile_id || ""} @change=${this._onProfileChange}>
                  <option value="">None</option>
                  ${this.state.profiles.map((p) => html`<option value=${p.id}>${p.name}</option>`)}
                </select>
              </div>
              <div>
                <label>Status</label>
                <label class="policy-status-switch form-status-switch ${this._p.enabled !== false ? "enabled" : "disabled"}">
                  <input type="checkbox" .checked=${this._p.enabled !== false} @change=${this._onEnabledChange} />
                  <span class="switch-slider"></span>
                  <strong>${this._p.enabled !== false ? "Enabled" : "Disabled"}</strong>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section class="card summary-card">
          <div class="card-title">Policy Summary</div>
          <div class="card-body summary">
            <div><span>State</span><b class=${this._p.enabled !== false ? "green" : "red"}>${this._p.enabled !== false ? "Enabled" : "Disabled"}</b></div>
            <div><span>Priority</span><b>${this._p.priority}</b></div>
            <div><span>Profile</span><b>${this._getProfileName()}</b></div>
            <div><span>Applies to</span><b>${applies}</b></div>
            <div><span>Schedule</span><b>${this._scheduleText()}</b></div>
            <div><span>Calendar</span><b>${this._calendarText()}</b></div>
            <div><span>Rules</span><b>${this._p.rules.length}${this._p.exceptions?.length ? ` + ${this._p.exceptions.length} exception${this._p.exceptions.length === 1 ? "" : "s"}` : ""}</b></div>
            <button class="wide-btn" @click=${() => (this._tab = "preview")}>Preview Effective Policy</button>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Applies To</div>
          <div class="card-body">
            <p class="help">Policy assignments are managed from Groups, Members and Clients. This view shows where this policy is currently assigned.</p>
            <div class="assignment-grid">
              <div><span class="eyebrow">Groups</span><div class="chip-list">${this._getAssignedGroups().length ? this._getAssignedGroups().map(x => html`<span class="chip">${x}</span>`) : html`<span class="muted">None</span>`}</div></div>
              <div><span class="eyebrow">Members</span><div class="chip-list">${this._getAssignedMembers().length ? this._getAssignedMembers().map(x => html`<span class="chip">${x}</span>`) : html`<span class="muted">None</span>`}</div></div>
              <div><span class="eyebrow">Clients</span><div class="chip-list">${this._getAssignedClients().length ? this._getAssignedClients().map(x => html`<span class="chip">${x}</span>`) : html`<span class="muted">None</span>`}</div></div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Tags <span class="muted">optional</span></div>
          <div class="card-body">
            <div class="chip-list editable">
              ${(this._p.tags || []).map((tag) => html`<span class="chip">${tag}<button @click=${() => this._removeTag(tag)}>×</button></span>`)}
            </div>
            <div class="tag-add"><input id="tag-input" class="input" placeholder="Add tag..." @keydown=${this._onTagKeydown} /><button class="btn" @click=${this._addTagFromInput}>Add</button></div>
          </div>
        </section>

      </div>
    `;
  }

  private _renderRules() {
    return html`
      <section class="card">
        <div class="card-title row-between"><span>Rules</span><button class="btn primary" @click=${() => (this._showAddRule = !this._showAddRule)}>＋ Add Rule</button></div>
        <div class="card-body">
          ${this._showAddRule ? this._renderRuleForm(false) : ""}
          ${this._p.rules.length ? html`
            <table class="data-table"><thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead><tbody>
              ${this._p.rules.map((r, i) => html`<tr>
                <td><span class="badge">${r.rule_type}</span></td>
                <td class="mono">${r.target}${r.is_regex ? html` <span class="regex-badge">.*</span>` : ""}</td>
                <td><span class=${r.action === "block" ? "status-dot blocked" : "status-dot allowed"}>${r.action}</span></td>
                <td class="end"><button class="text-btn danger-text" @click=${() => this._removeRule(i)}>Remove</button></td>
              </tr>`)}
            </tbody></table>
          ` : html`<div class="empty-box">No rules defined. This policy currently contributes no explicit domain, service or category rules.</div>`}
        </div>
      </section>

      <section class="card hint-card">
        <div class="hint-title">Rule behavior</div>
        <p>Rules are evaluated with the policy priority and then merged with profile, member and client rules. Use the Exceptions tab for explicit allow rules that should override a block.</p>
      </section>
    `;
  }

  private _renderRuleForm(exception: boolean) {
    const ruleType = exception ? this._newExceptionType : this._newRuleType;
    const isService = ruleType === "service";
    const targetValue = exception ? this._newExceptionTarget : this._newRuleTarget;
    const isRegex = exception ? this._newExceptionIsRegex : this._newRuleIsRegex;

    const onTypeChange = (e: Event) => {
      const val = (e.target as HTMLSelectElement).value as any;
      if (exception) this._newExceptionType = val;
      else this._newRuleType = val;
      // Clear target when switching type
      if (exception) this._newExceptionTarget = "";
      else this._newRuleTarget = "";
      // Pre-load services when switching to service type
      if (val === "service") this._loadServices();
    };

    const onTargetChange = (e: Event) => {
      const val = (e.target as HTMLInputElement | HTMLSelectElement).value;
      if (exception) this._newExceptionTarget = val;
      else this._newRuleTarget = val;
    };

    const onRegexChange = (e: Event) => {
      const val = (e.target as HTMLInputElement).checked;
      if (exception) this._newExceptionIsRegex = val;
      else this._newRuleIsRegex = val;
    };

    const targetInput = isService && !isRegex
      ? html`<select class="select" .value=${targetValue} @change=${onTargetChange}>
          <option value="">Select service…</option>
          ${this._availableServices.sort((a, b) => a.name.localeCompare(b.name)).map(s => html`<option value=${s.id} ?selected=${s.id === targetValue}>${s.name}</option>`)}
        </select>`
      : html`<input class="input" .value=${targetValue} @input=${onTargetChange}
          placeholder=${isRegex ? "/regex_pattern/" : (exception ? "whatsapp.com" : "example.com")} />`;

    return html`
      <div class="inline-form rule-form">
        <div><label>Type</label><select class="select" .value=${ruleType} @change=${onTypeChange}>
          <option value="domain">Domain</option><option value="service">Service</option><option value="category">Category</option>
        </select></div>
        <div class="grow"><label>${exception ? "Allowed target" : "Target"}</label>${targetInput}</div>
        <div class="regex-toggle"><label class="toggle-line"><input type="checkbox" .checked=${isRegex} @change=${onRegexChange} /><span>Regex</span></label></div>
        ${exception ? html`` : html`<div><label>Action</label><select class="select" .value=${this._newRuleAction} @change=${(e: Event) => (this._newRuleAction = (e.target as HTMLSelectElement).value as any)}><option value="block">Block</option><option value="allow">Allow</option></select></div>`}
        <button class="btn primary" @click=${exception ? this._addException : this._addRule}>Add</button>
        <button class="btn" @click=${() => exception ? (this._showAddException = false) : (this._showAddRule = false)}>Cancel</button>
      </div>
    `;
  }

  private _renderSchedule() {
    const schedule = this._p.time_schedule;
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return html`
      <section class="card">
        <div class="card-title row-between"><span>Schedule</span>${schedule ? html`<button class="text-btn danger-text" @click=${this._removeSchedule}>Remove</button>` : ""}</div>
        <div class="card-body">
          <div class="schedule-type">
            <button class=${!schedule ? "mode-btn active" : "mode-btn"} @click=${() => this._clearSchedule()}>Always active</button>
            <button class=${schedule ? "mode-btn active" : "mode-btn"} @click=${() => this._ensureSchedule()}>Time range</button>
          </div>
          ${schedule ? html`
            <div class="form-grid">
              <div class="full"><label>Days</label><div class="day-chips">${days.map(d => html`<button class=${schedule.days.includes(d) ? "day active" : "day"} @click=${() => this._toggleScheduleDay(d)}>${d.slice(0, 1).toUpperCase() + d.slice(1)}</button>`)}</div></div>
              <div><label>From</label><input class="input" type="time" .value=${schedule.time_from || "00:00"} @input=${(e: Event) => this._updateSchedule("time_from", (e.target as HTMLInputElement).value)} /></div>
              <div><label>To</label><input class="input" type="time" .value=${schedule.time_to || "23:59"} @input=${(e: Event) => this._updateSchedule("time_to", (e.target as HTMLInputElement).value)} /></div>
              <div class="schedule-preview full"><span class="icon">◷</span><div><b>${this._scheduleText()}</b><div class="muted">${this._crossesMidnight() ? "Ends on the next day" : "Same-day window"}</div></div></div>
            </div>
          ` : html`<div class="empty-box">This policy is active at all times unless a calendar condition prevents it.</div>`}
        </div>
      </section>
    `;
  }

  private _renderCalendar() {
    const cc = this._p.calendar_condition;
    return html`
      <section class="card">
        <div class="card-title row-between"><span>Calendar Condition</span>${cc ? html`<button class="text-btn danger-text" @click=${this._removeCalendar}>Remove</button>` : ""}</div>
        <div class="card-body">
          ${cc ? html`
            <div class="form-grid">
              <div class="full"><label>Calendar entity</label><select class="select" .value=${cc.calendar_entity || ""} @change=${(e: Event) => this._updateCalendar("calendar_entity", (e.target as HTMLSelectElement).value)}>
                <option value="">Any configured calendar</option>
                ${this.state.calendar_entities.map(eid => html`<option value=${eid}>${eid}</option>`)}
              </select></div>
              <div class="full"><label>Event keywords</label><input class="input" .value=${cc.event_match.join(", ")} @input=${(e: Event) => this._updateCalendar("event_match", (e.target as HTMLInputElement).value.split(",").map(x => x.trim()).filter(Boolean))} placeholder="Holiday, School Break" /></div>
              <div class="condition-toggle"><label class="toggle-line"><input type="checkbox" .checked=${cc.invert} @change=${(e: Event) => this._updateCalendar("invert", (e.target as HTMLInputElement).checked)} /><span>Invert condition</span></label><span class="muted">Activate when matching events are not present.</span></div>
            </div>
          ` : html`
            <div class="empty-box"><b>No calendar condition.</b><span>Policy is controlled only by its schedule.</span><button class="btn" @click=${this._createCalendar}>＋ Add calendar condition</button></div>
          `}
        </div>
      </section>
    `;
  }

  private _renderExceptions() {
    const exceptions = this._p.exceptions || [];
    return html`
      <section class="card">
        <div class="card-title row-between"><span>Exceptions</span><button class="btn primary" @click=${() => (this._showAddException = !this._showAddException)}>＋ Add Exception</button></div>
        <div class="card-body">
          <p class="help">Exceptions are explicit allow rules that override a matching block from this policy.</p>
          ${this._showAddException ? this._renderRuleForm(true) : ""}
          ${exceptions.length ? html`<table class="data-table"><thead><tr><th>Type</th><th>Allowed target</th><th></th></tr></thead><tbody>
            ${exceptions.map((r, i) => html`<tr><td><span class="badge">${r.rule_type}</span></td><td class="mono">${r.target}${r.is_regex ? html` <span class=\"regex-badge\">.*</span>` : ""}</td><td class="end"><button class="text-btn danger-text" @click=${() => this._removeException(i)}>Remove</button></td></tr>`)}
          </tbody></table>` : html`<div class="empty-box">No policy-specific exceptions.</div>`}
        </div>
      </section>
    `;
  }

  private _renderPreview() {
    const schedule = this._p.time_schedule;
    const rules = this._p.rules;
    const exceptions = this._p.exceptions || [];
    const assigned = [...this._getAssignedGroups(), ...this._getAssignedMembers(), ...this._getAssignedClients()];
    return html`
      <div class="preview-grid">
        <section class="card hero-preview">
          <div class="eyebrow">Policy Preview</div>
          <h2>${this._p.name}</h2>
          <div class="preview-pills"><span class="pill blue">${this._p.enabled === false ? "Disabled" : "Enabled"}</span><span class="pill">Priority ${this._p.priority}</span><span class="pill">${this._getProfileName()}</span></div>
          <p class="lead">${this._p.description || "No description provided."}</p>
          <div class="preview-flow">
            <div class="flow-card"><span>WHEN</span><b>${this._scheduleText()}</b><small>${this._calendarText()}</small></div>
            <div class="arrow">→</div>
            <div class="flow-card"><span>RULES</span><b>${rules.length} rule${rules.length === 1 ? "" : "s"}</b><small>${exceptions.length ? `${exceptions.length} exception${exceptions.length === 1 ? "" : "s"}` : "No exceptions"}</small></div>
            <div class="arrow">→</div>
            <div class="flow-card accent"><span>APPLIES TO</span><b>${assigned.length || "No assignments"}</b><small>${appliesLabel(assigned.length)}</small></div>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Effective Rule Summary</div>
          <div class="card-body">
            ${rules.length ? html`<div class="rule-summary">${rules.map(r => html`<div class="rule-line"><span class=${r.action === "block" ? "dot red" : "dot green"}></span><span class="badge">${r.rule_type}</span><span class="mono">${r.target}${r.is_regex ? html` <span class=\"regex-badge\">.*</span>` : ""}</span><b class=${r.action === "block" ? "red" : "green"}>${r.action.toUpperCase()}</b></div>`)}</div>` : html`<div class="empty-box">No explicit rules.</div>`}
            ${exceptions.length ? html`<div class="exception-preview"><div class="eyebrow">Exceptions</div>${exceptions.map(r => html`<div class="rule-line"><span class="dot green"></span><span class="mono">${r.target}</span><b class="green">ALLOW</b></div>`)}</div>` : ""}
          </div>
        </section>

        <section class="card">
          <div class="card-title">Why this policy applies</div>
          <div class="card-body checklist">
            <div>✓ Policy is <b>${this._p.enabled === false ? "disabled" : "enabled"}</b></div>
            <div>✓ Schedule: <b>${this._scheduleText()}</b></div>
            <div>✓ Calendar: <b>${this._calendarText()}</b></div>
            <div>✓ Profile: <b>${this._getProfileName()}</b></div>
            <div>✓ Assigned to: <b>${assigned.length ? assigned.join(", ") : "nothing yet"}</b></div>
          </div>
        </section>
      </div>
    `;
  }

  private _clonePolicy(policy: Policy): Policy {
    return JSON.parse(JSON.stringify({ ...policy, description: policy.description || "", enabled: policy.enabled !== false, tags: policy.tags || [], exceptions: policy.exceptions || [] }));
  }

  private _markDirty(p: Policy) { this._draft = p; this._dirty = true; }
  private _onNameInput = (e: Event) => this._markDirty({ ...this._p, name: (e.target as HTMLInputElement).value });
  private _onDescriptionInput = (e: Event) => this._markDirty({ ...this._p, description: (e.target as HTMLTextAreaElement).value });
  private _onPriorityInput = (e: Event) => this._markDirty({ ...this._p, priority: Number((e.target as HTMLInputElement).value || 0) });
  private _setPriority = (value: number) => this._markDirty({ ...this._p, priority: value });
  private _onProfileChange = (e: Event) => this._markDirty({ ...this._p, profile_id: (e.target as HTMLSelectElement).value || null });
  private _onEnabledChange = (e: Event) => this._markDirty({ ...this._p, enabled: (e.target as HTMLInputElement).checked });

  private async _saveDraft() {
    if (!this._draft) return;
    const updated = await this.hass.callWS({ type: "adguard_pc/policies/update", policy: this._draft });
    this.policy = updated || this._draft;
    this._draft = this._clonePolicy(this.policy);
    this._dirty = false;
    this.onStateChanged?.();
  }
  private _resetDraft() { this._draft = this._clonePolicy(this.policy); this._dirty = false; }

  private _addTagFromInput() {
    const input = this.renderRoot.querySelector<HTMLInputElement>("#tag-input");
    const value = input?.value.trim();
    if (!value) return;
    const tags = Array.from(new Set([...(this._p.tags || []), value]));
    this._markDirty({ ...this._p, tags });
    if (input) input.value = "";
  }
  private _onTagKeydown = (e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); this._addTagFromInput(); } };
  private _removeTag = (tag: string) => this._markDirty({ ...this._p, tags: (this._p.tags || []).filter(t => t !== tag) });

  private async _loadServices() {
    if (!this.hass || this._availableServices.length) return;
    try {
      this._availableServices = await this.hass.callWS({ type: "adguard_pc/services/list" });
    } catch (err) {
      console.error("Failed to load services:", err);
    }
  }

  private async _addRule() {
    await this._loadServices();
    if (!this._newRuleTarget.trim()) return;
    const rules = [...this._p.rules, { target: this._newRuleTarget.trim(), action: this._newRuleAction, rule_type: this._newRuleType, ...(this._newRuleIsRegex ? { is_regex: true } : {}) } as PolicyRule];
    await this._persist({ ...this._p, rules });
    this._newRuleTarget = ""; this._showAddRule = false; this._newRuleIsRegex = false;
  }
  private async _removeRule(i: number) { const rules = this._p.rules.filter((_, idx) => idx !== i); await this._persist({ ...this._p, rules }); }
  private async _addException() {
    await this._loadServices();
    if (!this._newExceptionTarget.trim()) return;
    const exceptions = [...(this._p.exceptions || []), { target: this._newExceptionTarget.trim(), action: "allow", rule_type: this._newExceptionType, ...(this._newExceptionIsRegex ? { is_regex: true } : {}) } as PolicyRule];
    await this._persist({ ...this._p, exceptions });
    this._newExceptionTarget = ""; this._showAddException = false; this._newExceptionIsRegex = false;
  }
  private async _removeException(i: number) { const exceptions = (this._p.exceptions || []).filter((_, idx) => idx !== i); await this._persist({ ...this._p, exceptions }); }

  private async _persist(policy: Policy) {
    const updated = await this.hass.callWS({ type: "adguard_pc/policies/update", policy });
    this.policy = updated || policy;
    this._draft = this._clonePolicy(this.policy);
    this._dirty = false;
    this.onStateChanged?.();
  }

  private _ensureSchedule() {
    if (this._p.time_schedule) return;
    this._markDirty({ ...this._p, time_schedule: { days: ["mon", "tue", "wed", "thu", "fri"], time_from: "21:00", time_to: "05:00" } });
  }
  private _clearSchedule = async () => this._persist({ ...this._p, time_schedule: null });
  private _toggleScheduleDay(day: string) {
    const s = this._p.time_schedule || { days: [], time_from: "00:00", time_to: "23:59" };
    const days = s.days.includes(day) ? s.days.filter(d => d !== day) : [...s.days, day];
    this._markDirty({ ...this._p, time_schedule: { ...s, days } });
  }
  private _updateSchedule(key: "time_from" | "time_to", value: string) {
    const s = this._p.time_schedule || { days: [], time_from: "00:00", time_to: "23:59" };
    this._markDirty({ ...this._p, time_schedule: { ...s, [key]: value } });
  }
  private async _removeSchedule() { await this._persist({ ...this._p, time_schedule: null }); }

  private _createCalendar() { this._markDirty({ ...this._p, calendar_condition: { calendar_entity: this.state.calendar_entities[0] || null, event_match: ["Holiday"], invert: false } }); }
  private _updateCalendar(key: string, value: any) { const cc = this._p.calendar_condition || { calendar_entity: null, event_match: [], invert: false }; this._markDirty({ ...this._p, calendar_condition: { ...cc, [key]: value } }); }
  private async _removeCalendar() { await this._persist({ ...this._p, calendar_condition: null }); }

  private _scheduleText() {
    const s = this._p.time_schedule;
    if (!s) return "Always active";
    const dayText = s.days.length === 7 ? "Every day" : s.days.map(d => d.slice(0, 1).toUpperCase() + d.slice(1, 3)).join(" · ");
    return `${s.time_from || "00:00"}–${s.time_to || "23:59"} (${dayText})`;
  }
  private _calendarText() {
    const c = this._p.calendar_condition;
    if (!c) return "None";
    const match = c.event_match.length ? c.event_match.join(", ") : "Any event";
    return `${c.invert ? "NOT " : ""}${match}`;
  }
  private _crossesMidnight() { const s = this._p.time_schedule; return !!s && !!s.time_from && !!s.time_to && s.time_to < s.time_from; }

  private _getProfileName() { const id = this._p.profile_id; return id ? (this.state.profiles.find(p => p.id === id)?.name || id) : "None"; }
  private _getAssignedGroups() { return this.state.groups.filter(g => g.assigned_policy_ids.includes(this._p.id)).map(g => g.name); }
  private _getAssignedMembers() { return this.state.members.filter(m => m.assigned_policy_ids.includes(this._p.id)).map(m => m.name); }
  private _getAssignedClients() { return this.state.clients.filter(c => c.assigned_policy_ids.includes(this._p.id)).map(c => c.name); }
  private _getAppliesTo() { const n = this._getAssignedGroups().length + this._getAssignedMembers().length + this._getAssignedClients().length; return n ? `${n} assignment${n === 1 ? "" : "s"}` : "None"; }

  private async _deletePolicy() {
    await this.hass.callWS({ type: "adguard_pc/policies/delete", policy_id: this._p.id });
    this._showDeleteConfirm = false;
    this.onStateChanged?.();
    this.onNavigate?.("policies");
  }

  static styles = css`
    :host { display:block; color:var(--agpc-text,#eef2ff); }
    * { box-sizing:border-box; }
    .page { padding:0 14px 30px; max-width:1680px; margin:0 auto; }
    .breadcrumb { height:42px; display:flex; align-items:center; gap:9px; color:#71809f; font-size:13px; }
    .breadcrumb span:first-child { cursor:pointer; }
    .breadcrumb strong { color:#eef2ff; }
    .hero { min-height:112px; padding:17px 18px; display:flex; align-items:center; gap:16px; }
    .hero-icon { width:68px; height:68px; border-radius:14px; background:#121d35; border:1px solid #2c3a59; color:#c5a6ff; display:grid; place-items:center; font-size:30px; flex:none; }
    .hero-main { min-width:250px; flex:1; }
    .title-line { display:flex; align-items:center; gap:10px; }
    .title-line h1 { margin:0; font-size:21px; }
    .hero-meta { display:flex; flex-wrap:wrap; gap:20px; color:#9aa6c0; font-size:12px; margin-top:12px; }
    .hero-actions { display:flex; align-self:flex-start; gap:6px; margin-left:auto; }
    .btn, .icon-btn, .wide-btn, .mode-btn, .day, .tab, .text-btn { font:inherit; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #2e3853; background:#151e34; color:#d8dff0; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }
    .btn:hover { background:#1b2741; }
    .btn.primary { background:var(--agpc-blue,#4e8cff); border-color:var(--agpc-blue,#4e8cff); color:#fff; }
    .btn:disabled { opacity:.45; cursor:default; }
    .btn-hero-delete { background:#451d24; color:#ff6875; border:1px solid #6b2832; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }
    .btn-hero-delete:hover { background:#5c2430; }
    .icon-btn { width:38px; height:38px; border:0; background:transparent; color:var(--agpc-text-dim,#71809f); cursor:pointer; border-radius:8px; }
    .icon-btn:hover { background:rgba(255,255,255,.06); color:#fff; }
    .pill { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:9px; font-weight:800; letter-spacing:.04em; }
    .pill.green { background:#103c31; color:#34db95; }
    .red-pill { background:#441d28; color:#ff6875; }
    .policy-status-switch { display:inline-flex; align-items:center; gap:8px; cursor:pointer; user-select:none; }
    .policy-status-switch input { position:absolute; opacity:0; pointer-events:none; width:0; height:0; }
    .policy-status-switch .switch-slider { position:relative; display:inline-block; width:38px; height:22px; border-radius:999px; background:#3a4560; border:1px solid #46526d; transition:background .18s,border-color .18s; flex:none; }
    .policy-status-switch .switch-slider::before { content:""; position:absolute; left:2px; top:2px; width:16px; height:16px; border-radius:50%; background:#aab4c7; transition:transform .18s,background .18s; }
    .policy-status-switch input:checked + .switch-slider { background:var(--agpc-green,#20c879); border-color:var(--agpc-green,#20c879); }
    .policy-status-switch input:checked + .switch-slider::before { transform:translateX(16px); background:#fff; }
    .policy-status-switch strong { font-size:10px; letter-spacing:.04em; }
    .policy-status-switch.enabled strong { color:#44d589; }
    .policy-status-switch.disabled strong { color:#ff6875; }
    .form-status-switch { margin-top:5px; }
    .card { background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; box-sizing:border-box; }
    .tabs { display:flex; gap:6px; padding:0 6px; border-bottom:1px solid #27304a; margin:2px 0 10px; overflow-x:auto; }
    .tab { border:0; background:transparent; color:#75839e; font:600 12px inherit; padding:12px 16px; border-bottom:2px solid transparent; cursor:pointer; }
    .tab.active { color:#4e8cff; border-bottom-color:#4e8cff; }
    .content { padding:0 0 24px; }
    .grid { display:grid; grid-template-columns:minmax(0,1.65fr) minmax(320px,.9fr); gap:14px; align-items:start; }
    .card.full { grid-column:1/-1; }
    .card-title { padding:17px 18px 0; font-weight:650; font-size:16px; }
    .card-body { padding:16px 18px 18px; }
    .row-between { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .summary-card .card-body { padding-top:8px; }
    .summary > div { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.06); font-size:13px; }
    .summary > div span { color:#7e8aa4; }
    .summary b { font-weight:550; text-align:right; }
    .green { color:#44d589; } .red { color:#ff6969; }
    label { display:block; font-size:12px; color:#7e8aa4; margin:0 0 6px; }
    .muted { color:#7e8aa4; font-weight:400; }
    .tiny { font-size:11px; }
    .input, .textarea, .select { width:100%; border:1px solid #2b3448; background:#0f1524; color:#f3f6fb; border-radius:8px; padding:10px 11px; outline:none; }
    .input:focus, .textarea:focus, .select:focus { border-color:#2c86ff; box-shadow:0 0 0 1px rgba(44,134,255,.25); }
    .textarea { min-height:86px; resize:vertical; }
    .notes { min-height:110px; }
    .form-row.three { display:grid; grid-template-columns:1fr 1.3fr 1fr; gap:12px; margin-top:14px; }
    .stepper { display:grid; grid-template-columns:1fr 38px 38px; gap:4px; }
    .stepper button { border:1px solid #2b3448; background:#151d2e; color:#fff; border-radius:7px; cursor:pointer; }
    .toggle-line { display:flex; align-items:center; gap:9px; margin-top:9px; color:#f3f6fb; }
    .toggle-line input { width:17px; height:17px; accent-color:#20c879; }
    .wide-btn { width:100%; border:1px solid #2d3b52; background:#101829; color:#eaf0f8; border-radius:8px; padding:10px; margin-top:13px; cursor:pointer; }
    .assignment-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .eyebrow { display:block; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#8e9ab1; margin-bottom:7px; }
    .chip-list { display:flex; flex-wrap:wrap; gap:6px; min-height:29px; }
    .chip { display:inline-flex; align-items:center; gap:5px; background:#28364e; color:#dbe8ff; padding:6px 9px; border-radius:7px; font-size:12px; }
    .chip button { border:0; background:none; color:#9eb0cc; cursor:pointer; padding:0; }
    .tag-add { display:flex; gap:8px; margin-top:10px; }
    .tag-add .input { flex:1; }
    .help { color:#7e8aa4; font-size:13px; line-height:1.45; margin:0 0 14px; }
    .inline-form { display:grid; grid-template-columns:150px minmax(220px,1fr) auto 140px auto auto; gap:8px; align-items:end; padding:13px; background:#101726; border:1px solid #253047; border-radius:9px; margin-bottom:13px; }
    .regex-toggle { display:flex; align-items:end; padding-bottom:4px; }
    .regex-toggle label { margin:0; }
    .regex-badge { display:inline-block; background:#1a3a5c; color:#6aafef; font-size:10px; padding:1px 4px; border-radius:3px; font-weight:600; vertical-align:middle; }
    .grow { min-width:0; }
    .data-table { width:100%; border-collapse:collapse; }
    .data-table th,.data-table td { text-align:left; padding:11px 8px; border-bottom:1px solid rgba(255,255,255,.07); font-size:13px; }
    .data-table th { color:#8290a7; font-size:11px; text-transform:uppercase; letter-spacing:.06em; font-weight:600; }
    .data-table .end { text-align:right; }
    .mono { font-family:var(--code-font-family,ui-monospace,monospace); font-size:12px; }
    .badge,.pill { background:#27344c; border-radius:999px; padding:4px 8px; font-size:11px; color:#cdd8eb; }
    .status-dot { font-size:12px; font-weight:650; }
    .status-dot.blocked { color:#ff6666; }.status-dot.allowed{color:#43d786;}
    .text-btn { background:none; border:0; color:#55a5ff; cursor:pointer; padding:6px 8px; }
    .danger-text { color:#ff6c6c; }
    .empty-box { border:1px dashed #2b364c; background:#101726; border-radius:9px; padding:24px; color:#7e8aa4; display:flex; flex-direction:column; gap:8px; align-items:flex-start; }
    .hint-card { padding:15px 18px; background:rgba(31,111,235,.06); }
    .hint-title { font-weight:650; }
    .hint-card p { margin:5px 0 0; color:#7e8aa4; font-size:13px; line-height:1.5; }
    .schedule-type { display:flex; gap:8px; margin-bottom:18px; }
    .mode-btn { border:1px solid #2b3448; background:#101726; color:#bac6da; border-radius:8px; padding:9px 13px; cursor:pointer; }
    .mode-btn.active { background:#102d52; border-color:#2d88ff; color:#5da9ff; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .form-grid .full { grid-column:1/-1; }
    .day-chips { display:flex; flex-wrap:wrap; gap:7px; }
    .day { border:1px solid #2b3448; background:#101726; color:#b8c4d8; border-radius:7px; padding:8px 11px; cursor:pointer; }
    .day.active { background:#1677ff; border-color:#1677ff; color:#fff; }
    .schedule-preview { display:flex; gap:11px; align-items:center; padding:13px 14px; background:#101726; border-radius:9px; }
    .schedule-preview .icon { font-size:22px; color:#62a9ff; }
    .condition-toggle { display:flex; flex-direction:column; gap:3px; }
    .preview-grid { display:grid; grid-template-columns:1.35fr .9fr; gap:14px; align-items:start; }
    .hero-preview { grid-column:1/-1; }
    .hero-preview .card-body { min-height:0; }
    .preview-pills { display:flex; gap:7px; margin:10px 0; }.pill.blue { background:#102f57; color:#62aeff; }
    .lead { color:var(--secondary-text-color); max-width:780px; }
    .preview-flow { display:grid; grid-template-columns:1fr 30px 1fr 30px 1fr; align-items:center; gap:8px; margin-top:18px; }
    .flow-card { border:1px solid #2a344a; background:#0f1625; border-radius:10px; padding:14px; min-height:105px; }
    .flow-card span { display:block; color:#7f8ca4; font-size:10px; letter-spacing:.09em; margin-bottom:9px; }
    .flow-card b { display:block; font-size:15px; }.flow-card small{display:block;color:#8794a9;margin-top:6px;}.flow-card.accent { border-color:#1f77e8; background:#10203a; }
    .arrow { color:#5485bb; text-align:center; }
    .rule-summary { display:flex; flex-direction:column; gap:9px; }.rule-line { display:grid; grid-template-columns:9px auto minmax(0,1fr) auto; align-items:center; gap:8px; font-size:12px; }.dot{width:7px;height:7px;border-radius:50%;display:inline-block}.dot.red{background:#ff5e67}.dot.green{background:#41d486}.exception-preview{border-top:1px solid rgba(255,255,255,.08);margin-top:14px;padding-top:14px;}
    .checklist { display:flex; flex-direction:column; gap:10px; font-size:13px; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal h3 { margin:0 0 8px; }
    .modal p { color:#7e8aa4; line-height:1.5; font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:18px; }
    .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
    .btn-danger:hover { opacity:0.9; }
    @media (max-width: 1000px) { .grid,.preview-grid{grid-template-columns:1fr}.form-row.three,.assignment-grid{grid-template-columns:1fr}.inline-form{grid-template-columns:1fr 1fr}.preview-flow{grid-template-columns:1fr}.arrow{transform:rotate(90deg)} }
  `;
}

function appliesLabel(count: number): string {
  if (!count) return "No groups, members or clients assigned";
  return count === 1 ? "1 assignment" : `${count} assignments`;
}

declare global {
  interface HTMLElementTagNameMap { "policy-view": PolicyView; }
}
