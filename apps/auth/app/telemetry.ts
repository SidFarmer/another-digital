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
