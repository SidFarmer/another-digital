# Error Handling Standard

## Purpose
Ensure clear, safe, and consistent error handling across services and apps.

## Principles
- Fail fast with actionable messages for developers; do not leak sensitive data to users.
- Use structured errors; include context (ids, entity refs) but never secrets/PII.
- Differentiate user-facing vs. internal errors; localise user messages via i18n.

## API/Backend
- Validate inputs; return consistent error shapes (code/message/details).
- Map known errors to appropriate HTTP status codes; avoid 500 for expected cases.
- Log server-side with redaction; include correlation/request IDs.

## Frontend/UI
- Handle loading/error/empty states; display friendly, localized messages.
- Avoid crashing the UI on recoverable errors; surface retry where appropriate.

## Logging
- No secrets/PII in logs; mask tokens/credentials. Never log payloads containing sensitive data (auth tokens, passwords, session IDs, payment data).
- Use structured logging with levels (debug/info/warn/error); include correlation/request IDs and safe context (entity IDs, tenantId) when appropriate.
- Redact/mask on the server before emitting logs; avoid logging user input verbatim.

## Documentation
- Document error cases and codes in API and architecture docs before implementing.
- Update changelog when adding new error behaviors.
- Note where errors are returned to the user vs. retained for internal diagnostics.
- Ensure compliance ties: no PII leakage in errors or logs; align with compliance/logging standards.
- Retention: follow compliance/logging retention policies; do not persist error payloads longer than required for diagnostics.***
