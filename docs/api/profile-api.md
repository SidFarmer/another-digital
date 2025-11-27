# Profile API (Initial)

Expose user profile data (public/safe) and allow self-updates where permitted.

## Endpoints (skeleton)
- GET /api/profiles/:userId — public profile (tenant-scoped when applicable).
- GET /api/profiles/me — current user profile.
- PATCH /api/profiles/me — update own profile fields (name, locale, avatar ref, bio).
- GET /api/profiles — list/search profiles (later; admin only); pagination `limit` default 20 (max 50), `cursor`; filters: `tenantId`, `role?`.

## Validation (examples)
| Field      | Required | Type    | Constraints                                  |
|------------|----------|---------|----------------------------------------------|
| name       | No       | string  | 1–100 chars                                   |
| locale     | No       | string  | BCP 47                                       |
| avatarUrl  | No       | string  | Valid URL; served via approved CDN/storage    |
| bio        | No       | string  | Max 1000 chars; sanitized                     |
| tenantId   | No       | string  | Required when tenant-scoped                   |
| limit      | No       | number  | 1–50 (default 20)                             |
| cursor     | No       | string  | Token from previous page                      |
| avatarType | No       | string  | Allowlist: `image/png`, `image/jpeg`          |
| avatarSize | No       | number  | Max 2MB                                       |

## Rules
- Auth required for self endpoints; public profiles expose limited fields (no PII like email).
- Enforce tenant scoping; only owner/admin can list/search across tenants.
- Sanitize text fields; externalise UI strings on client.
- Emit events for profile updates (consent-aware).
- Avatars: must be stored/served from allowed storage/CDN; reject disallowed types/oversized images.

## Sample Payloads
### Update Profile
```json
PATCH /api/profiles/me
{ "name": "Alex Kim", "locale": "en-GB", "bio": "Physics enthusiast", "avatarUrl": "https://cdn.example.com/avatars/u1.png" }
```
Response:
```json
{
  "userId": "user-1",
  "name": "Alex Kim",
  "locale": "en-GB",
  "bio": "Physics enthusiast",
  "avatarUrl": "https://cdn.example.com/avatars/u1.png"
}
```

## Errors (catalog)
| HTTP | Code                   | Message (example)                    | When                                     |
|------|------------------------|--------------------------------------|------------------------------------------|
| 400  | `invalid_request`      | "Invalid locale"                     | Validation failure                       |
| 401  | `unauthorized`         | "Authentication required"            | Missing/invalid auth                     |
| 403  | `forbidden`            | "Insufficient permissions"           | Admin-only list/search, tenant scope     |
| 404  | `not_found`            | "Profile not found"                  | Unknown user                             |
| 429  | `rate_limited`         | "Too many requests"                  | If rate limiting enabled                 |

## Future
- Profile fields per locale; badges/achievements; social links with allowlist.***
