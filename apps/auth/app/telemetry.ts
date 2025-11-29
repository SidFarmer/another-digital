"use client";

import type { TelemetryEvent, TelemetryPayload } from "./lib/telemetry-schema";
import { validateTelemetry } from "./lib/telemetry-schema";

async function sendTelemetry(payload: TelemetryPayload) {
  const validation = validateTelemetry(payload as Record<string, unknown>);
  if (!validation.valid) {
    console.warn("[telemetry] invalid payload", validation.errors);
    return;
  }

  try {
    await fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.payload),
      keepalive: true
    });
  } catch (err) {
    // Fail closed: do not interrupt auth flows for telemetry failures.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[telemetry] send failed", err);
    }
  }
}

function buildPayload(event: TelemetryEvent, data: Record<string, unknown>): TelemetryPayload {
  // Strictly whitelist allowed fields to prevent PII leakage.
  const { locale, tenantId, consent, analyticsOptIn, version } = data;
  return {
    event,
    timestamp: new Date().toISOString(),
    locale: typeof locale === "string" ? locale : undefined,
    tenantId: typeof tenantId === "string" ? tenantId : undefined,
    consent: typeof consent === "boolean" ? consent : undefined,
    analyticsOptIn: typeof analyticsOptIn === "boolean" ? analyticsOptIn : undefined,
    version: typeof version === "string" ? version : undefined,
    source: "auth-app"
  };
}

function trackAuthEvent(event: TelemetryEvent, data: Record<string, unknown>) {
  const payload = buildPayload(event, data);
  void sendTelemetry(payload);
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
