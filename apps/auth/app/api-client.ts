"use client";

import { trackAuthEvent } from "./telemetry";

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

const simulate = async <T>(fn: () => T): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return fn();
};

const shouldFail = (email?: string) => email && email.includes("fail");

export async function login(payload: AuthPayload): Promise<AuthResponse> {
  return simulate(() => {
    if (shouldFail(payload.email)) {
      throw new Error("invalid_credentials");
    }
    const res = {
      userId: "user-1",
      email: payload.email,
      name: "Sample User",
      locale: payload.locale ?? "en-US",
      sessionId: "sess-1"
    };
    trackAuthEvent("login", { locale: res.locale });
    return res;
  });
}

export async function signup(payload: AuthPayload): Promise<AuthResponse> {
  return simulate(() => {
    if (shouldFail(payload.email)) {
      throw new Error("email_exists");
    }
    const res = {
      userId: "user-2",
      email: payload.email,
      name: payload.name ?? "New User",
      locale: payload.locale ?? "en-US",
      sessionId: "sess-2"
    };
    trackAuthEvent("signup", {
      locale: res.locale,
      consent: payload.consent ?? false,
      analyticsOptIn: payload.analyticsOptIn ?? false
    });
    return res;
  });
}

export async function requestReset(payload: { email: string }) {
  return simulate(() => {
    if (!payload.email) throw new Error("invalid_request");
    trackAuthEvent("reset_request", {});
    return { success: true };
  });
}

export async function saveSettings(payload: SettingsPayload) {
  return simulate(() => {
    trackAuthEvent("settings_save", {
      locale: payload.locale,
      analyticsOptIn: payload.analyticsOptIn
    });
    return { success: true };
  });
}

// Tokens: assume server sets HTTP-only cookie; do not store tokens in localStorage.
// If headers are needed later, add a fetch wrapper that injects Authorization safely.
