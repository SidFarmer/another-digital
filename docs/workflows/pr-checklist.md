# PR Checklist (Reference)

Use this checklist in reviews/PR templates to keep changes consistent.

- [ ] Docs updated (API/specs/data model/architecture/workflows/standards) for the change.
- [ ] Tests/lint/typecheck run (when code exists); results noted.
- [ ] Changelog entry (or rationale if skipped) and prompt archive updated.
- [ ] Consent/i18n/a11y respected in UI/API; no PII in errors/logs.
- [ ] Permissions/roles verified for new/changed actions.
- [ ] Media/attachment limits enforced (if applicable); RLS/tenant context applied where required.
- [ ] Webhooks/signatures/idempotency handled (if applicable).
