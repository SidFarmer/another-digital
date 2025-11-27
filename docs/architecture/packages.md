# Packages Overview

This document lists planned shared packages per `monorepo-structure.md` and their roles. Implementations will follow the development outline phases.

- `@platform/types`: shared TypeScript types.
- `@platform/utils`: shared utilities.
- `@platform/layout`: unified dashboard shell (header/sidebars/footer).
- `@platform/ui`: UI kit components and design tokens.
- `@platform/auth`: shared auth helpers (tokens/sessions).
- `@platform/permissions`: RBAC engine and permission resolvers.
- `@platform/entities`: entity system abstractions.
- `@platform/events`: event schemas and emitters.
- `@platform/analytics`: analytics client helpers (emitter stub initially).
- `@platform/content`: content engine (blocks/renderers/schemas).
- `@platform/community`: forum/collaboration shared logic.
- `@platform/profile`: public profile rendering + schema helpers.
- `@platform/workspace`: workspace tools (future).
- `@platform/plugins`: plugin runtime + SDK bindings.
- `@platform/api`: shared API client/server helpers.
- `@platform/config`: config loaders (env, runtime).
- `@platform/theme`: design tokens + theme system.
- `@platform/i18n` (added): localisation utilities, message catalogs, locale detection.
