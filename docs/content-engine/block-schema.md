# Block Schema (Initial)

Blocks are elements within lessons, stored as jsonb in `blocks`.

## Common Fields
- `blockId`: uuid
- `type`: string (see types below)
- `locale` (optional): string
- `content` / `config`: type-specific object

## Types (Initial)

### text
- `content`: string (markdown/plain) — sanitized on render.
- Limits: reasonable length; sanitize markdown to prevent XSS.

### media
- `url`: string
- `caption`: string
- `provider`: `youtube` | `video` | `image`
- Safety: sanitize URLs; whitelist providers.
- Limits: size constraints for uploads/embeds; enforce HTTPS.
- Allowlist: `image/png`, `image/jpeg`, `application/pdf`; max 10MB; embeds only from approved providers (e.g., YouTube/Vimeo).

### math
- `expression`: string (LaTeX/TeX)
- Render with chosen math library; validate input.
- Preferred renderer: KaTeX/MathJax (decide in implementation).

### chemistry
- `formula`: string
- `structure`: optional string (e.g., SMILES) for visuals
- Safety: validate format; render with chosen chem lib.
- Preferred renderer: e.g., ChemDoodle/3D Mol (decide in implementation).

### physics_bio_visual
- `description`: string
- `data`: json for visualization (placeholder)
- Validate data shape; limit payload size.

### code_sandbox
- `language`: string (e.g., `javascript`)
- `code`: string
- `sandboxConfig`: { `readOnly`?, `timeoutMs`?, `deps`? }
- Safety: sandboxed execution; no network by default.
- Limits: code length; timeout and memory caps; whitelist deps.

### custom_placeholder
- `label`: string
- `payload`: object (for future/custom blocks)

## Validation
- Enforce required fields per type.
- Sanitize user-provided strings; block unsafe embeds.
- Apply locale handling when specified.***
