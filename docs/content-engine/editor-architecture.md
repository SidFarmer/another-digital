# Editor Architecture (CMS)

## Purpose
Describe the CMS editor structure for creating/editing lessons with block-based content, including interactive blocks.

## Structure
- Built on shared UI kit/layout; embedded in CMS app inside unified shell.
- Block-based editor with:
  - block picker (text, media, math, chem, physics/bio visuals, code sandbox, custom placeholder)
  - ordering/reordering
  - draft/publish controls
  - locale selector
- State management: fetch/save lesson data via Content API; optimistic updates optional.

## UX States
- Loading, error, empty states.
- Validation errors per block and per lesson.
- Publish/draft feedback.

## i18n/a11y
- Externalise all UI strings; support locale selection per lesson.
- Accessible controls: keyboard/focusable elements, labels/aria for form fields.

## Integration
- Saves via Content API (draft/publish).
- Enforces permissions/enrolment rules for authoring.
- Emits events for create/edit/publish (consent-aware).

## Future
- Version history, collaboration, richer block configs, plugin-provided blocks.***
