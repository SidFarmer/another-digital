import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="card stack" aria-labelledby="login-title">
      <h1 id="login-title">Login</h1>
      <form className="stack">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button type="submit">Login</button>
        <div className="hint">
          <Link href="/reset">Forgot password?</Link>
        </div>
      </form>
      <div className="hint">
        New here? <Link href="/signup">Create an account</Link>
      </div>
    </div>
  );
}
