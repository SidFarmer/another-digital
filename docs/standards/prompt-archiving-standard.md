# Prompt Archiving Standard

## Purpose
Ensure every task/prompt is archived for traceability, compliance, and context.

## Scope
Applies to all tasks across phases; archive before implementation and update after completion.

## Requirements
- Archive location: `prompts/prompt-archive/<phase>/`.
- Each entry includes: original user prompt, Codex restatement, clarifications, final interpretation, phase/sub-phase, timestamp, outcomes (docs/code/tests), tests run, changelog reference.
- File naming: include phase/sub-phase (e.g., `0.1.1-A-standards.md`).
- No secrets in archives.

## Process
1. Before work: create archive entry with prompt, restatement, clarifications.
2. After work: update with outcomes, files changed, tests, changelog link.
3. Keep archives in sync with task format and development outline.

## Compliance
- Required for security-sensitive tasks; supports auditability.
- Aligns with task protocol and doc-first development.***
