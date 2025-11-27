# Progress API

Defines endpoints for tracking and reading learner progress.

## Principles
- Consent-aware analytics; no PII in events.
- Respect permissions/enrolment; students only see their own progress.
- Locale/tenant metadata included where applicable.

## Resources
- Progress record: `{ progressId, userId, courseId, moduleId?, lessonId?, status, percentComplete, lastAccessedAt, timestamps }`
- Status examples: `not_started`, `in_progress`, `completed`.

## Endpoints

### GET /api/progress
- Purpose: list progress records for current user (filters: courseId/moduleId/lessonId).
- Auth: required.
- Pagination: `limit` default 20, max 100; `cursor` for continuation; sort default `-updatedAt`.
- Filters: `courseId`, `moduleId`, `lessonId`, `status`.
- Response: array of progress records plus `nextCursor`.

### PATCH /api/progress
- Purpose: update progress for a lesson/module/course.
- Request: `{ courseId, moduleId?, lessonId?, status?, percentComplete? }`
- Example: `{ "courseId": "course-1", "lessonId": "lesson-9", "status": "in_progress", "percentComplete": 50 }`
- Auth: required; enrolment enforced.
- Response: updated progress record.
- Response example:
```json
{
  "progressId": "prog-1",
  "userId": "user-1",
  "courseId": "course-1",
  "lessonId": "lesson-9",
  "status": "in_progress",
  "percentComplete": 50
}
```

### GET /api/progress/summary
- Purpose: summary for dashboard/course cards.
- Auth: required.
- Pagination: `limit` default 20, max 100; `cursor`.
- Response: aggregated progress per course.

## Validation
- Require courseId; validate moduleId/lessonId belong to course.
- Clamp percentComplete 0–100; status transitions logical.
- Enforce enrolment; prevent updates to content user cannot access.
- Pagination/filtering: list endpoints should paginate; default limits applied.

### Field Validation
| Field             | Required | Type    | Constraints                                      |
|-------------------|----------|---------|--------------------------------------------------|
| courseId          | Yes      | string  | Non-empty; must exist                            |
| moduleId          | No       | string  | Must belong to course if provided                |
| lessonId          | No       | string  | Must belong to module/course if provided         |
| status            | No       | enum    | `not_started` \| `in_progress` \| `completed`    |
| percentComplete   | No       | number  | 0–100; integer preferred                         |
| limit             | No       | number  | 1–100 (default 20)                               |
| cursor            | No       | string  | Token from previous page                         |

## Errors
- Structured errors `{ code, message, details? }`; 400 validation, 401/403 auth/permission, 404 if course/module/lesson not found.
- Example 400: `{ "code": "invalid_request", "message": "percentComplete must be between 0 and 100" }`
- Example 403: `{ "code": "forbidden", "message": "Enrolment required" }`

### Error Catalog
| HTTP | Code                   | Message (example)                          | When                                      |
|------|------------------------|--------------------------------------------|-------------------------------------------|
| 400  | `invalid_request`      | "percentComplete must be between 0 and 100"| Payload/validation failure                |
| 400  | `invalid_filter`       | "moduleId must belong to courseId"         | Filter mismatch                           |
| 401  | `unauthorized`         | "Authentication required"                  | Missing/invalid auth                      |
| 403  | `forbidden`            | "Enrolment required"                       | User not enrolled                         |
| 404  | `not_found`            | "Lesson not found"                         | Unknown course/module/lesson              |
| 429  | `rate_limited`         | "Too many requests"                        | If rate limiting enabled                  |

## Analytics
- Emit events on progress updates (locale/tenant metadata), respecting consent toggles.

## Future
- Advanced logic (weighted modules, assessments), instructor/admin visibility, dashboards.***
