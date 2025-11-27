# Deployment Architecture

## Environments
- Local: development with mocked/stubbed services.
- Staging/Beta: mirrors production; continuous public beta.
- Production: multi-tenant deployment with monitoring/alerts.

## Hosting Targets (initial plans)
- Frontend apps: Vercel.
- Backend/API: Render or equivalent.
- Database: Neon (Postgres).
- Content storage: Sanity.
- Analytics/warehouse: defined in Phase 0.10.

## Network & Access
- HTTPS everywhere; HTTP-only secure cookies if used.
- API behind gateway/load balancer; rate limiting/WAF to be added.
- Secrets managed via host secret managers; no secrets in code/CI logs.
- Rate limiting plan: apply per-IP and per-tenant throttles on API; protect auth/marketplace endpoints; revisit limits as traffic grows.
- WAF plan: enable host-provided WAF (for Vercel/Render) to filter common attacks; add custom rules for auth/marketplace when needed.
- Tenant isolation: include `tenantId` in every request path or header where relevant; enforce row-level security in DB when enabled; segregate caches/queues per tenant if needed for scale.
- Network tiers: public (apps), private (API→DB/content/event), management (monitoring/observability).

## Deployment Flow
- CI runs lint/test/typecheck/build; staging deploy on main; production with approval.
- Rollback strategy documented in deployability phase; plan for canary/blue-green at launch.

## Observability
- Logging/metrics/tracing per deployability phase (0.11); structured logs with redaction.
- Alerts/runbooks defined alongside services; smoke checks post-deploy.
- Caching: start with CDN for static assets; introduce API response caching per-tenant where safe; avoid caching personalized data without proper keys; consider Redis-layer for session/state when needed.

## Topology (initial)
- Vercel → API (Render) → Neon + Sanity; event emitter to ingestion (stub) → warehouse (later).
- DNS/SSL managed per host; CDN handled by Vercel for frontend assets.

```mermaid
flowchart LR
  Browser -->|HTTPS| WAF["WAF + Rate Limit"]
  WAF -->|Static/SSR| Vercel
  WAF -->|API calls| RenderAPI["API (Render)"]
  RenderAPI -->|DB (RLS)| Neon[(Postgres)]
  RenderAPI -->|Content| Sanity
  RenderAPI -->|Events| IngestionStub
  IngestionStub -->|ETL later| Warehouse
  Vercel -.-> CDN["CDN/Edge Cache"]
  subgraph Isolation
    Neon
    Sanity
  end
```

## Future
- Region-aware deployments for data residency (0.16).
- Horizontal scaling, caching layers, and rate limiting as traffic grows.
- Tenant isolation enforcement across services as multi-tenant features land.
