"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  InstagramLogo,
  WhatsappLogo,
  LinkedinLogo,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";

interface NavLink {
  label: string;
  href: string;
  order?: number;
}

interface Social {
  instagram?: string;
  whatsapp?: string;
  linkedin?: string;
  email?: string;
}

interface ScrollAwareHeaderProps {
  title: string;
  navLinks: NavLink[];
  social?: Social;
}

export function ScrollAwareHeader({
  title,
  navLinks,
  social,
}: ScrollAwareHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-50/92 border-b border-brand-300/30 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={logo}
            alt={title}
            width={140}
            height={48}
            priority
            className="h-auto w-[120px] md:w-[140px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:text-brand-500 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {social?.instagram && (
            <Link
              href={social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-neutral-600 transition hover:text-brand-500"
            >
              <InstagramLogo size={20} />
            </Link>
          )}
          {social?.whatsapp && (
            <Link
              href={`https://wa.me/${social.whatsapp.replace(/\D/g, "")}`}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-neutral-600 transition hover:text-brand-500"
            >
              <WhatsappLogo size={20} />
            </Link>
          )}
          {social?.linkedin && (
            <Link
              href={social.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-neutral-600 transition hover:text-brand-500"
            >
              <LinkedinLogo size={20} />
            </Link>
          )}
          <Button asChild className="ml-2 hidden md:inline-flex">
            <Link href="/contacto">Agenda tu consulta</Link>
          </Button>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
