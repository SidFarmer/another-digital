# Content Engine (Backend)

## Purpose
Provide server-side logic for course/module/lesson/block management, validation, and storage coordination.

## Responsibilities
- Validate and persist courses/modules/lessons/blocks (including interactive configs).
- Coordinate storage between Neon (structured data) and Sanity (content assets).
- Handle draft/publish transitions; enforce permissions/enrolment for access.
- Apply localisation rules for content fields/blocks.
- Sanitize/sandbox interactive content (media embeds, code sandbox configs).

## Interfaces
- Exposed via Content API.
- Emits events for create/update/publish/view (consent-aware).

## Future
- Version history, assessments, cloning, plugin-provided blocks, richer validation.***
