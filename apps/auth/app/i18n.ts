type Messages = Record<string, string>;

const enUS: Messages = {
  brand: "Another Digital",
  navLogin: "Login",
  navSignup: "Signup",
  navReset: "Reset",
  navSettings: "Settings",
  footerSettings: "Settings",
  footerReset: "Reset password",
  footerSignup: "Create account",
  localeLabel: "Locale",
  localeEnUS: "English (US)",
  localeEnGB: "English (UK)",
  loginTitle: "Login",
  loginEmail: "Email",
  loginPassword: "Password",
  loginSubmit: "Login",
  loginForgot: "Forgot password?",
  loginCreate: "Create an account",
  loginNewHere: "New here?",
  signupTitle: "Create account",
  signupName: "Name",
  signupEmail: "Email",
  signupPassword: "Password",
  signupLocale: "Preferred locale",
  signupConsent: "I agree to the terms and privacy notice",
  signupSubmit: "Create account",
  signupHaveAccount: "Already have an account?",
  resetTitle: "Reset password",
  resetEmail: "Email",
  resetSubmit: "Send reset link",
  resetBack: "Back to login",
  settingsTitle: "Settings",
  settingsDisplayName: "Display name",
  settingsLocale: "Locale",
  settingsAnalytics: "Allow analytics (consent-aware)",
  settingsSave: "Save changes"
};

const catalogs: Record<string, Messages> = {
  "en-US": enUS,
  "en-GB": enUS
};

export function t(key: keyof typeof enUS, locale: string = "en-US") {
  return catalogs[locale]?.[key] ?? enUS[key];
}
