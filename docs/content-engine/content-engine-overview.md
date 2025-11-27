# Content Engine Overview

## Purpose
Define how courses/modules/lessons and blocks are authored, stored, and rendered, including interactive STEM/CS blocks.

## Storage
- Structured data in Neon (Postgres) for courses/modules/lessons, enrolments, progress.
- Blocks stored as jsonb in lessons (with interactive configs); media assets/structured content via Sanity where applicable.
- Locale-aware fields or translation references; fallbacks documented.

## Block Model
- Each lesson has ordered blocks: `{ blockId, type, content/config, locale? }`
- Core types: text, media/YouTube, math/LaTeX, chemistry (elements/structures), physics/biology visuals (placeholder), code sandbox, custom placeholders.
- Blocks must be validated server-side; sanitized for embeds; sandboxed for code.
- Rendering libs (preferred; decide in implementation): KaTeX/MathJax for math, ChemDoodle/3D Mol for chemistry; code sandbox uses isolated runtime with no network.

## Authoring (CMS)
- Editor supports creating/editing lessons with block picker, ordering, draft/publish.
- Interactive block configuration UIs (form controls) for math/chem/code/media.
- Locale selection per lesson/blocks; i18n externalised for UI copy.

## Playback (LMS)
- Render blocks in order; handle loading/error/empty states.
- Interactive blocks run in safe sandboxes; media embeds sanitized; math/chem rendered with chosen libs.
- Respect publish status and permissions/enrolment.

## Toolkit & Library
- Featured interactive modules showcased in library alongside courses.
- Toolkit blocks reused across courses; discoverable via library cards.
- Media/attachments: enforce allowlists (png/jpeg/pdf, approved video providers), size caps (<=10MB uploads), served via approved CDN/storage; sanitize embeds.

## Events & Progress
- Emit events for content views/interaction; update progress; include locale/tenant metadata; consent-aware.

## Future
- Versioning/history, assessments, richer simulations, collaborative editing.***
