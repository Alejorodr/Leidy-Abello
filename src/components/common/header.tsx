"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";

import logo from "../../../images/Logo_Leidy_Abello.png";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/blog", label: "Blog" },
  { href: "/podcast", label: "Podcast" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-brand-300/30 bg-brand-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Logo de Leidy Abello"
            width={140}
            height={48}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="https://instagram.com"
            aria-label="Instagram"
            className="rounded-full p-2 text-neutral-700 transition hover:text-brand-300"
          >
            <InstagramLogo size={20} weight="regular" />
          </Link>
          {/* TODO: Actualizar el número de WhatsApp antes de producción. */}
          <Link
            href="https://wa.me/573000000000"
            aria-label="WhatsApp"
            className="rounded-full p-2 text-neutral-700 transition hover:text-brand-300"
          >
            <WhatsappLogo size={20} weight="regular" />
          </Link>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contacto">Agenda tu consulta</Link>
          </Button>
          <button
            type="button"
            className="rounded-full p-2 text-neutral-700 transition hover:text-brand-300 md:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav className="border-t border-brand-300/30 bg-brand-50 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-6 text-sm font-medium text-neutral-700">
            {navLinks.map((link) => (
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
      ) : null}
    </header>
  );
}
