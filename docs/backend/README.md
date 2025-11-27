# Backend Overview

This document outlines the backend scope and principles. Implementation follows the development outline phases.

## Stack
- Node.js/Express backend
- Neon (Postgres) for structured data; Sanity for content storage
- Shared packages: auth, permissions, entities, events, analytics (emitters), content, community, profile, plugins, config

## Responsibilities (early phases)
- Auth: sessions/tokens, login/signup/reset
- Users/Tenants: models and basic management
- Content APIs: courses/modules/lessons/blocks (including interactive types), publish/draft
- Enrolment and progress: enrol/unenrol, progress read/write
- Community (initial): forums/threads/posts
- Profiles (public data)
- Plugin registry groundwork

## Principles
- Doc-first; follow API/data model docs
- Validate inputs; structured errors; no PII in logs
- Enforce authN/authZ and tenant scope; externalize user-facing messages in clients
- Emit consent-aware events (stubbed initially); avoid N+1 and unbounded queries

## Future
- Marketplace/payments, workspace control plane, knowledge graph/recommendations, multi-tenant hardening, analytics warehouse integrations per later phases.***
