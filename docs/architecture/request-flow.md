# Request Flow (High-Level)

## Backend (Node/Express)
1. Request enters API gateway/backend.
2. AuthN/AuthZ: validate session/token; enforce permissions/tenant scope.
3. Route handling: validate input; execute domain logic.
4. Data access: Neon (Postgres) for structured data; Sanity for content retrieval.
5. Emit events (consent-aware) for analytics/progress where applicable.
6. Respond with structured payloads; errors follow error-handling standard (no sensitive data).

## Frontend (Apps)
1. User navigates via unified shell; locale/tenant context applied.
2. Fetch data via API client; handle loading/error/empty states; externalise all strings via i18n.
3. Render with shared UI kit/layout; apply a11y patterns.
4. Emit client events for analytics (stubbed initially) with locale/tenant metadata.

## Multi-Tenancy & Plugins (Later Phases)
- Tenant switcher influences API calls and UI context.
- Plugin extension points may augment request/response behavior in a controlled sandbox.

## Notes
- All flows must avoid PII in logs; follow security/compliance/error-handling standards.

```mermaid
sequenceDiagram
  participant Browser
  participant Frontend as Frontend App (Vercel)
  participant API as API (Render)
  participant DB as Neon (Postgres)
  participant CMS as Sanity
  participant Events as Event Ingestion (stub)

  Browser->>Frontend: Navigate (locale, auth state)
  Frontend->>API: API request with token/session
  API->>API: AuthN/AuthZ, permission/tenant checks
  API->>DB: Query/Update data
  API->>CMS: Fetch content (if needed)
  API-->>Frontend: JSON response (no PII)
  Frontend-->>Events: Emit client event (consent-aware)
  API-->>Events: Emit server event (consent-aware)
```

```mermaid
flowchart TD
  Req["Request (token/session)"] --> AuthN["AuthN (verify token/session)"]
  AuthN --> Ctx["Build Context (tenantId, roles, locale)"]
  Ctx --> AuthZ["AuthZ (role + entity binding)"]
  AuthZ -->|Allow| Handler["Handler"]
  AuthZ -->|Deny| Deny["403/401 (no PII)"]
  Handler --> RLS["DB (RLS tenant scoped)"]
  Handler --> Cache["Tenant cache/queue"]
  Handler --> Resp["Response"]
  Deny --> Resp
```

```mermaid
sequenceDiagram
  participant User
  participant Frontend
  participant API
  participant IdP as IdP (OIDC/SAML, future)
  User->>Frontend: Open login (locale applied)
  Frontend->>API: POST /auth/login (email/password[/otp])
  API-->>Frontend: Session/token (HTTP-only)
  Frontend->>API: GET /auth/session (hydrate context)
  note over Frontend,API: MFA optional via otp/challenge
  Frontend->>IdP: Redirect for SSO (future)
  IdP-->>Frontend: Code/assertion
  Frontend->>API: POST /auth/oidc/callback (future)
  API-->>Frontend: Session/token + tenant context
```
