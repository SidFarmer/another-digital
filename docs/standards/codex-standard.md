# Codex Standard — Behaviour, Rules & Development Protocol

This document defines the rules, constraints, expectations, and mandatory behaviours that Codex must follow when acting as the sole developer of this repository. Its purpose is to ensure consistency, stability, predictability, and strict architectural alignment across all future work.

Codex MUST follow all rules in this document at all times.

---

# 1. General Principles

## 1.1 Documentation Hierarchy (Highest → Lowest Authority)

Before generating code, modifying architecture, or adjusting schemas, Codex MUST consult the following documents in this exact order:

1. `/docs/standards/codex-standard.md`
2. `/docs/standards/developer-standard.md`
3. `/docs/standards/documentation-standard.md`
4. `/docs/standards/code-style-standard.md`
5. `/docs/standards/naming-conventions.md`
6. `/docs/standards/doc-comment-policy.md`
7. `/docs/architecture/development-outline.md`
8. `/docs/architecture/overview.md`
9. `/docs/architecture/entity-system.md`
10. `/docs/architecture/permission-system.md`
11. `/docs/data-model/erd.md`
12. `/docs/data-model/schemas.md`
13. `/docs/data-model/tables.md`

If conflicts appear, Codex MUST follow this hierarchy and ask for clarification if ambiguity remains.

---

# 2. Stateless Operation (“No Hidden State” Rule)

Codex MUST operate statelessly:

- Codex MUST NOT rely on memory from previous tasks.
- Codex MUST ONLY use information found in the repository and current prompt.
- Codex MUST NOT assume undocumented requirements.
- Codex MUST NOT infer patterns that do not exist in documentation.

Codex MUST treat `/docs` and the current repository state as the **only source of truth**.

---

# 3. Code Generation Rules

## 3.1 Codex MUST NOT invent files or directories

Codex MUST NOT:
- create undocumented files
- create undocumented directories
- speculate future structures

All new files MUST be documented first.

## 3.2 Codex MUST follow existing patterns

Codex MUST match:
- folder structure
- naming conventions
- TypeScript patterns
- import style
- error handling
- validation logic
- function signatures
- architectural boundaries

## 3.3 Codex MUST generate complete, functional code

All code MUST include:
- imports
- exports
- types
- default values
- validations
- complete logic
- stable states
- documentation comments

Codex MUST NOT output incomplete files unless explicitly asked.

## 3.4 Codex MUST add meaningful comments

Codex MUST document:
- complex logic
- architectural decisions
- entity/role/permission logic
- important assumptions
- non-obvious constraints

Codex MUST reference relevant documentation sections when helpful.

Codex MUST NOT add obvious or trivial comments.

---

# 4. Documentation Requirements (“Auto-Update Protocol”)

Codex MUST maintain strict consistency between code and documentation.

Whenever Codex:
- creates new APIs
- modifies schemas
- adds new tables
- changes architecture
- adds new event types
- adds new content block types
- updates permissions or role bindings
- adds new packages or modules

Codex MUST update the relevant documentation files in the SAME response.

## 4.1 Documentation MUST be updated BEFORE code  
(Doc-First Development)

Codex MUST update `/docs` first, then generate code.

## 4.2 Codex MUST update:

- `/docs/api/*.md`
- `/docs/data-model/*.md`
- `/docs/architecture/*.md`
- `/docs/workflows/*.md`
- `/docs/plugins/*.md`
- any related standards

## 4.3 Codex MUST ensure bidirectional consistency

If documentation and code diverge, Codex MUST correct the mismatch.
- Codex MUST enforce the Doc & Comment policy (`/docs/standards/doc-comment-policy.md`) and apply the PR checklist (`/docs/workflows/pr-checklist.md`) when reviewing changes.

---

# 5. Development Order & Phase Control

Codex MUST follow:

`/docs/architecture/development-outline.md`

Codex MUST:
- complete tasks in order
- not skip ahead
- not include future functionality
- not anticipate unassigned phases

If a task appears to require future-phase features, Codex MUST ask for clarification before proceeding.

---

# 6. Task Protocol

Codex MUST follow the rules defined in:

`/docs/standards/task-protocol.md`

Codex MUST:
- restate the assigned task
- identify dependencies
- check documentation hierarchy
- verify correct phase
- ask clarifying questions if needed
- update documentation first
- then implement code
- then add tests
- then run the self-consistency checklist

Codex MUST NOT begin implementation until ambiguities are resolved.

---

# 7. File System Guardrails

Codex MUST NOT:
- rename files
- move files
- restructure directories
- reorganise the monorepo
- delete files
- modify unrelated files

Unless explicitly instructed.

THIS RULE IS STRICT AND OVERRIDES ALL OTHERS.

---

# 8. Dependency Control

Codex MUST request approval BEFORE:
- adding any new dependency
- adding peer dependencies
- adding dev dependencies

Codex MUST justify:
- why it is required
- alternatives using the existing stack
- architectural impact
- long-term maintenance implications

Codex MUST NOT add dependencies without explicit permission.

---

# 9. Schema Consistency Rules

Codex MUST:
- ensure all tables match `/docs/data-model/schemas.md`
- ensure ERD relationships reflect implemented schema
- update migrations AND documentation in the same response
- avoid undocumented columns
- avoid undocumented schema changes
- check for schema drift

Codex MUST NOT rely on inferred or assumed schema structures.

---

# 10. Security Requirements

Codex MUST:
- follow `/docs/standards/security-standard.md`
- validate ALL input to API routes
- handle unsafe external content safely
- sanitize user-provided strings
- enforce access control at route boundaries
- avoid exposing sensitive data in logs
- avoid insecure patterns

Codex MUST treat all input as untrusted.

---

# 11. Scope Contract

Codex MUST:
- only execute what the task specifies
- NOT refactor outside the task
- NOT optimise or reorganise code unless requested
- NOT introduce architectural changes
- NOT fix unrelated issues

This ensures strict scope containment.

---

# 12. Code Submission Format

Codex MUST output:
- full file paths
- full file content
- diffs for modified files
- required test files
- required documentation updates

Codex MUST NOT:
- provide partial snippets
- omit imports or exports
- mix changes from unrelated features

---

# 13. Self-Consistency Checklist

Before submitting any output, Codex MUST verify:

- Does this follow all standards?  
- Does this follow the development outline?  
- Does this strictly follow the documentation hierarchy?  
- Are docs updated for all changes?  
- Are tests included where needed?  
- Is naming consistent?  
- Is the schema consistent?  
- Are patterns mirrored correctly?  
- Is the scope limited to the task?  
- Are dependencies unchanged unless approved?  
- Is the code complete and runnable?  
- Is the output reversible and safe?

If ANY answer is no, Codex MUST fix the error BEFORE submitting code.

---

**End of Codex Standard**
