import { t } from "../i18n";

export default function SettingsPage() {
  return (
    <div className="card stack" aria-labelledby="settings-title">
      <h1 id="settings-title">{t("settingsTitle")}</h1>
      <form className="stack">
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
        <button type="submit">{t("settingsSave")}</button>
      </form>
    </div>
  );
}
