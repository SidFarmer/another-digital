const LOCALE_COOKIE = "locale";
const DEFAULT_LOCALE = "en-US";

export function getLocaleFromCookie() {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${LOCALE_COOKIE}=`));
  return match?.split("=", 2)[1] || DEFAULT_LOCALE;
}

export function setLocaleCookie(locale: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; samesite=lax`;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("locale-changed"));
  }
}

export function getDefaultLocale() {
  return DEFAULT_LOCALE;
}
