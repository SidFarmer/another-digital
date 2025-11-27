# Documentation Standard

## Purpose
Ensure all changes are documented consistently and ahead of implementation.

## Scope
Applies to architecture, standards, APIs, schemas, data models, workflows, frontend/backend docs, plugins, analytics, and changelog.

## Principles
- Doc-first: update docs before code/tests. No undocumented code.
- Authority: follow documentation hierarchy; resolve conflicts by hierarchy order.
- Completeness: include purpose, scope, inputs/outputs, data shapes, states, and error cases.
- Consistency: mirror naming, terminology, and structure across files.
- Traceability: link docs to phases/tasks in development outline; update changelog.
- Accessibility/i18n: externalise user-facing strings; ensure docs reference localisation when relevant.

## Required Updates
- Architecture changes → `docs/architecture/*`
- API changes → `docs/api/*` (endpoints, validation, errors, auth)
- Schema/data changes → `docs/data-model/*` (tables/schemas/ERD/migrations)
- Workflows/ops → `docs/workflows/*`
- Plugins → `docs/plugins/*`
- Standards → `docs/standards/*` when rules change
- Prompt archive → `prompts/prompt-archive/*` per task
- Changelog → `CHANGELOG.md` for notable user/dev-facing changes

## Format & Quality
- Use concise headings/bullets; prefer tables for field definitions.
- Document states: loading/error/success/empty for UI; allowed/forbidden for permissions.
- Include locale/tenant considerations where applicable.
- Keep examples minimal but functional.

## Maintenance
- Update or deprecate stale sections when behavior changes.
- Cross-link related docs for discoverability.***
- Follow `docs/standards/doc-comment-policy.md` and use `docs/workflows/pr-checklist.md` to verify docs are updated for every change.
