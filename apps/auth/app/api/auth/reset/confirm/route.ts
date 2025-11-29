import { NextResponse } from "next/server";
import { consumeResetToken, hashPassword, validateCsrf } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body || {};
    if (!token || !newPassword) {
      return NextResponse.json({ code: "invalid_request", message: "Token and newPassword are required" }, { status: 400 });
    }
    try {
      validateCsrf(request);
    } catch (err: any) {
      return NextResponse.json({ code: err?.message ?? "csrf_invalid", message: "Invalid CSRF token" }, { status: 403 });
    }
    const userId = await consumeResetToken(String(token));
    const passwordHash = await hashPassword(String(newPassword));
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    const code = err?.message;
    if (code === "reset_token_expired") {
      return NextResponse.json({ code, message: "Reset token expired" }, { status: 410 });
    }
    if (code === "reset_token_invalid") {
      return NextResponse.json({ code, message: "Reset token invalid" }, { status: 422 });
    }
    return NextResponse.json({ code: "internal_error", message: "Unexpected error" }, { status: 500 });
  }
}
