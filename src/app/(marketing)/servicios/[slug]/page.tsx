import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { services } from "@/modules/services/data";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const service = services.find((item) => item.slug === params.slug);

  return {
    title: service?.title ?? "Servicio",
    description: service?.description ?? "Detalles del servicio.",
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Servicio
        </p>
        <h1 className="text-4xl font-semibold">{service.title}</h1>
        <p className="text-lg text-neutral-700">{service.description}</p>
      </header>
      <div className="card space-y-4">
        <h2 className="text-2xl font-semibold">Lo que incluye</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
          {service.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <p className="text-sm text-neutral-600">
          Diseñamos juntas una experiencia personalizada que respete tu ritmo y
          necesidades. Cada encuentro está pensado para que te sientas contenida
          y acompañada.
        </p>
        <Button className="w-fit">Agenda tu sesión</Button>
      </div>
    </section>
  );
}
