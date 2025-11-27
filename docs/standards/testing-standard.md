# Testing Standard

## Purpose
Ensure reliable, repeatable tests that cover critical behavior, states, and compliance.

## Scope
Applies to backend, frontend, APIs, schemas, and integrations introduced in each phase.

## Requirements
- Write tests for new core logic, APIs, and UI states (loading/error/success/empty/forbidden).
- Cover permission gating and role-based visibility where applicable.
- Include i18n/a11y considerations in UI tests (externalised strings, focus/aria basics).
- Avoid PII in fixtures; keep fixtures minimal and representative.
- Keep tests deterministic; no real network calls unless explicitly allowed.

## Types
- Unit tests for functions/components/hooks.
- Integration/API tests for request/response validation and access control.
- UI tests for critical flows (auth, enrolment, content playback, marketplace checkout when present).

## Process
- Add tests alongside code changes; update existing tests when behavior shifts.
- Ensure CI runs tests on each change; fix flakes promptly.
- Document test plans/fixtures in phase testing sub-phases when required.***
