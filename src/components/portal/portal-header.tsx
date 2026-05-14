"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";

interface PortalHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function PortalHeader({ user }: PortalHeaderProps) {
  return (
    <header className="border-b border-brand-200/40 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/portal">
          <Image
            src={logo}
            alt="Leidy Abello"
            width={120}
            height={40}
            className="h-auto w-[100px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          <Link href="/portal" className="hover:text-brand-500">
            Biblioteca
          </Link>
          <Link href="/" className="hover:text-brand-500">
            Sitio principal
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="hidden text-sm text-neutral-600 md:block">
            {user.name?.split(" ")[0]}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition hover:border-brand-300 hover:text-brand-500"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
