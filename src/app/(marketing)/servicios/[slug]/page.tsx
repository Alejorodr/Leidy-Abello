import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceBySlugQuery } from "@/lib/sanity/queries";
import { Service } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch<Service>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: [`service:${slug}`],
  });

  return {
    title: service?.seo?.title ?? service?.title ?? "Servicio",
    description:
      service?.seo?.description ?? service?.excerpt ?? "Detalles del servicio.",
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await sanityFetch<Service>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: [`service:${slug}`],
  });

  if (!service) notFound();

  return (
    <div>
      {/* ── Header ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container className="max-w-4xl">
          <Reveal direction="up" className="space-y-4">
            <p className="eyebrow">Servicio</p>
            <h1 className="font-serif text-4xl font-medium md:text-5xl">
              {service.title}
            </h1>
            {service.excerpt && (
              <p className="text-xl leading-relaxed text-neutral-700">
                {service.excerpt}
              </p>
            )}
          </Reveal>
        </Container>
      </Section>

      {/* ── Body + highlights + CTA ── */}
      <Section className="bg-white">
        <Container className="max-w-4xl space-y-12">
          {service.body && (
            <Reveal direction="up">
              <div className="prose prose-lg prose-neutral max-w-none">
                <PortableText value={service.body} />
              </div>
            </Reveal>
          )}

          <Reveal direction="up" delay={0.1}>
            <div className="rounded-[32px] border border-brand-100 bg-brand-50/40 p-8 shadow-soft">
              <h2 className="font-serif text-2xl font-medium">
                Lo que incluye
              </h2>
              {service.highlights && service.highlights.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-3 text-neutral-600"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild size="lg" className="mt-8">
                <Link href="/contacto">Agenda tu sesión</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
