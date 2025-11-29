import { NextResponse } from "next/server";
import { getSessionUser } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { validateCsrf } from "../lib/auth";

export async function POST(request: Request) {
  try {
    try {
      validateCsrf(request);
    } catch (err: any) {
      return NextResponse.json({ code: err?.message ?? "csrf_invalid", message: "Invalid CSRF token" }, { status: 403 });
    }
    const currentUser = await getSessionUser();
    if (!currentUser) {
      return NextResponse.json({ code: "unauthorized", message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { displayName, locale, analyticsOptIn } = body || {};
    const updated = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: displayName ? String(displayName) : undefined,
        locale: locale ? String(locale) : undefined,
        analyticsOptIn: analyticsOptIn !== undefined ? Boolean(analyticsOptIn) : undefined
      }
    });
    return NextResponse.json({
      userId: updated.id,
      email: updated.email,
      name: updated.name,
      locale: updated.locale
    });
  } catch (err: any) {
    return NextResponse.json({ code: "internal_error", message: "Unexpected error" }, { status: 500 });
  }
}
