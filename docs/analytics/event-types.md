# Event Types (Initial)

Initial event schema definitions for early phases. All events include locale/tenant metadata and are consent-aware; no PII.

## Common Fields
- `name` (string)
- `timestamp` (ISO)
- `tenantId` (string)
- `userId` (string, when allowed)
- `locale` (string)
- `context` (object; type-specific)

## Required/Optional
- Required: `name`, `timestamp`, `tenantId`, `locale`
- Optional: `userId` (when permitted), `context` fields per event type

## Validation Rules (initial)
| Event                       | Required Context                            | Optional Context                      | Constraints/Enums                          |
|-----------------------------|---------------------------------------------|---------------------------------------|--------------------------------------------|
| `auth.login`                | `method`                                    | -                                     | `method` enum: `password` \| `sso`         |
| `auth.signup`               | `method`                                    | -                                     | same as above                              |
| `content.view`              | `courseId`                                  | `moduleId`, `lessonId`, `blockTypes`  | `blockTypes` length <= 20                  |
| `content.create/update/publish` | relevant IDs                            | -                                     | IDs non-empty strings                      |
| `content.block.interaction` | `lessonId`, `blockId`, `blockType`, `action`| -                                     | `blockType` enum: `text` \| `math` \| `chemistry` \| `code_sandbox` \| `media` \| `custom`; `action` enum: `view` \| `run` \| `expand` |
| `enrolment.enrol/unenrol`   | `courseId`                                  | -                                     | -                                          |
| `progress.update`           | `courseId`, `status`, `percent`             | `moduleId`, `lessonId`                | `status` enum: `not_started` \| `in_progress` \| `completed`; `percent` 0-100 |
| `toolkit.block.run`         | `blockId`, `blockType`, `action`            | -                                     | `action` enum: `run` \| `play`; blockType above |
| `community.thread.create/post.create` | `forumId`                         | `threadId` (for post)                 | -                                          |
| `marketplace.*` (later)     | `listingId` (view/purchase)                 | `transactionId` (refund)              | Only emit when marketplace enabled         |

## Limits
- Batch size: align with Events API (initial suggestion: <= 500 events or 256KB payload).
- String lengths: names <= 100 chars; IDs <= 128 chars; avoid binary data.
- Drop/skip events without consent; log counts, not payloads.

## Auth Events
- `auth.login` — context: `{ method }`
- `auth.signup` — context: `{ method }`
- `auth.logout`
- `auth.reset.request`
- `auth.reset.confirm`

## Content Events
- `content.view` — context: `{ courseId, moduleId?, lessonId?, blockTypes? }`
- `content.create` / `content.update` / `content.publish` — context: ids
- `content.block.interaction` — context: `{ lessonId, blockId, blockType, action }`

## Enrolment/Progress
- `enrolment.enrol` — context: `{ courseId }`
- `enrolment.unenrol` — context: `{ courseId }`
- `progress.update` — context: `{ courseId, moduleId?, lessonId?, status, percent }`

## Toolkit/Interactive
- `toolkit.block.run` — context: `{ blockId, blockType, action (run/play) }`
  - `blockType` enum: `math` | `chemistry` | `code_sandbox` | `media` | `custom`

## Community
- `community.thread.create` / `community.post.create` / `community.thread.view` — context: `{ forumId, threadId? }`

## Marketplace (later)
- `marketplace.listing.view` / `marketplace.purchase` / `marketplace.refund`

## Notes
- Ensure consent toggles are honored; drop/skip events if not allowed.
- Enforce validation and redaction before emitting.
- Keep payload sizes reasonable; batch where appropriate.***
## Sample Payloads

### auth.login
```json
{ "name": "auth.login", "timestamp": "2025-01-01T00:00:00Z", "tenantId": "tenant-1", "userId": "user-1", "locale": "en-US", "context": { "method": "password" } }
```

### content.view
```json
{ "name": "content.view", "timestamp": "2025-01-01T00:00:00Z", "tenantId": "tenant-1", "userId": "user-1", "locale": "en-US", "context": { "courseId": "course-1", "lessonId": "lesson-9", "blockTypes": ["text", "math"] } }
```

### enrolment.enrol
```json
{ "name": "enrolment.enrol", "timestamp": "2025-01-01T00:00:00Z", "tenantId": "tenant-1", "userId": "user-1", "locale": "en-US", "context": { "courseId": "course-1" } }
```

### progress.update
```json
{ "name": "progress.update", "timestamp": "2025-01-01T00:00:00Z", "tenantId": "tenant-1", "userId": "user-1", "locale": "en-US", "context": { "courseId": "course-1", "lessonId": "lesson-9", "status": "in_progress", "percent": 60 } }
```

### toolkit.block.run
```json
{ "name": "toolkit.block.run", "timestamp": "2025-01-01T00:00:00Z", "tenantId": "tenant-1", "userId": "user-1", "locale": "en-US", "context": { "blockId": "b2", "blockType": "code_sandbox", "action": "run" } }
```
