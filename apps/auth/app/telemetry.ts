"use client";

import type { TelemetryEvent, TelemetryPayload } from "./lib/telemetry-schema";
import { validateTelemetry } from "./lib/telemetry-schema";

type TelemetryContext = {
  locale?: string;
  tenantId?: string;
  consent?: boolean;
  analyticsOptIn?: boolean;
  version?: string;
};

let context: TelemetryContext = { version: process.env.NEXT_PUBLIC_APP_VERSION };

export function setTelemetryContext(next: TelemetryContext) {
  context = {
    ...context,
    ...(typeof next.locale === "string" ? { locale: next.locale } : {}),
    ...(typeof next.tenantId === "string" ? { tenantId: next.tenantId } : {}),
    ...(typeof next.consent === "boolean" ? { consent: next.consent } : {}),
    ...(typeof next.analyticsOptIn === "boolean" ? { analyticsOptIn: next.analyticsOptIn } : {}),
    ...(typeof next.version === "string" ? { version: next.version } : {})
  };
}

async function sendTelemetry(payload: TelemetryPayload) {
  const validation = validateTelemetry(payload as Record<string, unknown>);
  if (!validation.valid) {
    console.warn("[telemetry] invalid payload", validation.errors);
    return;
  }

  const maxAttempts = 3;
  let delay = 150;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.payload),
        keepalive: true
      });
      if (res.ok) return;
      if (res.status >= 500 && attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      if (process.env.NODE_ENV !== "production") {
        console.warn("[telemetry] non-ok response", res.status);
      }
      return;
    } catch (err) {
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      if (process.env.NODE_ENV !== "production") {
        console.warn("[telemetry] send failed", err);
      }
    }
  }
}

function buildPayload(event: TelemetryEvent, data: Record<string, unknown>): TelemetryPayload {
  // Strictly whitelist allowed fields to prevent PII leakage.
  const merged = { ...context, ...data };
  const { locale, tenantId, consent, analyticsOptIn, version, source } = merged;
  return {
    event,
    timestamp: new Date().toISOString(),
    locale: typeof locale === "string" ? locale : undefined,
    tenantId: typeof tenantId === "string" ? tenantId : undefined,
    consent: typeof consent === "boolean" ? consent : undefined,
    analyticsOptIn: typeof analyticsOptIn === "boolean" ? analyticsOptIn : undefined,
    version: typeof version === "string" ? version : undefined,
    source: typeof source === "string" ? source : "auth-app"
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
