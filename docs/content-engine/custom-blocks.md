# Custom & Interactive Blocks

## Overview
Interactive blocks support STEM/CS use cases. Custom blocks can be added later via plugins.

## Initial Interactive Blocks
- Math/LaTeX: render mathematical expressions.
- Chemistry: display formulas/structures.
- Physics/Biology visuals: placeholder visualizations with data payloads.
- Code Sandbox: run code snippets in a sandboxed environment; no network; configurable timeout/readonly.
- Media/YouTube: embed videos/images with sanitized URLs.

## Configuration (per block type)
- Math: `expression` string.
- Chemistry: `formula`, optional `structure`.
- Physics/Bio: `description`, `data` payload.
- Code Sandbox: `language`, `code`, `sandboxConfig` (timeout, deps, readonly).
- Media: `url`, `provider`, `caption`.

## Safety & Validation
- Sanitize all inputs; whitelist media providers; sandbox code execution.
- Enforce size/time limits for sandbox; no network by default.
- Validate formats (LaTeX, SMILES, etc.) before render.

## Extensibility
- Custom placeholders allow new types; plugin extension points (later) will register additional blocks with schemas and UI configs.
- Document new block schemas in this file when added.***
