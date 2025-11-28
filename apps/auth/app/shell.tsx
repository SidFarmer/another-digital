"use client";

import Link from "next/link";
import { I18nProvider, authMessages, useI18n } from "@another-digital/i18n";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <>
      <header>
        <div className="shell">
          <div className="brand">{t("brand")}</div>
          <nav aria-label="Primary">
            <Link href="/">{t("navLogin")}</Link>
            <Link href="/signup">{t("navSignup")}</Link>
            <Link href="/reset">{t("navReset")}</Link>
            <Link href="/settings">{t("navSettings")}</Link>
          </nav>
          <form className="locale-switcher" aria-label={t("localeLabel")}>
            <label htmlFor="shell-locale" className="sr-only">
              {t("localeLabel")}
            </label>
            <select id="shell-locale" name="locale" defaultValue="en-US">
              <option value="en-US">{t("localeEnUS")}</option>
              <option value="en-GB">{t("localeEnGB")}</option>
            </select>
          </form>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="shell footer">
          <div className="footer-links" aria-label="Footer">
            <Link href="/settings">{t("footerSettings")}</Link>
            <Link href="/reset">{t("footerReset")}</Link>
            <Link href="/signup">{t("footerSignup")}</Link>
          </div>
          <form className="locale-switcher" aria-label={t("localeLabel")}>
            <label htmlFor="footer-locale" className="sr-only">
              {t("localeLabel")}
            </label>
            <select id="footer-locale" name="locale" defaultValue="en-US">
              <option value="en-US">{t("localeEnUS")}</option>
              <option value="en-GB">{t("localeEnGB")}</option>
            </select>
          </form>
        </div>
      </footer>
    </>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider locale="en-US" messages={authMessages}>
      <ShellContent>{children}</ShellContent>
    </I18nProvider>
  );
}
