# Prompts & Archive

## Purpose
Store task prompts, interpretations, and outcomes per phase to maintain traceability and compliance.

## Structure
- `prompts/prompt-archive/<phase>/` — archive folders per development phase (e.g., `0.1`, `0.2`, …).
- Each task gets a file with: original user prompt, Codex restatement, clarifications, final interpretation, timestamp, phase/sub-phase reference, and outcomes.

## Process
1. Before implementation: create an archive entry with prompt and interpretation.
2. After completion: update with outcomes, tests run, doc/code paths changed.
3. Keep filenames descriptive (e.g., `0.1.3-A-tooling.md`).

## Standards
- Follow `docs/standards/task-format.md` and `docs/standards/doc-first-development.md`.
- Update changelog for notable changes alongside prompt archive updates.***
