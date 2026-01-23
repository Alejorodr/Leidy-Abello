import { afterEach, describe, expect, test } from "vitest";

import { getPrisma } from "./prisma";

describe("getPrisma", () => {
  const originalEnv = process.env.DATABASE_URL;

  afterEach(async () => {
    process.env.DATABASE_URL = originalEnv;
    const prisma = getPrisma();
    if (prisma) {
      await prisma.$disconnect();
    }
  });

  test("returns null when DATABASE_URL is missing", () => {
    delete process.env.DATABASE_URL;
    expect(getPrisma()).toBeNull();
  });

  test("returns PrismaClient when DATABASE_URL is set", () => {
    process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
    expect(getPrisma()).not.toBeNull();
  });
});
