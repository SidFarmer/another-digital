# Migrations (Planning)

Doc-first: define schema changes here before implementing migrations.

## Initial Phases (0.2–0.3)
- Users: email unique, password_hash, name, locale, consent fields (consent_given_at, consent_version, analytics_opt_in), timestamps.
- Sessions: user FK, expires_at, last_accessed_at, session_token (hashed if stored), timestamps.
- Tenants (placeholder): name, default_locale, timestamps.
- Additional tables per content/community scope (courses/modules/lessons/enrolments/progress/forums/threads/posts/profiles/plugins registry).
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
