# Environment Standard

## Purpose
Define how environment configuration is managed, loaded, and validated across services and apps.

## Requirements
- Configuration via environment variables; no secrets in code or VCS.
- Provide `.env.example` in docs with required keys (no values/secrets).
- Validate required vars at startup; fail fast with clear errors.
- Separate envs: local, staging/beta, production. Document differences.
- Keep environment-specific overrides minimal; prefer consistent defaults.

## Loading & Names
- Use a central config loader (per `packages/config` when implemented); avoid scattered `process.env` access.
- Naming: uppercase snake case with prefixes (e.g., `APP_ENV`, `API_BASE_URL`, `NEON_URL`, `SANITY_PROJECT_ID`, `PAYMENTS_PROVIDER_KEY`).
- Include locale/tenant defaults where relevant.

## Security
- Secrets stored in secure secret managers for non-local envs; never log secrets.
- Ensure CI/CD masks secrets in logs.

## Documentation
- Update this standard and `docs/architecture/tooling.md` when env keys change.
- Note per-phase additions (auth, content storage, analytics, payments) in docs first.***
