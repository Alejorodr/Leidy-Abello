"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isPremium: boolean;
  createdAt: Date;
}

export function AdminUserList({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial);
  const [isPending, startTransition] = useTransition();

  async function togglePremium(userId: string, current: boolean) {
    startTransition(async () => {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isPremium: !current }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, isPremium: !current } : u,
          ),
        );
      }
    });
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-neutral-100 bg-white shadow-soft">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left text-xs uppercase tracking-widest text-neutral-400">
            <th className="px-6 py-4 font-medium">Usuaria</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Registro</th>
            <th className="px-6 py-4 font-medium">Acceso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {users.map((user) => (
            <tr key={user.id} className="transition hover:bg-neutral-50">
              <td className="flex items-center gap-3 px-6 py-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? ""}
                    width={32}
                    height={32}
                    className="shrink-0 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-medium text-brand-600">
                    {user.name?.[0] ?? "?"}
                  </div>
                )}
                <span className="font-medium text-neutral-800">
                  {user.name ?? "—"}
                </span>
              </td>
              <td className="px-6 py-4 text-neutral-500">{user.email}</td>
              <td className="px-6 py-4 text-neutral-400">
                {new Date(user.createdAt).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => togglePremium(user.id, user.isPremium)}
                  disabled={isPending}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition",
                    user.isPremium
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-neutral-200 text-neutral-500 hover:border-brand-300 hover:text-brand-500",
                    isPending && "opacity-50",
                  )}
                >
                  {user.isPremium ? "Premium ✓" : "Libre"}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-12 text-center text-neutral-400"
              >
                No hay usuarias registradas todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
