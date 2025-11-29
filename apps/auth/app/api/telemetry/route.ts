import { NextResponse } from "next/server";
import { validateTelemetry } from "../../lib/telemetry-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateTelemetry(body as Record<string, unknown> | null | undefined);

  if (!validation.valid) {
    return NextResponse.json({ message: "Invalid telemetry payload", errors: validation.errors }, { status: 400 });
  }

  // In a real deployment, forward to an external telemetry sink here.
  // We intentionally avoid storing or logging PII; payload is already scrubbed/whitelisted.
  if (process.env.NODE_ENV !== "production") {
    console.info("[telemetry]", validation.payload);
  }

  return new NextResponse(null, { status: 204 });
}
