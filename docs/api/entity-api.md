# Entity API (Initial)

Provides lookup and metadata for entities (users, tenants, courses, modules, lessons, forums, threads, posts, plugins) to support permissions, analytics, and UI linking.

## Endpoints (Skeleton)
- GET /api/entities/:type/:id — fetch basic metadata for an entity (type-specific fields minimal).
- GET /api/entities — batch lookup (filters: type, ids[]).
Example:
`GET /api/entities?type=course&ids=course-1,course-2`

## Response
`{ type, id, name/title?, tenantId?, parentId?, createdAt? }`
Response example:
```json
{ "type": "course", "id": "course-1", "title": "Intro to Physics", "tenantId": "tenant-1", "createdAt": "2025-01-01T00:00:00Z" }
```
Error example:
```json
{ "code": "not_found", "message": "Entity not found", "details": { "type": "course", "id": "course-missing" } }
```

## Rules
- Auth required; enforce permissions where needed.
- Include tenant context when applicable.
- Use structured errors; no PII beyond allowed metadata.
- Pagination/filtering required for batch queries; avoid unbounded responses.
- Error example:
```json
{ "code": "not_found", "message": "Entity not found", "details": { "type": "course", "id": "course-missing" } }
```

## Pagination/Sorting (batch)
- `limit` default 20, max 100; `cursor` for continuation; sort default `type,id`.

## Validation (examples)
| Field        | Required | Type    | Constraints                                 |
|--------------|----------|---------|---------------------------------------------|
| type         | Yes      | string  | Whitelisted entity types                    |
| id(s)        | Yes      | string/array | Non-empty; ids must match type          |
| tenantId     | No       | string  | Include when tenant-scoped                  |
| limit/cursor | No       | number/string | As per pagination defaults             |

## Errors (Catalog)
| HTTP | Code                    | Message (example)                     | When                                     |
|------|-------------------------|---------------------------------------|------------------------------------------|
| 400  | `invalid_request`       | "Unsupported entity type"             | Validation failure                       |
| 401  | `unauthorized`          | "Authentication required"             | Missing/invalid auth                     |
| 403  | `forbidden`             | "Insufficient permissions"            | Caller lacks authority                   |
| 404  | `not_found`             | "Entity not found"                    | Unknown id                               |
| 429  | `rate_limited`          | "Too many requests"                   | If rate limiting enabled                 |

## Sample Payloads
### Batch Lookup
```json
GET /api/entities?type=course&ids=course-1,course-2
```
Response:
```json
[
  { "type": "course", "id": "course-1", "title": "Intro to Physics", "tenantId": "tenant-1" },
  { "type": "course", "id": "course-2", "title": "Calculus I", "tenantId": "tenant-1" }
]
```

### Single Lookup
```json
GET /api/entities/course/course-1
```
Response:
```json
{ "type": "course", "id": "course-1", "title": "Intro to Physics", "tenantId": "tenant-1", "createdAt": "2025-01-01T00:00:00Z" }
```

## Future
- Expand fields per type as needed; add search/query endpoints if required.***
