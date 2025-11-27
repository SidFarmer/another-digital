# Monorepo Structure

This document defines the official monorepo structure for the platform.  
All applications, services, shared packages, and documentation MUST conform to this layout.

Codex MUST NOT create files or folders outside the structures specified here unless the documentation is updated first.

---

# 1. Overview

The monorepo is organised into four major top-level directories:

```
/apps
/packages
/docs
/prompts
```

Each top-level directory has a specific role:

- **/apps** → all user-facing applications  
- **/packages** → all shared internal libraries  
- **/docs** → all documentation & standards  
- **/prompts** → task prompt archive (per development phase)

This structure enforces modularity, reusability, and strict separation of concerns.

---

# 2. Full Directory Layout

```
/
├── apps/
│   ├── lms/                 # Student-facing LMS application
│   ├── cms/                 # Tenant-facing content management system
│   ├── admin/               # Platform owner / staff admin dashboard
│   ├── community/           # Forums, collaborative projects, group spaces
│   ├── library/             # Course discovery, search, featured content
│   ├── dev-portal/          # Plugin docs, developer tools, onboarding
│   ├── profiles/            # Public profile pages (badges, portfolio, links)
│   ├── auth/                # Authentication UI (login/signup/reset)
│   └── marketing/           # Public landing site
│
├── packages/
│   ├── types/               # Global TypeScript types
│   ├── utils/               # Shared helper utilities
│   ├── layout/              # Unified dashboard shell (header + sidebars)
│   ├── ui/                  # UI kit + design components
│   ├── auth/                # Shared auth logic (tokens, session helpers)
│   ├── permissions/         # RBAC engine + permission resolvers
│   ├── entities/            # Universal entity system abstractions
│   ├── events/              # Event pipeline: emitters, schemas, handlers
│   ├── analytics/           # Analytics clients, batching, ingestion helpers
│   ├── content/             # Content engine (blocks, renderers, schemas)
│   ├── community/           # Forum + collaboration shared logic
│   ├── profile/             # Public profile rendering + schema helpers
│   ├── workspace/           # Shared workspace tools (future)
│   ├── plugins/             # Plugin runtime + SDK bindings
│   ├── api/                 # Shared API client + server helpers
│   ├── config/              # Shared config loaders (env, runtime)
│   ├── theme/               # Design tokens + theme system
│   └── i18n/                # Localisation utilities, message catalogs, locale detection
│
├── docs/
│   ├── architecture/        # Architectural documents
│   ├── standards/           # Codex + developer standards
│   ├── data-model/          # Schemas, tables, ERDs
│   ├── api/                 # API documentation
│   ├── frontend/            # Frontend architectural notes
│   ├── backend/             # Backend architectural notes
│   ├── plugins/             # Plugin developer documentation
│   ├── workflows/           # High-level workflows (LMS, CMS, Community)
│   └── analytics/           # Analytics docs (pipelines, events, warehouse)
│
└── prompts/
    └── prompt-archive/
        ├── 0.1/             # Phase 0.1 task archives
        ├── 0.2/             # Phase 0.2 task archives
        ├── 0.3/             # etc.
        └── latest/          # Optional pointer to most recent phase
```

---

# 3. Application Layer (/apps)

Each directory inside `/apps` is a full application.  
All **routing**, **page rendering**, and major **app-specific state** lives here.

- All apps consume shared i18n from `packages/i18n`, expose a locale switcher in settings, and load per-app message bundles with sensible fallbacks.
- Accessibility is enforced via the shared UI kit and layout patterns (WCAG 2.1 AA baseline: keyboard navigation, focus management, screen reader semantics, contrast).

### **3.1 LMS App (`/apps/lms`)**
- lesson player  
- progress tracking UI  
- course browsing (tenant-scoped)  
- contextual right-sidebar tools  
- workspace entrypoints  

### **3.2 CMS App (`/apps/cms`)**
- course builder  
- module/lesson editors  
- content block configuration  
- media linking (YouTube embeds)  
- versioning & publishing workflows  

### **3.3 Admin App (`/apps/admin`)**
- user/tenant management  
- global analytics  
- plugin marketplace moderation  
- system configuration  

### **3.4 Community App (`/apps/community`)**
- forums  
- discussion threads  
- collaborative projects  
- team workspaces  
- community dashboards  

### **3.5 Library App (`/apps/library`)**
- discovery feed  
- recommendation lists  
- search  
- trending courses  
- featured creators/tenants  

### **3.6 Developer Portal (`/apps/dev-portal`)**
- plugin documentation  
- SDK access  
- test sandbox  
- developer profiles  
- API keys  

### **3.7 Profiles App (`/apps/profiles`)**
- public profile pages  
- badges  
- certificates  
- portfolio items  
- social links  

### **3.8 Auth App (`/apps/auth`)**
- login  
- registration  
- multi-tenant onboarding  
- password reset flows  

### **3.9 Marketing App (`/apps/marketing`)**
- public homepage  
- pricing  
- features  
- blog  
- SEO-driven content  

---

# 4. Packages Layer (/packages)

Shared code lives in `/packages`.  
Nothing user-facing is rendered directly from here.

All packages must be:

- framework-agnostic where possible  
- documented  
- reusable across all apps  
- strongly typed  

### **Key packages include:**

| Package | Purpose |
|--------|---------|
| `types` | Global shared TypeScript types |
| `utils` | General utilities |
| `layout` | Unified dashboard shell primitives |
| `ui` | Shared design system + components |
| `auth` | Auth/session utils |
| `permissions` | RBAC logic |
| `entities` | Entity definitions + helpers |
| `events` | Event pipeline logic |
| `analytics` | Behavioural analytics |
| `content` | Content engine components |
| `community` | Forum/project shared utilities |
| `profile` | Public profile rendering helpers |
| `workspace` | Shared workspace primitives (future) |
| `plugins` | Plugin runtime + SDK |
| `api` | Shared API helper clients |
| `config` | Config/env loaders |
| `theme` | Design tokens + colour/font systems |

---

# 5. Documentation Layer (/docs)

Contains:

- architecture docs  
- standards and rules  
- ERD + schema documentation  
- workflow definitions  
- API specifications  
- plugin system guides  

Codex MUST update docs before any implementation tasks.

---

# 6. Prompts Layer (/prompts)

```
/prompts/prompt-archive/<phase>/
```

This is where Codex stores:

- original user prompt  
- clarifications  
- final task interpretation  
- timestamp  
- task ID and phase  

Codex MUST archive every task before working on it.

---

# 7. Monorepo Tooling Requirements

The monorepo will use:

- **pnpm** → workspace management  
- **Turborepo** → task orchestration  
- **TypeScript** → language  
- **ESBuild** or **SWC** → fast builds  
- **Next.js (per app)** → frontend + backend routes  
- **Biome/ESLint** → linting  
- **Prettier** → formatting  
- **Vitest/Jest** → testing  

This is documented separately in:

`/docs/architecture/tooling.md`

---

# 8. Rules Codex MUST Follow

1. Codex MUST place all code in the correct folder as defined here.  
2. Codex MUST NOT create any new top-level folders.  
3. Codex MUST NOT move or rename folders without updating this file first.  
4. Codex MUST NOT violate boundaries between apps and packages.  
5. All shared logic MUST live in `/packages`.  
6. All user-facing routes MUST live in `/apps`.  
7. All documentation MUST be placed in `/docs`.  
8. All prompt history MUST be placed in `/prompts`.  

---

# 9. Summary

This monorepo structure ensures:

- clear boundaries  
- high modularity  
- long-term scalability  
- consistent development workflows  
- plugin-safe architecture  
- predictable project organisation  

All future development tasks MUST follow this structure precisely.

---

**End of Monorepo Structure**
