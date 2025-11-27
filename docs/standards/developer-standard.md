# Developer Standard

## Purpose
Define expectations for human/Codex developers: quality, safety, and consistency.

## Scope
Applies to all code, docs, schemas, and ops changes across apps/packages.

## Requirements
- Follow the documentation hierarchy and development outline phases in order.
- Work doc-first: update relevant docs before code/tests.
- Respect boundaries: no unrelated refactors; keep changes minimal and scoped.
- Adhere to standards: code-style, naming, testing, security, compliance, environment, filesystem guardrails.
- External dependencies require approval with justification.
- i18n/a11y: externalise all user-facing strings; apply accessibility patterns.
- Telemetry/compliance: emit events as specified; avoid PII in logs; honor consent toggles.

## Collaboration & Review
- Use prompt archive per task; keep changelog updated.
- For multi-change tasks, stage work in logical commits (when enabled).
- Document assumptions and decisions in PR/commit messages and relevant docs.

## Testing
- Write/maintain tests for new core logic, APIs, and UI states per testing standard.
- Ensure CI passes; do not break existing tests.

## Performance & Scale
- Consider scale to millions of users: avoid N+1s, unbounded queries, and heavy client work; follow perf budgets when defined.

## Security
- Treat all input as untrusted; validate/sanitize; follow security and compliance standards.***
