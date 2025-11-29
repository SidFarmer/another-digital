"use client";

import Link from "next/link";
import { useI18n } from "@another-digital/i18n";
import { login } from "./api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { t } = useI18n();
  const messageId = "login-message";
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await login({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || "")
      });
      setMessage(t("loginSubmit"));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-changed"));
      }
      router.push("/"); // dashboard placeholder
    } catch (err) {
      setError(t("loginError") ?? "Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card stack" aria-labelledby="login-title">
      <h1 id="login-title">{t("loginTitle")}</h1>
      <div id={messageId} aria-live="assertive" className="sr-only">
        {message || error || ""}
      </div>
      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}
      {message && (
        <div role="status" className="hint">
          {message}
        </div>
      )}
      <form className="stack" action={onSubmit}>
        <div>
          <label htmlFor="email">{t("loginEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password">{t("loginPassword")}</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button type="submit" aria-describedby={messageId} disabled={loading}>
          {t("loginSubmit")}
        </button>
        <div className="hint">
          <Link href="/reset">{t("loginForgot")}</Link>
        </div>
      </form>
      <div className="hint">
        {t("loginNewHere")} <Link href="/signup">{t("loginCreate")}</Link>
      </div>
    </div>
  );
}
