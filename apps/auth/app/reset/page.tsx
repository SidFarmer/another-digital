"use client";

import Link from "next/link";
import { useI18n } from "@another-digital/i18n";
import { requestReset } from "../api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetRequestPage() {
  const { t } = useI18n();
  const messageId = "reset-message";
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await requestReset({ email: String(formData.get("email") || "") });
      setMessage(t("resetSubmit"));
      router.push("/"); // back to login placeholder
    } catch (err) {
      setError(t("resetError") ?? "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card stack" aria-labelledby="reset-title">
      <h1 id="reset-title">{t("resetTitle")}</h1>
      <div id={messageId} aria-live="polite" className="sr-only">
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
          <label htmlFor="email">{t("resetEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit" aria-describedby={messageId} disabled={loading}>
          {t("resetSubmit")}
        </button>
      </form>
      <div className="hint">
        <Link href="/">{t("resetBack")}</Link>
      </div>
    </div>
  );
}
