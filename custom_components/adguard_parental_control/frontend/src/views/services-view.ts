import { LitElement, html, css, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GlobalState, ServiceInfo } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

@customElement("services-view")
export class ServicesView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  @state() private _services: ServiceInfo[] = [];
  @state() private _loading = true;
  @state() private _search = "";
  @state() private _saving = false;

  private _pollHandle?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    this._loadServices();
    this._pollHandle = setInterval(() => this._loadServices(), 30000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._pollHandle) clearInterval(this._pollHandle);
  }

  updated(changed: any) {
    if (changed.has("hass") && this.hass && this._loading) {
      this._loadServices();
    }
  }

  private async _loadServices() {
    if (!this.hass) return;
    try {
      this._services = await this.hass.callWS({ type: "adguard_pc/services/list" });
      this._loading = false;
    } catch (err) {
      console.error("Failed to load services:", err);
      this._loading = false;
    }
  }

  private async _toggleBlocked(svc: ServiceInfo) {
    if (this._saving) return;
    this._saving = true;
    try {
      const currentBlocked = this._services.filter((s) => s.blocked).map((s) => s.id);
      let nextBlocked: string[];
      if (svc.blocked) {
        nextBlocked = currentBlocked.filter((id) => id !== svc.id);
      } else {
        nextBlocked = [...currentBlocked, svc.id];
      }
      await this.hass.callWS({
        type: "adguard_pc/services/update",
        service_ids: nextBlocked,
      });
      svc.blocked = !svc.blocked;
      this._services = [...this._services];
      this.onStateChanged?.();
    } catch (err) {
      console.error("Failed to toggle service:", err);
    }
    this._saving = false;
  }

  private _icon(path: string, size = 16) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  render() {
    if (!this.state) return html``;

    const searchLower = this._search.toLowerCase();
    const filtered = this._search
      ? this._services.filter((s) => s.name.toLowerCase().includes(searchLower) || s.id.toLowerCase().includes(searchLower))
      : this._services;
    const blockedCount = this._services.filter((s) => s.blocked).length;

    return html`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(ICONS.services, 18)}</div>
            <h2>Blocked Services <span class="count">(${blockedCount} / ${this._services.length})</span></h2>
          </div>
        </div>

        ${this._loading
          ? html`<div class="loading-msg">Loading services…</div>`
          : html`
              <div class="search-bar">
                <input
                  type="text"
                  class="search"
                  placeholder="Search services…"
                  .value=${this._search}
                  @input=${(e: Event) => {
                    this._search = (e.target as HTMLInputElement).value;
                  }}
                />
              </div>

              <div class="service-grid">
                ${filtered.map((svc) => html`
                  <div class="service-item ${svc.blocked ? "blocked" : "allowed"}" @click=${() => this._toggleBlocked(svc)}>
                    <div class="svc-left">
                      <div class="svc-icon">${svc.icon || "🌐"}</div>
                      <div class="svc-info">
                        <div class="svc-name">${svc.name}</div>
                        <div class="svc-id">${svc.id}</div>
                      </div>
                    </div>
                    <div class="svc-toggle ${svc.blocked ? "on" : ""}">
                      <div class="toggle-track">
                        <div class="toggle-thumb"></div>
                      </div>
                      <span class="toggle-label">${svc.blocked ? "Blocked" : "Allowed"}</span>
                    </div>
                  </div>
                `)}
                ${filtered.length === 0 ? html`
                  <div class="empty-state" style="grid-column: 1 / -1; padding: 24px;">
                    ${this._search ? "No services match your search" : "No services available"}
                  </div>
                ` : ""}
              </div>
            `}
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-red-soft); color: var(--agpc-red); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .loading-msg { text-align: center; padding: 32px; color: var(--agpc-text-faint); font-size: 13px; }

      .search-bar { margin-bottom: 12px; }
      .search {
        width: 100%; padding: 10px 14px;
        background: var(--agpc-surface); border: 1px solid var(--agpc-border-soft);
        border-radius: 7px; color: var(--agpc-text); font-size: 13px;
        outline: none; box-sizing: border-box;
      }
      .search:focus { border-color: var(--agpc-border-focus); }
      .search::placeholder { color: var(--agpc-text-faint); }

      .service-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 6px;
      }
      .service-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 12px; border-radius: 7px;
        background: rgba(255, 255, 255, 0.015); border: 1px solid transparent;
        cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease;
      }
      .service-item:hover { background: rgba(255, 255, 255, 0.035); }
      .service-item.blocked { background: rgba(255, 77, 77, 0.06); }
      .service-item.blocked:hover { background: rgba(255, 77, 77, 0.1); border-color: rgba(255, 77, 77, 0.15); }

      .svc-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .svc-icon { font-size: 18px; width: 26px; text-align: center; }
      .svc-name { font-size: 12.5px; font-weight: 600; color: var(--agpc-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .svc-id { font-size: 10.5px; color: var(--agpc-text-faint); font-family: var(--code-font-family); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      .svc-toggle { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
      .toggle-track {
        width: 32px; height: 17px; border-radius: 10px;
        background: var(--agpc-surface-hover); position: relative;
        transition: background 0.2s ease;
      }
      .toggle-track::after {
        content: ""; position: absolute; left: 2px; top: 2px;
        width: 13px; height: 13px; border-radius: 50%;
        background: var(--agpc-text-faint); transition: transform 0.2s ease, background 0.2s ease;
      }
      .svc-toggle.on .toggle-track { background: var(--agpc-red); }
      .svc-toggle.on .toggle-track::after { background: white; transform: translateX(15px); }
      .toggle-label { font-size: 10.5px; color: var(--agpc-text-faint); }
      .svc-toggle.on .toggle-label { color: var(--agpc-red); font-weight: 600; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "services-view": ServicesView; }
}
