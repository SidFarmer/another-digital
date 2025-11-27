import Link from "next/link";

export default function ResetRequestPage() {
  return (
    <div className="card stack" aria-labelledby="reset-title">
      <h1 id="reset-title">Reset password</h1>
      <form className="stack">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit">Send reset link</button>
      </form>
      <div className="hint">
        <Link href="/">Back to login</Link>
      </div>
    </div>
  );
}
