# Data Retention (Initial)

## Principles
- Retain data only as long as needed for stated purposes.
- Respect consent and DSR (export/delete) requirements.
- Apply retention consistently to primary stores, logs, backups, and warehouse.

## Initial Guidelines
- Auth/Session: keep active sessions only; prune expired.
- Progress/Content: retain while course active; allow deletion if required by policy.
- Events: retain raw events per retention policy (define in 0.10); aggregate for dashboards; purge older raw data.
- Logs: short retention; no PII; mask secrets.
- Backups: follow retention schedule; ensure deletes propagate where required.

## Actions
- Document retention periods per data category in warehouse plan (0.10).
- Implement pruning/TTL where supported; ensure compliance with regional rules (0.16).***
