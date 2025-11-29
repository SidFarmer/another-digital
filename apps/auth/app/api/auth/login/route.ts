import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";
import { createSession, setCsrfCookie, setSessionCookie, validateCsrf, verifyPassword, generateCsrfToken } from "../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json({ code: "invalid_request", message: "Email and password are required" }, { status: 400 });
    }
    try {
      validateCsrf(request, false);
    } catch (err: any) {
      return NextResponse.json({ code: err?.message ?? "csrf_invalid", message: "Invalid CSRF token" }, { status: 403 });
    }
    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (!user) {
      return NextResponse.json({ code: "invalid_credentials", message: "Email or password is incorrect" }, { status: 401 });
    }
    const ok = await verifyPassword(String(password), user.passwordHash);
    if (!ok) {
      return NextResponse.json({ code: "invalid_credentials", message: "Email or password is incorrect" }, { status: 401 });
    }
    const session = await createSession(user.id);
    const csrfToken = generateCsrfToken();
    setSessionCookie(session.token, session.expiresAt);
    setCsrfCookie(csrfToken);
    const res = NextResponse.json({
      userId: user.id,
      email: user.email,
      name: user.name,
      locale: user.locale ?? "en-US",
      sessionId: session.token
    });
    return res;
  } catch (err: any) {
    const code = err?.message === "invalid_credentials" ? "invalid_credentials" : "internal_error";
    const status = code === "invalid_credentials" ? 401 : 500;
    const message = code === "invalid_credentials" ? "Email or password is incorrect" : "Unexpected error";
    return NextResponse.json({ code, message }, { status });
  }
}
