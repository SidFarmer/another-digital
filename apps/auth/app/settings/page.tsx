"use client";

import { useI18n } from "@another-digital/i18n";
import { saveSettings } from "../api-client";
import { useEffect, useRef, useState } from "react";
import { Banner } from "../components/Banner";

export default function SettingsPage() {
  const { t } = useI18n();
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
      await saveSettings({
        displayName: String(formData.get("displayName") || ""),
        locale: String(formData.get("locale") || "en-US"),
        analyticsOptIn: Boolean(formData.get("analyticsOptIn"))
      });
      setMessage(t("settingsSaved") ?? t("settingsSave"));
    } catch (err) {
      setError(t("settingsError") ?? "Unable to save settings");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card stack" aria-labelledby="settings-title">
      <h1 id="settings-title">{t("settingsTitle")}</h1>
      {error && (
        <Banner tone="error" ref={alertRef}>
          {error}
        </Banner>
      )}
      {message && <Banner tone="success">{message}</Banner>}
      <form className="stack" action={onSubmit}>
        <div>
          <label htmlFor="displayName">{t("settingsDisplayName")}</label>
          <input id="displayName" name="displayName" type="text" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="locale">{t("settingsLocale")}</label>
          <select id="locale" name="locale" defaultValue="en-US">
            <option value="en-US">{t("localeEnUS")}</option>
            <option value="en-GB">{t("localeEnGB")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="analyticsOptIn">
            <input id="analyticsOptIn" name="analyticsOptIn" type="checkbox" /> {t("settingsAnalytics")}
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? `${t("settingsSave")}...` : t("settingsSave")}
        </button>
      </form>
    </div>
  );
}
