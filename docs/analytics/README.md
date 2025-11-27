# Analytics Overview

This document describes the analytics scope. Implementation follows the development outline (0.6 for events/progress, 0.10 for dashboards/warehouse).

## Principles
- Consent-aware: honor opt-in/opt-out; no PII in events/logs
- Locale/tenant-aware metadata on all events
- Scalable to millions of users/events; plan batching, back-pressure, retention

## Early Scope (0.6)
- Event schemas for key actions (auth, content interactions, progress, toolkit usage)
- Client/server emitters (stub initially)
- Progress events and indicators
- Decide on event transport candidates (batch/stream) and charting options in later phases.

## Dashboards & Warehouse (0.10)
- Tenant dashboards (engagement, progress, toolkit usage)
- Owner dashboards (platform-wide metrics)
- Warehouse schema (facts/dimensions), partitioning/retention
- ETL/ingestion plan (batch/stream) with monitoring
- Candidate transports: HTTP batch, message queue/stream (e.g., Kafka/PubSub) — decide in 0.10
- Candidate warehouse engines: Postgres-compatible (Neon for small scale) vs. dedicated warehouse (e.g., BigQuery/Snowflake) — decide in 0.10
- Charting: choose library (e.g., Recharts/Chart.js) when dashboards are built
- KPIs (initial): course enrolments, lesson views, progress completion rates, toolkit block usage, community engagement (threads/posts/views), marketplace views/purchases (later).

## Dashboard KPIs (initial)
- Tenant dashboard: enrolments, active learners, lesson views, completion rate, toolkit usage, community posts/replies, marketplace views/purchases (later).
- Owner dashboard: platform-wide enrolments, DAU/MAU, content engagement, community activity, plugin adoption, marketplace GMV (later).

## Governance
- Follow security/compliance: redaction, consent, retention
- Document schemas in `docs/architecture/event-pipeline.md` and data model when defined

## Future
- Recommendations/knowledge graph consumption (later phases)
- Performance budgets for queries/dashboards; caching/aggregation strategies.***
