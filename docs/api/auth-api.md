# Auth API

Defines authentication endpoints for initial phases (0.2). Session/token model is single-tenant early; multi-tenant comes later.

## Principles
- Doc-first; validate all inputs.
- Tokens/sessions must be HTTP-only/secure where applicable; no PII in errors.
- Responses are JSON; fields use lowerCamelCase.
- All user-facing messages are externalised in the client via i18n.
- Single-tenant context for 0.2: users belong to a single tenant; tenantId may be implicit/omitted until multi-tenant phases.
- Session/token lifecycle is documented below; use secure cookies/headers and explicit expiry/rotation.

## Session & Token Lifecycle (0.2 scope)
- Creation: on signup/login, issue session/token (HTTP-only cookie or auth header) with expiry; associate with user (and tenantId when present).
- Introspection: `/api/auth/session` returns user profile context and tenantIds (single-tenant early).
- Invalidation: logout invalidates current session/token; support rotation/refresh in later phases.
- Locale/consent: include preferred locale in session payload; add consent flags when available; ensure consent-aware analytics.

## User/Tenant Relationship (0.2 single-tenant)
- Users are scoped to a single tenant in this phase; tenant metadata may be implicit.
- TenantId may appear in session payloads for future multi-tenant expansion; enforce single-tenant assumptions in 0.2 docs and APIs.

## Endpoints (Initial 0.2)

### POST /api/auth/signup
- Purpose: create a user (single-tenant owner/standard user).
- Request: `{ email, password, name, locale?, consentVersion?, consentGivenAt?, analyticsOptIn? }`
- Example:
```json
{ "email": "user@example.com", "password": "Str0ngPass!", "name": "Test User", "locale": "en-US", "consentVersion": "v1", "consentGivenAt": "2024-01-01T00:00:00Z", "analyticsOptIn": true }
```
- Validation: email format, password policy, required name.
- Response: `{ userId, email, name, locale, consentVersion?, analyticsOptIn?, token?, sessionId? }`
- Response example:
```json
{ "userId": "user-1", "email": "user@example.com", "name": "Test User", "locale": "en-US", "consentVersion": "v1", "analyticsOptIn": true, "sessionId": "sess-1" }
```
- Errors: 400 validation, 409 email exists.

### POST /api/auth/login
- Purpose: authenticate user.
- Request: `{ email, password }`
- Example: `{ "email": "user@example.com", "password": "Str0ngPass!" }`
- Response: `{ userId, email, name, locale, token?, sessionId? }`
- Response example:
```json
{ "userId": "user-1", "email": "user@example.com", "name": "Test User", "locale": "en-US", "sessionId": "sess-2" }
```
- Errors: 400 validation, 401 invalid credentials, 423 locked (future).

### POST /api/auth/logout
- Purpose: invalidate session/token.
- Auth: required (cookie/header).
- Request: `{ sessionId? }` when not using cookies; otherwise empty body.
- Response: `{ success: true }`
- Error example: `{ "code": "unauthorized", "message": "No active session" }`

### POST /api/auth/reset/request
- Purpose: request password reset.
- Request: `{ email }`
- Response: `{ success: true }` (do not reveal existence).
- Errors: 400 validation.
- Example: `{ "email": "user@example.com" }`

### POST /api/auth/reset/confirm
- Purpose: confirm reset with token.
- Request: `{ token, newPassword }`
- Response: `{ success: true }`
- Errors: 400 validation, 410/422 invalid/expired token.
- Example: `{ "token": "reset-token", "newPassword": "NewStr0ngPass!" }`

### GET /api/auth/session
- Purpose: session introspection.
- Auth: session/token required.
- Response: `{ userId, email, name, locale, consentVersion?, analyticsOptIn?, tenantIds? }`
- Response example:
```json
{ "userId": "user-1", "email": "user@example.com", "name": "Test User", "locale": "en-US", "consentVersion": "v1", "analyticsOptIn": true, "tenantIds": ["tenant-1"] }
```

## Validation (per endpoint)
| Field                | Required | Type    | Constraints                                   |
|----------------------|----------|---------|-----------------------------------------------|
| email (signup/login/reset)   | Yes      | string  | Valid email format; max 254 chars             |
| password (signup/login)      | Yes      | string  | Min 12 chars; mix upper/lower/number/symbol   |
| name (signup)        | Yes      | string  | 1-100 chars                                   |
| locale (signup)      | No       | string  | BCP 47 tag; defaults to en-US                 |
| consentVersion (signup) | No   | string  | Version string for consent policy             |
| consentGivenAt (signup) | No   | string  | ISO timestamp                                 |
| analyticsOptIn (signup) | No   | boolean | true/false                                    |
| token (reset confirm)| Yes      | string  | Non-empty; one-time; expiry enforced          |
| newPassword          | Yes      | string  | Same policy as password                       |
| sessionId (logout)   | No       | string  | If cookie not used                            |

## Tokens/Sessions
- Use HTTP-only cookies for browser clients; support Authorization header (Bearer) if needed. Prefer secure cookies to reduce XSS risk; include CSRF protections when cookies are used.
- Do not store tokens in localStorage/sessionStorage; avoid exposing tokens to JS when possible.
- Include locale preference; include tenant context later.
- Expiry/rotation: set reasonable expiry; support rotation/invalidations for security; store session_token hashed if persisted.

## Locale & Consent
- Capture preferred locale on signup and in session payloads.
- Add consent flags when available; ensure consent-aware analytics events.

## Errors
- Use structured errors: `{ code, message, details? }`
- Do not leak whether an email exists on reset request.

### Error Catalog
| HTTP | Code                 | Message (example)                     | When                                                 |
|------|----------------------|---------------------------------------|------------------------------------------------------|
| 400  | `invalid_request`    | "Invalid email format"                | Bad payload/validation failure                       |
| 401  | `invalid_credentials`| "Email or password is incorrect"      | Login failure                                        |
| 401  | `unauthorized`       | "No active session"                   | Logout/session introspection without auth            |
| 409  | `email_exists`       | "Email already registered"            | Signup conflict                                      |
| 410  | `reset_token_expired`| "Reset link expired"                  | Reset confirm with expired token                     |
| 422  | `reset_token_invalid`| "Reset token is invalid"              | Reset confirm invalid token                          |
| 423  | `account_locked`     | "Account temporarily locked"          | (future) lockout                                     |

## Future (later phases)
- MFA, SSO/SAML/OIDC, account lockout, device/session management.***

## Additional Notes (future)
- Lockout: after N failed logins, return 423 `account_locked`; add unlock via reset flow or cooldown.
- MFA: extend login to require OTP/challenge; add endpoints for MFA setup/verify/disable; enforce per-tenant policy when multi-tenant.
- SSO/OIDC/SAML: add `/api/auth/oidc/*` as needed; validate tokens server-side; map IdP attributes to roles cautiously.

## Sample Payloads
### Signup
```json
POST /api/auth/signup
{ "email": "user@example.com", "password": "Str0ngPass!", "name": "Test User", "locale": "en-US" }
```

### Login
```json
POST /api/auth/login
{ "email": "user@example.com", "password": "Str0ngPass!" }
```
Response:
```json
{ "userId": "user-1", "email": "user@example.com", "name": "Test User", "locale": "en-US", "sessionId": "sess-2" }
```

### Reset Request
```json
POST /api/auth/reset/request
{ "email": "user@example.com" }
```
Response:
```json
{ "success": true }
```

### Reset Confirm
```json
POST /api/auth/reset/confirm
{ "token": "reset-token", "newPassword": "NewStr0ngPass!" }
```
Response:
```json
{ "success": true }
```

## Future MFA Flow (example, when enabled)
```json
POST /api/auth/login
{ "email": "user@example.com", "password": "Str0ngPass!", "otp": "123456" }
```
Response:
```json
{ "userId": "user-1", "sessionId": "sess-3", "mfaVerified": true }
```
