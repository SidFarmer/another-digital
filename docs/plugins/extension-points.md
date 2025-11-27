# Extension Points (Initial)

## Available Slots (groundwork)
- Content block: plugin can provide renderable block types within lessons.
- Dashboard sidebar: plugin can render widgets in shell sidebars (tenant/user context).
- Community widget: plugin can add widgets to forum threads/posts.

## Contracts
- Declared via manifest `extensionPoints`.
- Each slot defines props/data available to the plugin; must respect tenant/permission context and i18n/a11y conventions.
- UI must use shared theming tokens; strings externalised via i18n.

## Lifecycle
- Register extension points in manifest; activate per tenant.
- Runtime loads plugin components in sandbox; scopes enforced; resources limited.

## Future
- Additional slots (toolbar actions, profile widgets, analytics panels); richer data contracts; layout customization hooks.***
