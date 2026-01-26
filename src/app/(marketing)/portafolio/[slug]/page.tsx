import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getPortfolioCaseBySlug, getPortfolioCases } from "@/lib/sanity";
import { PortfolioCase } from "@/lib/sanity.types";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const cases: PortfolioCase[] = await getPortfolioCases();
  return cases.map((item) => ({
    slug: item.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function PortfolioDetailPage({ params }: PageProps) {
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
      <div className="card space-y-4">
        <h2 className="text-2xl font-semibold">Proceso</h2>
        <p className="text-sm text-neutral-600">
          Este acompañamiento se enfocó en crear rutinas de autocuidado
          sostenibles, sostener la autoestima y diseñar una estética que
          reflejara la esencia personal de nuestra consultante.
        </p>
        <p className="text-sm text-neutral-600">
          Todo el proceso se desarrolló con consentimiento informado y en un
          entorno seguro.
        </p>
        <Button asChild className="w-fit">
          <Link href="/contacto">Quiero un proceso similar</Link>
        </Button>
      </div>
    </section>
  );
}
