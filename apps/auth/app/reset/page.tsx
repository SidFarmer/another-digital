"use client";

import Link from "next/link";
import { useI18n } from "@another-digital/i18n";
import { requestReset } from "../api-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Banner } from "../components/Banner";

export default function ResetRequestPage() {
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
      await requestReset({ email: String(formData.get("email") || "") });
      setMessage(t("resetSuccess") ?? t("resetSubmit"));
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
      {error && (
        <Banner tone="error" ref={alertRef}>
          {error}
        </Banner>
      )}
      {message && <Banner tone="success">{message}</Banner>}
      <form className="stack" action={onSubmit}>
        <div>
          <label htmlFor="email">{t("resetEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? `${t("resetSubmit")}...` : t("resetSubmit")}
        </button>
      </form>
      <div className="hint">
        <Link href="/">{t("resetBack")}</Link>
      </div>
    </div>
  );
}
