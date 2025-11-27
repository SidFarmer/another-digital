# Plugin Management API (Initial)

Manage plugin registry entries and activation.

## Endpoints (Skeleton)
- GET /api/plugins — list registered plugins (filters: tenantId?).
- POST /api/plugins — register a plugin (owner/admin scope).
- PATCH /api/plugins/:id — update metadata/scopes/manifest.
- POST /api/plugins/:id/activate — activate for tenant (tenant/admin scope).
- POST /api/plugins/:id/deactivate — deactivate for tenant.
- Example register payload:
```json
{
  "name": "chemistry-blocks",
  "version": "0.1.0",
  "manifestUrl": "https://plugins.example.com/chemistry-blocks/manifest.json",
  "extensionPoints": ["content.block"],
  "scopes": ["content.block.render"]
}
```
- Activate example:
`POST /api/plugins/plugin-5/activate` with body `{ "tenantId": "tenant-2" }` → `{ "success": true }`

## Fields
- `id`, `name`, `version`, `manifestUrl/config`, `extensionPoints`, `scopes` (validated list), `tenantId?`, `activated`.

## Rules
- Auth required; enforce role/tenant scope.
- Validate manifests/scopes; structured errors.
- Audit log changes; disclose data access scopes to users.
- Error example:
```json
{ "code": "invalid_manifest", "message": "Undeclared extension point", "details": { "extensionPoints": ["dashboard.sidebar"] } }
```
- Rate limiting: throttle plugin register/update/activate calls to protect registry.
- Manifest hosting: require HTTPS; prefer versioned/immutable URLs; validate signature/hash when available.
- Kill switch: if activation fails repeatedly or manifest invalidates, auto-disable and log.
- Callbacks (if any): sign and verify any registry callbacks; enforce idempotency keys.

## Sample Payloads
### Register Plugin
```json
POST /api/plugins
{
  "name": "lesson-enhancer",
  "version": "0.1.0",
  "manifestUrl": "https://plugins.example.com/lesson-enhancer/manifest.json",
  "extensionPoints": ["content.block"],
  "scopes": ["content.block.render"]
}
```
Response:
```json
{
  "id": "plugin-5",
  "name": "lesson-enhancer",
  "version": "0.1.0",
  "extensionPoints": ["content.block"],
  "scopes": ["content.block.render"],
  "createdAt": "2025-01-01T00:00:00Z"
}
```

### Activate Plugin
```json
POST /api/plugins/plugin-5/activate
{ "tenantId": "tenant-2" }
```
Response:
```json
{ "success": true, "tenantId": "tenant-2", "pluginId": "plugin-5" }
```

## Pagination/Sorting (list endpoints)
- `limit` default 20, max 50; `cursor` for continuation; sort default `-updatedAt` (whitelist: `name`, `version`, `updatedAt`).

## Validation (examples)
| Field              | Required | Type    | Constraints                                            |
|--------------------|----------|---------|--------------------------------------------------------|
| name               | Yes      | string  | 1–100 chars                                            |
| version            | Yes      | string  | Semver                                                 |
| manifestUrl/config | Yes      | string  | Valid URL or inline config                             |
| scopes             | Yes      | array   | Whitelisted scopes only                                |
| extensionPoints    | Yes      | array   | Must match supported host extension points             |
| tenantId (activate)| Yes      | string  | Non-empty; tenant must exist                           |
| limit/cursor/sort  | No       | number/string | As per pagination defaults                         |
| manifestUrl        | Yes      | string  | HTTPS; versioned/immutable location preferred          |
| icon.url           | No       | string  | Allowed CDN only; `image/png`/`image/svg+xml`; size <= 500KB |

## Errors (Catalog)
| HTTP | Code                    | Message (example)                         | When                                        |
|------|-------------------------|-------------------------------------------|---------------------------------------------|
| 400  | `invalid_manifest`      | "Unknown scope: analytics.emit"           | Manifest validation failure                 |
| 400  | `invalid_extension`     | "Extension point not supported"           | Bad extension declaration                   |
| 401  | `unauthorized`          | "Authentication required"                 | Missing/invalid auth                        |
| 403  | `forbidden`             | "Insufficient permissions"                | Role/tenant scope denied                    |
| 404  | `not_found`             | "Plugin not found"                        | Unknown id                                  |
| 409  | `version_conflict`      | "Version already published"               | Duplicate version                           |
| 429  | `rate_limited`          | "Too many requests"                       | If rate limiting enabled                    |
| 400  | `invalid_media`         | "Icon type not allowed"                   | Disallowed icon                             |
| 400  | `invalid_manifest_url`  | "Manifest URL must be HTTPS"              | Bad manifest URL                            |

## Future
- Plugin execution APIs, SDK endpoints, sandbox policies.
- Plugin lifecycle diagram in `docs/plugins/overview.md`.***
