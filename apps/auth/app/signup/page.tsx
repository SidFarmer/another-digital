"use client";

import Link from "next/link";
import { useI18n } from "@another-digital/i18n";
import { signup } from "../api-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Banner } from "../components/Banner";
import { REDIRECTS } from "../lib/redirects";

export default function SignupPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && alertRef.current) {
      alertRef.current.focus();
    }
  }, [error]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await signup({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
        name: String(formData.get("name") || ""),
        locale: String(formData.get("locale") || "en-US"),
        consent: Boolean(formData.get("consent")),
        analyticsOptIn: Boolean(formData.get("analyticsOptIn"))
      });
      setMessage(t("signupSuccess") ?? t("signupSubmit"));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-changed"));
      }
      router.push(REDIRECTS.signup); // dashboard placeholder
    } catch (err) {
      setError(t("signupError") ?? "Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card stack" aria-labelledby="signup-title">
      <h1 id="signup-title">{t("signupTitle")}</h1>
      {error && (
        <Banner tone="error" ref={alertRef}>
          {error}
        </Banner>
      )}
      {message && <Banner tone="success">{message}</Banner>}
      <form className="stack" action={onSubmit}>
        <div>
          <label htmlFor="name">{t("signupName")}</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="email">{t("signupEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password">{t("signupPassword")}</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required />
        </div>
        <div>
          <label htmlFor="locale">{t("signupLocale")}</label>
          <select id="locale" name="locale" defaultValue="en-US">
            <option value="en-US">{t("localeEnUS")}</option>
            <option value="en-GB">{t("localeEnGB")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" /> {t("signupConsent")}
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? `${t("signupSubmit")}...` : t("signupSubmit")}
        </button>
      </form>
      <div className="hint">
        {t("signupHaveAccount")} <Link href="/">{t("navLogin")}</Link>
      </div>
    </div>
  );
}
