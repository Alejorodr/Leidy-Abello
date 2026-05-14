import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { sanityFetch } from "@/lib/sanity/client";
import { portalResourcesQuery } from "@/lib/sanity/queries";
import { ResourceItem, ResourceType } from "@/lib/sanity/types";
import { ResourceCard } from "@/components/portal/resource-card";
import { PortalHeader } from "@/components/portal/portal-header";
import Link from "next/link";

export const metadata = { title: "Biblioteca · Portal" };

const TYPE_LABELS: Record<string, string> = {
  video: "Videos",
  podcast: "Podcasts",
  lookbook: "Lookbooks",
  article: "Artículos",
};

interface Props {
  searchParams: { tipo?: string };
}

export default async function BibliotecaPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const isPremium = (session.user as any).isPremium ?? false;

  const resources = await sanityFetch<ResourceItem[]>({
    query: portalResourcesQuery,
    tags: ["resourceItem"],
  });

  const activeType = searchParams.tipo as ResourceType | undefined;
  const filtered = activeType
    ? resources.filter((r) => r.resourceType === activeType)
    : resources;

  const types = Array.from(new Set(resources.map((r) => r.resourceType)));

  return (
    <div className="min-h-screen bg-brand-50">
      <PortalHeader user={session.user} />

      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link
            href="/portal/biblioteca"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              !activeType
                ? "bg-neutral-900 text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-brand-300"
            }`}
          >
            Todo
          </Link>
          {types.map((type) => (
            <Link
              key={type}
              href={`/portal/biblioteca?tipo=${type}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeType === type
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-200 text-neutral-600 hover:border-brand-300"
              }`}
            >
              {TYPE_LABELS[type] ?? type}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.slug.current}
                resource={resource}
                isPremiumUser={isPremium}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-neutral-400">
            <p className="font-serif text-2xl">Sin resultados</p>
            <p className="mt-2 text-sm">
              No hay recursos en esta categoría todavía.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
