import "./globals.css";
import type { Metadata } from "next";
import Shell from "./shell";

export const metadata: Metadata = {
  title: "Another Digital Auth",
  description: "Auth and settings skeleton for the platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
