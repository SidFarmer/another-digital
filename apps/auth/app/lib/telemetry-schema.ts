const allowedEvents = ["login", "signup", "reset_request", "settings_save"] as const;

export type TelemetryEvent = (typeof allowedEvents)[number];

export type TelemetryPayload = {
  event: TelemetryEvent;
  timestamp: string;
  locale?: string;
  tenantId?: string;
  consent?: boolean;
  analyticsOptIn?: boolean;
  source?: string;
  version?: string;
};

type ValidationResult =
  | { valid: true; payload: TelemetryPayload }
  | { valid: false; errors: string[] };

function isIsoDate(value: unknown) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isOptionalString(value: unknown) {
  return value === undefined || typeof value === "string";
}

function isOptionalBoolean(value: unknown) {
  return value === undefined || typeof value === "boolean";
}

export function validateTelemetry(input: Record<string, unknown> | null | undefined): ValidationResult {
  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["payload must be an object"] };
  }

  const errors: string[] = [];
  const event = input["event"];
  const timestamp = input["timestamp"];
  const locale = input["locale"];
  const tenantId = input["tenantId"];
  const consent = input["consent"];
  const analyticsOptIn = input["analyticsOptIn"];
  const source = input["source"];
  const version = input["version"];

  if (typeof event !== "string" || !allowedEvents.includes(event as TelemetryEvent)) {
    errors.push("event must be one of: " + allowedEvents.join(", "));
  }

  if (!isIsoDate(timestamp)) {
    errors.push("timestamp must be an ISO date string");
  }

  if (!isOptionalString(locale)) errors.push("locale must be a string");
  if (!isOptionalString(tenantId)) errors.push("tenantId must be a string");
  if (!isOptionalBoolean(consent)) errors.push("consent must be a boolean");
  if (!isOptionalBoolean(analyticsOptIn)) errors.push("analyticsOptIn must be a boolean");
  if (!isOptionalString(source)) errors.push("source must be a string");
  if (!isOptionalString(version)) errors.push("version must be a string");

  if (errors.length) return { valid: false, errors };

  return {
    valid: true,
    payload: {
      event: event as TelemetryEvent,
      timestamp: timestamp as string,
      locale: locale as string | undefined,
      tenantId: tenantId as string | undefined,
      consent: consent as boolean | undefined,
      analyticsOptIn: analyticsOptIn as boolean | undefined,
      source: source as string | undefined,
      version: version as string | undefined
    }
  };
}
