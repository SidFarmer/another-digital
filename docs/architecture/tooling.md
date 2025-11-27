# Tooling & Stack

## Core Stack
- Runtime: Node.js 20.10.0 (align `.nvmrc` when added)
- Package manager: pnpm 10.19.0
- Monorepo orchestration: Turborepo (install required; version TBD)
- Backend: Node/Express
- Database: Neon (Postgres)
- Content storage: Sanity (headless)
- Frontend hosting: Vercel (target)
- Backend hosting: Render or equivalent (target)
- Hooks: Husky (optional pre-commit for lint/format)

## Commands (initial skeleton)
- Install: `pnpm install`
- Lint: `pnpm lint`
- Test: `pnpm test`
- Typecheck: `pnpm typecheck`
- Format: `pnpm format`
- Build: `pnpm build`

## Lint/Format/Test Tools
- Linting/formatting: per code-style standard (configured via workspace)
- Testing: per testing standard; runner to be defined when code is added

## i18n & a11y
- All user-facing strings must use shared i18n package; enforce accessibility patterns in UI kit.

## Notes
- Install Turborepo locally (`pnpm dlx turbo`) and pin version when selected.
- Update this file when tool versions or hosting targets change; add concrete command wiring once workspace is initialized.
