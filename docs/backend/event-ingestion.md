# Event Ingestion (Stub)

## Purpose
Receive and process client/server events for analytics and progress, forwarding to warehouse/analytics pipeline (later).

## Scope (early)
- Validate incoming events against schemas; consent-aware filtering.
- Stub ingestion (log/store minimal) until warehouse is defined (Phase 0.10).

## Requirements
- No PII in events; redaction where needed.
- Include tenant/locale metadata.
- Rate limiting and auth to be added as needed.

## Future
- Batch/stream pipelines to warehouse; monitoring/alerting; retries; DLQ.
