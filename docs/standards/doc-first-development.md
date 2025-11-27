# Doc-First Development Standard

Codex MUST always update documentation BEFORE writing any code.

---

# 1. Documentation Order

Before implementation, Codex MUST:
1. Update architecture documentation
2. Update schema documentation
3. Update ERD diagrams
4. Update API specifications
5. Update monorepo structure documentation
6. Update relevant standards if behaviour changes
7. Archive the prompt BEFORE documentation updates

Documentation MUST always precede code.

---

# 2. Prompt Archiving Integration

Codex MUST:
- create or update the prompt archive file BEFORE writing docs
- include:
  - initial prompt
  - clarifications
  - final task interpretation

No documentation changes may occur until the prompt archive is written.

---

# 3. Synchronisation

Codex MUST ensure:
- documentation matches final code
- code does not exceed documented scope
- all schema/API/architecture changes appear in `/docs`

---

**End of Doc-First Development Standard**
# Doc-First Development Standard

## Purpose
Enforce documentation updates before code, schema, or API changes.

## Rules
- Do not write code/tests before updating relevant docs (architecture, API, data model, workflows, standards).
- Follow the documentation hierarchy and development outline phases.
- Reflect scope, inputs/outputs, validation, errors, states (UI), and i18n/permissions/compliance in docs first.
- Update changelog and prompt archive after changes; keep docs/code in sync.

## Process
1. Identify affected docs; update them with proposed changes.
2. Confirm standards are satisfied (naming, code-style, testing, security, compliance, environment).
3. Implement code/tests per documented plan.
4. Run tests/CI; fix issues.
5. Update docs if implementation deviates; record in changelog and prompt archive.

## Exceptions
- None: doc-first applies to all changes unless explicitly exempted by owner.***
