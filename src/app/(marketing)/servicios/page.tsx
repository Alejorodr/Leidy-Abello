import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { services } from "@/modules/services/data";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Descubre los servicios de estética consciente y bienestar.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Servicios
        </p>
        <h1 className="text-4xl font-semibold">Procesos que sostienen</h1>
        <p className="text-neutral-700">
          Cada servicio es una experiencia íntima diseñada para honrar tu
          identidad, autoestima y bienestar.
        </p>
      </header>
      <div className="grid gap-6">
        {services.map((service) => (
          <article key={service.slug} className="card">
            <h2 className="text-2xl font-semibold">{service.title}</h2>
            <p className="mt-3 text-sm text-neutral-600">
              {service.description}
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6 w-fit">
              <Link href={`/servicios/${service.slug}`}>Ver detalle</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
