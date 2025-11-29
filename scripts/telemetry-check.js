#!/usr/bin/env node

/**
 * Basic telemetry schema check.
 * Validates sample payloads against a simple whitelist (no PII) to catch drift in CI.
 */

const allowedEvents = ["login", "signup", "reset_request", "settings_save"];

function validate(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return ["payload must be an object"];
  }
  if (!allowedEvents.includes(payload.event)) {
    errors.push(`event must be one of: ${allowedEvents.join(", ")}`);
  }
  if (typeof payload.timestamp !== "string" || Number.isNaN(Date.parse(payload.timestamp))) {
    errors.push("timestamp must be an ISO string");
  }
  const checkStr = (key) => {
    if (payload[key] !== undefined && typeof payload[key] !== "string") {
      errors.push(`${key} must be a string`);
    }
  };
  const checkBool = (key) => {
    if (payload[key] !== undefined && typeof payload[key] !== "boolean") {
      errors.push(`${key} must be a boolean`);
    }
  };
  ["locale", "tenantId", "source", "version"].forEach(checkStr);
  ["consent", "analyticsOptIn"].forEach(checkBool);
  return errors;
}

const samples = [
  {
    event: "login",
    timestamp: new Date().toISOString(),
    locale: "en-US",
    tenantId: "demo-tenant",
    source: "auth-app",
    version: "0.2.15"
  },
  {
    event: "signup",
    timestamp: new Date().toISOString(),
    locale: "fr-FR",
    consent: true,
    analyticsOptIn: false,
    source: "auth-app",
    version: "0.2.15"
  }
];

let hasFailure = false;
for (const sample of samples) {
  const errs = validate(sample);
  if (errs.length) {
    hasFailure = true;
    console.error("[telemetry-check] failed sample:", sample.event, errs);
  }
}

if (hasFailure) {
  process.exitCode = 1;
  console.error("Telemetry schema check failed.");
} else {
  console.log("Telemetry schema check passed.");
}
