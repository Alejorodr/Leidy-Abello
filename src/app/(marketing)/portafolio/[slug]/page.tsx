import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { portfolioCaseBySlugQuery } from "@/lib/sanity/queries";
import { PortfolioCase } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await sanityFetch<PortfolioCase>({
    query: portfolioCaseBySlugQuery,
    params: { slug },
    tags: [`portfolioCase:${slug}`],
  });

  if (!item) return { title: "Caso no encontrado" };

  return {
    title: item.seo?.title ?? item.title,
    description: item.seo?.description ?? item.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await sanityFetch<PortfolioCase>({
    query: portfolioCaseBySlugQuery,
    params: { slug },
    tags: [`portfolioCase:${slug}`],
  });

  if (!item) notFound();

  return (
    <div>
      {/* ── Header ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container className="max-w-4xl">
          <Reveal direction="up" className="space-y-4">
            <p className="eyebrow">Portafolio</p>
            <h1 className="font-serif text-4xl font-medium md:text-5xl">
              {item.title}
            </h1>
            {item.summary && (
              <p className="text-xl leading-relaxed text-neutral-700">
                {item.summary}
              </p>
            )}
          </Reveal>
        </Container>
      </Section>

      {/* ── Body — */}
      <Section className="bg-white">
        <Container className="max-w-4xl space-y-12">
          {item.body && (
            <Reveal direction="up">
              <div className="prose prose-lg prose-neutral max-w-none">
                <PortableText value={item.body} />
              </div>
            </Reveal>
          )}

          <Reveal direction="up" delay={0.1}>
            <div className="rounded-[32px] bg-brand-50 p-10 text-center">
              <h3 className="font-serif text-2xl font-medium">
                ¿Te sientes identificada?
              </h3>
              <p className="mx-auto mt-4 max-w-md text-neutral-600">
                Podemos crear juntas un proceso único adaptado a tu historia y
                tus necesidades.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contacto">Inicia tu propio proceso</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
