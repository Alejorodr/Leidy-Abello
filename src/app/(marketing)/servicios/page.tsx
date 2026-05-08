import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { Service } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Servicios | Leidy Abello",
  description:
    "Descubre los servicios de estética consciente, personal shopping y bienestar.",
};

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>({
    query: servicesQuery,
    tags: ["service"],
  });

  return (
    <div>
      {/* ── Header ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container>
          <Reveal direction="up" className="max-w-3xl space-y-6">
            <p className="eyebrow">Servicios</p>
            <h1 className="font-serif text-4xl font-medium md:text-6xl">
              Procesos que sostienen
            </h1>
            <p className="text-xl leading-relaxed text-neutral-600">
              Cada servicio es una experiencia íntima diseñada para honrar tu
              identidad, autoestima y bienestar.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Service cards grid ── */}
      <Section className="bg-white">
        <Container>
          <RevealGroup
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {services?.map((service) => (
              <RevealItem key={service.slug.current}>
                <Card className="flex h-full flex-col p-8 md:p-10">
                  <div className="flex-1 space-y-4">
                    <h2 className="font-serif text-2xl font-medium">
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {service.excerpt}
                    </p>
                    {service.highlights && service.highlights.length > 0 && (
                      <ul className="space-y-2 pt-2">
                        {service.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2 text-xs text-neutral-500"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-8 w-full"
                  >
                    <Link href={`/servicios/${service.slug.current}`}>
                      CONOCER DETALLES
                    </Link>
                  </Button>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </div>
  );
}
