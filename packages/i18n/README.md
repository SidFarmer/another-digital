# @another-digital/i18n

Shared i18n skeleton for apps. Provides a simple provider/hook and auth/settings bundles (en-US/en-GB/es-ES). Intended to be replaced/expanded with real localization pipeline later.

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
- Messages are stubbed for auth/settings; add more namespaces/locales as needed (see `messages.json`).
- Keep strings externalised; extend catalogs per app/locale. Run `pnpm i18n:check` to ensure keys match across locales.
- Pair with eslint-plugin-jsx-a11y and CI linting to enforce accessible UIs; add i18n checks to CI when available.
