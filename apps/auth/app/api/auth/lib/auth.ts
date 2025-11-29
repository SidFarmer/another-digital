import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const SESSION_COOKIE = "session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const RESET_TTL_MS = 1000 * 60 * 30; // 30 minutes

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await prisma.session.create({
    data: { token, userId, expiresAt }
  });
  return { token, expiresAt };
}

export async function getSessionUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { token } });
    return null;
  }
  return session.user;
}

export function setSessionCookie(token: string, expiresAt: Date) {
  cookies().set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt
  });
}

export async function clearSession(token?: string) {
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  cookies().set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0
  });
}

export async function createResetToken(userId: string) {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + RESET_TTL_MS);
  await prisma.resetToken.create({
    data: { token, userId, expiresAt }
  });
  return token;
}

export async function consumeResetToken(token: string) {
  const record = await prisma.resetToken.findUnique({ where: { token } });
  if (!record) throw new Error("reset_token_invalid");
  if (record.expiresAt.getTime() < Date.now()) {
    await prisma.resetToken.delete({ where: { token } });
    throw new Error("reset_token_expired");
  }
  await prisma.resetToken.delete({ where: { token } });
  return record.userId;
}
