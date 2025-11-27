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
            <nav>
              <a href="/">Login</a>
              <a href="/signup">Signup</a>
              <a href="/reset">Reset</a>
              <a href="/settings">Settings</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
