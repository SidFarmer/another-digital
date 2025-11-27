# Platform Monorepo

This repository contains the documentation and (future) implementation of the multi-tenant learning and creation platform. The source of truth for architecture, standards, data models, and APIs lives under `/docs`; all development should follow the doc-first process defined there.

## Quick links

- Docs index: `docs/index.md`
- Architecture overview: `docs/architecture/overview.md`
- Development outline (roadmap): `docs/architecture/development-outline.md`
- Standards entry point: `docs/standards/README.md`
- PR checklist: `docs/workflows/pr-checklist.md`
- Changelog: `CHANGELOG.md`

## Repository structure (high level)

- `/docs` — architecture, standards, data model, API specs, workflows
- `/prompts` — task prompt archive (per phase)
- `/apps` — application code (to be populated per outline)
- `/packages` — shared libraries (to be populated per outline)

See `docs/architecture/monorepo-structure.md` for the full layout and rules.

## Working approach

- Follow doc-first development: update relevant docs before implementing code or schema changes.
- Adhere to the standards in `docs/standards/` (Codex Standard, Developer Standard, Documentation Standard, Code Style, Naming, Doc/Comment Policy).
- Use the development outline to progress phase by phase; do not skip ahead.

## Quick start (once code exists)

1) Use Node `20.10.0` (`.nvmrc` provided); pnpm `10.19.0` (`.npmrc`).
2) `pnpm install`
3) Copy `.env.example` to `.env` and fill values (no secrets committed).
4) Run (when code exists): `pnpm lint`, `pnpm test`, `pnpm typecheck`.

## Status

- Docs scaffold and standards are in place.
- CI workflow scaffold added (`.github/workflows/ci.yml`); status badge can be added after first run.
- Implementation will follow the development outline; changes will be recorded in `CHANGELOG.md`.***
