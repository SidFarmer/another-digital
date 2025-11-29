import { NextResponse } from "next/server";
import { clearSession } from "../lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  // Logout invalidates session and CSRF tokens.
  const token = cookies().get("session")?.value;
  await clearSession(token);
  return NextResponse.json({ success: true });
}
