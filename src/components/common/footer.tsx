import Link from "next/link";

const footerLinks = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/blog", label: "Blog" },
  { href: "/podcast", label: "Podcast" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-300/30 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr] md:px-10">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-300">
            Leidy Abello
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            Tu templo es tu arte
          </h3>
          <p className="mt-4 text-sm text-neutral-600">
            Espacios de bienestar, estética y acompañamiento consciente para
            reconectar con tu esencia y cuidar tu identidad.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-neutral-600 md:justify-self-end">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-300/30 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Leidy Abello. Todos los derechos reservados.
      </div>
    </footer>
  );
}
