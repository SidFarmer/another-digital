# Tables (Initial Outline)

## Users
- `id` uuid PK
- `email` text unique not null
- `password_hash` text not null
- `name` text not null
- `locale` text
- `created_at` timestamptz not null
- `updated_at` timestamptz not null

## Tenants
- `id` uuid PK
- `name` text not null
- `default_locale` text
- `created_at` timestamptz not null
- `updated_at` timestamptz not null

## Sessions
- `id` uuid PK
- `user_id` uuid FK users
- `expires_at` timestamptz not null
- `created_at` timestamptz not null

## Courses
- `id` uuid PK
- `title` text not null
- `description` text
- `status` text not null (draft|published)
- `locale` text
- `tenant_id` uuid FK tenants (later)
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`tenant_id`, `status`), full-text on `title`/`description` (optional)

## Modules
- `id` uuid PK
- `course_id` uuid FK courses
- `title` text not null
- `order_index` int not null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Constraints: `order_index` unique per `course_id`

## Lessons
- `id` uuid PK
- `module_id` uuid FK modules
- `title` text not null
- `status` text not null (draft|published)
- `order_index` int not null
- `locale` text
- `blocks` jsonb not null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Constraints: `order_index` unique per `module_id`
- Indexes: (`module_id`, `status`)

## Enrolments
- `id` uuid PK
- `user_id` uuid FK users
- `course_id` uuid FK courses
- `status` text not null (active|unenrolled)
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`user_id`, `status`), (`course_id`, `status`)

## Progress
- `id` uuid PK
- `user_id` uuid FK users
- `course_id` uuid FK courses
- `module_id` uuid FK modules null
- `lesson_id` uuid FK lessons null
- `status` text not null (not_started|in_progress|completed)
- `percent_complete` numeric
- `last_accessed_at` timestamptz
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`user_id`, `course_id`, `lesson_id`)
- Constraints: `percent_complete` between 0 and 100

## Forums
- `id` uuid PK
- `title` text not null
- `description` text
- `tenant_id` uuid FK tenants null (multi-tenant)
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`tenant_id`, `created_at`)

## Threads
- `id` uuid PK
- `forum_id` uuid FK forums
- `title` text not null
- `created_by` uuid FK users
- `locked` boolean default false
- `pinned` boolean default false
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`forum_id`, `created_at`), (`forum_id`, `pinned` DESC, `updated_at`)

## Posts
- `id` uuid PK
- `thread_id` uuid FK threads
- `body` text not null
- `created_by` uuid FK users
- `deleted` boolean default false
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`thread_id`, `created_at`)

## Profiles
- `user_id` uuid PK FK users
- `display_name` text
- `bio` text
- `social_links` jsonb
- `created_at` timestamptz not null
- `updated_at` timestamptz not null

## Plugins
- `id` uuid PK
- `name` text not null
- `version` text not null
- `scopes` jsonb
- `manifest_url` text
- `activated` boolean
- `tenant_id` uuid FK tenants null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`tenant_id`, `activated`), (`name`, `version`)

## Listings (Marketplace - later)
- `id` uuid PK
- `type` text not null (course/plugin)
- `price` numeric
- `currency` text
- `owner_tenant_id` uuid FK tenants
- `status` text not null (draft|active|inactive)
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`owner_tenant_id`, `status`), (`type`, `status`)

## Transactions (Marketplace - later)
- `id` uuid PK
- `listing_id` uuid FK listings
- `buyer_id` uuid FK users
- `buyer_tenant_id` uuid FK tenants
- `amount` numeric
- `currency` text
- `status` text
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`buyer_id`, `status`), (`buyer_tenant_id`, `status`)
- Constraints: status enum (pending|paid|failed|refunded)

## Payouts (Marketplace - later)
- `id` uuid PK
- `recipient_tenant_id` uuid FK tenants
- `amount` numeric
- `status` text
- `created_at` timestamptz not null
- `updated_at` timestamptz not null
- Indexes: (`recipient_tenant_id`, `status`)
- Constraints: status enum (scheduled|paid|failed)

## Audit Logs
- `id` uuid PK
- `actor_id` uuid FK users
- `action` text not null
- `entity_type` text
- `entity_id` text
- `payload` jsonb
- `created_at` timestamptz not null
- Indexes: (`entity_type`, `entity_id`, `created_at`), (`actor_id`, `created_at`)

## Tenant Scoping & RLS (when multi-tenant enabled)
- Tables with `tenant_id` to enforce RLS: courses, modules (via course), lessons (via module), enrolments, progress, forums, threads, posts, listings, transactions, payouts, plugins (if tenant-bound), profiles (optional), audit logs (when scoped).
- Apply RLS policies per table; require `tenant_id` in queries and sessions; ensure indexes include `tenant_id` for performance.
- Caches/queues: if used, include `tenant_id` in keys/topics to avoid leakage.
