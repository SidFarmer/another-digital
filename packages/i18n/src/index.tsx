// @ts-nocheck
"use client";

import React, { createContext, useContext, useMemo } from "react";

export type Messages = Record<string, string>;
export type Catalog = Record<string, Messages>;

const authMessages: Catalog = {
  "en-US": {
    brand: "Another Digital",
    navLogin: "Login",
    navSignup: "Signup",
    navReset: "Reset",
    navSettings: "Settings",
    navLogout: "Logout",
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
    loginError: "Email or password is incorrect",
    signupTitle: "Create account",
    signupName: "Name",
    signupEmail: "Email",
    signupPassword: "Password",
    signupLocale: "Preferred locale",
    signupConsent: "I agree to the terms and privacy notice",
    signupSubmit: "Create account",
    signupHaveAccount: "Already have an account?",
    signupError: "Unable to create account",
    resetTitle: "Reset password",
    resetEmail: "Email",
    resetSubmit: "Send reset link",
    resetBack: "Back to login",
    resetError: "Unable to send reset link",
    settingsTitle: "Settings",
    settingsDisplayName: "Display name",
    settingsLocale: "Locale",
    settingsAnalytics: "Allow analytics (consent-aware)",
    settingsSave: "Save changes",
    settingsSaved: "Settings saved",
    settingsError: "Unable to save settings"
  },
  "en-GB": {
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
    loginError: "Email or password is incorrect",
    signupTitle: "Create account",
    signupName: "Name",
    signupEmail: "Email",
    signupPassword: "Password",
    signupLocale: "Preferred locale",
    signupConsent: "I agree to the terms and privacy notice",
    signupSubmit: "Create account",
    signupHaveAccount: "Already have an account?",
    signupError: "Unable to create account",
    resetTitle: "Reset password",
    resetEmail: "Email",
    resetSubmit: "Send reset link",
    resetBack: "Back to login",
    resetError: "Unable to send reset link",
    settingsTitle: "Settings",
    settingsDisplayName: "Display name",
    settingsLocale: "Locale",
    settingsAnalytics: "Allow analytics (consent-aware)",
    settingsSave: "Save changes",
    settingsSaved: "Settings saved",
    settingsError: "Unable to save settings"
  }
};

type I18nContextValue = {
  locale: string;
  messages: Catalog;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en-US",
  messages: authMessages,
  t: (key: string) => authMessages["en-US"]?.[key] ?? key
});

export function I18nProvider({
  locale = "en-US",
  messages = authMessages,
  children
}: {
  locale?: string;
  messages?: Catalog;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(() => {
    const fallback = messages["en-US"] ?? {};
    const current = messages[locale] ?? fallback;
    const t = (key: string) => current[key] ?? fallback[key] ?? key;
    return { locale, messages, t };
  }, [locale, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const i18nCatalogs = {
  auth: authMessages
};

export { authMessages };
