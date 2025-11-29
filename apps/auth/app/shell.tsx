"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { I18nProvider, authMessages, useI18n } from "@another-digital/i18n";
import { logout, getSession } from "./api-client";
import { REDIRECTS } from "./lib/redirects";
import { getLocaleFromCookie, setLocaleCookie, getDefaultLocale } from "./lib/locale";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [sessionState, setSessionState] = useState<{ authenticated: boolean; email?: string }>({
    authenticated: false
  });
  const [locale, setLocale] = useState<string>(getDefaultLocale());

  useEffect(() => {
    let mounted = true;
    setLocale(getLocaleFromCookie());
    const refreshSession = () => {
      getSession()
        .then((res) => {
          if (!mounted) return;
          if (res.authenticated && res.user) {
            setSessionState({ authenticated: true, email: res.user.email });
          } else {
            setSessionState({ authenticated: false });
          }
        })
        .catch(() => {
          if (mounted) setSessionState({ authenticated: false });
        });
    };

    refreshSession();
    const handler = () => refreshSession();
    window.addEventListener("auth-changed", handler);

    return () => {
      mounted = false;
      window.removeEventListener("auth-changed", handler);
    };
  }, []);

  function handleLocaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setLocale(next);
    setLocaleCookie(next);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
      setSessionState({ authenticated: false });
      router.push(REDIRECTS.logout);
    }
  }

  return (
    <>
      <header>
        <div className="shell">
          <Link href="/" className="brand">
            {t("brand")}
          </Link>
          <nav aria-label="Primary">
            <Link href="/">{t("navLogin")}</Link>
            <Link href="/signup">{t("navSignup")}</Link>
            <Link href="/reset">{t("navReset")}</Link>
            <Link href="/settings">{t("navSettings")}</Link>
            {sessionState.authenticated ? (
              <button type="button" onClick={handleLogout} disabled={loggingOut} className="link-button">
                {loggingOut ? `${t("navLogout")}...` : t("navLogout")}
              </button>
            ) : null}
          </nav>
          <div className="session-indicator">
            {sessionState.authenticated ? `Signed in as ${sessionState.email}` : "Not signed in"}
          </div>
          <form className="locale-switcher" aria-label={t("localeLabel")}>
            <label htmlFor="shell-locale" className="sr-only">
              {t("localeLabel")}
            </label>
            <select id="shell-locale" name="locale" value={locale} onChange={handleLocaleChange}>
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
            {sessionState.authenticated ? (
              <button type="button" onClick={handleLogout} disabled={loggingOut} className="link-button">
                {loggingOut ? `${t("navLogout")}...` : t("navLogout")}
              </button>
            ) : null}
          </div>
          <form className="locale-switcher" aria-label={t("localeLabel")}>
            <label htmlFor="footer-locale" className="sr-only">
              {t("localeLabel")}
            </label>
            <select id="footer-locale" name="locale" value={locale} onChange={handleLocaleChange}>
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
  const [locale, setLocale] = useState<string>(getDefaultLocale());

  useEffect(() => {
    setLocale(getLocaleFromCookie());
    const handler = () => setLocale(getLocaleFromCookie());
    window.addEventListener("locale-changed", handler);
    return () => window.removeEventListener("locale-changed", handler);
  }, []);

  return (
    <I18nProvider locale={locale} messages={authMessages}>
      <ShellContent>{children}</ShellContent>
    </I18nProvider>
  );
}
