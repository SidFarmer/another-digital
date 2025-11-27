# Content API

Defines course/module/lesson/block endpoints (including interactive blocks) for CMS/LMS.

## Principles
- Doc-first; validate all payloads.
- Locale-aware: support localized fields or translation refs.
- Permissions: authors/tenants control write; students read.
- Externalise UI strings on client; API returns data only.

## Resources
- Course: `courseId`, title, description, locale, status (draft/published), metadata.
- Module: `moduleId`, title, order, parent `courseId`.
- Lesson: `lessonId`, title, order, parent `moduleId`, status, locale, blocks.
- Block: `blockId`, type, content/config (including interactive types).
- Enrolment: `enrolmentId`, `userId`, `courseId`, status.

## Endpoints (Initial)

### Courses
- GET /api/courses: list (filters: status, locale); pagination: `limit` default 20 (max 50), `cursor`; sort default `-updatedAt`; filters: `status` (draft/published), `locale`.
- POST /api/courses: create course (author/tenant).
- GET /api/courses/:courseId: fetch course.
- PATCH /api/courses/:courseId: update metadata/status.
- DELETE /api/courses/:courseId: (optional) soft-delete/archive.
- Example request (create):
```json
{ "title": "Intro to Physics", "description": "Basics", "status": "draft", "locale": "en-US" }
```
- Response example:
```json
{ "courseId": "course-1", "title": "Intro to Physics", "status": "draft", "locale": "en-US" }
```

### Modules
- POST /api/courses/:courseId/modules: create module.
- PATCH /api/modules/:moduleId: update.
- DELETE /api/modules/:moduleId: delete.

### Lessons
- POST /api/modules/:moduleId/lessons: create lesson (draft by default).
- GET /api/lessons/:lessonId: fetch lesson (respect publish status/permissions).
- PATCH /api/lessons/:lessonId: update metadata/status/blocks.
- DELETE /api/lessons/:lessonId: delete.
- POST /api/lessons/:lessonId/publish: publish lesson.
- POST /api/lessons/:lessonId/unpublish: revert to draft.
- Example lesson payload:
```json
{
  "title": "Vectors",
  "status": "draft",
  "locale": "en-US",
  "blocks": [
    { "blockId": "b1", "type": "text", "content": "Intro to vectors" },
    { "blockId": "b2", "type": "math", "content": { "expression": "\\vec{v} = \\langle 1, 2, 3 \\rangle" } }
  ]
}
```
- Response example:
```json
{
  "lessonId": "lesson-9",
  "moduleId": "module-3",
  "title": "Vectors",
  "status": "draft",
  "locale": "en-US",
  "blocks": [
    { "blockId": "b1", "type": "text", "content": "Intro to vectors" },
    { "blockId": "b2", "type": "math", "content": { "expression": "\\vec{v} = \\langle 1, 2, 3 \\rangle" } }
  ]
}
```

### Blocks (within lesson payload)
- Blocks are part of lesson payloads: `[ { blockId, type, content/config, locale? } ]`
- Supported types (initial): text, media/YouTube embed, math/LaTeX, chemistry (elements/structures), physics/biology visuals (placeholder), code sandbox (sandbox config), custom placeholders for future blocks.

### Enrolment
- POST /api/courses/:courseId/enrol: enrol current user.
- POST /api/courses/:courseId/unenrol: unenrol current user.
- GET /api/enrolments: list user enrolments (for dashboard cards). Pagination: `limit` default 20 (max 100), `cursor`; sort default `-createdAt`.
- Example enrol: `POST /api/courses/course-1/enrol` → `{ "success": true, "enrolmentId": "enr-1" }`

## Validation
- Enforce required fields; validate block types/configs; sanitize embedded content.
- Locale fields optional but recommended; default/fallback documented in content localization approach.
- Status transitions: draft → publish; unpublish reverts to draft; prevent edits to published content if policy requires.
- Pagination: list endpoints should paginate; include `limit`/`cursor`; default limits applied.

### Field Validation (examples)
| Field           | Required | Type    | Constraints                                              |
|-----------------|----------|---------|----------------------------------------------------------|
| title           | Yes      | string  | 1–200 chars                                              |
| description     | No       | string  | 0–2000 chars                                             |
| status          | Yes      | enum    | `draft` \| `published`                                   |
| locale          | No       | string  | BCP 47; defaults to tenant/site default                  |
| moduleId        | Yes/No   | string  | Required for module/lesson creation; must belong to course|
| lessonId        | Yes/No   | string  | Required for lesson ops; must belong to module           |
| block.type      | Yes      | enum    | `text` \| `media` \| `math` \| `chemistry` \| `code_sandbox` \| `custom` |
| block.content   | Yes      | object  | Validated per type; sanitized; size cap per type         |
| block.media.type| Conditional | string | Allowlist: `image/png`, `image/jpeg`, `application/pdf`, `video/embed` |
| block.media.size| Conditional | number | Max 10MB for uploads; embeds must be from approved providers |
| enrolmentId     | Yes (response) | string | Server-generated                                    |
| limit           | No       | number  | Courses default 20 (max 50); enrolments default 20 (max 100) |
| cursor          | No       | string  | Token from previous page                                 |

## Errors
- Structured errors `{ code, message, details? }`; 400 validation, 401/403 auth/permissions, 404 not found.
- Do not leak unpublished content to unauthorized users.
- Example 400: `{ "code": "invalid_request", "message": "Unsupported block type", "details": { "type": "unknown" } }`
- Example 403: `{ "code": "forbidden", "message": "Authoring permissions required" }`

### Error Catalog
| HTTP | Code                   | Message (example)                           | When                                              |
|------|------------------------|---------------------------------------------|---------------------------------------------------|
| 400  | `invalid_request`      | "Unsupported block type"                    | Payload/validation failure                        |
| 400  | `invalid_locale`       | "Locale must be a valid BCP 47 tag"         | Bad locale                                        |
| 400  | `invalid_status`       | "Status must be draft or published"         | Wrong status                                      |
| 401  | `unauthorized`         | "Authentication required"                   | Missing/invalid auth                              |
| 403  | `forbidden`            | "Authoring permissions required"            | Lacking permissions                               |
| 403  | `enrolment_required`   | "You must enrol to view this lesson"        | Student access to gated content                   |
| 404  | `not_found`            | "Course not found"                          | Unknown course/module/lesson                      |
| 409  | `conflict`             | "Cannot delete published lesson"            | Conflict with status/business rule                |
| 429  | `rate_limited`         | "Too many requests"                         | If rate limiting enabled                          |
| 400  | `invalid_media`        | "Media type not allowed"                    | Disallowed attachment/embed                       |

## Analytics
- Emit events for create/update/publish/view and interactive block usage with locale/tenant metadata (consent-aware).

## Future
- Version history, assessments, cloning, richer block catalog.***
