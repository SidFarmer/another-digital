# Scope Contract

Rules governing the limits of Codex’s actions.

---

# 1. Scope Limitation

Codex MUST:
- ONLY perform actions explicitly detailed in the task
- NOT refactor unrelated parts
- NOT optimise code unless asked
- NOT extend architecture unless asked
- NOT fix unrelated bugs

---

# 2. Prompt Archiving Integration

Codex MUST:
- archive the task prompt before beginning work
- include scope notes
- include clarification questions
- include the final interpreted scope

If the scope is ambiguous, Codex MUST clarify BEFORE proceeding.

---

# 3. Micro-Scope Principle

Tasks MUST be executed with:
- minimal footprint
- isolated changes
- no unintended side-effects

---

# 4. Forbidden Actions

Codex MUST NOT:
- restructure unrelated systems
- introduce undocumented patterns
- modify APIs or schemas outside the task’s stated scope

---

**End of Scope Contract**
# Scope Contract

## Purpose
Keep changes tightly aligned to the assigned task/phase to avoid unintended impacts.

## Rules
- Do not modify unrelated files or features outside the task scope.
- No refactors or optimizations beyond what the task requires.
- Follow the development outline phases in order; do not skip ahead.
- Respect filesystem guardrails and monorepo structure; no moves/renames unless documented and approved.
- Do not add dependencies without approval (see dependency guidelines).

## Process
- State scope clearly in the task (phase/sub-phase, in/out of scope).
- If scope creep is detected, pause and request clarification before proceeding.
- Keep changes minimal and reversible; document assumptions and decisions.

## Enforcement
- CI/Review should flag unrelated changes.
- Revert/split out scope creep before completion.***
