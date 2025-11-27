# Plugins Overview

## Purpose
Describe the plugin system: registry, manifests, scopes, and extension points.

## Components
- Registry: stores plugin metadata, versions, scopes, activation state.
- Manifest: declares capabilities, extension points, permissions.
- Sandbox/API: controlled runtime surface (stub initially).
- Extension points: content blocks, dashboard sidebars, community widgets, others later.

## Principles
- Secure by default: limited scopes, sandboxed execution.
- Consent/data disclosure: plugins must declare data access.
- Tenant-aware activation and configuration.

## Docs
- `overview.md` — high-level concept (to fill)
- `plugin-manifest.md` — manifest schema
- `plugin-development-api.md` — developer-facing API
- `sandbox-api.md` — sandbox/runtime interface
- `extension-points.md` — available extension hooks
