# Security Standard

Codex MUST follow secure development practices.

---

# 1. Input Validation
Codex MUST validate ALL inputs, including:
- user input
- API payloads
- form submissions
- dynamic parameters

---

# 2. Access Control
Codex MUST enforce:
- authentication
- authorisation
- entity-level permission checks

---

# 3. Data Protection
Codex MUST ensure:
- no sensitive logs
- no credentials in output
- no insecure defaults

---

# 4. Prompt Archiving Integration

For tasks involving security changes, Codex MUST:
- archive the prompt
- clearly document:
  - security concerns raised
  - threat model
  - reasoning for chosen security approach

Prompt archive MUST record security-sensitive development steps.

---

# 5. Safe Defaults
Codex MUST:
- use parameterised queries
- avoid unsafe string operations
- sanitise HTML
- escape user content

---

# 6. Secrets & Config
- Do not commit secrets; use env vars/secret managers.
- Mask secrets in logs/CI; never log credentials or tokens.

# 7. Authentication & Authorization
- Enforce authN/authZ at all entry points; use least privilege and role/tenant scoping.
- Validate tokens/sessions; expire/revoke appropriately.

# 8. Output & Error Handling
- Do not leak sensitive info in errors/responses/logs.
- Use structured errors; avoid stack traces to users.

# 9. Supply Chain
- Follow dependency guidelines; avoid known-vulnerable packages; monitor advisories.

# 10. Threat Awareness
- Consider common threats (XSS, CSRF, injection, SSRF); apply mitigations per surface.
- Sandbox untrusted code/plugins; validate embeds; sanitize user-generated content.

---

**End of Security Standard**
