# Entity System (Initial)

## Purpose
Provide a unified way to reference resources (users, tenants, courses, modules, lessons, forums, threads, posts, plugins, listings) for permissions, analytics, and future graph use.

## Entity Identifiers
- Each entity has a stable `id` (uuid) and type (e.g., `user`, `tenant`, `course`, `lesson`, `thread`, `plugin`, `listing`).
- Include `tenantId` where applicable (multi-tenant phases).

## Relationships (initial)
- User ↔ Tenant (later multi-tenant)
- Course → Modules → Lessons (contains Blocks)
- User ↔ Course via Enrolment; User ↔ Lesson via Progress
- Forums → Threads → Posts (createdBy Users)
- Plugin registry entries; Listings/Transactions later

## Usage
- Permission checks: role bindings reference entity type/id.
- Analytics/events: include entity references in context.
- Knowledge graph (later): edges derive from these relationships.

## Examples
- Enrolment: user has `student` role on course `course-123`; progress records reference `course-123`/`lesson-9`.
- Community: user has `moderator` role on forum `forum-1`; posts/threads reference `forum-1`.
- Plugin: registry entry `plugin-5` activated for tenant `tenant-2`; extension points scoped to that tenant.
- Binding example: `{ "userId": "user-1", "role": "author", "entityType": "course", "entityId": "course-123", "tenantId": "tenant-1" }`
- Future role bindings:
  - Course Convener: `{ "userId": "u2", "role": "convener", "entityType": "course", "entityId": "course-123", "tenantId": "tenant-1" }`
  - Sub-tenant admin: `{ "userId": "u3", "role": "subtenant_admin", "entityType": "tenant", "entityId": "tenant-1:dept-4" }`
  - Instructor (module scoped): `{ "userId": "u4", "role": "instructor", "entityType": "module", "entityId": "module-9", "tenantId": "tenant-1" }`

## Future
- Expand entity catalog as features grow; keep ERD/docs in sync.
