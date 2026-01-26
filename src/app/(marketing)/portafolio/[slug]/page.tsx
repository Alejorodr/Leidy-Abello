// @ts-nocheck
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPortfolioCaseBySlug, getPortfolioCases } from "@/lib/sanity";
import { PortfolioCase } from "@/lib/sanity.types";
import { PortableText } from "@/components/common/portable-text";

export async function generateStaticParams() {
  const cases: PortfolioCase[] = await getPortfolioCases();
  return cases.map((item) => ({
    slug: item.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item: PortfolioCase = await getPortfolioCaseBySlug(params.slug);

  if (!item) {
    return {
      title: "Caso no encontrado",
    };
  }

  return {
    title: item.seo?.title ?? item.title,
    description: item.seo?.description ?? item.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item: PortfolioCase = await getPortfolioCaseBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Portafolio
        </p>
        <h1 className="text-4xl font-semibold">{item.title}</h1>
        <p className="text-lg text-neutral-700">{item.summary}</p>
      </header>
      <div className="prose prose-lg max-w-none">
        {item.body ? <PortableText value={item.body} /> : null}
      </div>
      <div className="card mt-8">
        <Button asChild className="w-fit">
          <Link href="/contacto">Quiero un proceso similar</Link>
        </Button>
      </div>
    </section>
  );
}
