# Changelog

## 0.0.0 - Docs Baseline
- Established comprehensive documentation (architecture, APIs, data model, standards, workflows).
- Added PR checklist, release/pre-flight/postmortem templates, and privacy impact template.
- Seeded CI workflow scaffold and environment examples.
- Locked tool versions (Node 20.10.0, pnpm 10.19.0) and added PR template.

## 0.2.10 - Auth Integration & Telemetry (Skeleton)
- Wired auth UI (login/signup/reset/settings) to API stubs with aria-live messaging, redirects, consent/analytics flags, and stub telemetry emitters.
- Added shared i18n usage in auth shell/pages; kept token handling safe (HTTP-only cookie assumption).
- Documented integration/telemetry steps in prompt archive.***

## 0.2.15 - Telemetry Client, Context, and Checks
- Added validated telemetry client and endpoint with PII guardrails and retry/backoff handling.
- Enriched telemetry payloads with locale/tenant/consent/analytics context and version tagging.
- Added `telemetry:check` script to validate schema in CI; documented telemetry contract in prompt archive.
