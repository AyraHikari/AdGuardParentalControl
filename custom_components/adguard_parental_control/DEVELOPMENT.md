# Development notes

## Frontend

The sidebar panel is built from `frontend/src` with TypeScript + Lit + Vite.

```bash
cd frontend
npm ci
npm run dev
# or
npm run build
```

The production build writes `www/entrypoint.js` via `frontend/vite.config.ts`.

## Member DNS Query Log

The member page reads live DNS history through the integration WebSocket command:

```text
adguard_pc/members/querylog
```

The backend queries AdGuard Home's `/control/querylog` for each configured client identity, merges and sorts the results, and returns them to the frontend. No duplicate DNS query database is created.

The member page refreshes the live log every 5 seconds while Live mode is enabled and stops polling when the page is disconnected or Live is paused.
