# Data Model Overview

This document describes the data model scope and conventions. Detailed schemas live in the corresponding files.

## Principles
- Doc-first: update schemas/ERD before code/migrations.
- Multi-tenant aware: include tenant scoping as phases progress.
- Locale-aware: include locale fields where appropriate; avoid duplicating content unnecessarily.
- Compliance: capture timestamps/audit fields; avoid PII in logs.

## Initial Entities (per development outline)
- Users, Tenants (single-tenant early; multi-tenant later)
- Sessions/Tokens
- Courses, Modules, Lessons, Blocks (including interactive types)
- Enrolments (user↔course bindings)
- Progress records
- Community: Forums, Threads, Posts
- Profiles
- Plugins/Registry entries
- Marketplace (later): Listings, Pricing, Transactions, Payouts
- Analytics Events (warehouse schema later)

## Docs
- `docs/data-model/schemas.md`: field-level schemas
- `docs/data-model/tables.md`: table definitions
- `docs/data-model/erd.md`: entity relationships
- `docs/data-model/migrations.md`: migration notes

## Notes
- Follow naming conventions; include `createdAt`/`updatedAt`; IDs end with `Id`.
- Document migrations in docs before implementing them.
- RLS plan (multi-tenant phases): enable row-level security on tenant-scoped tables (courses/modules/lessons/enrolments/progress/forums/threads/posts/listings/transactions/profiles) and enforce `tenantId` in queries; annotate each table in `tables.md` when RLS toggles on.
