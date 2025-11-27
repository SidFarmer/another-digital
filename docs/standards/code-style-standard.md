# Code Style Standard

## Language & Tooling
- TypeScript/JavaScript: follow lint/format tools defined in tooling doc (pnpm + Turbo).  
- Enforce via CI and optional pre-commit hooks; no manual style deviations.

## General Rules
- Prefer explicit types and interfaces; avoid `any`.
- Use async/await; handle errors explicitly.
- Keep functions small and focused; avoid deep nesting.
- Immutable patterns where practical; avoid side effects in shared utils.
- Import order: std lib → external deps → internal packages; prefer absolute paths per repo config.

## Naming
- Follow `docs/standards/naming-conventions.md`; descriptive, consistent, locale-aware.

## UI
- Externalise all user-facing strings to shared i18n; no hardcoded copy.
- Apply accessibility patterns: labels, aria, focus management, keyboard support.
- Use shared UI kit/layout components; avoid custom one-off styles.

## Error Handling & Logging
- Fail fast with clear errors; include context, not secrets.
- Use structured logging; no PII. Follow error/logging baseline.

## Tests
- Co-locate tests where appropriate; name clearly; cover core logic and states.
- Mocks/stubs should be minimal and explicit.

## Comments & Docs
- Add comments only for non-obvious logic or decisions; keep concise.
- Keep code and docs in sync with development outline phases.***
