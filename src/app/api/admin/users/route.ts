import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || session.user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { userId, isPremium } = body as {
    userId: string;
    isPremium: boolean;
  };

  if (!userId || typeof isPremium !== "boolean") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isPremium },
    select: { id: true, isPremium: true },
  });

  return NextResponse.json(user);
}
