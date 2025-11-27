# Git Workflow Standard

## Purpose
Ensure consistent, safe version control practices aligned with doc-first development.

## Branching & Commits
- Use phase/sub-phase-based branches. Examples:
  - Phase: `feature/0.1`
  - Sub-phase: `feature/0.1.1`
  - Step (optional): `feature/0.1.1-A`
- Commit messages prefixed with phase/step. Examples: `0.1.1-A: sync standards index`, `0.1.2: scaffold workspace config`.
- No direct commits to `main`; merge feature → dev → test → main per release gates.
- Work on branches per task/phase when applicable; keep scope small.
- Commit messages: concise summary + context if needed; no secret data.
- Do not amend shared commits unless required; avoid force pushes to shared branches.

## Process
- Update docs first, then code/tests per development outline.
- Keep changelog current for notable changes.
- Use CI as gate: lint/test/typecheck must pass before merge/deploy.
- Resolve conflicts by reapplying changes, not by reverting unrelated work.

## Reviews
- Document assumptions and decisions in PR descriptions; link to phase/sub-phase.
- Highlight testing performed and impacts (perf/security/compliance/i18n/a11y).

## Safety
- No destructive commands (hard reset) without explicit approval.
- Respect filesystem guardrails and scope boundaries.***
