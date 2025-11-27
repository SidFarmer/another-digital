# Plugin Manifest (Initial)

## Purpose
Define the manifest schema required for plugin registration and disclosure of capabilities/data access.

## Fields (minimum)
- `name` (string)
- `version` (semver)
- `extensionPoints` (array): e.g., `content.block`, `dashboard.sidebar`, `community.widget`
- `scopes` (array): permissions/data access requested (e.g., `content.read`, `content.block.render`, `community.widget`)
- `manifestUrl` or inline `config`
- `configSchema` (optional): JSON schema for plugin configuration
- `description` (string)
- `author` (name/contact), `homepage` (optional)
- `dataAccessDisclosure` (string): describe what data is accessed/why
- `localization` (optional): localized manifest fields (later)

## Requirements
- All scopes and extension points must be declared; undeclared access is denied.
- Manifest updates are versioned and validated; reject breaking/unsafe changes.
- Must include data access disclosure for consent/privacy.
- Scopes: enforce allowed list (e.g., `content.read`, `content.block.render`, `community.widget`, `dashboard.sidebar`).

## Example
```json
{
  "name": "chemistry-blocks",
  "version": "0.1.0",
  "extensionPoints": ["content.block"],
  "scopes": ["content.block.render"],
  "manifestUrl": "https://plugins.example.com/chemistry-blocks/manifest.json",
  "configSchema": {
    "type": "object",
    "properties": {
      "theme": { "type": "string", "enum": ["light", "dark"] }
    }
  },
  "description": "Renderable chemistry formula/structure blocks",
  "author": "Example Plugins Inc.",
  "dataAccessDisclosure": "Reads lesson context to render block; no external data access."
}
```

## Future
- Signing/verification of manifests, dependency declarations, localized manifest fields, validation of config defaults.***
