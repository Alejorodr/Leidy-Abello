"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
  order?: number;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-full p-2 text-neutral-700 transition hover:text-brand-300 md:hidden"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={20} /> : <List size={20} />}
      </button>

      {isMenuOpen && (
        <nav className="absolute left-0 top-full w-full border-t border-brand-300/30 bg-brand-50 md:hidden">
          <div className="mx-auto flex flex-col items-center gap-4 px-6 py-6 text-sm font-medium text-neutral-700">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
                Agenda tu consulta
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
