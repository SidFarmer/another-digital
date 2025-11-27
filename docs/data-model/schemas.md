# Schemas (High-Level)

This file outlines core schemas for early phases. Details will be reflected in tables/ERD and migrations.

## Users
- `id` (uuid)
- `email` (unique)
- `passwordHash`
- `name`
- `locale`
- `createdAt` / `updatedAt`

## Tenants (placeholder early; expanded later)
- `id` (uuid)
- `name`
- `defaultLocale`
- `createdAt` / `updatedAt`

## Sessions/Tokens
- `id` (uuid)
- `userId`
- `expiresAt`
- `createdAt`

## Courses
- `id` (uuid)
- `title`
- `description`
- `status` (draft|published)
- `locale`
- `tenantId?` (later phases)
- `createdAt` / `updatedAt`
- Suggested indexes: (tenantId, status); full-text on title/description

## Modules
- `id` (uuid)
- `courseId`
- `title`
- `order`
- `createdAt` / `updatedAt`

## Lessons
- `id` (uuid)
- `moduleId`
- `title`
- `status` (draft|published)
- `order`
- `locale`
- `blocks` (jsonb)
- `createdAt` / `updatedAt`
- Constraints: unique order per module; index on (moduleId, status)

## Blocks (within lessons)
- `id` (uuid)
- `type` (text, media, math, chem, code, etc.)
- `content/config` (jsonb)
- `locale?`

## Enrolments
- `id` (uuid)
- `userId`
- `courseId`
- `status` (active|unenrolled)
- `createdAt` / `updatedAt`
- Indexes: (userId, status), (courseId, status)

## Progress
- `id` (uuid)
- `userId`
- `courseId`
- `moduleId?`
- `lessonId?`
- `status` (not_started|in_progress|completed)
- `percentComplete`
- `lastAccessedAt`
- `createdAt` / `updatedAt`
- Indexes: (userId, courseId, lessonId); constraint percent 0–100

## Community (Initial)
- Forum: `id`, `title`, `description`, `createdAt` / `updatedAt`
- Thread: `id`, `forumId`, `title`, `createdBy`, `createdAt` / `updatedAt`
- Post: `id`, `threadId`, `body`, `createdBy`, `createdAt` / `updatedAt`

## Profiles
- `userId`
- `displayName`
- `bio`
- `socialLinks` (jsonb)
- `createdAt` / `updatedAt`

## Plugins (Registry)
- `id` (uuid)
- `name`
- `version`
- `scopes` (jsonb)
- `manifestUrl`/config
- `activated` (bool)
- `tenantId?` (when tenant-bound)
- `createdAt` / `updatedAt`

## Marketplace (Later)
- Listing: `id`, `type` (course/plugin), `price`, `currency`, `ownerTenantId`, `createdAt` / `updatedAt`
- Transaction: `id`, `listingId`, `buyerId/tenantId`, `amount`, `currency`, `status`, `createdAt`
- Payout: `id`, `recipientTenantId`, `amount`, `status`, `createdAt`

## Analytics Events (Warehouse later)
- Event: `id`, `name`, `timestamp`, `tenantId`, `userId?`, `locale`, `context` (jsonb)
