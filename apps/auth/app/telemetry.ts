"use client";

type AuthEvent =
  | "login"
  | "signup"
  | "reset_request"
  | "settings_save";

type AuthEventData = Record<string, unknown>;

export function trackAuthEvent(event: AuthEvent, data: AuthEventData) {
  // Placeholder emitter; replace with real telemetry client later.
  // Keep side effects minimal to avoid breaking CI.
  if (process.env.NODE_ENV !== "production") {
    console.debug("[auth-event]", event, data);
  }
}

export function trackLogin(locale?: string, tenantId?: string) {
  trackAuthEvent("login", { locale, tenantId });
}

export function trackSignup(locale?: string, tenantId?: string, consent?: boolean, analyticsOptIn?: boolean) {
  trackAuthEvent("signup", { locale, tenantId, consent, analyticsOptIn });
}

export function trackResetRequest(locale?: string, tenantId?: string) {
  trackAuthEvent("reset_request", { locale, tenantId });
}

export function trackSettingsSave(locale?: string, tenantId?: string, analyticsOptIn?: boolean) {
  trackAuthEvent("settings_save", { locale, tenantId, analyticsOptIn });
}
