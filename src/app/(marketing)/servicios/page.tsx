import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { Service } from "@/lib/sanity/types";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Servicios | Leidy Abello",
  description: "Descubre los servicios de estética consciente y bienestar.",
};

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>({
    query: servicesQuery,
    tags: ["service"]
  });

  return (
    <Section spacing="sm">
      <Container className="space-y-16">
        <header className="max-w-3xl space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
            Servicios
            </p>
            <h1 className="text-4xl font-medium md:text-6xl">Procesos que sostienen</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
            Cada servicio es una experiencia íntima diseñada para honrar tu
            identidad, autoestima y bienestar.
            </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
            <Card key={service.slug.current} className="flex flex-col p-8 md:p-10">
                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-medium">{service.title}</h2>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                    {service.excerpt}
                    </p>
                    {service.highlights && (
                        <ul className="space-y-2 text-xs text-neutral-500">
                        {service.highlights.slice(0, 3).map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-brand-300" />
                                {highlight}
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
                <Button asChild variant="outline" size="sm" className="mt-8 w-full">
                <Link href={`/servicios/${service.slug.current}`}>CONOCER DETALLES</Link>
                </Button>
            </Card>
            ))}
        </div>
      </Container>
    </Section>
  );
}
