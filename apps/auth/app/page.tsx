import Link from "next/link";
import { t } from "./i18n";

export default function LoginPage() {
  const messageId = "login-message";
  return (
    <div className="card stack" aria-labelledby="login-title">
      <h1 id="login-title">{t("loginTitle")}</h1>
      <div id={messageId} aria-live="assertive" className="sr-only"></div>
      <form className="stack">
        <div>
          <label htmlFor="email">{t("loginEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password">{t("loginPassword")}</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button type="submit" aria-describedby={messageId}>
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
