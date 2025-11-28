import Link from "next/link";
import { t } from "../i18n";

export default function SignupPage() {
  return (
    <div className="card stack" aria-labelledby="signup-title">
      <h1 id="signup-title">{t("signupTitle")}</h1>
      <form className="stack">
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
        <button type="submit">{t("signupSubmit")}</button>
      </form>
      <div className="hint">
        {t("signupHaveAccount")} <Link href="/">{t("navLogin")}</Link>
      </div>
    </div>
  );
}
