import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Client, GlobalState, Policy, PolicyRule } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

type Tab = "general" | "policies" | "rules" | "overrides" | "activity";
type RuleFilter = "all" | "service" | "domain" | "category";

const NOTE_HINTS: Record<string, string> = {
  whatsapp: "Essential communication",
  youtube: "Video streaming",
  "youtube.com": "Video streaming",
  tiktok: "Social media",
  "tiktok.com": "Social media",
  discord: "Gaming / Chat",
  "facebook.com": "Social media",
  "instagram.com": "Social media",
  netflix: "Video streaming",
  snapchat: "Social media",
  roblox: "Gaming",
  twitch: "Video streaming",
  spotify: "Music",
};

function noteFor(rule: PolicyRule): string {
  const key = rule.target.toLowerCase();
  for (const hint of Object.keys(NOTE_HINTS)) {
    if (key.includes(hint)) return NOTE_HINTS[hint];
  }
  if (rule.rule_type === "domain") return "Domain rule";
  if (rule.rule_type === "service") return "Service rule";
  return "Category rule";
}

@customElement("client-view")
export class ClientView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ attribute: false }) public client!: Client;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;

  @state() private _tab: Tab = "general";
  @state() private _ruleFilter: RuleFilter = "all";
  @state() private _enabled = true;
  @state() private _selectedPolicyId: string | null = null;
  @state() private _showAddRule = false;
  @state() private _newRuleTarget = "";
  @state() private _newRuleType: "domain" | "service" | "category" = "domain";
  @state() private _newRuleAction: "block" | "allow" = "block";
  @state() private _showDeleteConfirm = false;
  @state() private _ipDraft = "";
  @state() private _tagDraft = "";

  willUpdate() {
    if (this.client && this._selectedPolicyId === null && this.client.assigned_policy_ids.length) {
      this._selectedPolicyId = this.client.assigned_policy_ids[0];
    }
    if (this.client && this._ipDraft === "" ) this._ipDraft = this.client.ids[0] || "";
    if (this.client && this._tagDraft === "") this._tagDraft = this.client.ids[1] || "";
  }

  private _icon(path: string, size = 16) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private get _owningGroup() {
    return this.state.groups.find((g) => g.client_names.includes(this.client.name)) || null;
  }

  private get _owningMember() {
    return this.state.members.find((m) => m.client_names.includes(this.client.name)) || null;
  }

  private get _selectedPolicy(): Policy | null {
    if (!this._selectedPolicyId) return null;
    return this.state.policies.find((p) => p.id === this._selectedPolicyId) || null;
  }

  render() {
    if (!this.client) return html``;
    const restricted = this.client.assigned_policy_ids.length > 0;

    return html`
      <div class="split">
        <div class="card editor-card">
          <div class="editor-head">
            <div class="editor-title">
              <div class="editor-icon">${this._icon(ICONS.laptop, 18)}</div>
              <div>
                <div class="editor-name">Client Editor</div>
                <div class="editor-sub">${this.client.name}</div>
              </div>
            </div>
            <div class="editor-actions">
              <span class="enabled-label">Enabled</span>
              <button class="switch ${this._enabled ? "on" : ""}" @click=${() => { this._enabled = !this._enabled; }}>
                <div class="knob"></div>
              </button>
              <button class="btn danger" @click=${() => { this._showDeleteConfirm = true; }}>Delete</button>
            </div>
          </div>

          <div class="tab-strip">
            ${(["general", "policies", "rules", "overrides", "activity"] as Tab[]).map(
              (t) => html`
                <button class="tab ${this._tab === t ? "active" : ""}" @click=${() => { this._tab = t; }}>
                  ${t[0].toUpperCase() + t.slice(1)}
                </button>
              `
            )}
          </div>

          <div class="tab-body">
            ${this._tab === "general" ? this._renderGeneral(restricted) : nothing}
            ${this._tab === "policies" ? this._renderPolicies() : nothing}
            ${this._tab === "rules" ? this._renderRulesTab() : nothing}
            ${this._tab === "overrides" ? this._renderOverrides() : nothing}
            ${this._tab === "activity" ? this._renderActivity() : nothing}
          </div>
        </div>

        <div class="card rules-card">${this._renderRulesEditor()}</div>
      </div>

      ${this._showDeleteConfirm
        ? html`
            <div class="modal-scrim" @click=${() => { this._showDeleteConfirm = false; }}>
              <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
                <div class="modal-title">Delete client "${this.client.name}"?</div>
                <div class="modal-sub">This cannot be undone.</div>
                <div class="modal-actions">
                  <button class="btn" @click=${() => { this._showDeleteConfirm = false; }}>Cancel</button>
                  <button class="btn danger" @click=${this._deleteClient}>Delete</button>
                </div>
              </div>
            </div>
          `
        : nothing}
    `;
  }

  // ── General tab ─────────────────────────────────────────────

  private _renderGeneral(restricted: boolean) {
    const group = this._owningGroup;
    const member = this._owningMember;
    const profileId = this._selectedPolicy?.profile_id || null;
    const profile = profileId ? this.state.profiles.find((p) => p.id === profileId) : null;

    return html`
      <div class="section">
        <div class="section-title">Identity</div>
        <label class="field-label">Name</label>
        <input class="field" .value=${this.client.name} readonly />

        <label class="field-label">IP Address</label>
        <input class="field" .value=${this._ipDraft}
          @input=${(e: Event) => { this._ipDraft = (e.target as HTMLInputElement).value; }}
        />

        <label class="field-label">AdGuard Client</label>
        <input class="field" .value=${this._tagDraft}
          @input=${(e: Event) => { this._tagDraft = (e.target as HTMLInputElement).value; }}
          placeholder="e.g. teddy-pc"
        />

        <label class="field-label">Tags</label>
        <div class="tag-row">
          ${group ? html`<span class="tag">${group.name}<button class="tag-x" @click=${() => this._removeFromGroup()}>×</button></span>` : nothing}
          ${member ? html`<span class="tag">${member.name}<button class="tag-x" @click=${() => this._removeFromMember()}>×</button></span>` : nothing}
          ${!group && !member ? html`<span class="empty-state" style="padding:0;">No tags</span>` : nothing}
        </div>

        <button class="btn primary save-btn" @click=${this._saveIdentity}>Save Identity</button>
      </div>

      <div class="section">
        <div class="section-title">Inheritance</div>
        <label class="field-label">Group</label>
        <select class="field" .value=${group?.id || ""} @change=${(e: Event) => this._assignGroup((e.target as HTMLSelectElement).value)}>
          <option value="">— None —</option>
          ${this.state.groups.map((g) => html`<option value=${g.id} ?selected=${g.id === group?.id}>${g.name}</option>`)}
        </select>

        <label class="field-label">Member</label>
        <select class="field" .value=${member?.id || ""} @change=${(e: Event) => this._assignMember((e.target as HTMLSelectElement).value)}>
          <option value="">— None —</option>
          ${this.state.members.map((m) => html`<option value=${m.id} ?selected=${m.id === member?.id}>${m.name}</option>`)}
        </select>

        <label class="field-label">Profile</label>
        <input class="field" readonly .value=${profile?.name || "None"} />
      </div>

      <div class="section">
        <div class="section-title">Status</div>
        <div class="status-row"><span>Connection</span><span class="badge blue">Configured</span></div>
        <div class="status-row"><span>Protection</span><span class="badge ${restricted ? "red" : "green"}">${restricted ? "Restricted" : "Unrestricted"}</span></div>
        <div class="status-row"><span>Last Seen</span><span class="status-value">—</span></div>
      </div>
    `;
  }

  // ── Policies tab ─────────────────────────────────────────────

  private _renderPolicies() {
    return html`
      <div class="section">
        <div class="section-title">Assigned Policies (${this.client.assigned_policy_ids.length})</div>
        ${this.client.assigned_policy_ids.length === 0
          ? html`<div class="empty-state">No policies assigned</div>`
          : this.client.assigned_policy_ids.map((pid) => {
              const policy = this.state.policies.find((p) => p.id === pid);
              const selected = pid === this._selectedPolicyId;
              return html`
                <div class="row-item ${selected ? "selected" : ""}" @click=${() => { this._selectedPolicyId = pid; this._tab = "general"; }}>
                  <span class="row-text">${policy?.name || pid}</span>
                  <div class="row-actions">
                    ${selected ? html`<span class="badge blue">Editing</span>` : nothing}
                    <button class="icon-btn" @click=${(e: Event) => { e.stopPropagation(); this._removePolicy(pid); }}>
                      ${this._icon(ICONS.close, 14)}
                    </button>
                  </div>
                </div>
              `;
            })}
        <label class="field-label" style="margin-top:12px;">Assign policy</label>
        <select class="field" @change=${(e: Event) => { const v = (e.target as HTMLSelectElement).value; if (v) this._addPolicy(v); (e.target as HTMLSelectElement).value = ""; }}>
          <option value="">Select a policy…</option>
          ${this.state.policies
            .filter((p) => !this.client.assigned_policy_ids.includes(p.id))
            .map((p) => html`<option value=${p.id}>${p.name}</option>`)}
        </select>
      </div>
    `;
  }

  // ── Rules tab (left panel helper — points at the right-hand editor) ──

  private _renderRulesTab() {
    return html`
      <div class="section">
        <div class="section-title">Rules Editor Target</div>
        <p class="hint-text">Pick which assigned policy's rules to edit on the right.</p>
        <select class="field" .value=${this._selectedPolicyId || ""} @change=${(e: Event) => { this._selectedPolicyId = (e.target as HTMLSelectElement).value || null; }}>
          <option value="">— Select policy —</option>
          ${this.client.assigned_policy_ids.map((pid) => {
            const p = this.state.policies.find((pp) => pp.id === pid);
            return html`<option value=${pid} ?selected=${pid === this._selectedPolicyId}>${p?.name || pid}</option>`;
          })}
        </select>
      </div>
    `;
  }

  // ── Overrides tab ─────────────────────────────────────────────

  private _renderOverrides() {
    const relevant = this.state.overrides.filter((o) => o.target === this.client.name);
    return html`
      <div class="section">
        <div class="section-title">Overrides for this client</div>
        ${relevant.length === 0
          ? html`<div class="empty-state">No active overrides</div>`
          : relevant.map(
              (o) => html`
                <div class="row-item">
                  <span class="row-text">${o.action} ${o.expires ? "· until " + new Date(o.expires).toLocaleTimeString() : "· indefinite"}</span>
                  <button class="icon-btn" @click=${() => this._clearOverride(o.id)}>${this._icon(ICONS.close, 14)}</button>
                </div>
              `
            )}
        <div class="quick-override">
          <button class="btn" @click=${() => this._setOverride("allow_all", 30)}>Allow 30m</button>
          <button class="btn" @click=${() => this._setOverride("block_all", 30)}>Block 30m</button>
          <button class="btn" @click=${() => this.onNavigate?.("override")}>Manage all overrides</button>
        </div>
      </div>
    `;
  }

  private _renderActivity() {
    return html`
      <div class="section">
        <div class="section-title">Recent Activity</div>
        <div class="empty-state">No activity data available yet.</div>
      </div>
    `;
  }

  // ── Rules Editor (right panel) ─────────────────────────────────

  private _renderRulesEditor() {
    const policy = this._selectedPolicy;

    if (!policy) {
      return html`
        <div class="rules-empty">
          <div class="rules-empty-icon">${this._icon(ICONS.policies, 28)}</div>
          <p>No policy selected for this client.</p>
          <button class="btn primary" @click=${() => { this._tab = "policies"; }}>Assign a policy</button>
        </div>
      `;
    }

    const rules = policy.rules;
    const serviceCount = rules.filter((r) => r.rule_type === "service").length;
    const domainCount = rules.filter((r) => r.rule_type === "domain").length;
    const visible = rules.filter((r) => this._ruleFilter === "all" || r.rule_type === this._ruleFilter);
    const allowCount = rules.filter((r) => r.action === "allow").length;
    const blockCount = rules.filter((r) => r.action === "block").length;

    return html`
      <div class="rules-head">
        <div class="rules-title">Rules Editor <span class="rules-policy-name">(${policy.name})</span></div>
        <button class="btn primary" @click=${() => { this._showAddRule = !this._showAddRule; }}>
          ${this._icon(ICONS.plus, 14)} Add Rule
        </button>
      </div>

      <div class="rules-subtabs">
        <button class="subtab ${this._ruleFilter === "all" ? "active" : ""}" @click=${() => { this._ruleFilter = "all"; }}>All (${rules.length})</button>
        <button class="subtab ${this._ruleFilter === "service" ? "active" : ""}" @click=${() => { this._ruleFilter = "service"; }}>Services (${serviceCount})</button>
        <button class="subtab ${this._ruleFilter === "domain" ? "active" : ""}" @click=${() => { this._ruleFilter = "domain"; }}>Domains (${domainCount})</button>
      </div>

      ${this._showAddRule
        ? html`
            <div class="add-rule-form">
              <input class="field" placeholder="Target (e.g. youtube.com)" .value=${this._newRuleTarget}
                @input=${(e: Event) => { this._newRuleTarget = (e.target as HTMLInputElement).value; }}
              />
              <select class="field" .value=${this._newRuleType} @change=${(e: Event) => { this._newRuleType = (e.target as HTMLSelectElement).value as any; }}>
                <option value="domain">Domain</option>
                <option value="service">Service</option>
                <option value="category">Category</option>
              </select>
              <select class="field" .value=${this._newRuleAction} @change=${(e: Event) => { this._newRuleAction = (e.target as HTMLSelectElement).value as any; }}>
                <option value="block">Block</option>
                <option value="allow">Allow</option>
              </select>
              <button class="btn primary" .disabled=${!this._newRuleTarget.trim()} @click=${this._addRule}>Add</button>
            </div>
          `
        : nothing}

      ${visible.length === 0
        ? html`<div class="empty-state">No rules in this category.</div>`
        : html`
            <table class="table rules-table">
              <thead>
                <tr><th>Type</th><th>Target</th><th>Action</th><th>Notes</th><th></th></tr>
              </thead>
              <tbody>
                ${visible.map((rule, idx) => {
                  const realIndex = rules.indexOf(rule);
                  return html`
                    <tr>
                      <td><span class="rule-type-cell">${this._icon(rule.rule_type === "domain" ? ICONS.domain : rule.rule_type === "service" ? ICONS.services : ICONS.category, 15)} ${rule.rule_type}</span></td>
                      <td class="target-cell">${rule.target}</td>
                      <td><span class="badge ${rule.action === "block" ? "red" : "green"}">${rule.action}</span></td>
                      <td class="notes-cell">${noteFor(rule)}</td>
                      <td class="menu-cell">
                        <button class="icon-btn" @click=${() => this._removeRule(realIndex)}>${this._icon(ICONS.close, 14)}</button>
                      </td>
                    </tr>
                  `;
                })}
              </tbody>
            </table>
          `}

      <div class="rules-footer">
        <span class="badge green">ALLOW ${allowCount}</span>
        <span class="badge red">BLOCK ${blockCount}</span>
      </div>
    `;
  }

  // ── Mutations ─────────────────────────────────────────────────

  private async _saveIdentity() {
    const ids = [...this.client.ids];
    ids[0] = this._ipDraft.trim();
    if (this._tagDraft.trim()) ids[1] = this._tagDraft.trim();
    const updated: Client = { ...this.client, ids: ids.filter(Boolean) };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
  }

  private async _addPolicy(id: string) {
    if (!id || this.client.assigned_policy_ids.includes(id)) return;
    const updated: Client = { ...this.client, assigned_policy_ids: [...this.client.assigned_policy_ids, id] };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
    this._selectedPolicyId = id;
  }

  private async _removePolicy(id: string) {
    const updated: Client = { ...this.client, assigned_policy_ids: this.client.assigned_policy_ids.filter((p) => p !== id) };
    await this.hass.callWS({ type: "adguard_pc/clients/update", client: updated });
    this.client = updated;
    if (this._selectedPolicyId === id) this._selectedPolicyId = updated.assigned_policy_ids[0] || null;
  }

  private async _assignGroup(groupId: string) {
    const current = this._owningGroup;
    if (current && current.id !== groupId) {
      const updatedOld = { ...current, client_names: current.client_names.filter((n) => n !== this.client.name) };
      await this.hass.callWS({ type: "adguard_pc/groups/update", group: updatedOld });
    }
    if (groupId) {
      const target = this.state.groups.find((g) => g.id === groupId);
      if (target && !target.client_names.includes(this.client.name)) {
        const updatedNew = { ...target, client_names: [...target.client_names, this.client.name] };
        await this.hass.callWS({ type: "adguard_pc/groups/update", group: updatedNew });
      }
    }
    this._reloadState();
  }

  private async _assignMember(memberId: string) {
    const current = this._owningMember;
    if (current && current.id !== memberId) {
      const updatedOld = { ...current, client_names: current.client_names.filter((n) => n !== this.client.name) };
      await this.hass.callWS({ type: "adguard_pc/members/update", member: updatedOld });
    }
    if (memberId) {
      const target = this.state.members.find((m) => m.id === memberId);
      if (target && !target.client_names.includes(this.client.name)) {
        const updatedNew = { ...target, client_names: [...target.client_names, this.client.name] };
        await this.hass.callWS({ type: "adguard_pc/members/update", member: updatedNew });
      }
    }
    this._reloadState();
  }

  private async _removeFromGroup() {
    const g = this._owningGroup;
    if (!g) return;
    const updated = { ...g, client_names: g.client_names.filter((n) => n !== this.client.name) };
    await this.hass.callWS({ type: "adguard_pc/groups/update", group: updated });
    this._reloadState();
  }

  private async _removeFromMember() {
    const m = this._owningMember;
    if (!m) return;
    const updated = { ...m, client_names: m.client_names.filter((n) => n !== this.client.name) };
    await this.hass.callWS({ type: "adguard_pc/members/update", member: updated });
    this._reloadState();
  }

  private async _addRule() {
    const policy = this._selectedPolicy;
    if (!policy || !this._newRuleTarget.trim()) return;
    const rule: PolicyRule = { target: this._newRuleTarget.trim(), action: this._newRuleAction, rule_type: this._newRuleType };
    const updated: Policy = { ...policy, rules: [...policy.rules, rule] };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this._newRuleTarget = "";
    this._showAddRule = false;
    this._reloadState();
  }

  private async _removeRule(index: number) {
    const policy = this._selectedPolicy;
    if (!policy) return;
    const rules = policy.rules.filter((_, i) => i !== index);
    const updated: Policy = { ...policy, rules };
    await this.hass.callWS({ type: "adguard_pc/policies/update", policy: updated });
    this._reloadState();
  }

  private async _setOverride(action: "allow_all" | "block_all", minutes: number) {
    await this.hass.callWS({
      type: "adguard_pc/overrides/set",
      target: this.client.name,
      target_type: "client",
      action,
      duration_minutes: minutes,
    });
    this._reloadState();
  }

  private async _clearOverride(id: string) {
    await this.hass.callWS({ type: "adguard_pc/overrides/clear", override_id: id });
    this._reloadState();
  }

  private async _deleteClient() {
    await this.hass.callWS({ type: "adguard_pc/clients/delete", client_id: this.client.name });
    this._showDeleteConfirm = false;
    this.onNavigate?.("clients");
  }

  private async _reloadState() {
    try {
      this.state = await this.hass.callWS({ type: "adguard_pc/state/get" });
      const refreshed = this.state.clients.find((c) => c.name === this.client.name);
      if (refreshed) this.client = refreshed;
    } catch (err) {
      console.error("Failed to reload state:", err);
    }
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }

      .split { display: grid; grid-template-columns: 380px 1fr; gap: 18px; align-items: start; }
      @media (max-width: 900px) { .split { grid-template-columns: 1fr; } }

      .card { padding: 0; }
      .editor-card { display: flex; flex-direction: column; overflow: hidden; }
      .rules-card { padding: 18px 20px 16px; }

      .editor-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; border-bottom: 1px solid var(--agpc-border); gap: 10px; }
      .editor-title { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .editor-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .editor-name { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--agpc-text-faint); font-weight: 700; }
      .editor-sub { font-size: 15px; font-weight: 700; color: var(--agpc-text); }
      .editor-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .enabled-label { font-size: 12px; color: var(--agpc-text-dim); }

      .switch { width: 34px; height: 20px; border-radius: 999px; background: rgba(255,255,255,0.1); position: relative; border: none; cursor: pointer; padding: 0; flex-shrink: 0; }
      .switch.on { background: var(--agpc-green); }
      .knob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left 0.15s ease; }
      .switch.on .knob { left: 16px; }

      .tab-strip { display: flex; gap: 4px; padding: 10px 14px 0; border-bottom: 1px solid var(--agpc-border); overflow-x: auto; }
      .tab { border: none; background: transparent; color: var(--agpc-text-dim); font-size: 12.5px; font-weight: 600; padding: 8px 12px; cursor: pointer; border-bottom: 2px solid transparent; font-family: inherit; white-space: nowrap; }
      .tab:hover { color: var(--agpc-text); }
      .tab.active { color: var(--agpc-blue); border-bottom-color: var(--agpc-blue); }

      .tab-body { padding: 16px 18px 20px; max-height: 640px; overflow-y: auto; }
      .section { margin-bottom: 22px; }
      .section:last-child { margin-bottom: 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--agpc-text-faint); margin-bottom: 10px; }
      .field-label { display: block; font-size: 11.5px; color: var(--agpc-text-dim); margin: 10px 0 5px; }
      .field-label:first-child { margin-top: 0; }
      .hint-text { font-size: 12px; color: var(--agpc-text-dim); margin: 0 0 10px; }

      .tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
      .tag { display: inline-flex; align-items: center; gap: 4px; background: var(--agpc-blue-soft); color: var(--agpc-blue); font-size: 11.5px; font-weight: 600; padding: 4px 6px 4px 10px; border-radius: 999px; }
      .tag-x { border: none; background: transparent; color: inherit; cursor: pointer; font-size: 13px; padding: 0 2px; }

      .save-btn { margin-top: 14px; width: 100%; justify-content: center; }

      .status-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--agpc-border-soft); font-size: 13px; color: var(--agpc-text-dim); }
      .status-row:last-child { border-bottom: none; }
      .status-value { color: var(--agpc-text); font-weight: 600; }

      .row-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 10px; border-radius: var(--agpc-radius-sm); cursor: pointer; }
      .row-item:hover { background: var(--agpc-card-hover); }
      .row-item.selected { background: var(--agpc-blue-soft); }
      .row-text { font-size: 13px; color: var(--agpc-text); }
      .row-actions { display: flex; align-items: center; gap: 6px; }

      .quick-override { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

      /* Rules editor (right panel) */
      .rules-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 4px; }
      .rules-title { font-size: 16px; font-weight: 700; color: var(--agpc-text); }
      .rules-policy-name { font-weight: 500; color: var(--agpc-text-dim); font-size: 13px; }
      .rules-subtabs { display: flex; gap: 18px; border-bottom: 1px solid var(--agpc-border); margin: 14px 0 4px; }
      .subtab { border: none; background: transparent; color: var(--agpc-text-dim); font-size: 12.5px; font-weight: 600; padding: 8px 2px; cursor: pointer; border-bottom: 2px solid transparent; font-family: inherit; }
      .subtab.active { color: var(--agpc-text); border-bottom-color: var(--agpc-blue); }

      .add-rule-form { display: flex; gap: 8px; margin: 14px 0; flex-wrap: wrap; }
      .add-rule-form .field { flex: 1; min-width: 140px; }
      .add-rule-form select.field { flex: 0 0 130px; }

      .rules-table { margin-top: 10px; }
      .rule-type-cell { display: inline-flex; align-items: center; gap: 6px; color: var(--agpc-text-dim); text-transform: capitalize; font-size: 12.5px; }
      .target-cell { font-family: var(--code-font-family); font-size: 12.5px; }
      .notes-cell { color: var(--agpc-text-faint); font-size: 12.5px; }

      .rules-footer { display: flex; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--agpc-border); }

      .rules-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 60px 20px; text-align: center; color: var(--agpc-text-dim); }
      .rules-empty-icon { width: 56px; height: 56px; border-radius: 14px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }

      .modal-scrim { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 50; }
      .modal { background: var(--agpc-card-bg); border: 1px solid var(--agpc-border); border-radius: var(--agpc-radius-lg); padding: 22px; width: 320px; }
      .modal-title { font-size: 15px; font-weight: 700; color: var(--agpc-text); margin-bottom: 4px; }
      .modal-sub { font-size: 12.5px; color: var(--agpc-text-dim); margin-bottom: 18px; }
      .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "client-view": ClientView; }
}
