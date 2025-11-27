# Migrations (Planning)

Doc-first: define schema changes here before implementing migrations.

## Initial Phases (0.2–0.3)
- Users, Tenants (placeholder), Sessions tables (include locale, consent flags on users; lastAccessed/session token refs on sessions).
- Courses, Modules, Lessons (with blocks jsonb).
- Enrolments.
- Progress.
- Forums, Threads, Posts.
- Profiles.
- Plugins registry (baseline).

## Later Phases
- Marketplace: Listings, Transactions, Payouts.
- Analytics warehouse tables (facts/dimensions) in Phase 0.10.
- Tenant scoping additions (tenant_id on resources) in Phase 0.12.

## Notes
- Include audit fields (`created_at`, `updated_at`).
- Add tenantId/locale fields where applicable.
- Record each migration with rationale and affected docs.***
