import { css } from "lit";

/**
 * Global theme variables for the AdGuard Parental Control dashboard.
 * Applied at the panel root so every child view (including the original
 * ha-card based views) inherits a consistent dark, AdGuard-style palette.
 */
export const themeVars = css`
  :host {
    --agpc-bg: #0b0f1a;
    --agpc-bg-alt: #0e1424;
    --agpc-sidebar-bg: #0d1220;
    --agpc-card-bg: #161c2e;
    --agpc-card-bg-alt: #131a2c;
    --agpc-card-hover: #1b2338;
    --agpc-border: #232a41;
    --agpc-border-soft: #1c2338;
    --agpc-text: #e9ecf5;
    --agpc-text-dim: #8a92ab;
    --agpc-text-faint: #5c6480;
    --agpc-blue: #4f8cff;
    --agpc-blue-soft: rgba(79, 140, 255, 0.14);
    --agpc-green: #2ecc71;
    --agpc-green-soft: rgba(46, 204, 113, 0.14);
    --agpc-red: #f4584f;
    --agpc-red-soft: rgba(244, 88, 79, 0.14);
    --agpc-yellow: #f0b429;
    --agpc-yellow-soft: rgba(240, 180, 41, 0.14);
    --agpc-radius-lg: 14px;
    --agpc-radius-md: 10px;
    --agpc-radius-sm: 6px;

    /* Re-point Home Assistant / MWC component variables so ha-card,
       ha-textfield, ha-select, mwc-button, ha-dialog, etc. all render
       in the same dark palette without needing to be rewritten. */
    --primary-background-color: var(--agpc-bg);
    --secondary-background-color: var(--agpc-bg-alt);
    --card-background-color: var(--agpc-card-bg);
    --primary-text-color: var(--agpc-text);
    --secondary-text-color: var(--agpc-text-dim);
    --disabled-text-color: var(--agpc-text-faint);
    --divider-color: var(--agpc-border);
    --primary-color: var(--agpc-blue);
    --accent-color: var(--agpc-green);
    --error-color: var(--agpc-red);
    --success-color: var(--agpc-green);
    --warning-color: var(--agpc-yellow);
    --code-editor-background-color: var(--agpc-card-bg-alt);
    --code-font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    --mdc-theme-primary: var(--agpc-blue);
    --mdc-theme-on-primary: #ffffff;
    --mdc-theme-secondary: var(--agpc-blue);
    --mdc-theme-surface: var(--agpc-card-bg);
    --mdc-theme-on-surface: var(--agpc-text);
    --mdc-theme-text-primary-on-background: var(--agpc-text);
    --mdc-theme-text-secondary-on-background: var(--agpc-text-dim);
    --mdc-select-fill-color: var(--agpc-card-bg-alt);
    --mdc-text-field-fill-color: var(--agpc-card-bg-alt);
    --mdc-dialog-scrim-color: rgba(0, 0, 0, 0.6);

    display: block;
    background: var(--agpc-bg);
    color: var(--agpc-text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    min-height: 100vh;
  }
`;

/** Reusable utility classes shared by the custom-built views (dashboard, client editor, list view). */
export const sharedStyles = css`
  .card {
    background: var(--agpc-card-bg);
    border: 1px solid var(--agpc-border);
    border-radius: var(--agpc-radius-lg);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .badge.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
  .badge.green { background: var(--agpc-green-soft); color: var(--agpc-green); }
  .badge.red { background: var(--agpc-red-soft); color: var(--agpc-red); }
  .badge.yellow { background: var(--agpc-yellow-soft); color: var(--agpc-yellow); }
  .badge.neutral { background: rgba(255,255,255,0.06); color: var(--agpc-text-dim); }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--agpc-border);
    background: var(--agpc-card-bg-alt);
    color: var(--agpc-text);
    border-radius: var(--agpc-radius-sm);
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .btn:hover { background: var(--agpc-card-hover); border-color: #313a56; }
  .btn.primary {
    background: var(--agpc-blue);
    border-color: var(--agpc-blue);
    color: #fff;
  }
  .btn.primary:hover { background: #3f78e8; }
  .btn.danger {
    background: transparent;
    border-color: var(--agpc-red);
    color: var(--agpc-red);
  }
  .btn.danger:hover { background: var(--agpc-red-soft); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn svg { flex-shrink: 0; }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--agpc-radius-sm);
    border: 1px solid transparent;
    background: transparent;
    color: var(--agpc-text-dim);
    cursor: pointer;
    padding: 0;
  }
  .icon-btn:hover { background: var(--agpc-card-hover); color: var(--agpc-text); border-color: var(--agpc-border); }

  input.field, select.field {
    width: 100%;
    box-sizing: border-box;
    background: var(--agpc-card-bg-alt);
    border: 1px solid var(--agpc-border);
    border-radius: var(--agpc-radius-sm);
    color: var(--agpc-text);
    padding: 9px 11px;
    font-size: 13px;
    font-family: inherit;
    outline: none;
  }
  input.field:focus, select.field:focus { border-color: var(--agpc-blue); }
  input.field::placeholder { color: var(--agpc-text-faint); }

  table.table {
    width: 100%;
    border-collapse: collapse;
  }
  table.table th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--agpc-text-faint);
    font-weight: 600;
    padding: 0 12px 10px;
    border-bottom: 1px solid var(--agpc-border);
  }
  table.table td {
    padding: 12px;
    border-bottom: 1px solid var(--agpc-border-soft);
    font-size: 13.5px;
    color: var(--agpc-text);
  }
  table.table tbody tr:last-child td { border-bottom: none; }
  table.table tbody tr.clickable { cursor: pointer; }
  table.table tbody tr.clickable:hover { background: var(--agpc-card-hover); }

  .empty-state { color: var(--agpc-text-faint); font-style: italic; font-size: 13px; padding: 16px 0; }
`;
