"use client";

import React, { createContext, useContext, useMemo } from "react";
import messagesJson from "./messages.json";

export type Messages = Record<string, string>;
export type Catalog = Record<string, Messages>;

const authMessages: Catalog = messagesJson as Catalog;
const DEFAULT_LOCALE = "en-US";

type I18nContextValue = {
  locale: string;
  messages: Catalog;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  messages: authMessages,
  t: (key: string) => authMessages[DEFAULT_LOCALE]?.[key] ?? key
});

export function I18nProvider({
  locale = DEFAULT_LOCALE,
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
