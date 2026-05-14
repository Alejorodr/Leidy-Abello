import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";
import {
  InstagramLogo,
  WhatsappLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@/components/ui/icons";
import { NewsletterForm } from "./newsletter-form";
import logo from "../../../public/images/Logo_Leidy_Abello.webp";

export async function Footer() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const navLinks = settings?.navigation || [];
  const social = settings?.social;

  return (
    <footer className="border-t border-brand-200/30 bg-neutral-50">
      {/* Newsletter strip */}
      <div className="border-b border-brand-200/30 bg-brand-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
          <div className="space-y-1">
            <p className="font-serif text-lg font-medium text-neutral-900">
              Notas con intención
            </p>
            <p className="text-sm text-neutral-500">
              Reflexiones sobre imagen, bienestar y estética consciente directo
              en tu bandeja.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr] md:px-10">
        {/* Brand column */}
        <div className="space-y-6">
          <Link href="/">
            <Image
              src={logo}
              alt={settings?.title ?? "Leidy Abello"}
              width={140}
              height={48}
              className="h-auto w-[120px] opacity-90"
            />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
            {settings?.description ||
              "Espacios de bienestar, estética y acompañamiento consciente para reconectar con tu esencia y cuidar tu identidad."}
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {social?.instagram && (
              <Link
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-brand-300 hover:text-brand-500"
              >
                <InstagramLogo size={17} />
              </Link>
            )}
            {social?.whatsapp && (
              <Link
                href={`https://wa.me/${social.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-brand-300 hover:text-brand-500"
              >
                <WhatsappLogo size={17} />
              </Link>
            )}
            {social?.linkedin && (
              <Link
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-brand-300 hover:text-brand-500"
              >
                <LinkedinLogo size={17} />
              </Link>
            )}
            {social?.email && (
              <Link
                href={`mailto:${social.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-brand-300 hover:text-brand-500"
              >
                <EnvelopeSimple size={17} />
              </Link>
            )}
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Explorar
            </p>
            <nav className="flex flex-col gap-3 text-sm text-neutral-500">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-brand-500"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Legal
            </p>
            <nav className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link
                href="/privacidad"
                className="transition hover:text-brand-500"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="transition hover:text-brand-500"
              >
                Términos
              </Link>
              <Link
                href="/contacto"
                className="transition hover:text-brand-500"
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs uppercase tracking-widest text-neutral-400 md:flex-row">
          <span>
            © {new Date().getFullYear()} {settings?.title || "Leidy Abello"} ·
            Todos los derechos reservados
          </span>
          <span>Cali, Colombia · Presencial & Virtual</span>
        </div>
      </div>
    </footer>
  );
}
