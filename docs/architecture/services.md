# Services Overview

This document inventories the core services and their responsibilities. It aligns with the development outline phases and will be refined as implementation progresses.

## Core Services (Initial)
- API Gateway/Backend (Node/Express): auth, users/tenants, sessions/tokens, permissions, content APIs, progress, community, plugins (registry), marketplace (later).
- Content Storage: Neon (Postgres) for structured data; Sanity for headless content storage.
- Analytics/Event Ingestion (stub initially): receive client events, batch/forward to warehouse (defined in Phase 0.10).
- CMS/LMS Frontend Apps: consume APIs for content authoring and playback.
- Unified Shell/Navigation: layout service/package providing header/sidebars/footer, locale switcher, tenant switcher (later).

## Future Services (Planned)
- Workspace control plane (launch/terminate sandboxed environments).
- Recommendation/Graph service (derivations for recos).
- Marketplace/payments integration.
- Monitoring/Logging pipeline (centralised).

## Notes
- All services adhere to i18n, a11y, security/compliance standards.
- Multi-tenant enforcement and plugin extensibility expand in later phases.***
