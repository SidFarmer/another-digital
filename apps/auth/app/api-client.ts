"use client";

import { trackLogin, trackResetRequest, trackSettingsSave, trackSignup } from "./telemetry";
import { getLocaleFromCookie } from "./lib/locale";

type AuthPayload = {
  email: string;
  password?: string;
  name?: string;
  locale?: string;
  consent?: boolean;
  analyticsOptIn?: boolean;
};

type SettingsPayload = {
  displayName?: string;
  locale?: string;
  analyticsOptIn?: boolean;
};

type AuthResponse = {
  userId: string;
  email: string;
  name?: string;
  locale?: string;
  sessionId?: string;
};

export async function getSession() {
  const res = await fetch("/api/auth/session", { method: "GET" });
  if (!res.ok) {
    return { authenticated: false };
  }
  return handle<{ authenticated: boolean; user?: { id: string; email: string; name?: string; locale?: string } }>(res);
}

function getCsrfToken() {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((c) => c.startsWith("csrfToken="));
  return match?.split("=", 2)[1];
}

function localeHeader() {
  const locale = getLocaleFromCookie();
  return locale ? { "x-locale": locale } : {};
}

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const code = (data as any)?.code;
    const message = (data as any)?.message;
    const err = new Error(message || code || "Request failed");
    (err as any).code = code;
    throw err;
  }
  return data as T;
}

export async function login(payload: AuthPayload): Promise<AuthResponse> {
  const csrf = getCsrfToken();
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(csrf ? { "x-csrf-token": csrf } : {}), ...localeHeader() },
    body: JSON.stringify(payload),
    ...(csrf ? { headers: { "Content-Type": "application/json", "x-csrf-token": csrf } } : {})
  });
  const data = await handle<AuthResponse>(res);
  trackLogin(data.locale);
  return data;
}

export async function signup(payload: AuthPayload): Promise<AuthResponse> {
  const csrf = getCsrfToken();
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(csrf ? { "x-csrf-token": csrf } : {}), ...localeHeader() },
    body: JSON.stringify(payload)
  });
  const data = await handle<AuthResponse>(res);
  trackSignup(data.locale, undefined, payload.consent ?? false, payload.analyticsOptIn ?? false);
  return data;
}

export async function requestReset(payload: { email: string }) {
  const csrf = getCsrfToken();
  const res = await fetch("/api/auth/reset/request", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(csrf ? { "x-csrf-token": csrf } : {}), ...localeHeader() },
    body: JSON.stringify(payload)
  });
  await handle(res);
  trackResetRequest();
  return { success: true };
}

export async function saveSettings(payload: SettingsPayload) {
  const csrf = getCsrfToken();
  const res = await fetch("/api/auth/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(csrf ? { "x-csrf-token": csrf } : {}), ...localeHeader() },
    body: JSON.stringify(payload)
  });
  await handle(res);
  trackSettingsSave(payload.locale, undefined, payload.analyticsOptIn);
  return { success: true };
}

export async function logout() {
  const csrf = getCsrfToken();
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { ...(csrf ? { "x-csrf-token": csrf } : {}), ...localeHeader() }
  });
  await handle(res);
  return { success: true };
}
