import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceBySlugQuery } from "@/lib/sanity/queries";
import { Service } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await sanityFetch<Service>({
    query: serviceBySlugQuery,
    params,
    tags: [`service:${params.slug}`],
  });

  return {
    title: service?.seo?.title || service?.title || "Servicio",
    description: service?.seo?.description || service?.excerpt || "Detalles del servicio.",
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await sanityFetch<Service>({
    query: serviceBySlugQuery,
    params,
    tags: [`service:${params.slug}`],
  });

  if (!service) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl space-y-12 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Servicio
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">{service.title}</h1>
        <p className="text-xl text-neutral-700">{service.excerpt}</p>
      </header>

      <div className="space-y-8">
        {service.body && (
          <div className="prose prose-neutral max-w-none">
            <PortableText value={service.body} />
          </div>
        )}

        <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Lo que incluye</h2>
          {service.highlights && (
            <ul className="list-disc space-y-3 pl-5 text-neutral-600 mb-8">
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          <Button asChild size="lg">
            <Link href="/contacto">Agenda tu sesión</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
