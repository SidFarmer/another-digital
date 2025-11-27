import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="card stack" aria-labelledby="signup-title">
      <h1 id="signup-title">Create account</h1>
      <form className="stack">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required />
        </div>
        <div>
          <label htmlFor="locale">Preferred locale</label>
          <select id="locale" name="locale" defaultValue="en-US">
            <option value="en-US">English (US)</option>
          </select>
        </div>
        <div>
          <label htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" /> I agree to the terms and privacy notice
          </label>
        </div>
        <button type="submit">Create account</button>
      </form>
      <div className="hint">
        Already have an account? <Link href="/">Login</Link>
      </div>
    </div>
  );
}
