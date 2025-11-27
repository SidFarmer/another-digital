# Local Development

## Prerequisites
- Node.js 20.10.0 (use `.nvmrc` when added)
- pnpm 10.19.0
- Turborepo installed locally (`pnpm dlx turbo`) if needed
- Access to required env vars (see `.env.example`; do not commit secrets)

## Setup
1) Clone repo.  
2) Install deps: `pnpm install`.  
3) Create local `.env` from `.env.example` and fill values (no secrets in VCS).  
4) (When code exists) run lint/tests/typecheck: `pnpm lint`, `pnpm test`, `pnpm typecheck`.

## Commands (initial skeleton)
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`
- `pnpm format`
- `pnpm build`

## Smoke Tests (once code exists)
- Run lint/test/typecheck.
- Hit key routes locally (auth, CMS editor load, LMS lesson load).
- Verify i18n toggle works and no console errors.

## Notes
- Doc-first: update docs before code.
- Use shared UI kit/layout and i18n for any UI work.
- Do not add dependencies without approval.***
- Compliance hygiene (local):
  - Use test/dummy data only; no real PII in local DBs or logs.
  - Keep consent toggles surfaced in UI; when testing events locally, ensure emitters respect consent off.
  - Run with redaction/log masking enabled where available.
