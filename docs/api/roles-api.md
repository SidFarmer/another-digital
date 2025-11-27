# Roles & Permissions API (Initial)

Expose role/permission bindings and checks.

## Endpoints (Skeleton)
- GET /api/roles — list available roles/scopes.
- GET /api/roles/bindings — list role bindings for current user (filters: entityType/entityId).
- POST /api/roles/bindings — create binding (tenant/admin only, scoped rules).
- DELETE /api/roles/bindings/:id — remove binding.
- POST /api/roles/check — check permission for an action/entity (returns allow/deny).
Example binding payload:
```json
{ "userId": "user-1", "role": "author", "entityType": "course", "entityId": "course-123" }
```
- Response example (binding):
```json
{ "bindingId": "bind-1", "userId": "user-1", "role": "author", "entityType": "course", "entityId": "course-123" }
```
- Error example:
```json
{ "code": "forbidden", "message": "Insufficient permissions to assign role" }
```
- Roles check example:
```json
{
  "action": "content.publish",
  "entityType": "course",
  "entityId": "course-123"
}
```
Response: `{ "allow": true }`

## Rules
- Auth required; enforce admin/owner constraints for binding changes.
- Validate entity/type inputs; structured errors.
- Return minimal data; avoid exposing sensitive bindings to unauthorized users.
- Permissions include tenant context where applicable; align with permission system docs.
- Pagination/filtering for bindings list; default limits applied.

## Pagination/Sorting (list endpoints)
- `limit` default 20, max 50; `cursor` for continuation; sort default `role` or `-updatedAt`.

## Validation (examples)
| Field         | Required | Type    | Constraints                                     |
|---------------|----------|---------|-------------------------------------------------|
| role          | Yes      | string  | Must be allowed role key                        |
| userId        | Yes      | string  | Non-empty                                       |
| entityType    | Yes      | string  | Supported entity only                           |
| entityId      | Yes      | string  | Must exist                                      |
| tenantId      | No       | string  | Required when tenant-scoped                     |
| limit/cursor  | No       | number/string | As per pagination defaults                   |

## Errors (Catalog)
| HTTP | Code                      | Message (example)                    | When                                         |
|------|---------------------------|--------------------------------------|----------------------------------------------|
| 400  | `invalid_request`         | "Unknown role"                       | Validation failure                           |
| 400  | `invalid_binding`         | "entityId must belong to tenant"     | Binding mismatch                             |
| 401  | `unauthorized`            | "Authentication required"            | Missing/invalid auth                         |
| 403  | `forbidden`               | "Insufficient permissions"           | Caller lacks authority                       |
| 404  | `not_found`               | "Binding not found"                  | Unknown binding/user/entity                  |
| 409  | `conflict`                | "Role already assigned"              | Duplicate assignment                         |
| 429  | `rate_limited`            | "Too many requests"                  | If rate limiting enabled                     |

## Sample Payloads
### Assign Role
```json
POST /api/roles/bindings
{ "userId": "user-1", "role": "author", "entityType": "course", "entityId": "course-123" }
```
Response:
```json
{ "bindingId": "bind-1", "userId": "user-1", "role": "author", "entityType": "course", "entityId": "course-123" }
```

### Check Permission
```json
POST /api/roles/check
{ "action": "content.publish", "entityType": "course", "entityId": "course-123" }
```
Response:
```json
{ "allow": true }
```

## Future
- More granular scopes; tenant-specific roles; moderation roles.***
