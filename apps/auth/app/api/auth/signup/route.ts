import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";
import { createSession, hashPassword, setSessionCookie } from "../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, locale, consent, analyticsOptIn } = body || {};
    if (!email || !password || !name) {
      return NextResponse.json({ code: "invalid_request", message: "Email, password, and name are required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (existing) {
      return NextResponse.json({ code: "email_exists", message: "Email already registered" }, { status: 409 });
    }
    const passwordHash = await hashPassword(String(password));
    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        passwordHash,
        name: String(name),
        locale: locale ? String(locale) : "en-US",
        consent: consent !== undefined ? Boolean(consent) : undefined,
        analyticsOptIn: analyticsOptIn !== undefined ? Boolean(analyticsOptIn) : undefined
      }
    });
    const session = await createSession(user.id);
    setSessionCookie(session.token, session.expiresAt);
    const res = NextResponse.json({
      userId: user.id,
      email: user.email,
      name: user.name,
      locale: user.locale ?? "en-US",
      sessionId: session.token
    });
    return res;
  } catch (err: any) {
    const code = err?.message === "email_exists" ? "email_exists" : "internal_error";
    const status = code === "email_exists" ? 409 : 500;
    const message = code === "email_exists" ? "Email already registered" : "Unexpected error";
    return NextResponse.json({ code, message }, { status });
  }
}
