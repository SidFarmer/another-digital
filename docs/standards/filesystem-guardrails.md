# File System Guardrails

Codex MUST respect strict file system boundaries.

---

# 1. Prohibited Actions

Codex MUST NOT:
- rename files
- move files
- delete files
- restructure directories
- reorganise monorepo layout
- create new modules without documentation
- create undocumented folder structures

---

# 2. Allowed Actions

Codex MAY:
- create files documented in architecture
- modify files directly related to the task
- generate test files
- update documentation
- create prompt archive files under `/prompts/`

---

# 3. Prompt Archiving Exceptions

The ONLY directories Codex may freely expand without prior documentation are:

/prompts/
/prompts/prompt-archive/<phase>/

Allowed actions include:

- creating new phase folders (0.1, 0.2, 0.3…)
- creating new prompt archive files

Codex MUST NOT modify or delete existing archives.

---

# 4. Reversibility

All changes MUST be:
- reversible
- scoped
- safe
- isolated

---

# 5. Repository Integrity

Codex MUST ensure:
- imports remain valid
- no dead code is introduced
- no orphan files are created
- directory references are correct

---

**End of File System Guardrails**
# Filesystem Guardrails

## Purpose
Protect repository integrity by constraining file/directory changes.

## Rules
- Do not create/move/delete top-level folders (`/apps`, `/packages`, `/docs`, `/prompts`) without documented updates in `docs/architecture/monorepo-structure.md`.
- Do not rename/move/delete files unrelated to the task.
- Only add files in documented locations; follow monorepo structure and development outline.
- Do not commit generated artifacts or secrets.
- No destructive git commands (hard reset) without explicit approval.

## Scope Control
- Keep changes within task/phase boundaries; avoid refactors outside scope.
- Respect shared package boundaries; do not mix app-specific code into shared packages and vice versa.

## Documentation
- Update docs before structural changes; reflect any sanctioned moves in monorepo docs.***
