import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL is set for Prisma engines (fallback to local SQLite).
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}
const dbUrl = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: { db: { url: dbUrl } }
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
