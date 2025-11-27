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
- Lint: `pnpm lint` (stub; echoes placeholder until tooling wired)
- Test: `pnpm test` (stub; echoes placeholder until tooling wired)
- Typecheck: `pnpm typecheck` (stub; echoes placeholder until tooling wired)
- Format: `pnpm format` (stub; echoes placeholder until tooling wired)
- Build: `pnpm build` (stub; echoes placeholder until tooling wired)

## Lint/Format/Test Tools
- Linting/formatting: per code-style standard (configured via workspace)
- Testing: per testing standard; runner to be defined when code is added

## i18n & a11y
- All user-facing strings must use shared i18n package; enforce accessibility patterns in UI kit.

## Notes
- Install Turborepo locally with `pnpm dlx turbo@1.12.3` for now; update/pin once commands are wired.
- Update this file when tool versions or hosting targets change; add concrete command wiring once workspace is initialized.
