# @another-digital/i18n

Shared i18n skeleton for apps. Provides a simple provider/hook and sample auth/settings bundles (en-US/en-GB). Intended to be replaced/expanded with real localization pipeline later.

## Usage
```tsx
import { I18nProvider, useI18n, authMessages } from "@another-digital/i18n";

function AppShell({ children }) {
  const { t } = useI18n();
  return <div>{t("navLogin")}</div>;
}

export function Root({ children }) {
  return (
    <I18nProvider locale="en-US" messages={authMessages}>
      <AppShell>{children}</AppShell>
    </I18nProvider>
  );
}
```

## Notes
- Messages are stubbed for auth/settings; add more namespaces as needed.
- Keep strings externalised; extend catalogs per app/locale.
- Pair with eslint-plugin-jsx-a11y and CI linting to enforce accessible UIs.
