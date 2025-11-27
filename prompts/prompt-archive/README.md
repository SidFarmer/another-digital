# Prompt Archive

## Purpose
Maintain a history of tasks/prompts per phase for auditability, compliance, and traceability.

## Structure
- `prompts/prompt-archive/<phase>/` — folders per phase (e.g., `0.1`, `0.2`, …).
- Each task is a file containing:
  - Original user prompt
  - Codex restatement and clarifications
  - Final interpretation and scope
  - Timestamp and phase/sub-phase reference
  - Outcomes (docs/code/tests updated), tests run, changelog reference

## Process
- Archive before implementation; update after completion.
- Use descriptive filenames including phase/sub-phase (e.g., `0.1.1-A-standards.md`).
- Ensure archives align with `docs/standards/task-format.md`.

## Notes
- Keep archives synced with changelog entries for notable changes.
- Do not store secrets in archives.***
