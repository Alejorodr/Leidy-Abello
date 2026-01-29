import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { portfolioCaseBySlugQuery } from "@/lib/sanity/queries";
import { PortfolioCase } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await sanityFetch<PortfolioCase>({
    query: portfolioCaseBySlugQuery,
    params,
    tags: [`portfolioCase:${params.slug}`],
  });

  if (!item) {
    return {
      title: "Caso no encontrado",
    };
  }

  return {
    title: item.seo?.title || item.title,
    description: item.seo?.description || item.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await sanityFetch<PortfolioCase>({
    query: portfolioCaseBySlugQuery,
    params,
    tags: [`portfolioCase:${params.slug}`],
  });

  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl space-y-12 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Portafolio
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">{item.title}</h1>
        <p className="text-xl text-neutral-700">{item.summary}</p>
      </header>
      <div className="prose prose-neutral max-w-none prose-lg">
        {item.body ? <PortableText value={item.body} /> : null}
      </div>
      <div className="mt-12 rounded-2xl bg-brand-50 p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">¿Te sientes identificada?</h3>
        <Button asChild size="lg">
          <Link href="/contacto">Inicia tu propio proceso</Link>
        </Button>
      </div>
    </section>
  );
}
