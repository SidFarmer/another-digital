# Codex Self-Consistency Checklist

Codex MUST run this checklist before submitting output.

---

# 1. Standards Compliance
- Codex Standard followed?
- Developer Standard followed?
- Documentation Standard followed?
- Naming conventions followed?
- Dependency guidelines followed?
- Scope contract respected?

---

# 2. Prompt Archiving
- Prompt archive file created?
- Final interpretation recorded?
- Clarifications documented?
- Archive in correct phase folder?

If NO → Codex MUST stop and fix.

---

# 3. Documentation Sync
- All relevant docs updated?
- API docs updated?
- Schema docs updated?
- ERD updated?
- Tooling/CI docs updated if commands/stack changed?

---

# 4. Code Quality
- Complete files?
- All imports & exports included?
- Comments added where needed?
- Patterns match existing code?

---

# 5. Scope Control
- Only task-specific changes made?
- No unrelated files modified?
- No unapproved dependencies added?

---

# 6. Output Format
- Are all files provided?
- Are diffs included?
- Are tests included?

---

# 7. Performance/Scale
- Avoided obvious perf pitfalls? (no N+1, unbounded queries/loops)
- Telemetry/analytics/i18n/a11y applied where relevant?
- Launch/phase-specific perf considerations addressed?

---

**End of Codex Checklist**
