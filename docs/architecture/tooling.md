# Tooling & Stack

## Core Stack (Pinned for 0.1)
- Runtime: Node.js 20.10.0 (pinned in `.nvmrc`)
- Package manager: pnpm 10.19.0 (pinned in `.npmrc` / `packageManager`)
- Monorepo orchestration: Turborepo (install via `pnpm dlx turbo@1.12.3`; pin version when wiring commands)
- Backend: Node/Express
- Database: Neon (Postgres)
- Content storage: Sanity (headless)
- Frontend hosting: Vercel (target)
- Backend hosting: Render or equivalent (target)
- Hooks: Husky (optional pre-commit for lint/format)

## Commands (initial skeleton; stubs until code exists)
- Install: `pnpm install`
- Lint: `pnpm lint` (stub)
- Test: `pnpm test` (stub)
- Typecheck: `pnpm typecheck` (stub)
- Format: `pnpm format` (stub)
- Build: `pnpm build` (stub)
  - Stubs echo placeholders in root `package.json` until tooling is wired.

## Lint/Format/Test Tools
- Linting/formatting: per code-style standard (configured via workspace)
- Testing: per testing standard; runner to be defined when code is added

## i18n & a11y
- All user-facing strings must use shared i18n package; enforce accessibility patterns in UI kit.

## Notes
- Install Turborepo locally with `pnpm dlx turbo@1.12.3` for now; update/pin once commands are wired.
- Update this file when tool versions or hosting targets change; add concrete command wiring once workspace is initialized.
