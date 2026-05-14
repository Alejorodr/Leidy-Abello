import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AdminUserList } from "@/components/portal/admin-user-list";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";

export const metadata = { title: "Admin · Portal" };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || session.user.email !== adminEmail) {
    redirect("/portal");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      isPremium: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b border-brand-200/40 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <Link href="/portal">
            <Image
              src={logo}
              alt="Leidy Abello"
              width={100}
              height={36}
              className="h-auto w-[90px]"
            />
          </Link>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
            Panel de administración
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <div className="mb-8 space-y-1">
          <h1 className="font-serif text-3xl font-medium text-neutral-900">
            Clientas registradas
          </h1>
          <p className="text-neutral-500">
            {users.length} usuaria{users.length !== 1 ? "s" : ""} ·{" "}
            {users.filter((u) => u.isPremium).length} con acceso premium
          </p>
        </div>

        <AdminUserList users={users} />
      </main>
    </div>
  );
}
