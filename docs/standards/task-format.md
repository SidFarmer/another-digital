# Task Format Standard

Defines how tasks are provided to Codex.

---

# 1. Structure

Tasks are written as:

Task
(description)

Requirements
(list)

Files to Modify / Create
(list)

Constraints
(list)

Notes
(optional)

Codex MUST restate the task before proceeding.

---

# 2. Prompt Archiving Requirement

Upon receiving a task, Codex MUST:

1. Immediately create a prompt archive file under:
   `/prompts/prompt-archive/<phase>/`
2. Store:
   - the original task
   - clarifications
   - final task interpretation
   - timestamp

Codex MUST NOT proceed until the archive file is created.

---

**End of Task Format Standard**
# Task Format Standard

## Purpose
Provide a consistent structure for tasks/prompts so work is scoped, traceable, and aligned with the development outline.

## Required Elements
- Phase/Sub-phase: reference development-outline (e.g., 0.1.3-A).
- Scope: what is in/out; tie to relevant docs.
- Deliverables: code, docs, tests, changelog updates.
- Standards to follow: list relevant standards (e.g., security, compliance, i18n/a11y).
- Dependencies: prior tasks/phases.
- Tests: expected coverage or rationale if not applicable.
- Docs to update first: list specific files.
- Acceptance: criteria for completion; CI expectations.

## Process
- Archive each prompt in `prompts/prompt-archive/<phase>/` before implementation.
- Update changelog for notable user/dev-facing changes.
- Keep output concise and aligned with task scope; no unrelated changes.***
