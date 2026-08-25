import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles/theme";

@customElement("placeholder-view")
export class PlaceholderView extends LitElement {
  @property({ type: String }) public title = "Coming soon";
  @property({ type: String }) public description = "This section isn't available yet.";
  @property({ type: String }) public icon = "";

  private _icon(path: string) {
    return svg`<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  render() {
    return html`
      <div class="card empty-card">
        ${this.icon ? html`<div class="empty-icon">${this._icon(this.icon)}</div>` : ""}
        <div class="empty-title">${this.title}</div>
        <div class="empty-desc">${this.description}</div>
      </div>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .empty-card {
        padding: 60px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
      }
      .empty-icon {
        width: 60px; height: 60px; border-radius: 16px;
        background: var(--agpc-blue-soft); color: var(--agpc-blue);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 6px;
      }
      .empty-title { font-size: 17px; font-weight: 700; color: var(--agpc-text); }
      .empty-desc { font-size: 13px; color: var(--agpc-text-dim); max-width: 360px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "placeholder-view": PlaceholderView; }
}
