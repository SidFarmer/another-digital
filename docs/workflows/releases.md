# Releases

## Purpose
Document the release process for staging/beta and production.

## Process (initial)
- Use main branch for staging/beta deployments.
- Tag releases when ready for production; require approval before prod deploy.
- Update changelog for each release; ensure docs/help are published.
- Run release checklists:
  - CI green (lint/test/typecheck/build).
  - Docs updated (architecture, API, standards) plus changelog.
  - Compliance/DSR: consent banner present in all locales; no analytics when consent off; DSR export/delete tested on staging if feasible.
  - Role/permission spot-check: owner/admin/tenant/student dashboards gate correctly.
  - Smoke tests per CI/CD doc (auth, CMS, LMS, marketplace, i18n, accessibility, analytics emit).
  - If WAF/rate-limits configured, verify auth/marketplace endpoints behave under throttle.

## Notes
- Align with versioning policy; include rollback steps; verify CI status before tagging.
- Revisit when package publishing or changeset tooling is introduced.***
