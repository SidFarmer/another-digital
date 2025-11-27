# Logging Standard

## Purpose
Define consistent, safe logging practices to aid observability without exposing sensitive data.

## Requirements
- Use structured logs with levels (debug/info/warn/error); include correlation/request IDs.
- Do not log PII, secrets, tokens, or credentials; mask/redact sensitive fields. Avoid logging raw user input; prefer references/ids.
- Keep logs concise; avoid dumping large payloads; reference IDs instead.
- Log key lifecycle events (auth, permission denials, tenant changes) with care and no sensitive content. Include tenant context when safe.
- Ensure logs support multi-tenant context (tenantId, userId when safe) and avoid cross-tenant leakage.

## Storage & Retention
- Follow retention policies; avoid unbounded growth.
- Ensure logs are accessible for debugging but secured against unauthorized access.
- Apply retention consistently across logs/events/errors; avoid storing sensitive content even temporarily; prefer references and redaction.

## Documentation
- Note logging expectations in architecture/API docs when relevant.
- Update error-handling baseline and compliance notes when logging behavior changes.***
