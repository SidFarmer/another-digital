export default function SettingsPage() {
  return (
    <div className="card stack" aria-labelledby="settings-title">
      <h1 id="settings-title">Settings</h1>
      <form className="stack">
        <div>
          <label htmlFor="displayName">Display name</label>
          <input id="displayName" name="displayName" type="text" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="locale">Locale</label>
          <select id="locale" name="locale" defaultValue="en-US">
            <option value="en-US">English (US)</option>
          </select>
        </div>
        <div>
          <label htmlFor="analyticsOptIn">
            <input id="analyticsOptIn" name="analyticsOptIn" type="checkbox" /> Allow analytics (consent-aware)
          </label>
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
