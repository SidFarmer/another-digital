"use client";

import Link from "next/link";
import { useI18n } from "@another-digital/i18n";

export default function ResetRequestPage() {
  const { t } = useI18n();
  const messageId = "reset-message";
  return (
    <div className="card stack" aria-labelledby="reset-title">
      <h1 id="reset-title">{t("resetTitle")}</h1>
      <div id={messageId} aria-live="polite" className="sr-only"></div>
      <form className="stack">
        <div>
          <label htmlFor="email">{t("resetEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit" aria-describedby={messageId}>
          {t("resetSubmit")}
        </button>
      </form>
      <div className="hint">
        <Link href="/">{t("resetBack")}</Link>
      </div>
    </div>
  );
}
