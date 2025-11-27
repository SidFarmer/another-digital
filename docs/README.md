## Overview

This documentation set is the source of truth for the platform. It captures architecture, standards, data models, APIs, workflows, and prompt-archive processes. All engineering work must start here and follow the doc-first rules defined in the standards.

## How to use this directory

- Start with `docs/index.md` for a mapped table of contents and quick navigation.
- Review the standards before making changes (see `docs/standards/README.md` for the full list), including `docs/standards/codex-standard.md`, `docs/standards/developer-standard.md`, `docs/standards/documentation-standard.md`, `docs/standards/code-style-standard.md`, `docs/standards/naming-conventions.md`, `docs/standards/doc-first-development.md`, `docs/standards/doc-comment-policy.md`, `docs/standards/prompt-archiving-standard.md`, and newer additions such as `docs/standards/schema-consistency.md` and `docs/standards/task-protocol.md`.
- Consult `docs/architecture/overview.md` and `docs/architecture/development-outline.md` to understand the target system and current phase.
- Keep code, schemas, and APIs in sync with their respective documents; update docs first.

## Key entry points

- Architecture: `docs/architecture/overview.md`, `docs/architecture/development-outline.md`, `docs/architecture/monorepo-structure.md`
- Standards: `docs/standards/README.md`
- Data model: `docs/data-model/README.md`
- API: `docs/api/README.md`
- Workflows: `docs/workflows/README.md`
- Prompts: `prompts/prompt-archive/README.md` (task intake and archiving)

## Ownership and scope

The documentation applies to all apps, packages, and services in the monorepo. If a change is not reflected here, it is out of scope until documented. Add or update docs before implementing code or schema changes.***
