# API Overview

This document summarizes the API surface and conventions. Detailed specs per service are documented in `docs/api/*.md`.

## Principles
- Doc-first: update API docs before implementation.
- RESTful JSON APIs; consistent error shapes; versioning when needed.
- Auth: session/token-based (Node/Express backend); enforce permissions/tenant scope.
- i18n/a11y: externalise user-facing strings on the client; APIs support locale where applicable.
- Security/compliance: validate inputs; no PII in errors/logs; consent-aware analytics events.

## Initial API Areas (per development outline)
- Auth: login/signup/reset/logout/session introspection.
- Users/Tenants: user and tenant models (single-tenant early, multi-tenant later).
- Content: courses/modules/lessons/blocks (including interactive blocks), publish/draft.
- Enrolment: enrol/unenrol, course lists for dashboards.
- Progress: track/read progress; emit events.
- Community: forums/threads/posts (initial).
- Profiles: public profile data.
- Plugins: registry/manifest/activation (groundwork).
- Marketplace: listings/payments (later phases).
- Analytics Events: client/server emitters (stub initially), dashboards/warehouse later.

## Conventions
- JSON request/response; lowerCamelCase fields; timestamps `createdAt`/`updatedAt`.
- Errors: structured (code/message/details); no stack traces to clients.
- Versioning: add `/v1` prefix when stabilizing; document breaking changes.
- Pagination/filtering: default `limit` 20 (unless noted), max 50–100 per endpoint; use cursor-based pagination where possible; whitelist sort fields.

## Notes
- Validate and sanitise all inputs; follow security/compliance standards.
- Externalise API docs per service in the corresponding files (auth-api, content-api, etc.).
