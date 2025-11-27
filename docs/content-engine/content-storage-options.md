# Content Storage Options

## Current Plan
- Neon (Postgres): structured data (courses/modules/lessons metadata, blocks jsonb, enrolments, progress).
- Sanity (headless): optional rich content/assets; media references embedded in blocks.

## Considerations
- Keep authoritative content in one place per field; avoid duplication.
- Media: store URLs/refs in blocks; sanitize on render.
- Localization: decide per-field localization vs. translation references; document fallbacks.

## Future
- Evaluate asset/CDN needs; caching strategies for content delivery.
- Revisit storage split as interactive content and marketplace grow.***
