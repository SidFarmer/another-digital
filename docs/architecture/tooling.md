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
- Hooks: Husky (planned pre-commit for lint/format/typecheck once tooling is wired)

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
- Pre-commit hooks: plan to use Husky + lint-staged once code and tooling are present (intended checks: format, lint, typecheck). Hooks remain disabled until packages/tooling exist to avoid breaking installs.

## Stack Boundaries & Deployment Separation
- Frontend apps live under `/apps/*` (Next.js planned) and deploy to Vercel (target). Do not place backend/server code in frontend apps.
- Backend/API services (Node/Express) will be added later and deploy to Render or equivalent. Keep service code in service app folders or backend-focused packages; avoid server logic in UI packages.
- Shared code lives in `/packages/*` (types, utils, layout, ui, auth, permissions, entities, events, analytics, content, community, profile, workspace, plugins, api, config, theme, i18n). Frontend apps consume all relevant packages; backend services consume non-UI/shared logic as appropriate.
- Data/storage split: Neon for structured data; Sanity for content. Place adapters/clients in appropriate packages (e.g., content/api) and avoid mixing storage concerns into UI packages.
- Hooks: Husky + lint-staged will run format/lint/typecheck once real tooling exists; keep disabled until then.***
