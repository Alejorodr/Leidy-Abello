import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { portfolioCases } from "@/modules/portfolio/data";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Casos de acompañamiento respetuoso en estética consciente y bienestar.",
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Portafolio
        </p>
        <h1 className="text-4xl font-semibold">Historias con consentimiento</h1>
        <p className="text-neutral-700">
          Compartimos testimonios y procesos reales con un enfoque respetuoso.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioCases.map((item) => (
          <article key={item.slug} className="card">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-neutral-600">{item.summary}</p>
            <Button asChild variant="outline" className="mt-6 w-fit">
              <Link href={`/portafolio/${item.slug}`}>Leer caso</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
