# CI/CD Workflow

## Goals
Ensure every change is linted, tested, and type-checked; deploy safely to staging/beta, then production.

## Pipelines (initial)
- Triggers: pull requests; pushes to `main`, `dev`, `test`.
- Steps (initial skeleton; stubs until code exists):
  - Install dependencies (`pnpm install`)
  - Lint (`pnpm lint` — stub)
  - Test (`pnpm test` — stub)
  - Typecheck (`pnpm typecheck` — stub)
- Tooling versions: Node 20.10.0, pnpm 10.19.0 (see `.nvmrc`, `.npmrc`).
- Gates: all checks must pass before merge/deploy (will enforce when checks are real).

## Smoke Tests (add when code exists)
- Post-deploy checklist (staging then prod):
  - Auth: signup/login/logout; password reset flow stub.
  - CMS: open editor, create/save draft, publish/unpublish toggle.
  - LMS: enrol, open lesson with toolkit blocks, track progress.
  - Marketplace: view listing, start purchase (stub), ensure no errors.
  - i18n: toggle locale, verify UI strings swap and dates/numbers localize.
  - Accessibility: spot-check keyboard navigation on primary pages.
  - Analytics: emit sample event batch and confirm ingestion stub accepts it.
  - Compliance: toggle consent on/off and ensure events respect it; verify cookie/banner behavior.

## Deployment (to be defined as code lands)
- Staging/beta deploy on merge to main (after checks).
- Production deploy with manual approval/gates.
- Rollback plan documented in deployability phase (hook into production-deployment checklist).

## Compliance Gate (summary)
- Consent banner and toggles present in supported locales; no analytics emit when consent is off.
- DSR export/delete flows exercised on staging when feasible; no PII in logs/errors.
- Role gating verified for owner/admin/tenant/student paths; forbidden states handled gracefully.
- Marketplace/auth endpoints respect rate limits/WAF rules (when configured).

## Compliance/DSR Checklist (run pre-release when features exist)
- Confirm privacy notice/consent banner renders in all supported locales.
- Verify analytics/marketing toggles opt-out correctly; no events emitted when consent is off.
- Exercise DSR flows (export/delete) for a test user; confirm propagation to derived stores when implemented.
- Ensure no PII in logs or error payloads; spot-check API error responses.
- Verify role-based access for admin/community/marketplace actions (forbidden states handled gracefully).

## Secrets
- Managed via CI secrets; never hardcoded. Mask in logs.

## Artifacts/Cache
- Cache pnpm store where appropriate.

## Updates
- Expand steps as services/apps are added (builds, integration tests, e2e as needed).
- Align with performance/load checkpoints in later phases.***
