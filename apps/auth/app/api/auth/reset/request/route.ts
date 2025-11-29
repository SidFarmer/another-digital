import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { createResetToken } from "../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body || {};
    if (!email) {
      return NextResponse.json({ code: "invalid_request", message: "Email is required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (user) {
      await createResetToken(user.id);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ code: "internal_error", message: "Unexpected error" }, { status: 500 });
  }
}
