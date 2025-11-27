# Schema Consistency Standard

Codex MUST ensure schema alignment between documentation, migrations, and implementation.

---

# 1. Documentation as Source of Truth

Codex MUST treat documentation as authoritative:
- `/docs/data-model/schemas.md`
- `/docs/data-model/tables.md`
- `/docs/data-model/erd.md`

Codex MUST NOT infer undocumented schema details.

---

# 2. Workflow

Codex MUST:
1. Archive the prompt FIRST
2. Update schema docs
3. Update ERD
4. THEN write migration files
5. THEN update Prisma/ORM models
6. THEN generate code using the schema

---

# 3. Consistency Requirements

Codex MUST verify:
- all fields in migrations are documented
- no undocumented fields exist
- ERD matches relationships
- naming conventions match

---

# 4. Drift Prevention

Schema drift is STRICTLY FORBIDDEN.

Codex MUST:
- detect drift
- correct drift
- update archive file noting drift detection

---

**End of Schema Consistency Standard**