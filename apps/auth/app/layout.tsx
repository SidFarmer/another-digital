import "./globals.css";
import type { Metadata } from "next";

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
            <div className="brand">Another Digital</div>
            <nav aria-label="Primary">
              <a href="/">Login</a>
              <a href="/signup">Signup</a>
              <a href="/reset">Reset</a>
              <a href="/settings">Settings</a>
            </nav>
            <form className="locale-switcher" aria-label="Locale switcher">
              <label htmlFor="shell-locale" className="sr-only">
                Locale
              </label>
              <select id="shell-locale" name="locale" defaultValue="en-US">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
              </select>
            </form>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="shell footer">
            <div className="footer-links" aria-label="Footer">
              <a href="/settings">Settings</a>
              <a href="/reset">Reset password</a>
              <a href="/signup">Create account</a>
            </div>
            <form className="locale-switcher" aria-label="Locale switcher">
              <label htmlFor="footer-locale" className="sr-only">
                Locale
              </label>
              <select id="footer-locale" name="locale" defaultValue="en-US">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
              </select>
            </form>
          </div>
        </footer>
      </body>
    </html>
  );
}
