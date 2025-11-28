# Frontend Overview

This document outlines the frontend scope and principles. Implementation follows the development outline phases.

## Apps
- LMS (student): lesson playback, progress, recommendations (later)
- CMS (creator/tenant): course/module/lesson authoring, interactive blocks
- Admin/Owner: analytics, tenant/user management, marketplace moderation (later)
- Community: forums, profiles
- Library: discovery and featured toolkit/courses
- Dev Portal: plugin/dev docs (later)
- Auth: login/signup/reset

## Principles
- Shared layout (header/sidebars/footer), UI kit, and i18n across apps
- Externalise all user-facing strings; apply accessibility (WCAG) patterns
- Handle loading/error/empty/forbidden states consistently
- Emit consent-aware telemetry with locale/tenant metadata
- Navigation/shell stubs: layout should expose entry points for LMS, CMS, Admin, Community, Library, Dev Portal, Auth/Profiles; all use shared layout/ui packages and i18n.
- Accessibility: apply WCAG 2.1 AA patterns (labels, aria, focus/keyboard nav, contrast) via shared UI kit/layout; avoid app-specific accessibility hacks.
- i18n: supported locales include default `en-US`; provide fallback; locale switcher in shell and settings; auth/settings screens must pull strings from shared i18n namespaces.

## Integration
- Use shared packages: layout, ui, i18n, api client, analytics emitter
- Respect permissions/tenant scope for navigation and module visibility
- i18n hook usage: consume shared i18n provider/hooks; namespaces required for auth/settings (`auth.login`, `auth.signup`, `auth.reset`, `settings.account`). Externalise labels/help/errors/success states; avoid hardcoded strings.
- I18n infrastructure: shared package `packages/i18n` (planned) for provider/hooks and bundles; per-app namespaces loaded from `/apps/*` message bundles. Locale detection order: user setting → persisted preference → Accept-Language → default `en-US`; fallback to default locale on missing keys. Split bundles by route/surface to keep payloads small.***

## Future
- Theming/customisation for tenants; richer dashboards; workspace entry points; marketplace flows as later phases land.***
