# Development Outline

Roadmap from initial repository setup to a fully functional, enterprise-grade SaaS LMS+. Each phase lists Purpose, Scope, Deliverables, Dependencies, Entry Criteria, Exit Criteria. Skeletons must include minimal UI where applicable and document the path to full build/integration. The product will run as a continuous public beta during 0.x phases; every phase should be deployable and incrementally improve stability, UX, and feature depth.
Design/usability are first-class: each phase reserves time to design, build, and refine UI components and flows, not just backend functionality. Cross-cutting: everything must be easy to extend and reuse—user-facing text goes through shared i18n, components/layouts use the shared UI kit/layout packages, and APIs/schemas follow patterns that make adding new surfaces straightforward (documented extension steps included). Scale mindset: design for millions of users, with instrumentation and owner/tenant analytics needs captured early.
Continuity rule: once a feature is introduced in any phase, it must be carried forward and refined in later phases so UX, i18n, accessibility, compliance, integration, and observability remain consistent across the platform.

Carry-forward planning: each phase must include a task to integrate and polish features from prior phases (UI, i18n, a11y, compliance, telemetry), ensuring nothing is left unfinished as new capabilities are added. Prompts should explicitly call out this integration step.

## Phase 0.1 — Foundations (Single-Tenant, Doc-First)
- Purpose: Establish repository, standards, tooling, and CI to enforce doc-first development.
- Scope: Monorepo scaffolding, prompt archive process, lint/test tooling, environment/config loading, security/compliance standards, minimal CI.
- Deliverables:
  - Monorepo layout per `docs/architecture/monorepo-structure.md`
  - Standards populated: codex, developer, documentation, code-style, naming, testing, task-format, git-workflow, environment, filesystem guardrails, security, compliance
  - Tooling doc with required versions/commands and stack decisions (Node.js, Express backend, pnpm, Turborepo, Husky, Neon DB, Sanity headless content, hosting targets like Vercel/Render, frontend/backend separation guidance)
  - CI skeleton: lint + tests + typecheck (even if placeholders)
  - Prompt archive structure and README; CHANGELOG created and usage documented
  - Error handling/logging baseline documented
- Dependencies: None
- Entry Criteria: Repo accessible; docs structure in place
- Exit Criteria: CI green on scaffold; standards finalized; prompts/changelog process documented and usable

### Phase 0.1 Sub-Phases (Prompt Checklist)
0.1.1 — Docs & Standards Completion  
   - 0.1.1-A: Populate remaining standards (developer, documentation, code-style, naming, testing, task-format, git-workflow).  
   - 0.1.1-B: Finalize environment, filesystem guardrails, security, compliance, doc-first standards.   
   - 0.1.1-C: Sync `docs/README.md` and `docs/index.md` with the standards hierarchy.
   - 0.1.1-D (optional): Add repo hygiene docs (license/CONTRIBUTING/branch strategy) if open-sourcing early.

0.1.2 — Monorepo Scaffolding  
   - 0.1.2-A: Validate `/apps`, `/packages`, `/docs`, `/prompts` structure matches `monorepo-structure.md`; note/fix deviations.  
   - 0.1.2-B: Add baseline package/workspace config files (no code yet) per tooling decisions.

0.1.3 — Tooling & Commands  
   - 0.1.3-A: Define required tool versions in `docs/architecture/tooling.md` (node, pnpm, turborepo, lint/test tooling).  
   - 0.1.3-B: Document standard commands for lint, test, typecheck, format (even if stubbed).
   - 0.1.3-C: Document stack choices and separation: backend on Node/Express with Neon; content via Sanity; Turborepo/pnpm for workspace; Husky for hooks; frontend/backends deployed separately (e.g., Vercel for frontend, Render or equivalent for backend); clarify boundaries between frontend/backend packages/apps.
   - 0.1.3-D: Populate `docs/architecture/tooling.md` with the above decisions and commands references.
   - 0.1.3-E (optional): Specify pre-commit hooks/tooling expectations (format/lint) if enforcing locally.

0.1.4 — Prompt Archive & Changelog Process  
   - 0.1.4-A: Ensure `prompts/prompt-archive` structure and README describe intake/archiving flow.  
   - 0.1.4-B: Confirm `CHANGELOG.md` usage policy and location are documented.
   - 0.1.4-C (optional): Reiterate task protocol/prompt archiving must run before any code change in each prompt template.

0.1.5 — CI Skeleton  
   - 0.1.5-A: Add minimal CI config to run lint/test/typecheck placeholders.  
   - 0.1.5-B: Document CI expectations in `docs/workflows/ci-cd.md` (trigger, required checks).
   - 0.1.5-C: Note how migrations/versioning will be tracked in CI once introduced.

0.1.6 — Error Handling & Logging Baseline  
   - 0.1.6-A: Document error/logging standards (levels, redaction, no PII) in standards and/or backend docs.  
   - 0.1.6-B: Note compliance tie-ins (masking, retention).

0.1.7 — Environment & Config Loading  
   - 0.1.7-A: Document env var standards and config loading approach in `docs/standards/environment-standard.md` and `docs/architecture/tooling.md`.  
   - 0.1.7-B: Provide sample `.env.example` spec in docs (no secrets).

0.1.8 — UI/UX Integration & Wiring  
   - 0.1.8-A: Confirm shell placeholders/navigation stubs align with planned apps; ensure UI kit/layout references are documented.  
   - 0.1.8-B: Verify i18n/a11y guidance is applied in starter components/docs; note any cross-platform wiring needs.

0.1.9 — Testing & Fixes  
   - 0.1.9-A: Run owner + Codex verification of 0.1 outputs (docs/structure/tooling/CI stubs); log issues.  
   - 0.1.9-B: Apply fixes/tweaks based on findings; update docs/changelog/prompt archive.
   - 0.1.9-C: Capture initial test plan/fixtures approach (even if stubbed) for future phases.

## Phase 0.2 — Identity, Auth, Localisation & Accessibility Foundations
- Purpose: Ship basic authentication, user/tenant models (single-tenant), and platform-wide i18n/a11y foundations.
- Scope: User model, tenant model (single-tenant), session/token handling, login/signup/reset flows; i18n provider, locale switcher; WCAG 2.1 AA baseline baked into UI kit/layout.
- Deliverables:
  - Auth API spec and minimal implementation
  - Data model docs: users, tenants, sessions
  - Frontend auth screens (minimal UI)
  - Shared i18n package location/patterns; per-app message bundle strategy; default/fallback locales
  - Accessibility guidelines in UI kit; linting/checks if available
  - Compliance hooks: consent notice placeholder, data handling notes
- Dependencies: Phase 0.1
- Entry Criteria: Standards/tooling ready; doc-first flow in use
- Exit Criteria: Auth happy path works; locale switcher present; core UI components meet baseline a11y; docs updated (architecture, data model, API, standards as needed)
- Skeleton → Full: Skeleton auth flows and i18n/a11y infrastructure here; full auth hardening (SSO/SAML, MFA, advanced policies) comes later in 0.10/1.0 if in scope.

### Phase 0.2 Sub-Phases (Prompt Checklist)
0.2.1 — Docs & Specs  
   - 0.2.1-A: Document auth flows (login/signup/reset), session/token lifecycle, and single-tenant user/tenant relationships.  
   - 0.2.1-B: Update data model docs/ERD for users, tenants, sessions, locale preferences, consent flags.  
   - 0.2.1-C: Define auth API spec (routes, payloads, validation, error states).  
   - 0.2.1-D: Document i18n strategy (supported locales, defaults, fallback, message catalog structure) and UX notes for auth/settings screens.  
   - 0.2.1-E: Document accessibility baseline (WCAG 2.1 AA requirements for forms, focus, keyboard, ARIA).

0.2.2 — Schema/Data Layer  
   - 0.2.2-A: Specify schemas for users, tenants (single-tenant placeholder), sessions/tokens, locale preference fields, consent timestamps.  
   - 0.2.2-B: Outline migrations in docs (no code yet) and ensure compliance fields are captured.
   - 0.2.2-C: Define migration/versioning discipline for auth-related tables once code begins.

0.2.3 — Auth API & Domain Logic  
   - 0.2.3-A: Detail minimal endpoints: login, signup, reset password flow, logout, session introspection.  
   - 0.2.3-B: Define token/session handling approach (e.g., HTTP-only cookies/JWT) and security considerations.  
   - 0.2.3-C: Note future hardening (MFA/SSO) for later phases; keep scope minimal now.

0.2.4 — Frontend Auth & Settings UI (Skeleton)  
   - 0.2.4-A: Design/login/signup/reset screens (wireframes/UX notes) with error/success states.  
   - 0.2.4-B: Settings/account page skeleton (profile basics, locale selector) aligned with shell patterns.  
   - 0.2.4-C: Ensure i18n hooks are ready for these screens; mark required strings/namespaces.

0.2.5 — I18n Infrastructure  
   - 0.2.5-A: Define shared i18n package structure, per-app bundles, locale detection, and fallback logic.  
   - 0.2.5-B: Document formatting utilities (dates/numbers) and language switcher behavior in shell and settings.
   - 0.2.5-C: Establish guidelines for adding new product areas so all user-facing strings are externalised by default and reuse shared i18n patterns.

0.2.6 — Accessibility Baseline Enforcement  
   - 0.2.6-A: Capture form/component a11y requirements (labels, aria, focus management, keyboard nav).  
   - 0.2.6-B: Add a11y checks/guidelines to UI kit docs; note any lint/testing hooks planned.

0.2.7 — Compliance Hooks  
   - 0.2.7-A: Document consent/notice placeholders for auth flows; data minimisation and log redaction reminders.  
   - 0.2.7-B: Note DSR considerations for account data (export/delete) for later phases.

0.2.8 — UI/UX Integration & Wiring  
   - 0.2.8-A: Wire auth screens/settings into shell nav; ensure locale switcher appears in shell and settings.  
   - 0.2.8-B: Verify all auth/settings UI strings are externalised; apply a11y patterns; ensure consistent theming/layout.  
   - 0.2.8-C: Plan cross-surface redirects and error/success messaging UX.

0.2.9 — Auth/I18n/A11y Skeleton Implementation (Catch-Up)  
   - 0.2.9-A: Deliver auth frontend skeleton (login/signup/reset/settings) using shared layout/ui/i18n with locale switcher and consent/analytics toggle (stubs acceptable).  
   - 0.2.9-B: Scaffold shared i18n package (provider/hooks, per-app bundles) and add sample namespaces for auth/settings; add eslint-plugin-jsx-a11y to CI when ready.  
   - 0.2.9-C: Wire shell nav stubs for auth/settings; ensure accessibility patterns are applied; keep CI green with stubs.

0.2.10 — Integration & Hardening (Skeleton)  
   - 0.2.10-A: Plan wiring of auth UI to auth API, token storage, error handling, and redirect flows.  
   - 0.2.10-B: Define telemetry events for auth (login/signup/reset) with locale/tenant metadata.  
   - 0.2.10-C: Update docs/changelog/prompt archive after completing implementation prompts.

0.2.11 — Testing & Fixes  
   - 0.2.11-A: Run owner + Codex verification of auth/i18n/a11y flows and docs; log issues.  
   - 0.2.11-B: Apply fixes/tweaks; ensure all strings are externalised; update docs/changelog/prompt archive.
   - 0.2.11-C: Capture test plan/fixtures (even stubbed) for auth/i18n/a11y flows.

### 0.1 / 0.2 Consistency Checklist
- Standards complete and reflected in `docs/README.md` and `docs/index.md`: developer, documentation, code-style, naming, testing, task-format, git-workflow, environment, filesystem guardrails, security, compliance, doc-first (plus optional license/CONTRIBUTING/branch strategy).
- Monorepo layout matches `monorepo-structure.md`; baseline workspace/package configs present.
- Tooling/commands defined: versions (Node, pnpm, Turborepo, lint/test tools), standard commands, optional pre-commit hooks, stack separation (Node/Express backend, Neon, Sanity, Husky, Vercel/Render).
- Prompt archive/task protocol enforced before code; changelog usage documented.
- CI skeleton runs lint/test/typecheck; CI expectations documented.
- Error/logging baseline: levels, redaction/no PII, compliance tie-ins.
- Environment/config: standards documented, `.env.example` spec (no secrets).
- Auth/i18n/a11y docs and specs: flows, API, schemas (users/tenants/sessions/locale/consent), token lifecycle, i18n strategy, accessibility baseline.
- Frontend auth/settings UI planned: login/signup/reset screens, settings/locale selector; all strings externalised via shared i18n.
- Compliance hooks: consent/notice placeholders, DSR notes for account data.
- Telemetry/events defined for auth with locale/tenant metadata; docs/changelog/prompt archive updated after implementation.

**Implementation rule for phases 0.3+ (forward):** every sub-phase includes both documentation/spec updates **and** skeleton implementation (UI/API/schema/migrations/config) unless explicitly marked doc-only. Docs lead, but deliverables must include runnable stubs/skeletons per scope.***

## Phase 0.3 — Content & Course Skeleton (CMS + LMS)
- Purpose: Define course/module/lesson structure, internal content storage API, and minimal CMS/LMS surfaces.
- Scope: Course/lesson schemas, content storage choice, read/write APIs, CMS editor shell (skeleton), LMS lesson player shell, locale-aware content handling, initial UX patterns for authoring/consumption.
- Deliverables:
  - Content schema docs (course, module, lesson, blocks); ERD/tables updated
  - Content API spec (CRUD, publish/draft)
  - Minimal CMS UI for creating/editing lessons (skeleton)
  - Minimal LMS player for rendering lessons (skeleton)
  - Student dashboard starter (basic course list/progress slots wired to content)
  - Content localisation approach documented (per-locale fields or translation references)
  - UX notes for editor and player interactions
- Dependencies: Phase 0.2
- Entry Criteria: Auth/i18n/a11y foundations in place
- Exit Criteria: Can create and view a basic lesson; docs in sync; changelog updated
- Skeleton → Full: Skeleton authoring/player here; richer blocks, assessments, versioning, and full CMS workflows later (build out in subsequent phases).

### Phase 0.3 Sub-Phases (Prompt Checklist)
0.3.1 — Docs & Specs (and initial stubs)  
   - 0.3.1-A: Document course/module/lesson structures, block model, and content lifecycle (draft/publish/version notes); create placeholder schemas/tables.  
   - 0.3.1-B: Define content storage approach (internal DB vs headless Sanity) and how Neon/Sanity split data; stub adapters/clients.  
   - 0.3.1-C: Specify Content API (CRUD, publish/unpublish, draft handling, validation, error states); scaffold routes/controllers stubs.  
   - 0.3.1-D: Capture UX notes for CMS editor and LMS player (flows, states, navigation), including student dashboard expectations; stub UI routes.  
   - 0.3.1-E: Document content localisation approach (per-locale fields vs translation references, fallbacks); prep locales in schemas/API.  
   - 0.3.1-F: Define initial interactive/embedded block types (math/chem/physics/biology/code sandbox/media) and their UX; stub block type registry.  
   - 0.3.1-G: Document enrolment flows (enrol/unenrol), dashboard course cards with progress, role-based visibility; stub enrolment endpoints/UI placeholders.

0.3.2 — Schema/Data Layer  
   - 0.3.2-A: Define schemas for courses, modules, lessons, blocks, content versions, localisation fields; include relationships and indexes; add migration stubs.  
   - 0.3.2-B: Outline and stub migrations for Neon; note Sanity schema shape if applicable.  
   - 0.3.2-C: Ensure compliance fields (timestamps, author, locale) are present; include in schema/migration stubs.
   - 0.3.2-D: Define migration/versioning discipline for content-related schemas; prep initial migration scripts.  
   - 0.3.2-E: Describe data shape for interactive blocks (math/chem/code sandbox/media) and external asset references; stub schema fragments.  
   - 0.3.2-F: Add enrolment schema (user↔course bindings, status, timestamps) to support dashboard course lists; migration stubs included.

0.3.3 — Content API & Domain Logic  
   - 0.3.3-A: Detail endpoints for content CRUD, publish/unpublish, draft retrieval, and block operations; create API route stubs.  
   - 0.3.3-B: Define validation rules for content/block payloads and error handling patterns; add validation placeholders.  
   - 0.3.3-C: Note future extensions (assessments, version history) for later phases.  
   - 0.3.3-D: Include handling notes for interactive blocks (sandbox config, media embed safety, math/chem payload validation); stub handlers.  
   - 0.3.3-E: Define enrol/unenrol APIs and list/enrolment retrieval for dashboard course cards; stub endpoints.

0.3.4 — CMS Editor UI (Skeleton)  
   - 0.3.4-A: Design and implement skeleton editor (create/edit lesson) with block picker placeholder and save/publish states.  
   - 0.3.4-B: Ensure UI uses shared UI kit/layout, externalised strings, and a11y patterns; wire to stub content API.  
   - 0.3.4-C: Plan and stub state management/data fetching for content forms.  
   - 0.3.4-D: Include placeholders/controls for interactive blocks (math/chem/code sandbox/media embed) with UX notes; stub components.

0.3.5 — LMS Player UI (Skeleton)  
   - 0.3.5-A: Render basic lesson content with block placeholders; handle loading/error/empty states; wire to stub Content API.  
   - 0.3.5-B: Support locale-aware content display; externalise strings; ensure a11y for reading/navigation.  
   - 0.3.5-C: Use shared UI kit/layout; add placeholders for interactive blocks with safe defaults.

0.3.6 — Content Localisation & Storage Integration  
   - 0.3.6-A: Document and stub how localized content is stored/retrieved (fields, fallbacks) and how Sanity vs Neon roles divide.  
   - 0.3.6-B: Define how editors select/manage locales; update UX; wire selector to stub data.  
   - 0.3.6-C: Note localisation handling for interactive blocks and media; stub translation toggles.

0.3.7 — Telemetry & Compliance  
   - 0.3.7-A: Define events for content create/edit/publish/view with locale/tenant metadata; add placeholder emitters.  
   - 0.3.7-B: Note sanitisation/logging rules for content payloads; avoid PII; include a11y checks.  
   - 0.3.7-C: Plan telemetry for interactive block usage with safety constraints; stub event hooks.

0.3.8 — UI/UX Integration & Wiring  
   - 0.3.8-A: Wire CMS/LMS nav into shell; ensure dashboard cards/links flow correctly (stub data acceptable).  
   - 0.3.8-B: Verify editor/player UI uses shared components, externalised strings, and a11y patterns; ensure locale handling is consistent.  
   - 0.3.8-C: Plan and stub error/success/loading states across CMS/LMS surfaces.

0.3.9 — Integration & Carry-Forward  
   - 0.3.9-A: Plan navigation wiring (CMS/LMS links, student dashboard cards) and redirect flows; stub routes.  
   - 0.3.9-B: Identify dependency touchpoints (auth/session, i18n) to ensure seamless UX; stub guards.  
   - 0.3.9-C: Update docs/changelog/prompt archive after implementation prompts.

0.3.10 — Testing & Fixes  
   - 0.3.10-A: Run owner + Codex verification of CMS/LMS skeleton, localisation, and dashboard links; log issues.  
   - 0.3.10-B: Apply fixes/polish; ensure externalised strings and a11y patterns; update docs/changelog/prompt archive.  
   - 0.3.10-C: Capture test plan/fixtures (even stubbed) for CMS/LMS editor/player flows.***

## Phase 0.4 — Unified Dashboard Shell + UI Kit
- Purpose: Deliver the persistent layout and core UI kit components used across apps.
- Scope: Layout package (header, sidebars, main area, footer), navigation scaffolding for LMS/CMS/Admin/Community/Dev Portal/Owner, design tokens, common components, responsive behavior, i18n/a11y baked in, UX polish passes.
- Deliverables:
  - Layout package docs and implementation
  - UI kit docs: tokens, buttons, forms, typography, spacing, states, accessibility notes
  - Locale switcher and settings surface in shell
  - Navigation stubs for LMS/CMS/Admin/Community/Dev Portal/Owner dashboards
  - Footer component with standard links (help/docs, privacy, terms, support/contact, language selector)
  - Account/settings pages (skeleton: profile, locale, basic preferences)
  - Billing page shell (tenant/owner view placeholder)
  - UX review and refinement pass for shell + core components (focus, states, responsiveness)
- Dependencies: Phases 0.2–0.3
- Entry Criteria: Content skeleton usable; i18n available
- Exit Criteria: Apps render inside shell; core components reusable; a11y and i18n patterns enforced
- Skeleton → Full: Shell and core components here; broader UI kit coverage, advanced states, theming, and polish continue in later phases as features expand.

### Phase 0.4 Sub-Phases (Prompt Checklist)
0.4.1 — Docs & Specs + Stubs  
   - 0.4.1-A: Document layout architecture (header, left/right sidebars, main area, footer) and nav structure for LMS/CMS/Admin/Community/Dev Portal/Owner; scaffold layout package.  
   - 0.4.1-B: Define UI kit scope for this phase (tokens, buttons, forms, typography, states, spacing) and a11y/i18n expectations; stub components.  
   - 0.4.1-C: Capture footer requirements (links: help/docs, privacy, terms, support/contact, language selector) and settings/billing shells; stub footer component.  
   - 0.4.1-D: UX notes/wireframes for shell navigation, account/settings, billing placeholders, locale switcher, and course cards with enrolment/progress; stub routes/placeholders.

0.4.2 — Tokens & Theme Baseline  
   - 0.4.2-A: Specify design tokens (colors, typography scale, spacing, radii, shadows) and theming approach; implement token definitions in UI kit.  
   - 0.4.2-B: Document how tokens are consumed across apps/packages; add sample usage in components; note future theming extensions.

0.4.3 — Layout Package  
   - 0.4.3-A: Define and implement shell component structure (header, sidebars, main, footer) and composition API.  
   - 0.4.3-B: Document and implement responsive behavior and slotting for contextual nav/right-rail modules (skeleton components).

0.4.4 — UI Kit Components (Initial)  
   - 0.4.4-A: List and implement core components for this phase (buttons, inputs, selects, forms, cards, nav items, alerts).  
   - 0.4.4-B: Apply a11y/i18n requirements per component (focus states, aria, externalised strings); add lint/tests stubs.

0.4.5 — Theming & Tenant Customisation Groundwork  
   - 0.4.5-A: Define how tenants can override theme tokens (brand colors, logo, typography) safely.  
   - 0.4.5-B: Document a future customisation dashboard concept (for tenant admins/whitelabel clients), including scope and guardrails (no breaking shared UX/accessibility).  
   - 0.4.5-C: Note data model/config needs for per-tenant themes; defer implementation to later phases but ensure hooks exist in UI kit/layout.

0.4.6 — Navigation & Shell Wiring  
   - 0.4.6-A: Implement navigation stubs for LMS/CMS/Admin/Community/Dev Portal/Owner; sidebar/header link patterns.  
   - 0.4.6-B: Implement locale switcher and account/settings entry in header/footer; add billing link placement.  
   - 0.4.6-C: Ensure all nav labels/strings are externalised; surface enrolled courses/progress cards in dashboard for students (stub data acceptable).

0.4.7 — Account/Settings & Billing Shells  
   - 0.4.7-A: Implement account/settings pages (profile basics, locale, preferences) using shared UI kit/layout; stub data.  
   - 0.4.7-B: Implement billing page shell (tenant/owner placeholder) and required links in nav/footer.

0.4.8 — Footer Implementation  
   - 0.4.8-A: Implement footer structure, link targets (help/docs, privacy, terms, support/contact), and language selector integration.  
   - 0.4.8-B: Ensure footer uses shared tokens/components and supports i18n/a11y; wire into shell.

0.4.9 — Telemetry & Compliance  
   - 0.4.9-A: Plan events for navigation/shell interactions (nav click, locale change, settings/billing entry) with locale/tenant metadata.  
   - 0.4.9-B: Note compliance/privacy for footer links and support/contact flows (no PII in logs).

0.4.10 — UI/UX Integration & Wiring  
   - 0.4.10-A: Wire shell (header/sidebars/footer) and nav stubs into apps; ensure dashboard cards/links from 0.3 fit the shell; run responsive checks.  
   - 0.4.10-B: Verify shared UI kit/components are used; strings externalised; a11y patterns applied; fix gaps.

0.4.11 — Integration & Carry-Forward  
   - 0.4.11-A: Confirm LMS/CMS auth/content pieces fit into the shell; ensure locale switcher/settings/billing links work end-to-end.  
   - 0.4.11-B: Update docs/changelog/prompt archive after implementation prompts.

0.4.12 — Testing & Fixes  
   - 0.4.12-A: Run owner + Codex verification of shell/UI kit/nav/footer/settings/billing shells; log issues.  
   - 0.4.12-B: Apply fixes/polish; ensure externalised strings and a11y patterns; capture test plan/fixtures (even stubbed); update docs/changelog/prompt archive.
   - 0.4.12-C: Validate tenant theming hooks don’t break accessibility and i18n; note follow-ups for future full customisation.

## Phase 0.5 — Educational Toolkit (Interactive Learning Components)
- Purpose: Deliver a reusable toolkit of interactive blocks tailored for STEM/CS courses and surface them in the library alongside featured courses.
- Scope: Harden interactive block types (math/LaTeX, chemistry structures, physics/biology visuals, code sandbox, media/YouTube), add UX for inserting/configuring them in the CMS editor, rendering them in LMS, and exposing curated toolkit entries in the library “featured” area.
- Deliverables:
  - Toolkit docs: block catalog, capabilities, configuration options, safety constraints
  - Content API support for interactive block configs and assets
  - CMS editor UX for adding/configuring interactive blocks (beyond placeholders)
  - LMS player rendering for interactive blocks with safe defaults/sandboxing
  - Library surfacing: featured toolkit modules/cards alongside featured courses (Netflix/app store style)
  - Telemetry for interactive usage (e.g., code sandbox runs, media plays) and compliance notes
- Dependencies: Phases 0.3–0.4
- Entry Criteria: Content skeleton and shell/UI kit in place
- Exit Criteria: Interactive blocks usable end-to-end in CMS/LMS; toolkit items surfaced in library; docs/tests/changelog updated
- Skeleton → Full: Interactive blocks move from placeholders to functional; richer simulations and advanced tooling can expand later.
- Implementation path: each sub-phase delivers docs/specs and runnable stubs/skeletons (API/routes, schemas/migrations, CMS/LMS UI, library surfacing). Iterate to working flows within this phase.***

### Phase 0.5 Sub-Phases (Prompt Checklist)
0.5.1 — Docs & Specs + Stubs  
   - 0.5.1-A: Expand block catalog specs (math/LaTeX, chemistry, physics/biology visuals, code sandbox, media/YouTube) with UX and safety notes; stub block configs.  
   - 0.5.1-B: Define how toolkit items appear in the library (metadata, cards, categorisation); stub library card components and API responses.  
   - 0.5.1-C: Update Content API spec with interactive block configs and validation.

0.5.2 — Schema/Data Layer  
   - 0.5.2-A: Refine schemas for interactive blocks (config fields, asset refs), including localisation fields; add migration stubs.  
   - 0.5.2-B: Outline migrations in docs; note any storage needs for assets/snippets; prepare migration scripts.  
   - Decision: Choose rendering/sandbox libraries for math/chem/code (document choice/rationale).

0.5.3 — Content API & Domain Logic  
   - 0.5.3-A: Detail handling for interactive blocks (validation, sanitisation, sandbox config, media safety); implement API stubs.  
   - 0.5.3-B: Define and stub API responses for toolkit listings (for library surfacing); implement response skeletons with docs.***

0.5.4 — CMS Editor UI (Interactive Blocks)  
   - 0.5.4-A: Implement UX for inserting/configuring interactive blocks (controls for formulas, elements, code, media).  
   - 0.5.4-B: Ensure shared UI kit, i18n, a11y patterns; externalise strings.

0.5.5 — LMS Player UI (Interactive Blocks)  
   - 0.5.5-A: Render interactive blocks safely (sandboxed code, sanitized embeds, math/chem rendering) with loading/error states.  
   - 0.5.5-B: Apply i18n/a11y; ensure responsive layouts.

0.5.6 — Library Surfacing  
   - 0.5.6-A: Add library cards/sections to showcase toolkit modules alongside featured courses.  
   - 0.5.6-B: Externalise strings; define filters/tags; ensure consistent shell integration.

0.5.7 — Telemetry & Compliance  
   - 0.5.7-A: Track interactive usage events (runs, plays, interactions) with locale/tenant metadata.  
   - 0.5.7-B: Note compliance/safety (no unsafe embeds, sandbox policies, no PII in events).

0.5.8 — UI/UX Integration & Carry-Forward  
   - 0.5.8-A: Wire toolkit into CMS/LMS flows; ensure library links/cards navigate correctly.  
   - 0.5.8-B: Verify reuse/extensibility for future block types; update docs/changelog/prompt archive.

0.5.9 — Testing & Fixes  
   - 0.5.9-A: Run owner + Codex verification of interactive blocks end-to-end and library surfacing; log issues.  
   - 0.5.9-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.6 — Progress Tracking + Analytics Hooks
- Purpose: Track learner progress and emit foundational analytics events.
- Scope: Progress model, APIs, UI indicators; event schemas for key actions; ingestion stub; locale and tenant metadata included in events; UX review of progress affordances.
- Deliverables:
  - Progress schema/docs; ERD/tables updated
  - Progress API spec and minimal implementation
  - UI progress indicators in LMS
  - Analytics event schema doc; client emitter; ingestion stub
  - Consent-aware analytics toggle honoring compliance standard
  - UX refinement for progress display and feedback
- Dependencies: Phases 0.3–0.5
- Entry Criteria: Lessons playable; layout/UI kit available
- Exit Criteria: Progress persists; events emitted; docs updated; changelog updated
- Skeleton → Full: Basic progress and events here; richer analytics, dashboards, and advanced progress logic added in later phases.
- Implementation path: deliver docs/specs plus schema/migration stubs, API stubs, emitter stubs, and LMS UI indicators wired to stubbed data; evolve to working flows within the phase.***

### Phase 0.6 Sub-Phases (Prompt Checklist)
0.6.1 — Docs & Specs + Stubs  
   - 0.6.1-A: Define progress model (course/module/lesson status, timestamps, scoring) and UX for indicators; stub schema/API notes.  
   - 0.6.1-B: Document analytics event schema for key actions (progress updates, content interactions), including locale/tenant metadata and consent behavior; note owner vs tenant reporting needs; stub emitter shapes.  
   - 0.6.1-C: Specify Progress API endpoints, payloads, validation, and error states; scaffold route/controller stubs.  
   - 0.6.1-D: Capture scalability considerations for event volume (batching, back-pressure) and data retention; plan transport choice and retry/backoff stubs.  
   - 0.6.1-E: Note early warehouse fact/dimension shapes and KPIs to inform Phase 0.10 dashboards/BI; stub schema notes.

0.6.2 — Schema/Data Layer  
   - 0.6.2-A: Add/describe schemas for progress tracking (tables/fields/relationships); include migration stubs.  
   - 0.6.2-B: Outline migrations in docs; note retention and compliance considerations; prep migration scripts.

0.6.3 — Progress API & Domain Logic  
   - 0.6.3-A: Detail endpoints for reading/updating progress; gating rules; validation; implement API stubs.  
   - 0.6.3-B: Define how analytics events are emitted from domain logic (consent-aware); add emitter stubs.

0.6.4 — LMS UI (Progress Indicators)  
   - 0.6.4-A: Add progress UI in LMS (per lesson/course), with loading/error/empty states; wire to stub API/data.  
   - 0.6.4-B: Ensure shared UI kit/layout, externalised strings, a11y patterns.***

0.6.5 — Analytics Client/Emitter (Stub)  
   - 0.6.5-A: Document client API for emitting events; batching/stubbing approach.  
   - 0.6.5-B: Ensure events carry locale/tenant metadata; define redaction/safety rules.  
   - 0.6.5-C: Plan for owner/tenant analytics UIs to consume these events (even if UI lands later).

0.6.6 — Telemetry & Compliance  
   - 0.6.6-A: Confirm consent toggles/opt-out behavior; no PII in events/logs.  
   - 0.6.6-B: Note data retention for analytics and progress where applicable.

0.6.7 — UI/UX Integration & Carry-Forward  
   - 0.6.7-A: Wire progress indicators into shell/dashboard surfaces; ensure navigation reflects status.  
   - 0.6.7-B: Verify reuse of i18n/a11y patterns; externalise all strings.

0.6.8 — Testing & Fixes  
   - 0.6.8-A: Run owner + Codex verification of progress UI/API/events; log issues.  
   - 0.6.8-B: Apply fixes/polish; capture test plan/fixtures; update docs/changelog/prompt archive.

## Phase 0.7 — Permissions & Entity System
- Purpose: Enforce access control across entities and surfaces.
- Scope: Entity model expansion, role bindings, permission checks in APIs and UI, enforcement in CMS/LMS/admin surfaces; UX states for gated/forbidden actions.
- Deliverables:
  - Updated entity/permission docs; schemas and ERD adjusted
  - Permission engine API/spec; middleware/hooks
  - UI gating states (disabled/hidden/forbidden) using shared components
  - Audit logging notes for sensitive actions
- Dependencies: Phases 0.3–0.6
- Entry Criteria: Progress/content in place; auth ready
- Exit Criteria: Permission checks active on core routes; docs/tests updated
- Skeleton → Full: Initial enforcement here; more granular scopes and edge cases hardened in later phases.
- Implementation path: docs/specs plus schema/migration stubs, permission engine/middleware stubs, API guards, and UI gating components wired to stubbed role data; evolve to working checks within the phase.***

### Phase 0.7 Sub-Phases (Prompt Checklist)
0.7.1 — Docs & Specs + Stubs  
   - 0.7.1-A: Document entity model updates and role/permission taxonomy; map to LMS/CMS/Admin/Community surfaces; stub role data.  
   - 0.7.1-B: Define permission rules per action (content edit/publish, progress access, community actions, admin ops); prepare guard specs.  
   - 0.7.1-C: Specify Permission API/middleware behaviors and error states; UX states for forbidden/unauthorized; scaffold middleware stubs.

0.7.2 — Schema/Data Layer  
   - 0.7.2-A: Describe schemas for roles, permissions, bindings, and entity relations; update ERD/docs; add migration stubs.  
   - 0.7.2-B: Outline migrations; note audit/logging fields for sensitive changes; prep migration scripts.  

0.7.3 — Permission Engine & Domain Logic  
   - 0.7.3-A: Define resolution logic (inheritance, overrides, tenant scoping); performance considerations; implement engine stubs.  
   - 0.7.3-B: Document how to integrate with services (guards/middleware/hooks) and with plugins later; add integration examples.  

0.7.4 — API Integration  
   - 0.7.4-A: Identify and document API routes requiring checks; define consistent responses for denied access; add guard stubs to routes.  
   - 0.7.4-B: Plan for future SSO/MFA impacts on permission checks.  

0.7.5 — UI/UX States  
   - 0.7.5-A: Define and implement UI patterns for gated/forbidden states (disabled, hidden, upsell/info states) using shared UI kit.  
   - 0.7.5-B: Externalise strings; ensure a11y/i18n; consistent messaging across apps.  
   - 0.7.5-C: Apply role-based dashboard module visibility (student/sub-tenant/tenant/admin/owner) for course cards and feature panels; wire to stub role data.  

0.7.6 — Audit & Compliance  
   - 0.7.6-A: Document audit events for permission changes; retention and privacy.  
   - 0.7.6-B: Note consent/security implications and logging redaction rules.

0.7.7 — UI/UX Integration & Carry-Forward  
   - 0.7.7-A: Wire permission gating into CMS/LMS/Admin/Community; verify nav/shell respect roles; stub redirects/states.  
   - 0.7.7-B: Ensure reusable gating components/hooks are used; update docs/changelog/prompt archive.  

0.7.8 — Testing & Fixes  
   - 0.7.8-A: Run owner + Codex verification of permission checks/UI states; log issues.  
   - 0.7.8-B: Apply fixes/polish; capture test plan/fixtures; update docs/changelog/prompt archive.

## Phase 0.8 — Community & Profiles (Initial)
- Purpose: Provide basic community and public profile capabilities.
- Scope: Forums (threads/posts), profile basics, integration with dashboard, locale-aware display.
- Deliverables:
  - Community schema/docs; APIs for threads/posts (minimal)
  - Profile schema/docs; public profile view
  - Minimal forum UI; profile UI; links from dashboard
  - Community dashboards/cards in shell (skeleton)
  - Compliance: moderation/audit logging notes
- Dependencies: Phases 0.4–0.7
- Entry Criteria: Permissions/entity system available
- Exit Criteria: Create/read threads; view profiles; docs in sync
- Skeleton → Full: Basic forums/profiles here; moderation, richer profile content, and community features expand later.
- Implementation path: deliver docs/specs plus schema/migration stubs, API stubs, and UI skeletons for forums/posts and profiles; wire to stub data and iterate to working flows within the phase.

### Phase 0.8 Sub-Phases (Prompt Checklist)
0.8.1 — Docs & Specs + Stubs  
   - 0.8.1-A: Define community entities (forums, threads, posts) and profile basics; map roles to actions; stub role mappings.  
   - 0.8.1-B: Specify Community API (CRUD for threads/posts), validation, error states; scaffold API route stubs.  
   - 0.8.1-C: Profile data model and API (public fields, privacy defaults); dashboard/profile UX notes; stub profile API.

0.8.2 — Schema/Data Layer  
   - 0.8.2-A: Describe schemas for forums/threads/posts and profiles; update ERD/docs; add migration stubs.  
   - 0.8.2-B: Outline migrations; include locale fields where needed; audit fields for moderation.

0.8.3 — Community API & Domain Logic  
   - 0.8.3-A: Detail endpoints for threads/posts (list/create/read/reply); moderation hooks.  
   - 0.8.3-B: Enforce permission rules from 0.7; define error responses for forbidden actions.

0.8.4 — Community UI (Skeleton)  
   - 0.8.4-A: Build minimal forum UI (list threads, view thread, create post/reply) using shared UI kit/layout.  
   - 0.8.4-B: Externalise strings; apply i18n/a11y; loading/error states.

0.8.5 — Profile UI (Skeleton)  
   - 0.8.5-A: Public profile view (basic fields, locale-aware display); link from dashboard/community.  
   - 0.8.5-B: Ensure profile strings are externalised; use shared UI kit/layout; a11y/i18n applied.

0.8.6 — Navigation & Dashboard Integration  
   - 0.8.6-A: Add community/profile links/cards into shell/dashboard; apply role-based visibility.  
   - 0.8.6-B: Ensure enrolled courses/progress and community modules coexist in dashboard layouts.

0.8.7 — Telemetry & Compliance  
   - 0.8.7-A: Define events for community interactions (thread create/reply/view) with locale/tenant metadata.  
   - 0.8.7-B: Moderation/audit logging requirements; privacy considerations for public profiles.

0.8.8 — Testing & Fixes  
   - 0.8.8-A: Run owner + Codex verification of community/profile flows; log issues.  
   - 0.8.8-B: Apply fixes/polish; capture test plan/fixtures; update docs/changelog/prompt archive.

## Phase 0.9 — Plugin Framework Groundwork
- Purpose: Establish plugin registration and extension points.
- Scope: Plugin manifest format, registry schema, sandbox API shape (stub), declared extension points (content blocks, dashboard sidebars, forum widgets).
- Deliverables:
  - Plugin docs: manifest, scopes, lifecycle, registry
  - Registry schema/docs; minimal management API
  - Identified extension points in UI layout/content/community (including dashboard sidebars)
  - Compliance: plugin data access disclosure and consent requirements
- Dependencies: Phases 0.4–0.7
- Entry Criteria: Stable layout and entity model
- Exit Criteria: Can register a plugin and declare extensions (even if stubs); docs updated
- Skeleton → Full: Registration and declared extension points here; execution/runtime hardening and richer SDK come later.
- Implementation path: docs/specs plus schema/migration stubs, registry API stubs, plugin runtime/extension stubs, and management UI skeleton; iterate to working registration/extension flows within the phase.

### Phase 0.9 Sub-Phases (Prompt Checklist)
0.9.1 — Docs & Specs + Stubs  
   - 0.9.1-A: Define plugin manifest format, scopes/permissions, lifecycle hooks, and extension points (content blocks, dashboard sidebars, community widgets); stub manifest examples.  
   - 0.9.1-B: Document registry requirements (storage, activation state) and sandbox API shape; scaffold stub contracts.  
   - 0.9.1-C: Capture UX notes for plugin management UI and how extensions appear in UI surfaces; stub UI flows.

0.9.2 — Schema/Data Layer  
   - 0.9.2-A: Describe registry schema (plugins, versions, scopes, activation, tenant bindings); add migration stubs.  
   - 0.9.2-B: Outline migrations; include audit fields; note compliance for data access declarations; prep migration scripts.

0.9.3 — Plugin Runtime Stubs  
   - 0.9.3-A: Define sandbox API shape (stub): allowed APIs, event hooks, constraints; create runtime interface stubs.  
   - 0.9.3-B: Document extension point contracts for content blocks, dashboard sidebars, community widgets; stub loaders.  
   - Decision: Select plugin sandbox/runtime approach/tooling (document choice/rationale).  

0.9.4 — Registry API & Management UI (Skeleton)  
   - 0.9.4-A: Specify and implement registry API stubs (register/list/activate/deactivate).  
   - 0.9.4-B: Build minimal management UI skeleton; externalise strings; apply i18n/a11y; wire to API stubs.

0.9.5 — UI Extension Wiring (Skeleton)  
   - 0.9.5-A: Plan and stub how to slot plugin-provided components into content rendering and dashboard/community sidebars.  
   - 0.9.5-B: Ensure UI kit/layout patterns and role-based visibility apply; externalise strings; add placeholder extension slots.  

0.9.6 — Telemetry & Compliance  
   - 0.9.6-A: Define events for plugin lifecycle actions (register/activate/deactivate) and usage of plugin extensions.  
   - 0.9.6-B: Note consent/data access disclosures; audit logging for registry actions.

0.9.7 — Integration & Carry-Forward  
   - 0.9.7-A: Wire registry APIs to UI skeleton; ensure extension points are discoverable in content/community; stub sample plugin.  
   - 0.9.7-B: Update docs/changelog/prompt archive after implementation prompts.  

0.9.8 — Testing & Fixes  
   - 0.9.8-A: Run owner + Codex verification of plugin registry and extension wiring (stubbed); log issues.  
   - 0.9.8-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance.

## Phase 0.10 — Analytics Dashboards & Data Warehouse
- Purpose: Deliver tenant/owner analytics dashboards and define the scalable data pipeline/warehouse needed for growth.
- Scope: BI/analytics UX (tenant-level and owner-level), event/ETL pipeline design, warehouse schema (facts/dimensions), and performance/retention strategies.
- Deliverables:
  - Analytics dashboard specs for tenants (course engagement, progress, toolkit usage) and owners (platform-wide metrics)
  - Warehouse schema docs (facts/dimensions), data retention and partitioning strategy
  - ETL/ingestion plan (batch/stream), with consent-aware filtering; stubs if implementation deferred
  - Dashboard UI shells (tenant/owner) using shared UI kit; externalised strings
  - Performance budgets for analytics queries; plan for scaling to millions of users/events
- Dependencies: Phases 0.5–0.9
- Entry Criteria: Events and progress hooks defined; plugin groundwork in place
- Exit Criteria: Dashboard designs/shells, warehouse schema/plan, ETL plan documented; docs/tests/changelog updated
- Skeleton → Full: Shells and plans here; deeper implementation/perf tuning continues in later phases.
- Implementation path: deliver docs/specs plus warehouse schema/migration stubs, ETL/ingestion stubs, and dashboard UI shells wired to stub data; iterate to working dashboards within the phase.***

### Phase 0.10 Sub-Phases (Prompt Checklist)
0.10.1 — Docs & Specs + Stubs  
   - 0.10.1-A: Define tenant and owner dashboard KPIs (course engagement, progress, toolkit usage, revenue later) and UX layouts; stub charts/cards.  
   - 0.10.1-B: Document warehouse facts/dimensions, partitioning/retention strategy, and consent-aware filtering; stub schemas.  
   - 0.10.1-C: Specify ETL/ingestion approach (batch/stream), back-pressure handling, and error reporting; stub pipeline configs.

0.10.2 — Schema/Data Layer  
   - 0.10.2-A: Describe warehouse schemas (facts/dims) and metadata required for locale/tenant segmentation; add migration stubs.  
   - 0.10.2-B: Note migrations/data pipelines to populate initial warehouse tables; prepare scripts/stubs.

0.10.3 — ETL/Ingestion Plan  
   - 0.10.3-A: Plan pipelines from event emitter to warehouse (batch/stream), including consent filters and redaction; stub ETL jobs.  
   - 0.10.3-B: Define monitoring/alerting for pipelines; stub alerts/dashboards.  
   - Decision: Choose event transport and warehouse engine; document charting library choice and data freshness targets.

0.10.4 — Dashboard UI Shells  
   - 0.10.4-A: Build tenant dashboard shell (cards/charts) using shared UI kit; externalise strings; a11y/i18n; wire to stub data.  
   - 0.10.4-B: Build owner dashboard shell for platform-wide metrics; stub data sources.

0.10.5 — Performance & Scale  
   - 0.10.5-A: Set performance budgets for queries/dashboards; plan caching/aggregation; add placeholder configs.  
   - 0.10.5-B: Document scale considerations for millions of users/events; outline load test plan stubs.

0.10.6 — Telemetry & Compliance  
   - 0.10.6-A: Ensure consent-aware data usage; retention policies applied; no PII in dashboards/logs.  
   - 0.10.6-B: Update compliance notes for analytics storage/processing.

0.10.7 — Integration & Carry-Forward  
   - 0.10.7-A: Wire dashboards to available data (stubs if needed); ensure nav/footer links.  
   - 0.10.7-B: Update docs/changelog/prompt archive after implementation prompts.

0.10.8 — Testing & Fixes  
   - 0.10.8-A: Run owner + Codex verification of dashboard shells and data plans; log issues.  
   - 0.10.8-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance.  

## Phase 0.11 — Deployability, Observability & Ops
- Purpose: Prepare for production deployment.
- Scope: Deployment architecture doc, environment/config hardening, logging/monitoring, backups, basic SLOs, i18n build/runtime considerations; perf/load checkpoints.
- Deliverables:
  - Deployment architecture doc; CI/CD updates
  - Logging/monitoring requirements; alerting hooks
  - Backup/restore notes; retention enforcement
  - Compliance: data transfer/region notes; DSR operational flow
  - Performance/load test plan and initial targets
- Dependencies: Phases 0.1–0.10
- Entry Criteria: Core features stable
- Exit Criteria: Deployable baseline with observability; docs updated
- Skeleton → Full: Baseline deploy/observability here; deeper SLOs, scaling, and ops automation continue through 0.17.
- Implementation path: deliver docs plus deploy/infra configs, logging/monitoring setup stubs, backup/restore scripts, and perf/load test plans; iterate to working deploy with observability.***

### Phase 0.11 Sub-Phases (Prompt Checklist)
0.11.1 — Docs & Architecture  
   - 0.11.1-A: Document deployment architecture (environments, hosting targets for frontend/backend), networking, and CI/CD flow.  
   - 0.11.1-B: Define SLOs/SLA targets (latency, availability) and error budgets (initial).

0.11.2 — Environment/Config Hardening  
   - 0.11.2-A: Specify config management (env vars, secrets handling) per environment.  
   - 0.11.2-B: Note hardening steps for Node/Express and frontend builds (headers, TLS, caching).
   - Decision: Confirm hosting targets (frontend/backend) for deployment environments.

0.11.3 — Logging/Monitoring/Alerting  
   - 0.11.3-A: Define logging strategy (structure, redaction), metrics, and traces; choose initial tooling.  
   - 0.11.3-B: Establish alerting criteria and runbook pointers (initial).

0.11.4 — Backups & Retention  
   - 0.11.4-A: Document backup/restore plan for Neon and content storage; retention schedules.  
   - 0.11.4-B: Ensure compliance alignment (retention, deletion).

0.11.5 — Perf/Load Checkpoints  
   - 0.11.5-A: Set initial perf/load test plans and targets; identify bottleneck risks.  
   - 0.11.5-B: Note caching/aggregation strategies for heavy endpoints (including analytics dashboards).

0.11.6 — CI/CD Updates  
   - 0.11.6-A: Update CI/CD to include deploy steps, basic smoke tests, and gating on critical checks.  
   - 0.11.6-B: Document release cadence and rollback strategy.

0.11.7 — Telemetry & Compliance  
   - 0.11.7-A: Confirm no PII in logs/metrics; consent-aware telemetry; region/data transfer notes.  
   - 0.11.7-B: Update compliance docs for ops (audits, runbooks references).

0.11.8 — Integration & Carry-Forward  
   - 0.11.8-A: Wire monitoring/alerts into existing services; ensure dashboards link to ops views.  
   - 0.11.8-B: Update docs/changelog/prompt archive after implementation prompts.

0.11.9 — Testing & Fixes  
   - 0.11.9-A: Run owner + Codex verification of deployability/observability plans and CI/CD updates; log issues.  
   - 0.11.9-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.12 — Multi-Tenant Hardening & Enterprise Readiness
- Purpose: Complete multi-tenant isolation and enterprise-grade requirements.
- Scope: Tenant isolation in data/access, tenant switcher UX, per-tenant configs (content, plugins, locale defaults), performance/stability hardening, SSO/SAML (if in scope), privacy/DSR flows.
- Deliverables:
  - Tenant isolation documented/enforced across services
  - Tenant switcher in shell; tenant-scoped settings (including locale)
  - Per-tenant plugin/config management
  - Enterprise features (SSO/SAML/OIDC) documented/implemented if in scope
  - Performance budgets and load/perf test plans
- Dependencies: Phases 0.1–0.11
- Entry Criteria: Deployable single-tenant baseline
- Exit Criteria: Multi-tenant enabled and enforced; enterprise requirements documented and met; docs/tests updated; changelog entry
- Skeleton → Full: Tenant isolation and enterprise features solidified here; final polish and launch readiness in 0.17/1.0.
- Implementation path: deliver docs/specs plus tenancy schema/migration changes, enforcement middleware/guards, tenant switcher UI, per-tenant config UI, and SSO/SAML stubs (if in scope); iterate to working multi-tenant flows.***

### Phase 0.12 Sub-Phases (Prompt Checklist)
0.12.1 — Docs & Specs  
   - 0.12.1-A: Document tenant isolation model (data, access, configs), switcher UX, and per-tenant defaults (content, plugins, locale).  
   - 0.12.1-B: Specify enterprise auth features in scope (SSO/SAML/OIDC, MFA policy) and UX impacts.

0.12.2 — Schema/Data Layer  
   - 0.12.2-A: Define tenancy scoping in schemas (tenant IDs on resources, config tables) and plugin/config bindings.  
   - 0.12.2-B: Outline migrations; audit fields for tenant config changes.

0.12.3 — Enforcement & Middleware  
   - 0.12.3-A: Document enforcement hooks for tenancy in APIs/services; cross-check with permissions.  
   - 0.12.3-B: Plan tenant-aware caching and performance considerations.

0.12.4 — Tenant Switcher UX  
   - 0.12.4-A: Design tenant switcher in shell; role-based visibility; locale/defaults per tenant.  
   - 0.12.4-B: Ensure i18n/a11y; externalise strings.

0.12.5 — Tenant Settings & Config  
   - 0.12.5-A: Define tenant settings UI (content defaults, plugin activation/config, locale).  
   - 0.12.5-B: Ensure settings use shared UI kit/layout; role gating applied.

0.12.6 — Enterprise Auth (If In Scope)  
   - 0.12.6-A: Plan SSO/SAML/OIDC integration points; MFA policy hooks.  
   - 0.12.6-B: Note compliance/security considerations and UX for enterprise login.  
   - Decision: Select SSO/SAML/OIDC provider/tooling; define MFA approach (doc choice/rationale).

0.12.7 — Performance & Load  
   - 0.12.7-A: Update performance/load plans with multi-tenant scenarios; tenant-aware scaling.  
   - 0.12.7-B: Identify hot paths (tenant switch, config reads) and caching/partitioning strategies.

0.12.8 — Telemetry & Compliance  
   - 0.12.8-A: Ensure events include tenant context; audit logs for tenant config changes.  
   - 0.12.8-B: Confirm privacy/DSR flows support tenant scoping.

0.12.9 — Integration & Carry-Forward  
   - 0.12.9-A: Wire tenant switcher/settings into shell; ensure per-tenant plugin/config applies across apps.  
   - 0.12.9-B: Update docs/changelog/prompt archive after implementation prompts.

0.12.10 — Testing & Fixes  
   - 0.12.10-A: Run owner + Codex verification of tenancy enforcement, switcher UX, and settings; log issues.  
   - 0.12.10-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.13 — Marketplace & Revenue
- Purpose: Enable monetization and marketplace capabilities for courses/plugins.
- Scope: Payments integration, pricing models, revenue splits, payouts, marketplace listings, receipt/ledger basics.
- Deliverables:
  - Marketplace/revenue docs (flows, data model)
  - Payment provider integration plan and minimal implementation
  - Revenue split/payout schema and APIs (minimal)
  - Marketplace listing UI (skeleton) and docs; tenant/owner billing UI refinements
  - Compliance: tax/VAT considerations captured in docs
- Dependencies: Phases 0.4–0.12
- Entry Criteria: Multi-tenant baseline; plugins groundwork in place
- Exit Criteria: Basic marketplace flows functional in beta; docs in sync; changelog updated
- Skeleton → Full: Initial marketplace/payments here; deeper billing, taxation, and reporting follow in hardening.

### Phase 0.13 Sub-Phases (Prompt Checklist)
0.13.1 — Docs & Specs  
   - 0.13.1-A: Document marketplace flows (list/browse/purchase courses/plugins), pricing models, and revenue splits.  
   - 0.13.1-B: Define payment provider integration scope (checkout, refunds) and receipt/ledger expectations.  
   - 0.13.1-C: UX notes for marketplace listing cards, detail pages, and checkout.

0.13.2 — Schema/Data Layer  
   - 0.13.2-A: Describe schemas for products/listings, pricing, transactions, payouts; update ERD/docs.  
   - 0.13.2-B: Outline migrations; audit/log fields for financial events.

0.13.3 — Marketplace API & Domain Logic  
   - 0.13.3-A: Specify APIs for listing/searching/buying; revenue split calculation; payout stubs.  
   - 0.13.3-B: Define validation/error handling; fraud and compliance considerations.

0.13.4 — Payment Integration (Minimal)  
   - 0.13.4-A: Plan integration with chosen provider (skeleton checkout); consent and PCI considerations.  
   - 0.13.4-B: Document how to handle webhooks/notifications (stubbed if deferred).  
   - Decision: Select payment provider(s), currency/tax handling approach; document choice/rationale.

0.13.5 — UI (Marketplace & Billing)  
   - 0.13.5-A: Build marketplace listing UI (skeleton) and detail pages using shared UI kit; externalise strings; i18n/a11y.  
   - 0.13.5-B: Refine tenant/owner billing UI (from 0.4/0.11) to reflect marketplace purchases.

0.13.6 — Telemetry & Compliance  
   - 0.13.6-A: Define events for listing views, purchases, refunds; include tenant/user metadata.  
   - 0.13.6-B: Note tax/VAT considerations; data retention and privacy for financial records.

0.13.7 — Integration & Carry-Forward  
   - 0.13.7-A: Wire marketplace into dashboard/nav/footer; ensure role-based visibility.  
   - 0.13.7-B: Update docs/changelog/prompt archive after implementation prompts.

0.13.8 — Testing & Fixes  
   - 0.13.8-A: Run owner + Codex verification of marketplace flows (skeleton checkout) and billing UI; log issues.  
   - 0.13.8-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.14 — Workspace Environments (Initial)
- Purpose: Introduce hosted workspaces (IDE/simulations) as a beta feature.
- Scope: Workspace session model, launch/terminate APIs, minimal IDE/simulation shell, integration points from LMS/community.
- Deliverables:
  - Workspace architecture doc; schemas updated
  - Workspace launch API (stub/limited)
  - Minimal workspace UI shell; dashboard entry points for students/tenants
  - Security/sandboxing considerations documented
  - UX notes for workspace entry/exit
- Dependencies: Phases 0.4–0.12
- Entry Criteria: Layout and plugin hooks available
- Exit Criteria: Launch a basic workspace from LMS/community; docs updated
- Skeleton → Full: Minimal workspace shell here; richer tooling/runtime isolation and features later.

### Phase 0.14 Sub-Phases (Prompt Checklist)
0.14.1 — Docs & Specs  
   - 0.14.1-A: Document workspace types (IDE/simulations), session lifecycle (launch/terminate), and UX entry points.  
   - 0.14.1-B: Define resource limits/sandboxing requirements and integration points from LMS/community.

0.14.2 — Schema/Data Layer  
   - 0.14.2-A: Describe schemas for workspace sessions, configs, and logs; update ERD/docs.  
   - 0.14.2-B: Outline migrations; note retention for sessions/logs.

0.14.3 — Workspace API & Control Plane (Stub)  
   - 0.14.3-A: Specify APIs for launch/terminate/status; security constraints.  
   - 0.14.3-B: Plan sandbox isolation approach (doc-first; minimal stub).  
   - Decision: Select workspace runtime/isolation approach (container/VM) and provider; document choice/rationale.

0.14.4 — Workspace UI (Skeleton)  
   - 0.14.4-A: Build minimal workspace shell UI; entry/exit flows from LMS/community/dashboard.  
   - 0.14.4-B: Externalise strings; apply i18n/a11y; loading/error states.

0.14.5 — Telemetry & Compliance  
   - 0.14.5-A: Track workspace launches/usage with locale/tenant metadata; no PII in logs.  
   - 0.14.5-B: Document sandbox/security/privacy considerations.

0.14.6 — Integration & Carry-Forward  
   - 0.14.6-A: Wire workspace entry points into LMS/community/dashboard; ensure role-based visibility.  
   - 0.14.6-B: Update docs/changelog/prompt archive after implementation prompts.

0.14.7 — Testing & Fixes  
   - 0.14.7-A: Run owner + Codex verification of workspace launch/exit stubs and UI; log issues.  
   - 0.14.7-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.15 — Knowledge Graph & Recommendations (Initial)
- Purpose: Lay groundwork for knowledge graph and recommendations.
- Scope: Entity relationships captured for graph, minimal ingestion pipeline, simple recommendation surfaces in LMS/library.
- Deliverables:
  - Knowledge graph doc (entities/edges, storage approach)
  - Ingestion/derivation notes; schemas updated
  - Simple recommendation API (stub) and UI placeholder; knowledge graph viewer (skeleton)
  - Privacy/compliance considerations documented
- Dependencies: Phases 0.3–0.14
- Entry Criteria: Entity system and analytics events available
- Exit Criteria: Basic recommendation placeholders live; graph plan documented; docs updated
- Skeleton → Full: Initial graph/recos here; more signals/models and ranking later.

### Phase 0.15 Sub-Phases (Prompt Checklist)
0.15.1 — Docs & Specs  
   - 0.15.1-A: Document graph scope (entities/edges), ingestion sources (events/content), and recommendation use cases.  
   - 0.15.1-B: Define recommendation UX placeholders (LMS/library surfaces) and owner/tenant reporting needs.

0.15.2 — Schema/Data Layer  
   - 0.15.2-A: Describe graph storage model (doc/graph/relational) and schemas; update ERD/docs.  
   - 0.15.2-B: Outline ingestion/migration notes; retention/privacy for graph data.

0.15.3 — Ingestion/Derivation Plan  
   - 0.15.3-A: Plan pipelines to build/update the graph from events/content; consent-aware.  
   - 0.15.3-B: Define derivations (similarity, co-occurrence) for initial recommendations.

0.15.4 — Recommendation API & UI (Skeleton)  
   - 0.15.4-A: Specify APIs for fetching recommendations; payloads and validation.  
   - 0.15.4-B: Build minimal UI placeholders for recommendations in LMS/library using shared UI kit; externalise strings; apply i18n/a11y.

0.15.5 — Telemetry & Compliance  
   - 0.15.5-A: Track recommendation interactions; ensure no PII and consent-aware processing.  
   - 0.15.5-B: Document privacy considerations for graph storage/queries.

0.15.6 — Integration & Carry-Forward  
   - 0.15.6-A: Wire recommendation placeholders into LMS/library; ensure role-based visibility and tenant context.  
   - 0.15.6-B: Update docs/changelog/prompt archive after implementation prompts.

0.15.7 — Testing & Fixes  
   - 0.15.7-A: Run owner + Codex verification of recommendation placeholders and graph plan; log issues.  
   - 0.15.7-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.16 — Expanded Compliance & Regionalization
- Purpose: Broaden compliance coverage and regional readiness ahead of launch.
- Scope: Additional regimes (e.g., SOC2 prep outline, regional data residency), consent UX refinement, DSR operational flows, localization QA.
- Deliverables:
  - Compliance doc updates (regionalization, data residency, DSR runbooks)
  - Consent/notice UX refinement and instrumentation
  - Data residency/storage notes; backups aligned
  - Localization QA checklist and fixes
- Dependencies: Phases 0.1–0.15
- Entry Criteria: Core compliance standard in place; i18n implemented
- Exit Criteria: Compliance updates documented; consent/DSR flows validated; changelog updated
- Skeleton → Full: Compliance updates here; certification-level prep continues as needed.

### Phase 0.16 Sub-Phases (Prompt Checklist)
0.16.1 — Docs & Specs  
   - 0.16.1-A: Expand compliance docs to cover regional data residency, additional regimes (e.g., SOC2 prep outline), and operational requirements.  
   - 0.16.1-B: Define DSR operational runbooks (export/delete) and consent UX refinements.

0.16.2 — Data Residency & Regionalization  
   - 0.16.2-A: Document regional storage/processing expectations; note needed configs for residency.  
   - 0.16.2-B: Plan for region-aware routing/hosting (doc-first).

0.16.3 — Consent UX & Instrumentation  
   - 0.16.3-A: Refine consent/notice UX; ensure i18n/a11y; update strings.  
   - 0.16.3-B: Define instrumentation to track consent state/versions.

0.16.4 — DSR Operations  
   - 0.16.4-A: Outline flows/APIs for data export/delete; audit/log requirements.  
   - 0.16.4-B: Ensure tenant-aware DSR handling.

0.16.5 — Localization QA  
   - 0.16.5-A: Perform localization QA across apps; track fixes.  
   - 0.16.5-B: Update i18n guidelines/checklists based on findings.

0.16.6 — Integration & Carry-Forward  
   - 0.16.6-A: Apply compliance/regionalization updates across services and UI (consent banners, settings).  
   - 0.16.6-B: Update docs/changelog/prompt archive after implementation prompts.

0.16.7 — Testing & Fixes  
   - 0.16.7-A: Run owner + Codex verification of compliance/consent/DSR flows and localization QA outcomes; log issues.  
   - 0.16.7-B: Apply fixes/polish; capture test plan/fixtures; ensure i18n/a11y/compliance; update docs/changelog/prompt archive.

## Phase 0.17 — Public Beta Hardening
- Purpose: Stabilize and polish the beta across UX, performance, and reliability before launch.
- Scope: Bug bash, perf tuning, UX refinements across apps, telemetry/alert tuning, beta feedback handling.
- Deliverables:
  - Beta bug/issue triage and fixes
  - Performance profiling and targeted optimizations
  - UX polish passes across LMS/CMS/Admin/Community/Marketplace
  - Telemetry/alert thresholds tuned; runbooks updated
- Dependencies: Phases 0.1–0.16
- Entry Criteria: Feature set complete for launch scope
- Exit Criteria: Beta deemed stable; launch checklist items green; docs/tests updated
- Skeleton → Full: Final polish before 1.0.

### Phase 0.17 Sub-Phases (Prompt Checklist)
0.17.1 — Bug Bash & Triage  
   - 0.17.1-A: Run coordinated bug bash across apps; collect/triage issues.  
   - 0.17.1-B: Prioritise fixes for launch scope.

0.17.2 — Performance & Reliability  
   - 0.17.2-A: Execute perf/load tests per 0.11/0.12 plans; address hotspots.  
   - 0.17.2-B: Tune caching/aggregation; verify SLO targets.

0.17.3 — UX Polish  
   - 0.17.3-A: Apply UX refinements across LMS/CMS/Admin/Community/Marketplace/toolkit dashboards; ensure consistency.  
   - 0.17.3-B: Externalise any remaining strings; recheck a11y/i18n.

0.17.4 — Telemetry & Alert Tuning  
   - 0.17.4-A: Adjust telemetry thresholds/alerts based on beta usage; reduce noise.  
   - 0.17.4-B: Ensure dashboards/ops views reflect current signals.

0.17.5 — Runbooks & Readiness  
   - 0.17.5-A: Update runbooks (incidents, DSR, ops); verify links in docs/footer where applicable.  
   - 0.17.5-B: Complete launch readiness checklist; ensure changelog up to date.

0.17.6 — Testing & Fixes  
   - 0.17.6-A: Run owner + Codex verification on high-risk areas post-fixes; log issues.  
   - 0.17.6-B: Apply final fixes/polish; capture test plan/fixtures; update docs/changelog/prompt archive.

## Phase 0.18 — Developer Docs & Public Docs
- Purpose: Provide public-facing docs for developer users and external stakeholders.
- Scope: Developer portal docs (API, SDK, plugin guides), public help/FAQ pages, and integration of these links into the dashboard footer/nav.
- Deliverables:
  - Public developer docs structure (within /docs and surfaced via Dev Portal)
  - API reference publishing plan; plugin/dev guides populated
  - Footer/nav links to public docs/help/privacy/terms/support
  - Documentation publishing workflow (e.g., static export/site)
- Dependencies: Phases 0.4–0.17
- Entry Criteria: Core APIs and plugin framework documented
- Exit Criteria: Public docs available and linked from the product; publishing flow defined; changelog updated

### Phase 0.18 Sub-Phases (Prompt Checklist)
0.18.1 — Docs Structure & Scope  
   - 0.18.1-A: Define structure for developer docs (API/SDK/plugin guides) and public help/FAQ.  
   - 0.18.1-B: Plan publishing format/workflow (static export/site) and versioning approach.

0.18.2 — Content & References  
   - 0.18.2-A: Populate key dev guides (API reference plan, plugin dev guide, getting started).  
   - 0.18.2-B: Populate public help/FAQ pages; ensure compliance/privacy/terms links.

0.18.3 — UI Integration  
   - 0.18.3-A: Add footer/nav links to public docs/help/privacy/terms/support; ensure i18n/a11y.  
   - 0.18.3-B: Surface docs entry in Dev Portal; externalise strings.

0.18.4 — Publishing Workflow  
   - 0.18.4-A: Define build/deploy steps for docs site; align with CI/CD.  
   - 0.18.4-B: Note how to sync `/docs` with published site.

0.18.5 — Testing & Fixes  
   - 0.18.5-A: Run owner + Codex verification of docs structure/links/publishing workflow; log issues.  
   - 0.18.5-B: Apply fixes/polish; update changelog/prompt archive.

## Phase 1.0 — Public Launch
- Purpose: Ship the public SaaS release with full multi-tenant support, enterprise requirements, and documented operational readiness.
- Scope: Finalize tenant isolation, tenant switcher, per-tenant configs (content, plugins, locale defaults), performance/stability hardening, SSO/SAML (if in scope), privacy/DSR flows, support onboarding.
- Deliverables:
  - Tenant isolation documented/enforced across services
  - Tenant switcher in shell; tenant-scoped settings (including locale)
  - Per-tenant plugin/config management
  - Enterprise features (SSO/SAML/OIDC) documented/implemented if in scope
  - Performance budgets and load/perf test plans; basic load test results
  - Support docs: onboarding, incident runbooks, DSR operational flow
  - Public launch checklist completed
- Dependencies: Phases 0.1–0.17
- Entry Criteria: Deployable single-tenant baseline; ops readiness in progress
- Exit Criteria: Multi-tenant enabled and enforced; enterprise requirements documented and met; docs/tests updated; changelog entry; launch readiness sign-off
- Skeleton → Full: Launch completes the move from skeleton/beta to full feature readiness for public use.

### Phase 1.0 Sub-Phases (Prompt Checklist)
1.0.1 — Launch Readiness Review  
   - 1.0.1-A: Final go/no-go checklist (features, compliance, security, performance) and stakeholder sign-off.  
   - 1.0.1-B: Legal/privacy review; confirm terms/privacy docs and consent flows.

1.0.2 — Performance & Load Validation  
   - 1.0.2-A: Run final load/perf tests against targets; document results.  
   - 1.0.2-B: Validate caching/aggregation and scaling plans for launch traffic.

1.0.3 — Ops/Support Prep  
   - 1.0.3-A: Validate runbooks (incident, DSR, support), on-call rotation, and comms templates.  
   - 1.0.3-B: Verify monitoring/alerts/dashboards cover launch scope.

1.0.4 — UX/Content Freeze & QA  
   - 1.0.4-A: Freeze critical UX/content; run final QA pass across apps; ensure i18n/a11y compliance.  
   - 1.0.4-B: Confirm docs/help/dev portal are published and linked.

1.0.5 — Rollout & Rollback Plan  
   - 1.0.5-A: Define rollout steps (phased/canary) and rollback strategy.  
   - 1.0.5-B: Document owner/tenant analytics readiness for monitoring post-launch.

1.0.6 — Testing & Fixes  
   - 1.0.6-A: Run owner + Codex verification on launch readiness items; log issues.  
   - 1.0.6-B: Apply final fixes; update changelog/prompt archive.

## Future Phases (Post-1.0)
- Marketplace/revenue features (payments, revenue splits, payouts)
- Workspace environments (IDE/simulations)
- Knowledge graph and advanced recommendations
- Additional compliance regimes and regionalization
