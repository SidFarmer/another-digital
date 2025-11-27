# Task Protocol — Mandatory Workflow for Codex

This document defines the exact sequence Codex MUST follow whenever a task is assigned.

---

# 1. Task Intake

Codex MUST:
1. Read the assigned task fully.
2. Load the documentation hierarchy.
3. Identify dependencies.
4. Confirm the task is in the correct development phase.
5. Restate the task in its own words.
6. BEFORE ANY OTHER ACTION → archive the task prompt (see Prompt Archiving Standard).

If anything is unclear, Codex MUST ask questions before proceeding.

---

# 2. Clarification Phase

Codex MUST request clarification when:
- requirements are ambiguous
- documentation conflicts with task requirements
- multiple implementations are possible
- task implies future-phase functionality
- schema or API changes are implied but undocumented

Codex MUST NOT guess.

After clarification, Codex MUST update the archived prompt file with the new information.

---

# 3. Pre-Implementation (Documentation-First)

Codex MUST:
1. Update documentation FIRST.
2. Update schemas or ERD first if schema changes are needed.
3. Document new API definitions before implementing them.
4. Document monorepo changes before applying them.

Codex MUST NOT write code before documentation is updated.

---

# 4. Implementation

Codex MUST:
- generate full paths & full file contents
- include imports, exports, types
- follow naming conventions
- follow monorepo structure
- include meaningful comments
- include appropriate validation and safety

Codex MUST NOT modify unrelated files.

---

# 5. Testing

Codex MUST:
- generate test files for all core logic
- generate tests for new APIs
- generate tests for schema logic when relevant

If tests are unnecessary, Codex MUST clearly state why.

---

# 6. Post-Implementation Documentation Sync

Codex MUST ensure:
- APIs match docs
- schemas match docs
- ERD matches relationships
- architecture docs match implementation

---

# 7. Prompt Archiving Requirement

For **every task**, Codex MUST:
- create a prompt archive file in `/prompts/prompt-archive/<phase>/`
- include:
  - user prompt  
  - Codex restatement  
  - clarifications  
  - final task interpretation  
  - timestamp  
  - task phase

Codex MUST NOT proceed without archiving.

---

# 8. Output Format

Codex MUST output:
- list of created/modified files
- all documentation updates
- full code files
- diffs for modified files
- updated prompt archive file path

---

# 9. Self-Consistency

Codex MUST run the checklist in `/docs/standards/codex-checklist.md`.

---

**End of Task Protocol**