import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";

export async function Footer() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  const navLinks = settings?.navigation || [];

  return (
    <footer className="border-t border-brand-300/30 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr] md:px-10">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500 font-bold">
            {settings?.title || "Leidy Abello"}
          </p>
          <h3 className="text-3xl font-semibold text-neutral-900">
            Tu templo es tu arte
          </h3>
          <p className="max-w-md text-neutral-600 leading-relaxed">
            {settings?.description || "Espacios de bienestar, estética y acompañamiento consciente para reconectar con tu esencia y cuidar tu identidad."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Explorar</p>
                <nav className="flex flex-col gap-3 text-sm text-neutral-600">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-brand-500 transition">
                        {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Legal</p>
                <nav className="flex flex-col gap-3 text-sm text-neutral-600">
                    <Link href="/privacidad" className="hover:text-brand-500 transition">Privacidad</Link>
                    <Link href="/terminos" className="hover:text-brand-500 transition">Términos</Link>
                </nav>
            </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-8 text-center text-xs uppercase tracking-widest text-neutral-400">
        © {new Date().getFullYear()} {settings?.title || "Leidy Abello"} · Todos los derechos reservados
      </div>
    </footer>
  );
}
