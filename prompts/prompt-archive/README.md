# Prompt Archive

## Purpose
Maintain a history of tasks/prompts per phase for auditability, compliance, and traceability.

## Structure
- `prompts/prompt-archive/<phase>/` — folders per phase (e.g., `0.1`, `0.2`, …). Each phase may include a local `README.md` for quick context.
- Task files follow `phase.subphase-name.md` (e.g., `0.1.1-A-standards.md`).
- Each task file MUST include:
  - Original user prompt
  - Restatement and any clarifications
  - Phase/sub-phase reference
  - Plan
  - Outcomes (docs/code/tests updated), tests run, changelog reference
  - Timestamp if available

## Process
- Archive BEFORE documentation or implementation; update outcomes AFTER completion.
- Follow `docs/standards/task-format.md` and `docs/standards/task-protocol.md`.
- Use descriptive filenames including phase/sub-phase (e.g., `0.1.1-A-standards.md`).
- Keep archives aligned with changelog entries for notable changes.
- Never store secrets or sensitive data.

## Notes
- Optional: a `latest` pointer folder may reference the current phase.
- Keep archives synced with changelog entries for notable changes.***
