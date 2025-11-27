# Doc & Comment Policy

Guidance to keep documentation current and code comments purposeful.

## Documentation Updates (must)
- Update the authoritative doc for any change (API, schema/table, architecture, workflow, standards) **before** code:
  - APIs: `docs/api/*.md` (include validation, pagination, errors, examples).
  - Data model: `docs/data-model/*.md` (schemas/tables/ERD, RLS notes).
  - Architecture/workflows/plugins: relevant files; update diagrams if flows change.
  - Standards: if behaviour/process changes, update the standard first.
- Record decisions in the appropriate decision log (e.g., analytics stack) when finalized.
- Use `docs/workflows/pr-checklist.md` during reviews to confirm docs are touched.

## Comments (when needed)
- Prefer self-documenting code; add comments only for:
  - Non-obvious intent or invariants.
  - Complex logic/algorithms or tricky edge cases.
  - Security/compliance/permission assumptions.
  - Cross-cutting constraints (performance, caching, RLS, consent).
- Avoid restating code; keep comments succinct and maintained.

## Consistency & Enforcement
- Every PR/task must include a doc review: “Did we update the authoritative doc?”
- Keep code and docs in sync; if they diverge, fix the docs first, then the code.
- Reference this policy in reviews; treat missing doc updates as a blocker.
