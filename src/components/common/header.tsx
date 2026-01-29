import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, WhatsappLogo, LinkedinLogo } from "@/components/ui/icons";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";

export async function Header() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const navLinks = settings?.navigation || [];
  const social = settings?.social;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-300/30 bg-brand-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt={settings?.title || "Leidy Abello"}
            width={140}
            height={48}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-500">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          {social?.instagram && (
            <Link
                href={social.instagram}
                aria-label="Instagram"
                className="rounded-full p-2 text-neutral-700 transition hover:text-brand-500"
            >
                <InstagramLogo size={20} />
            </Link>
          )}
          {social?.whatsapp && (
            <Link
                href={`https://wa.me/${social.whatsapp.replace(/\D/g, '')}`}
                aria-label="WhatsApp"
                className="rounded-full p-2 text-neutral-700 transition hover:text-brand-500"
            >
                <WhatsappLogo size={20} />
            </Link>
          )}
          {social?.linkedin && (
            <Link
                href={social.linkedin}
                aria-label="LinkedIn"
                className="rounded-full p-2 text-neutral-700 transition hover:text-brand-500"
            >
                <LinkedinLogo size={20} />
            </Link>
          )}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contacto">Agenda tu consulta</Link>
          </Button>
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
