import Link from "next/link";
import { t } from "../i18n";

export default function ResetRequestPage() {
  return (
    <div className="card stack" aria-labelledby="reset-title">
      <h1 id="reset-title">{t("resetTitle")}</h1>
      <form className="stack">
        <div>
          <label htmlFor="email">{t("resetEmail")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit">{t("resetSubmit")}</button>
      </form>
      <div className="hint">
        <Link href="/">{t("resetBack")}</Link>
      </div>
    </div>
  );
}
