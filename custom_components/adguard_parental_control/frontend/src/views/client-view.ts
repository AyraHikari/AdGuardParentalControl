import { LitElement, html, css, svg, nothing, PropertyValues } from "lit";

import { customElement, property, state } from "lit/decorators.js";

import { Client, GlobalState, Policy, QueryLogEntry, qhost } from "../data/websocket-api";

import { sharedStyles } from "../styles/theme";

import { ICONS } from "../icons";

import { lookupService, serviceIcon } from "../data/services-registry";



/** 24-hour cutoff as an ISO time string. */

const _24hAgoISO = () => new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();



type Tab = "general" | "policies" | "rules" | "overrides" | "activity";



@customElement("client-view")

export class ClientView extends LitElement {

  @property({ attribute:false }) public hass:any;

  @property({ attribute:false }) public state!:GlobalState;

  @property({ attribute:false }) public client!:Client;

  @property({ type:Object }) public onNavigate?: (view:string,detail?:any)=>void;

  @property({ type:Object }) public onStateChanged?:()=>void;

  @state() private _tab:Tab="policies";

  @state() private _queryLogs:QueryLogEntry[]=[];

  @state() private _queryLoading=false;

  @state() private _queryLive=true;

  @state() private _queryError="";

  @state() private _querySearch="";

  @state() private _queryOldest="";

  @state() private _queryFullyLoaded=false;

  @state() private _selectedPolicyId:string|null=null;

  @state() private _showDeleteConfirm=false;

  @state() private _showAddPolicy=false;

  @state() private _policyMenuId:string|null=null;

  @state() private _showAddRule=false;

  @state() private _editName="";

  @state() private _editIp="";

  @state() private _editAdguard="";

  @state() private _editingIdentity=false;

  @state() private _showGroupDialog=false;

  @state() private _showMemberDialog=false;

  @state() private _showProfileDialog=false;

  @state() private _newRuleTarget="";

  @state() private _newRuleAction:"block"|"allow"="block";

  @state() private _newRuleType:"domain"|"service"|"category"="domain";

  @state() private _newRuleIsRegex=false;

  @state() private _newRulePolicyId="";

  @state() private _topDetail:{key:string;requests:number;processed:number;blocked:number;totalMs:number;service:any}|null=null;

  private _queryTimer?:number;



  connectedCallback(){ super.connectedCallback(); this._startQueryPolling(); }

  disconnectedCallback(){ super.disconnectedCallback(); this._stopQueryPolling(); }

  updated(changed:PropertyValues){ if(changed.has("client")){this._selectedPolicyId=this.client?.assigned_policy_ids?.[0]||null;this._queryLogs=[];this._queryOldest="";this._queryFullyLoaded=false;this._loadQueryLog();} }

  private _icon(path:string,size=16){return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;}

  private get _group(){return this.state.groups.find(g=>g.client_names.includes(this.client.name)||g.member_names.some(n=>this.state.members.some(m=>m.name===n&&m.client_names.includes(this.client.name))))||null;}

  private get _member(){return this.state.members.find(m=>m.client_names.includes(this.client.name))||null;}

  private get _policies():Policy[]{

    const ids = new Set<string>(this.client.assigned_policy_ids || []);

    for (const member of this.state.members) {

      if (member.client_names.includes(this.client.name)) {

        for (const id of (member.assigned_policy_ids || [])) ids.add(id);

      }

    }

    for (const group of this.state.groups) {

      const direct = group.client_names.includes(this.client.name);

      const viaMember = group.member_names.some(name => this.state.members.some(m => m.name === name && m.client_names.includes(this.client.name)));

      if (direct || viaMember) {

        for (const id of (group.assigned_policy_ids || [])) ids.add(id);

      }

    }

    return [...ids].map(id=>this.state.policies.find(p=>p.id===id)).filter(Boolean) as Policy[];

  }

  private _policyActive(p:Policy){

    if(p.enabled===false) return false;

    const s=p.time_schedule;

    if(!s) return true;

    const now=new Date(), day=["sun","mon","tue","wed","thu","fri","sat"][now.getDay()];

    const days=(s.days||[]).map(d=>d.toLowerCase().slice(0,3));

    if(!s.time_from&&!s.time_to) return !days.length||days.includes(day);

    const toMin=(v:string)=>{const [h,m]=v.split(":").map(Number);return h*60+m;};

    const cur=now.getHours()*60+now.getMinutes();

    if(!s.time_from) return (!days.length||days.includes(day)) && cur<toMin(s.time_to!);

    if(!s.time_to) return (!days.length||days.includes(day)) && cur>=toMin(s.time_from);

    const from=toMin(s.time_from),to=toMin(s.time_to);

    if(from===to) return !days.length||days.includes(day);

    if(from<to) return (!days.length||days.includes(day)) && cur>=from && cur<to;

    if(cur>=from) return !days.length||days.includes(day);

    const order=["mon","tue","wed","thu","fri","sat","sun"], idx=order.indexOf(day);

    const prev=order[(idx+6)%7];

    return cur<to && (!days.length||days.includes(prev));

  }

  private get _activePolicy(){return this._policies.find(p=>this._policyActive(p))||this._policies[0]||null;}

  private _mode(p:Policy|null){if(!p)return"NORMAL";const a=p.rules.some(r=>r.action==="allow"),b=p.rules.some(r=>r.action==="block");return a&&b?"CUSTOM":a?"ALLOW":b?"RESTRICTED":"NORMAL";}

  private _schedule(p:Policy|null){const s=p?.time_schedule;if(!s)return"All day";return s.time_from&&s.time_to?`${s.time_from} - ${s.time_to}`:"All day";}

  private _days(p:Policy|null){const d=p?.time_schedule?.days;return d?.length?d.map(x=>x.slice(0,3)).join(" · "):"Every day";}

  private _next(p:Policy|null){const s=p?.time_schedule;if(!s?.time_from||!s.time_to)return"—";const now=new Date(),cur=now.getHours()*60+now.getMinutes(),[fh,fm]=s.time_from.split(":").map(Number),[th,tm]=s.time_to.split(":").map(Number),from=fh*60+fm,to=th*60+tm,active=from<=to?cur>=from&&cur<to:cur>=from||cur<to;return active?s.time_to:s.time_from;}

  private _blockedServices(){return [...new Set(this._policies.flatMap(p=>p.rules.filter(r=>r.rule_type==="service"&&r.action==="block").map(r=>r.target)))];}

  private _allowedServices(){return [...new Set(this._policies.flatMap(p=>p.rules.filter(r=>r.rule_type==="service"&&r.action==="allow").map(r=>r.target)))];}

  private _blocked(q:QueryLogEntry){const r=q.reason||"";if(r.startsWith("NotFiltered"))return false;return r.startsWith("Filtered")||r.startsWith("Rewrite");}

  private _time(v:string){const d=new Date(v);return Number.isNaN(d.getTime())?v.slice(11,19):d.toLocaleTimeString([], {hour12:false});}

  private _response(q:QueryLogEntry){const val=q.answer?.[0]?.value;return val||q.status||"—";}

  private _ms(q:QueryLogEntry){const n=Number.parseFloat(q.elapsedMs||"");return Number.isFinite(n)?`${Math.round(n)} ms`:q.elapsedMs||"—";}

  private _logs(){const search=this._querySearch.toLowerCase().trim();return this._queryLogs.filter(q=>!search||(qhost(q)).toLowerCase().includes(search));}

  private _topDomains(){const m=new Map<string,any>();for(const q of this._queryLogs){const k=qhost(q)||"unknown",v=m.get(k)||{requests:0,blocked:0,processed:0,totalMs:0};v.requests++;if(this._blocked(q))v.blocked++;else{v.processed++;const ms=Number.parseFloat(q.elapsedMs||"");if(Number.isFinite(ms))v.totalMs+=ms;}m.set(k,v);}return [...m.entries()].sort((a,b)=>b[1].requests-a[1].requests).slice(0,5);}

  private _topServices(){const m=new Map<string,any>();for(const q of this._queryLogs){const s=lookupService(qhost(q)),k=s?.name||qhost(q)||"unknown",v=m.get(k)||{service:s,requests:0,blocked:0,processed:0,totalMs:0};v.requests++;if(this._blocked(q))v.blocked++;else{v.processed++;const ms=Number.parseFloat(q.elapsedMs||"");if(Number.isFinite(ms))v.totalMs+=ms;}m.set(k,v);}return [...m.entries()].sort((a,b)=>b[1].requests-a[1].requests).slice(0,5);}

  private _serviceIcon(host:string,size=21){return serviceIcon(host,size);}

  private _startQueryPolling(){this._stopQueryPolling();if(this._queryLive){this._loadQueryLog();this._queryTimer=window.setInterval(()=>this._loadQueryLog(),5000);}}

  private _stopQueryPolling(){if(this._queryTimer)window.clearInterval(this._queryTimer);this._queryTimer=undefined;}

  private async _loadQueryLog(){if(!this.client||!this.hass||this._queryLoading)return;this._queryLoading=true;try{const isFullLoad=this._queryLogs.length===0;const limit=isFullLoad?200:120;const olderThan=isFullLoad?"":this._queryOldest;const d=await this.hass.callWS({type:"adguard_pc/clients/querylog",client_id:this.client.name,limit,search:"",response_status:"",older_than:olderThan});const entries:QueryLogEntry[]=d?.data||[];const newOldest:string=d?.oldest||"";if(isFullLoad){this._queryLogs=entries;this._queryOldest=newOldest;const cutoff=new Date(_24hAgoISO()).getTime();let curOldest=newOldest;let curEntries=entries;while(curOldest&&curEntries.length>=limit&&curEntries.length>0){const lastEntry=curEntries[curEntries.length-1];if(new Date(lastEntry.time).getTime()<=cutoff)break;const page=await this.hass.callWS({type:"adguard_pc/clients/querylog",client_id:this.client.name,limit,search:"",response_status:"",older_than:curOldest});const pageEntries:QueryLogEntry[]=page?.data||[];if(!pageEntries.length)break;this._queryLogs=[...this._queryLogs,...pageEntries];curOldest=page?.oldest||"";this._queryOldest=curOldest;curEntries=pageEntries;if(new Date(pageEntries[pageEntries.length-1].time).getTime()<=cutoff)break;if(!page?.oldest)break;}this._queryFullyLoaded=true;}else{if(entries.length){const existingKeys=new Set(this._queryLogs.map((e:QueryLogEntry)=>`${e.time}|${qhost(e)}|${e.question?.type}`));const fresh=entries.filter((e:QueryLogEntry)=>!existingKeys.has(`${e.time}|${qhost(e)}|${e.question?.type}`));if(fresh.length){const cutoff=new Date(_24hAgoISO()).getTime();this._queryLogs=[...fresh,...this._queryLogs].filter((e:QueryLogEntry)=>new Date(e.time).getTime()>cutoff);}}}this._queryError="";}catch(e){this._queryError=e instanceof Error?e.message:"Unable to load AdGuard query log";}finally{this._queryLoading=false;}}



  render(){
    if(!this.client)return html``;
    const p=this._activePolicy,g=this._group,m=this._member,profile=p?.profile_id?this.state.profiles.find(x=>x.id===p.profile_id):null;
    const restricted=!!p&&this._mode(p)!=="NORMAL";
    const now=new Date();
    const dayLabel=now.toLocaleDateString([], {weekday:"long"});
    const timeLabel=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:false});
    return html`
      <div class="page" @click=${()=>{if(this._policyMenuId!==null)this._policyMenuId=null;}}>
        <div class="breadcrumb"><button class="crumb-back" @click=${()=>this.onNavigate?.("clients")} aria-label="Back">${this._icon(ICONS.back,15)}</button><span @click=${()=>this.onNavigate?.("clients")}>Clients</span><span>›</span><strong>${this.client.name}</strong></div>
        <section class="hero card">
          <div class="hero-left">
            <div class="device-hero-icon">${this._icon(ICONS.laptop,32)}</div>
            <div class="hero-main"><div class="title-line"><h1>${this.client.name}</h1><span class="pill online-pill"><i></i>Online</span></div><div class="hero-line">${this.client.ids[0]||"No IP"}<span class="dot">•</span>Primary device</div><div class="hero-sub">AdGuard Client: ${this.client.ids[1]||this.client.name}</div></div>
          </div>
          <div class="hero-metrics">
            <div class="hero-metric"><small>STATUS</small><span class="pill ${restricted?"status-restricted":"status-unrestricted"}">${restricted?"RESTRICTED":"UNRESTRICTED"}</span></div>
            <div class="hero-metric"><small>CURRENT POLICY</small><strong>${p?.name||"Default"}</strong></div>
            <div class="hero-metric"><small>NEXT CHANGE</small><strong>${this._next(p)}</strong><span class="hero-note">${p?.time_schedule?"Scheduled":"—"}</span></div>
            <div class="hero-metric"><small>GROUP</small><strong>${g?.name||"—"}</strong></div>
            <div class="hero-metric"><small>MEMBER</small><strong>${m?.name||"—"}</strong></div>
            <div class="hero-metric"><small>PROFILE</small><strong>${profile?.name||"—"}</strong></div>
          </div>
          <div class="hero-actions"><button class="btn" @click=${()=>this._tab="general"}>Edit Client</button><button class="icon-btn" @click=${()=>this._showDeleteConfirm=true} title="Delete">${this._icon(ICONS.delete,14)}</button></div>
        </section>
        <div class="tabs">${(["general","policies","rules","overrides","activity"] as Tab[]).map(t=>html`<button class="tab ${this._tab===t?"active":""}" @click=${()=>this._tab=t}>${t[0].toUpperCase()+t.slice(1)}</button>`)}</div>
        <div class="content-grid">
          <main class="main-column">
            ${this._tab==="general"?this._general(g,m,profile):nothing}
            ${this._tab==="policies"?html`${this._policiesView(p)}<section class="card preview-card"><div class="section-head"><div><h2>Policy Preview <span>(Now)</span></h2><small>Effective policy for this client right now.</small></div><button class="btn small" @click=${()=>{this._tab="activity"}}>Details</button></div><div class="preview-grid"><div><small>EFFECTIVE MODE</small><strong class="pill purple">${this._mode(p)}</strong></div><div><small>ACTIVE POLICY</small><strong>${p?.name||"Default"}</strong><span>${this._schedule(p)}</span></div><div><small>MATCHING CONDITIONS</small><strong>✓ Time: ${timeLabel}</strong><span>✓ Day: ${dayLabel}</span></div></div></section>`:nothing}
            ${this._tab==="rules"?this._rulesView():nothing}
            ${this._tab==="overrides"?this._overridesView():nothing}
            ${this._tab==="activity"?this._activityView():nothing}
            <div class="bottom-grid">${this._topTable("Top Services",this._topServices(),true)}${this._topTable("Top Domains",this._topDomains(),false)}</div>
          </main>
          <aside class="query-panel card">
            <div class="query-head"><div><div class="query-title-row"><h2>Service / Domain History</h2><span class="live-badge"><i class=${this._queryLive?"on":""}></i>${this._queryLive?"Live":"Paused"}</span></div><small>Latest DNS queries for this client</small></div><div class="query-actions"><select class="compact-select"><option>Last 24 hours</option></select><button class="icon-btn" @click=${this._loadQueryLog} title="Refresh">${this._icon(ICONS.sync,14)}</button></div></div>
            <div class="query-search-row"><select class="compact-select query-filter"><option>All Types</option></select><input class="field" placeholder="Search domain…" .value=${this._querySearch} @input=${(e:Event)=>this._querySearch=(e.target as HTMLInputElement).value}></div>
            <div class="query-table-wrap"><table class="table query-table"><thead><tr><th>TIME</th><th>DOMAIN / SERVICE</th><th>TYPE</th><th>RESPONSE</th><th>STATUS</th><th>DETAILS</th></tr></thead><tbody>${this._logs().slice(0,12).map(q=>html`<tr><td class="time">${this._time(q.time)}</td><td><div class="domain-cell">${this._serviceIcon(qhost(q),19)}<strong>${qhost(q)||"—"}</strong></div></td><td>${q.question?.type||"A"}</td><td class="response">${this._blocked(q)?"Blocked":this._response(q)}</td><td>${this._blocked(q)?html`<span class="pill red">Blocked</span>`:html`<span class="pill green">Processed</span>`}</td><td class="details">${this._blocked(q)?html`✕ ${q.reason||"Blocklist"}`:this._ms(q)}</td></tr>`)}</tbody></table>${this._queryLoading&&!this._queryLogs.length?html`<div class="empty">Loading query log…</div>`:nothing}${this._queryError?html`<div class="query-error">${this._queryError}</div>`:nothing}${!this._queryLoading&&!this._logs().length?html`<div class="empty">No DNS queries found for this client.</div>`:nothing}</div>
            <div class="query-foot"><label class="auto-scroll"><span>Auto-scroll</span><input type="checkbox" .checked=${this._queryLive} @change=${()=>{this._queryLive=!this._queryLive;this._queryLive?this._startQueryPolling():this._stopQueryPolling();}}><i></i></label><button class="btn small" @click=${()=>this.onNavigate?.("logs")}>View Full Query Log</button></div>
          </aside>
        </div>
      </div>
      ${this._showDeleteConfirm?html`<div class="modal-scrim" @click=${()=>this._showDeleteConfirm=false}><div class="modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Delete client "${this.client.name}"?</h3><p>This action cannot be undone. All associated policies and data will be removed.</p><div class="modal-actions"><button class="btn" @click=${()=>this._showDeleteConfirm=false}>Cancel</button><button class="btn btn-danger" @click=${this._deleteClient}>Delete</button></div></div></div>`:nothing}
      ${this._showAddPolicy?this._renderAddPolicyModal():nothing}
      ${this._showAddRule?this._renderAddRuleModal():nothing}
      ${this._topDetail?html`<div class="modal-scrim" @click=${()=>this._topDetail=null}><div class="modal detail-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>${this._topDetail.key}</h3><div class="detail-grid"><div class="detail-row"><span>Total Requests</span><strong>${this._topDetail.requests}</strong></div><div class="detail-row"><span>Processed</span><strong class="green-text">${this._topDetail.processed} <small>(${this._topDetail.requests?Math.round(this._topDetail.processed/this._topDetail.requests*100):0}%)</small></strong></div><div class="detail-row"><span>Blocked</span><strong class="red-text">${this._topDetail.blocked} <small>(${this._topDetail.requests?Math.round(this._topDetail.blocked/this._topDetail.requests*100):0}%)</small></strong></div><div class="detail-row"><span>Avg Response</span><strong>${this._topDetail.processed?`${Math.round(this._topDetail.totalMs/this._topDetail.processed)} ms`:"—"}</strong></div></div><div class="modal-actions"><button class="btn" @click=${()=>this._topDetail=null}>Close</button></div></div></div>`:nothing}
    `;
  }

  private _general(g:any,m:any,profile:any){

    if(!this._editingIdentity){

      this._editName=this.client.name;this._editIp=this.client.ids[0]||"";this._editAdguard=this.client.ids[1]||"";

    }

    return html`<section class="card section-card"><div class="section-head"><h2>Client Identity</h2><div style="display:flex;gap:6px">${this._editingIdentity?html`<button class="btn" @click=${()=>{this._editingIdentity=false;}}>Cancel</button><button class="btn primary" @click=${this._saveIdentity}>Save</button>`:html`<button class="btn small" @click=${()=>{this._editingIdentity=true;this._editName=this.client.name;this._editIp=this.client.ids[0]||"";this._editAdguard=this.client.ids[1]||"";}}>✎ Edit</button>`}</div></div><div class="form-grid"><label>Name<input class="field" .value=${this._editingIdentity?this._editName:this.client.name} ?readonly=${!this._editingIdentity} @input=${(e:Event)=>{if(this._editingIdentity)this._editName=(e.target as HTMLInputElement).value;}}></label><label>IP Address<input class="field" .value=${this._editingIdentity?this._editIp:this.client.ids[0]||""} ?readonly=${!this._editingIdentity} @input=${(e:Event)=>{if(this._editingIdentity)this._editIp=(e.target as HTMLInputElement).value;}}></label><label>AdGuard Client<input class="field" .value=${this._editingIdentity?this._editAdguard:this.client.ids[1]||""} ?readonly=${!this._editingIdentity} @input=${(e:Event)=>{if(this._editingIdentity)this._editAdguard=(e.target as HTMLInputElement).value;}}></label><label>Group<span class="field clickable-field" @click=${()=>this._showGroupDialog=true}>${g?.name||"— (click to assign)"}</span></label><label>Member<span class="field clickable-field" @click=${()=>this._showMemberDialog=true}>${m?.name||"— (click to assign)"}</span></label><label>Profile<span class="field clickable-field" @click=${()=>this._showProfileDialog=true}>${profile?.name||"— (click to assign)"}</span></label></div></section>

    ${this._showGroupDialog?this._renderGroupDialog():nothing}

    ${this._showMemberDialog?this._renderMemberDialog():nothing}

    ${this._showProfileDialog?this._renderProfileDialog():nothing}

    `;}

  private _policiesView(active:Policy|null){return html`<section class="card section-card"><div class="section-head"><div><h2>Assigned Policies</h2><small>Policies applied to this client (top to bottom = priority)</small></div><button class="btn primary small" @click=${()=>{this._showAddPolicy=true;}}>＋ Assign Policy</button></div><table class="table"><thead><tr><th>PRIORITY</th><th>POLICY</th><th>SCHEDULE</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>${this._policies.map((p,i)=>html`<tr class=${p.id===active?.id?"active-row":""}><td>${i+1}</td><td><strong>${p.name}</strong><span class="pill purple mode-pill">${this._mode(p)}</span></td><td>${this._schedule(p)}<small>${this._days(p)}</small></td><td><span class="pill ${this._policyActive(p)?"green":"gray"}">${this._policyActive(p)?"ACTIVE":"INACTIVE"}</span></td><td class="actions-cell"><div class="dropdown-wrap"><button class="icon-btn menu-btn" @click=${(e:Event)=>{e.stopPropagation();this._policyMenuId=this._policyMenuId===p.id?null:p.id;}}>⋮</button>${this._policyMenuId===p.id?html`<div class="dropdown-menu"><button class="dropdown-item" @click=${()=>{this._togglePolicyEnabled(p);this._policyMenuId=null;}}>${p.enabled!==false?"⬜ Disable":"✅ Enable"}</button><button class="dropdown-item danger" @click=${()=>{this._unassignPolicy(p);this._policyMenuId=null;}}>🗑 Unassign</button></div>`:nothing}</div></td></tr>`)}</tbody></table>${!this._policies.length?html`<div class="empty">No policies assigned.</div>`:html`<div class="info-note">ⓘ Policies are evaluated from top to bottom. The first matching policy is applied unless overridden.</div>`}</section>`;}

  private _rulesView(){const rules=this._policies.flatMap(p=>p.rules.map(r=>({...r,policy:p.name})));return html`<section class="card section-card"><div class="section-head"><div><h2>Client Rules</h2><small>Rules inherited from assigned policies</small></div><button class="btn primary small" @click=${()=>{this._newRulePolicyId=this._policies[0]?.id||"";this._showAddRule=true;}}>＋ Add Rule</button></div><table class="table"><thead><tr><th>POLICY</th><th>TYPE</th><th>TARGET</th><th>ACTION</th></tr></thead><tbody>${rules.map(r=>html`<tr><td>${r.policy}</td><td>${r.is_regex?"regex":r.rule_type}</td><td class="mono">${r.target}</td><td><span class="pill ${r.action==="allow"?"green":"red"}">${r.action.toUpperCase()}</span></td></tr>`)}</tbody></table>${!rules.length?html`<div class="empty">No rules defined.</div>`:nothing}</section>`;}

  private _overridesView(){const os=this.state.overrides.filter(o=>o.target_type==="client"&&o.target===this.client.name&&(!o.expires||new Date(o.expires).getTime()>Date.now()));return html`<section class="card section-card"><div class="section-head"><h2>Overrides (${os.length})</h2><button class="btn primary small">＋ New Override</button></div>${os.length?os.map(o=>html`<div class="override-row"><strong>${o.action.replace(/_/g," ")}</strong><span>${o.expires||"No expiry"}</span></div>`):html`<div class="empty">No active overrides.</div>`}</section>`;}

  private _activityView(){return html`<section class="card section-card"><div class="section-head"><h2>Activity</h2><button class="btn small" @click=${this._loadQueryLog}>↻ Refresh</button></div><div class="activity-summary"><strong>${this._queryLogs.length}</strong><span>recent DNS queries loaded from AdGuard Home</span></div></section>`;}

  private _topTable(title:string,rows:any[],services:boolean){return html`<section class="card section-card top-table"><div class="section-head"><h2>${title} <span>(Last 24 hours)</span></h2></div><table class="table"><thead><tr><th>${services?"SERVICE":"DOMAIN"}</th><th>REQUESTS</th><th>PROCESSED</th><th>BLOCKED</th></tr></thead><tbody>${rows.map(([key,v]:any)=>{const pp=v.requests?Math.round(v.processed/v.requests*100):0,bp=v.requests?Math.round(v.blocked/v.requests*100):0;return html`<tr><td><div class="domain-cell top-cell" @click=${()=>this._topDetail={key,requests:v.requests,processed:v.processed,blocked:v.blocked,totalMs:v.totalMs,service:v.service||null}}>${services&&v.service?this._serviceIcon(v.service.domains[0],20):nothing}<strong>${key}</strong></div></td><td>${v.requests}</td><td class="processed">${v.processed||"—"}<small>${pp}%</small></td><td class="blocked-count">${v.blocked||"—"}<small>${bp}%</small></td></tr>`;})}</tbody></table>${!rows.length?html`<div class="empty">No query data yet.</div>`:nothing}</section>`;}

  private _renderAddPolicyModal(){const assigned=new Set(this.client.assigned_policy_ids);const available=this.state.policies.filter(p=>!assigned.has(p.id));return html`<div class="modal-scrim" @click=${()=>this._showAddPolicy=false}></div><div class="modal wide-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Assign Policy to ${this.client.name}</h3><p>Select a policy to assign to this client.</p><div class="modal-list">${available.length?available.sort((a,b)=>b.priority-a.priority).map(p=>html`<button class="modal-list-item" @click=${async()=>{const updated:Client={...this.client,assigned_policy_ids:[...this.client.assigned_policy_ids,p.id]};await this.hass.callWS({type:"adguard_pc/clients/update",client:updated});this._showAddPolicy=false;await this.onStateChanged?.();}}><span><strong>${p.name}</strong><small>Priority ${p.priority} · ${p.rules.length} rules</small></span></button>`):html`<div class="empty">All policies are already assigned.</div>`}</div><div class="modal-actions"><button class="btn" @click=${()=>this._showAddPolicy=false}>Cancel</button></div></div>`;}

  private _renderAddRuleModal(){const policyOptions=this._policies;return html`<div class="modal-scrim" @click=${()=>this._showAddRule=false}></div><div class="modal wide-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Add Rule to ${this.client.name}</h3><p>Add a custom rule to one of the client's assigned policies.</p><div class="rule-form"><label>Policy<select class="field" @change=${(e:Event)=>this._newRulePolicyId=(e.target as HTMLSelectElement).value}>${policyOptions.map(p=>html`<option value=${p.id} ?selected=${p.id===this._newRulePolicyId}>${p.name}</option>`)}</select></label><label>Target<input class="field" placeholder="example.com" .value=${this._newRuleTarget} @input=${(e:Event)=>this._newRuleTarget=(e.target as HTMLInputElement).value}></label><label>Type<select class="field" @change=${(e:Event)=>this._newRuleType=(e.target as HTMLSelectElement).value as any}><option value="domain" ?selected=${this._newRuleType==="domain"}>Domain</option><option value="service" ?selected=${this._newRuleType==="service"}>Service</option><option value="category" ?selected=${this._newRuleType==="category"}>Category</option></select></label><label>Action<select class="field" @change=${(e:Event)=>this._newRuleAction=(e.target as HTMLSelectElement).value as any}><option value="block" ?selected=${this._newRuleAction==="block"}>Block</option><option value="allow" ?selected=${this._newRuleAction==="allow"}>Allow</option></select></label><label class="checkbox-row"><input type="checkbox" .checked=${this._newRuleIsRegex} @change=${(e:Event)=>this._newRuleIsRegex=(e.target as HTMLInputElement).checked}> Regex pattern</label></div><div class="modal-actions"><button class="btn" @click=${()=>this._showAddRule=false}>Cancel</button><button class="btn primary" @click=${this._addRule} ?disabled=${!this._newRuleTarget||!this._newRulePolicyId}>Add Rule</button></div></div>`;}

  private async _addRule(){if(!this._newRuleTarget||!this._newRulePolicyId)return;const policy=this.state.policies.find(p=>p.id===this._newRulePolicyId);if(!policy)return;if(this._newRuleIsRegex){try{new RegExp(this._newRuleTarget)}catch(e){alert(`Invalid regex: ${(e as Error).message}`);return;}}const newRules=[...policy.rules.map(r=>({target:r.target,action:r.action,rule_type:r.rule_type,is_regex:r.is_regex})),{target:this._newRuleTarget,action:this._newRuleAction,rule_type:this._newRuleType,is_regex:this._newRuleIsRegex}];await this.hass.callWS({type:"adguard_pc/policies/update",policy:{...policy,rules:newRules}});this._newRuleTarget="";this._newRuleIsRegex=false;this._showAddRule=false;await this.onStateChanged?.();}

  private async _togglePolicyEnabled(p:Policy){

    const updated={...p,enabled:p.enabled===false?true:false};

    await this.hass.callWS({type:"adguard_pc/policies/update",policy:updated});

    this.onStateChanged?.();

  }

  private async _unassignPolicy(p:Policy){

    const updated={...this.client,assigned_policy_ids:this.client.assigned_policy_ids.filter(id=>id!==p.id)};

    await this.hass.callWS({type:"adguard_pc/clients/update",client:updated});

    this.onStateChanged?.();

  }

  private async _saveIdentity(){

    const updated={...this.client,name:this._editName,ids:[this._editIp,this._editAdguard].filter(Boolean)};

    await this.hass.callWS({type:"adguard_pc/clients/update",client:updated});

    this._editingIdentity=false;

    this.onStateChanged?.();

  }

  private async _deleteClient(){await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:this.client.name});this._showDeleteConfirm=false;this.onStateChanged?.();this.onNavigate?.("clients");}

  private _renderGroupDialog(){

    return html`<div class="modal-scrim" @click=${()=>this._showGroupDialog=false}></div><div class="modal wide-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Select Group</h3><p>Assign this client to a group.</p><div class="modal-list">${this.state.groups.map(g=>html`<button class="modal-list-item" @click=${async()=>{const updated={...this.client,client_names:[this.client.name]};await this.hass.callWS({type:"adguard_pc/clients/update",client:this.client});/* Client stays as-is, group assignment is from group side */this._showGroupDialog=false;this.onStateChanged?.();}}><span><strong>${g.name}</strong><small>${g.client_names.length} clients</small></span></button>`)}${!this.state.groups.length?html`<div class="empty">No groups defined yet.</div>`:nothing}</div><div class="modal-actions"><button class="btn" @click=${()=>this._showGroupDialog=false}>Cancel</button></div></div>`;

  }

  private _renderMemberDialog(){

    return html`<div class="modal-scrim" @click=${()=>this._showMemberDialog=false}></div><div class="modal wide-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Select Member</h3><p>Assign this client to a member.</p><div class="modal-list">${this.state.members.map(m=>html`<button class="modal-list-item" @click=${async()=>{const updated={...(m as any),client_names:[...new Set([...m.client_names,this.client.name])],id:(m as any).id};await this.hass.callWS({type:"adguard_pc/members/update",member:updated});this._showMemberDialog=false;this.onStateChanged?.();}}><span><strong>${m.name}</strong><small>${m.client_names.length} clients</small></span></button>`)}${!this.state.members.length?html`<div class="empty">No groups defined yet.</div>`:nothing}</div><div class="modal-actions"><button class="btn" @click=${()=>this._showMemberDialog=false}>Cancel</button></div></div>`;

  }

  private _renderProfileDialog(){

    return html`<div class="modal-scrim" @click=${()=>this._showProfileDialog=false}></div><div class="modal wide-modal" @click=${(e:Event)=>e.stopPropagation()}><h3>Select Profile</h3><p>Choose a profile template for this client's assigned policies.</p><div class="modal-list">${this.state.profiles.map(p=>html`<button class="modal-list-item" @click=${async()=>{this._showProfileDialog=false;this.onStateChanged?.();}}><span><strong>${p.name}</strong><small>${p.rules.length} rules</small></span></button>`)}${!this.state.profiles.length?html`<div class="empty">No profiles defined yet.</div>`:nothing}</div><div class="modal-actions"><button class="btn" @click=${()=>this._showProfileDialog=false}>Cancel</button></div></div>`;

  }



  static styles=[sharedStyles,css`
    :host{display:block;color:var(--agpc-text,#eef2ff)}
    .page{padding:0 10px 28px;max-width:1680px;margin:0 auto}
    .card{background:#151c31;border:1px solid #27304a;border-radius:12px;box-sizing:border-box}
    .breadcrumb{height:42px;display:flex;align-items:center;gap:8px;color:#7d8aa4;font-size:12px;padding:0 4px}.breadcrumb strong{color:#eef2ff}.crumb-back{width:22px;height:22px;border:0;background:transparent;color:#8290aa;display:grid;place-items:center;cursor:pointer;padding:0}.breadcrumb span:nth-of-type(1){cursor:pointer}
    .hero{min-height:104px;padding:15px 18px;display:flex;align-items:center;gap:16px}.hero-left{display:flex;align-items:center;gap:14px;flex:1;min-width:250px}.device-hero-icon{width:60px;height:60px;border-radius:14px;background:#12203c;border:1px solid #31415e;color:#6fa4ff;display:grid;place-items:center;flex:none}.hero-main{min-width:185px}.title-line{display:flex;align-items:center;gap:9px}.title-line h1{margin:0;font-size:20px;font-weight:700}.hero-line{font-size:12px;color:#c9d1e2;margin-top:7px}.hero-line .dot{margin:0 7px;color:#5e6c86}.hero-sub{font-size:10px;color:#66738e;margin-top:4px}.hero-metrics{display:flex;align-items:stretch;gap:20px;flex:none}.hero-metric{min-width:72px}.hero-metric small{display:block;color:#68758f;font-size:9px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}.hero-metric strong{font-size:12px;color:#e7ecf8;white-space:nowrap}.hero-note{display:block;color:#68758f;font-size:9px;margin-top:3px}
    .hero-actions{display:flex;align-items:flex-start;gap:6px;align-self:flex-start;margin-left:auto}.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid #2e3853;background:#151e34;color:#d8dff0;border-radius:8px;padding:8px 13px;font:600 12px inherit;cursor:pointer;white-space:nowrap}.btn:hover{background:#1d2844}.btn.primary{background:#3b5bdb;border-color:#3b5bdb;color:#fff}.btn.small{padding:6px 10px;font-size:11px}.btn-danger{background:#e53e3e;border-color:#e53e3e;color:#fff}.icon-btn{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:8px;border:1px solid #2e3853;background:transparent;color:#75839e;cursor:pointer;padding:0}.icon-btn:hover{background:#1d2844;color:#e7ecf8}
    .pill{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:10px;font:600 9px inherit}.online-pill{background:rgba(72,187,120,.15);color:#68d391}.online-pill i{width:6px;height:6px;border-radius:50%;background:#48bb78}.status-restricted{background:rgba(236,201,75,.15);color:#ecc94b}.status-unrestricted,.green{background:rgba(72,187,120,.15);color:#68d391}.purple{background:rgba(159,122,234,.15);color:#b794f4}.red{background:rgba(252,129,129,.15);color:#fc8181}.gray{background:rgba(160,174,192,.12);color:#a0aec0}
    .tabs{display:flex;gap:10px;padding:0 10px;border-bottom:1px solid #27304a}.tab{border:0;background:transparent;color:#75839e;font:600 12px inherit;padding:12px 10px 11px;border-bottom:2px solid transparent;cursor:pointer}.tab.active{color:#4e8cff;border-bottom-color:#4e8cff}
    .content-grid{display:grid;grid-template-columns:minmax(0,1fr) 640px;gap:12px;margin-top:10px;align-items:start}.main-column{min-width:0}.section-card{padding:15px;margin-bottom:10px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}.section-head h2{margin:0;font-size:14px}.section-head h2 span{color:#68758f;font-weight:500}.section-head small{display:block;color:#68758f;font-size:10px;margin-top:4px}
    .table{width:100%;border-collapse:collapse;font-size:12px}.table th{text-align:left;color:#68758f;font-size:9px;text-transform:uppercase;letter-spacing:.05em;font-weight:600;padding:8px;border-bottom:1px solid #27304a}.table td{padding:8px;border-bottom:1px solid #1f2940;color:#c5cee0}.table tbody tr:last-child td{border-bottom:none}.table tr.active-row{background:rgba(78,140,255,.05)}.actions-cell{position:relative}.dropdown-wrap{position:relative}.dropdown-menu{position:absolute;right:0;top:100%;margin-top:4px;background:#1a2240;border:1px solid #3a4568;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.5);z-index:100;min-width:140px;padding:4px 0}.dropdown-item{display:block;width:100%;padding:8px 14px;border:0;background:transparent;color:#c5cee0;font:inherit;font-size:12px;text-align:left;cursor:pointer}.dropdown-item:hover{background:#253050;color:#fff}.dropdown-item.danger{color:#fc8181}.mode-pill{margin-left:6px;font-size:8px}.info-note{background:rgba(78,140,255,.08);border:1px solid rgba(78,140,255,.18);border-radius:8px;padding:9px 12px;color:#7fbcf2;font-size:10px;margin-top:8px}.empty{padding:24px;text-align:center;color:#4a5568;font-size:12px}
    .preview-card{padding:15px;margin-bottom:10px}.preview-grid{display:grid;grid-template-columns:1fr 1.1fr 1.2fr;gap:18px;border-top:1px solid #27304a;padding-top:13px}.preview-grid>div{display:flex;flex-direction:column;gap:5px}.preview-grid small{color:#68758f;font-size:9px;text-transform:uppercase;letter-spacing:.05em}.preview-grid strong{font-size:12px;color:#e7ecf8}.preview-grid span{color:#7d8aa4;font-size:10px}
    .bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.top-table{margin-bottom:0}.top-table td{padding:7px 8px}.domain-cell{display:flex;align-items:center;gap:7px}.domain-cell strong{font-size:12px;color:#e2e8f0}.domain-cell.top-cell{cursor:pointer}.domain-cell.top-cell:hover strong{color:#4e8cff}.processed{color:#68d391}.blocked-count{color:#fc8181}.processed small,.blocked-count small{display:block;color:#68758f;font-size:9px;margin-top:2px}
    .query-panel{padding:14px;position:sticky;top:10px;height:calc(100vh - 205px);min-height:520px;overflow:hidden;display:flex;flex-direction:column}.query-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:10px}.query-title-row{display:flex;align-items:center;gap:8px}.query-head h2{margin:0;font-size:14px}.query-head small{display:block;color:#68758f;font-size:10px;margin-top:3px}.live-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 7px;border-radius:9px;background:rgba(72,187,120,.12);color:#68d391;font-size:9px;font-weight:600}.live-badge i{width:6px;height:6px;border-radius:50%;background:#48bb78}.live-badge i:not(.on){background:#68758f}.query-actions{display:flex;gap:6px;align-items:center}.compact-select{background:#0f1629;border:1px solid #27304a;color:#a0aec0;border-radius:7px;padding:6px 8px;font-size:10px;min-width:106px}.query-search-row{display:grid;grid-template-columns:90px 1fr;gap:7px;margin-bottom:8px}.query-search-row .field{width:100%;box-sizing:border-box;background:#0f1629;border:1px solid #27304a;color:#e7ecf8;border-radius:7px;padding:7px 10px;font:inherit;font-size:11px}.query-table-wrap{overflow:auto;min-height:0;flex:1}.query-table{font-size:10px}.query-table th{font-size:8px;padding:6px}.query-table td{padding:6px}.query-table th:first-child,.query-table td:first-child{width:58px}.time{color:#596780;font-family:monospace;font-size:9px;white-space:nowrap}.query-table .domain-cell strong{font-size:10.5px}.response{font-size:10px;color:#a0aec0;white-space:nowrap}.details{font-size:9px;color:#7d8aa4;white-space:nowrap}.query-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid #27304a}.auto-scroll{display:flex;align-items:center;gap:7px;color:#8794ae;font-size:10px;cursor:pointer;position:relative}.auto-scroll input{position:absolute;opacity:0;pointer-events:none}.auto-scroll i{width:26px;height:14px;border-radius:10px;background:#31405f;position:relative}.auto-scroll i::after{content:"";position:absolute;width:10px;height:10px;border-radius:50%;left:2px;top:2px;background:#b4bfd3;transition:.15s}.auto-scroll input:checked+i{background:#48bb78}.auto-scroll input:checked+i::after{left:14px;background:#fff}.query-error{color:#fc8181;font-size:10px;padding:10px}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.form-grid label{display:flex;flex-direction:column;gap:4px;font-size:10px;color:#68758f;text-transform:uppercase}.form-grid .field{background:#0f1629;border:1px solid #27304a;color:#e7ecf8;border-radius:8px;padding:8px 10px;font:inherit;font-size:12px}.form-grid input.field[readonly]{opacity:.6}.clickable-field{background:#0f1629;border:1px dashed #4a5568;color:#a0aec0;border-radius:8px;padding:8px 10px;font-size:12px;cursor:pointer}.clickable-field:hover{border-color:#4e8cff;color:#e2e8f0}
    .activity-summary{padding:16px;text-align:center}.activity-summary strong{font-size:28px;color:#e7ecf8;display:block}.activity-summary span{color:#68758f;font-size:12px}.modal-scrim{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200}.modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a2240;border:1px solid #3a4568;border-radius:14px;padding:24px;z-index:201;max-width:420px;width:90%}.modal h3{margin:0 0 8px;font-size:16px;color:#e7ecf8}.modal p{margin:0 0 16px;color:#a0aec0;font-size:13px}.modal-actions{display:flex;gap:8px;justify-content:flex-end}.wide-modal{max-width:540px}.modal-list{display:flex;flex-direction:column;gap:4px;max-height:300px;overflow-y:auto;margin-bottom:16px}.modal-list-item{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#0f1629;border:1px solid #27304a;border-radius:8px;color:#e2e8f0;cursor:pointer;text-align:left;font:inherit}.modal-list-item:hover{border-color:#4e8cff;background:#151e34}.modal-list-item span{display:flex;flex-direction:column}.modal-list-item small{color:#68758f;font-size:10px}.override-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #1e2a45}.override-row strong{text-transform:capitalize;font-size:12px}.override-row span{color:#68758f;font-size:11px}.detail-modal{max-width:400px}.detail-grid{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}.detail-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #27304a;font-size:12px}.detail-row span{color:#a0aec0}.green-text{color:#68d391}.red-text{color:#fc8181}.mono{font-family:monospace}
    @media (max-width:1200px){.content-grid{grid-template-columns:minmax(0,1fr) 520px}.hero-metrics{gap:13px}.hero-left{min-width:220px}}
    @media (max-width:980px){.content-grid{grid-template-columns:1fr}.query-panel{position:relative;top:auto;height:480px}.hero{flex-wrap:wrap}.hero-left{width:100%}.hero-metrics{width:100%;justify-content:space-between}.hero-actions{position:absolute;right:18px;top:16px}.bottom-grid{grid-template-columns:1fr}}
  `];

}
