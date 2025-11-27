# Naming Conventions

## General
- Use descriptive, consistent names; avoid abbreviations unless standard.
- Prefer lowerCamelCase for variables/functions; UpperCamelCase for classes/types; CONSTANT_CASE for constants.
- File/folder names: kebab-case; tests mirror source names with `.test`/`.spec`.

## Domain
- Follow terminology in architecture/docs; align with entity/permission models.
- Include locale/tenant context in names where relevant (e.g., `locale`, `tenantId`).

## API & Data
- Request/response fields use lowerCamelCase JSON keys.
- Boolean names are positive (e.g., `isActive`, `hasAccess`).
- Timestamps use `createdAt`/`updatedAt`; IDs end with `Id`.

## UI/i18n
- No hardcoded user-facing strings; use i18n keys reflecting hierarchy (e.g., `auth.login.title`).
- Components prefixed by domain when shared (e.g., `CourseCard`, `CommunityThreadList`).

## Tests
- Test names describe behavior and state (e.g., `renders error state on failed fetch`).***
