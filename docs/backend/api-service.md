# API Service

## Purpose
Central backend service (Node/Express) handling APIs for auth, content, enrolment, progress, community, plugins (registry), and marketplace (later).

## Responsibilities (early phases)
- Auth/session/token endpoints
- Users/tenants (single-tenant initially)
- Content CRUD (courses/modules/lessons/blocks), publish/draft
- Enrolment and progress
- Community threads/posts (initial)
- Profiles
- Plugin registry groundwork

## Principles
- Validate inputs; enforce authZ/tenant scope; structured errors; no PII in logs
- Emit consent-aware events; avoid N+1/unbounded queries
- Follow doc-first; keep docs/API/data model in sync

## Future
- Marketplace/payments, multi-tenant enforcement, analytics ingestion hooks, enterprise auth, rate limiting.***
