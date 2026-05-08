import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { portfolioCasesQuery } from "@/lib/sanity/queries";
import { PortfolioCase } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Portafolio | Leidy Abello",
  description:
    "Casos de acompañamiento respetuoso en estética consciente y bienestar.",
};

export default async function PortfolioPage() {
  const portfolioCases = await sanityFetch<PortfolioCase[]>({
    query: portfolioCasesQuery,
    tags: ["portfolioCase"],
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
            <p className="eyebrow">Portafolio</p>
            <h1 className="font-serif text-4xl font-medium md:text-6xl">
              Historias con consentimiento
            </h1>
            <p className="text-xl leading-relaxed text-neutral-600">
              Compartimos testimonios y procesos reales con un enfoque
              respetuoso y consciente.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Cases ── */}
      <Section className="bg-white">
        <Container>
          {portfolioCases && portfolioCases.length > 0 ? (
            <RevealGroup
              className="grid gap-8 md:grid-cols-2"
              staggerDelay={0.1}
            >
              {portfolioCases.map((item) => (
                <RevealItem key={item.slug.current}>
                  <Card className="flex h-full flex-col p-8 md:p-10">
                    <div className="flex-1 space-y-4">
                      <h2 className="font-serif text-2xl font-medium">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {item.summary}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-8 w-fit"
                    >
                      <Link href={`/portafolio/${item.slug.current}`}>
                        Leer caso
                      </Link>
                    </Button>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal direction="up" className="py-16 text-center">
              <p className="text-neutral-500">
                Los casos de portafolio estarán disponibles próximamente.
              </p>
            </Reveal>
          )}
        </Container>
      </Section>
    </div>
  );
}
