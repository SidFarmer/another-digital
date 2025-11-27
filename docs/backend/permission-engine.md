# Permission Engine

## Purpose
Implement RBAC/permission checks for backend APIs and services.

## Responsibilities
- Resolve roles/bindings per entity/user/tenant.
- Evaluate permissions for actions (content, enrolment, progress, community, admin).
- Provide middleware/hooks for API routes.
- Support UI gating via consistent responses.

## Model
- Roles bound to entities; permissions derived by role and context.
- Tenant-aware scoping in later phases; include entity system IDs.

## Features (initial)
- Role/permission resolution
- Deny responses with structured errors
- Audit logging for permission changes (log without PII)

## Future
- Granular scopes, caching, integration with SSO/MFA, plugin-aware permissions.***
