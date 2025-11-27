# Rendering Engine (LMS)

## Purpose
Render lesson blocks consistently across apps with shared UI kit, i18n, and a11y.

## Responsibilities
- Render ordered blocks (text, media, math, chem, code sandbox, visuals).
- Handle loading/error/empty/forbidden states.
- Apply locale formatting and externalised strings.
- Sandbox interactive blocks; sanitize embeds.

## Integration
- Consumes lesson payloads from Content API.
- Uses shared UI kit/layout and i18n.
- Emits analytics/progress events with locale/tenant metadata.

## Future
- Extend to plugin-provided blocks; performance optimizations; offline/caching as needed.***
