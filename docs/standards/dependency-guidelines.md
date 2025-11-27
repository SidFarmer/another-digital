# Dependency Guidelines

Rules for managing dependencies.

---

# 1. Approval Requirement

Codex MUST request approval before adding ANY dependency.

Requests MUST include:
- justification
- alternatives
- long-term impact
- maintenance cost
- prompt archive reference

---

# 2. Prompt Archiving Requirement

When proposing a dependency, Codex MUST:
- archive the prompt including:
  - dependency request statement
  - justification
  - user approval or denial

Dependencies MUST NOT be added without recorded approval in `/prompts/prompt-archive/<phase>/`.

---

# 3. Disallowed Patterns

Codex MUST NOT:
- add overlapping dependencies
- add heavy dependencies for minor tasks
- add unmaintained libraries
- add security-risk packages

---

**End of Dependency Guidelines**
# Dependency Guidelines

## Purpose
Control addition and use of dependencies to ensure security, stability, and maintainability.

## Approval & Justification
- Do not add new dependencies (prod/dev/peer) without explicit approval.
- Provide justification: why needed, alternatives, impact on size/perf, maintenance burden.

## Selection Criteria
- Prefer existing dependencies already in the monorepo.
- Choose well-maintained, widely used packages with permissive licenses.
- Avoid heavy deps for trivial use; prefer stdlib/simple utilities.
- Avoid transitive risk: check for known vulnerabilities/licensing issues.

## Usage
- Keep dependency scope minimal (only where needed).
- Avoid global side effects; import narrowly.
- Lock versions per workspace rules; keep consistent across packages/apps.

## Security & Compliance
- Review security advisories; avoid packages with known CVEs unless patched.
- No dependencies that embed trackers/telemetry without consent.

## Documentation
- Document added dependencies and purpose in relevant docs/PRs.
- Update `docs/architecture/tooling.md` if toolchain changes.***
