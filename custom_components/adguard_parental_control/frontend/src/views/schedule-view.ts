import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GlobalState, Policy } from "../data/websocket-api";
import { sharedStyles } from "../styles/theme";
import { ICONS } from "../icons";

interface ScheduleRow {
  policyId: string;
  policyName: string;
  priority: number;
  days: string[];
  timeFrom: string | null;
  timeTo: string | null;
  rulesCount: number;
}

const DAY_LABELS: Record<string, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
};

@customElement("schedule-view")
export class ScheduleView extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public state!: GlobalState;
  @property({ type: Object }) public onNavigate?: (view: string, detail?: any) => void;
  @property({ type: Object }) public onStateChanged?: () => void;

  private _icon(path: string, size = 16) {
    return svg`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="currentColor" d="${path}"></path></svg>`;
  }

  private _scheduleRows(): ScheduleRow[] {
    return this.state.policies
      .filter((p) => p.time_schedule)
      .map((p) => ({
        policyId: p.id,
        policyName: p.name,
        priority: p.priority,
        days: p.time_schedule!.days,
        timeFrom: p.time_schedule!.time_from,
        timeTo: p.time_schedule!.time_to,
        rulesCount: p.rules.length,
      }))
      .sort((a, b) => b.priority - a.priority);
  }

  private _unscheduledPolicies(): Policy[] {
    return this.state.policies.filter((p) => !p.time_schedule);
  }

  render() {
    if (!this.state) return html``;
    const scheduled = this._scheduleRows();
    const unscheduled = this._unscheduledPolicies();

    return html`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(ICONS.schedules, 18)}</div>
            <h2>Schedules <span class="count">(${scheduled.length})</span></h2>
          </div>
          <button class="btn" @click=${() => this.onNavigate?.("policies")}>
            ${this._icon(ICONS.policies, 14)} Manage Policies
          </button>
        </div>

        ${scheduled.length === 0
          ? html`<div class="empty-state">No schedules configured yet. Add a time schedule to a policy to see it here.</div>`
          : html`
              <table class="table">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Days</th>
                    <th>Time</th>
                    <th>Rules</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${scheduled.map((row) => html`
                    <tr class="clickable" @click=${() => {
                      const policy = this.state.policies.find((p) => p.id === row.policyId);
                      if (policy) this.onNavigate?.("policy-detail", policy);
                    }}>
                      <td class="name-cell">
                        <div class="policy-name">${row.policyName}</div>
                        <div class="policy-sub">Priority ${row.priority}</div>
                      </td>
                      <td>
                        <div class="day-chips">
                          ${["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d) =>
                            html`<span class="day-chip ${row.days.includes(d) ? "active" : ""}">${DAY_LABELS[d]}</span>`
                          )}
                        </div>
                      </td>
                      <td class="time-cell">
                        ${row.timeFrom || "00:00"} — ${row.timeTo || "23:59"}
                      </td>
                      <td>${row.rulesCount}</td>
                      <td class="menu-cell">
                        <span class="icon-btn">${this._icon(ICONS.chevronRight, 15)}</span>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            `}
      </div>

      ${unscheduled.length > 0 ? html`
        <div class="card">
          <div class="card-head">
            <div class="head-left">
              <h2>Unscheduled Policies <span class="count">(${unscheduled.length})</span></h2>
            </div>
          </div>
          <div class="unscheduled-list">
            ${unscheduled.map((p) => html`
              <div class="unscheduled-item clickable" @click=${() => this.onNavigate?.("policy-detail", p)}>
                <span class="unscheduled-name">${p.name}</span>
                <span class="unscheduled-hint">Active at all times · ${p.rules.length} rules</span>
                <span class="icon-btn">${this._icon(ICONS.chevronRight, 14)}</span>
              </div>
            `)}
          </div>
        </div>
      ` : ""}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .policy-sub { font-size: 11.5px; color: var(--agpc-text-faint); margin-top: 2px; }
      .time-cell { font-family: var(--code-font-family); font-size: 13px; }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }

      .day-chips { display: flex; gap: 3px; }
      .day-chip {
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 22px; border-radius: 4px;
        font-size: 10px; font-weight: 700; text-transform: uppercase;
        background: rgba(255, 255, 255, 0.04); color: var(--agpc-text-faint);
      }
      .day-chip.active { background: var(--agpc-blue-soft); color: var(--agpc-blue); }

      .unscheduled-list { padding: 4px 0; }
      .unscheduled-item {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 4px; border-bottom: 1px solid var(--agpc-border-soft);
      }
      .unscheduled-item:last-child { border-bottom: none; }
      .unscheduled-name { font-weight: 600; color: var(--agpc-text); font-size: 13.5px; }
      .unscheduled-hint { flex: 1; font-size: 12px; color: var(--agpc-text-faint); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap { "schedule-view": ScheduleView; }
}
