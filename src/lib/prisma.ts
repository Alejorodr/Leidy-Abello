import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({ log: ["warn", "error"] });
}

export function getPrisma(): PrismaClient | null {
  // Lazy init: allow builds without DATABASE_URL and ensure prisma generate runs before build.
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}
