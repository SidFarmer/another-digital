# Entity/Role Model (Initial)

## Entities
- Types: user, tenant, course, module, lesson, forum, thread, post, plugin, listing (later), workspace (later).
- Each has `id`; include `tenantId` where applicable.

## Roles
- Owner (platform), Site Admin (platform ops)
- Tenant, Tenant Admin
- Developer/Plugin Developer
- Author/Creator
- Student
- Future: Sub-tenant roles, Course Convener, Module Convener, Instructor, Moderator

## Bindings
- Roles bind user ↔ entity (and tenant context).
- A user can have multiple roles across entities/tenants.

## Permissions
- Derived from role + entity type; enforced in APIs/UI.
- Examples: content edit/publish (author/admin), enrol/view (student), moderate (admin/moderator), manage plugins (owner/admin), marketplace listing (owner/tenant).

## Usage
- Permission engine resolves bindings; APIs and UI gating rely on it.
- Entity IDs/types used in analytics/graph for context.***
