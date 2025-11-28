import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { t } from "./i18n";

export const metadata: Metadata = {
  title: "Another Digital Auth",
  description: "Auth and settings skeleton for the platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="shell">
            <div className="brand">{t("brand")}</div>
            <nav aria-label="Primary">
              <Link href="/">{t("navLogin")}</Link>
              <Link href="/signup">{t("navSignup")}</Link>
              <Link href="/reset">{t("navReset")}</Link>
              <Link href="/settings">{t("navSettings")}</Link>
            </nav>
            <form className="locale-switcher" aria-label="Locale switcher">
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
            <form className="locale-switcher" aria-label="Locale switcher">
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
      </body>
    </html>
  );
}
