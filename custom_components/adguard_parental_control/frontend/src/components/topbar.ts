import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ICONS } from "../icons";

@customElement("agpc-topbar")
export class AgpcTopbar extends LitElement {
  @property({ type: String }) public title = "Dashboard";
  @property({ type: Boolean }) public showBack = false;
  @property({ type: String }) public lastSync: string | null = null;
  @property({ type: Boolean }) public syncing = false;
  @property({ type: Object }) public onBack?: () => void;
  @property({ type: Object }) public onRefresh?: () => void;

  private _icon(path: string, size = 18) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  render() {
    return html`
      <div class="left">
        ${this.showBack
          ? html`
              <button class="icon-btn" @click=${() => this.onBack?.()} aria-label="Back">
                ${this._icon(ICONS.back)}
              </button>
            `
          : nothing}
        <h1>${this.title}</h1>
      </div>
      <div class="right">
        ${this.lastSync
          ? html`<span class="sync-label">Last sync: ${this.lastSync}</span>`
          : nothing}
        <button class="icon-btn ${this.syncing ? "spinning" : ""}" @click=${() => this.onRefresh?.()} aria-label="Refresh">
          ${this._icon(ICONS.sync)}
        </button>
        <button class="icon-btn" aria-label="Toggle theme">${this._icon(ICONS.moon)}</button>
        <button class="icon-btn" aria-label="More">${this._icon(ICONS.dots)}</button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 28px;
      border-bottom: 1px solid var(--agpc-border, #232a41);
      box-sizing: border-box;
    }
    .left { display: flex; align-items: center; gap: 10px; }
    h1 { font-size: 19px; font-weight: 700; color: var(--agpc-text, #e9ecf5); margin: 0; }
    .right { display: flex; align-items: center; gap: 6px; }
    .sync-label { font-size: 12px; color: var(--agpc-text-faint, #5c6480); margin-right: 6px; }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: var(--agpc-text-dim, #8a92ab);
      cursor: pointer;
    }
    .icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--agpc-text, #e9ecf5); }
    .icon-btn.spinning svg { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "agpc-topbar": AgpcTopbar; }
}
