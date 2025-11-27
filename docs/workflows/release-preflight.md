# Release Pre-Flight Checklist (Template)

Use this before tagging/releasing. Copy and fill for each release.

## Metadata
- Release version/tag:
- Date:
- Owner/approver:

## Gates
- [ ] CI green (lint/test/typecheck/build).
- [ ] Docs updated (architecture/API/standards); changelog entry complete.
- [ ] Consent/i18n: banner present in supported locales; analytics off when consent off.
- [ ] DSR: export/delete exercised on staging (if available); audit trail kept.
- [ ] Role gating: owner/admin/tenant/student dashboards verified (forbidden states OK).
- [ ] Smoke tests (auth, CMS, LMS, marketplace, i18n, accessibility, analytics emit).
- [ ] Marketplace: webhook signature verification configured; idempotency keys in place.
- [ ] WAF/rate limits: enabled for auth/marketplace endpoints (if supported).
- [ ] Security headers/CSP set (frontend).
- [ ] Secrets/config: all required env vars present; no secrets in logs.

## Deploy Plan
- Target(s): staging → production.
- Rollback plan: link to production-deployment runbook; verify backup/rollback steps.
- Owners on-call: names/contacts.

## Notes/Risks
- Known issues:
- Deferred items (and why):

## Sign-off
- Approver:
