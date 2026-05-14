import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import { sanityFetch } from "@/lib/sanity/client";
import { portalResourcesQuery } from "@/lib/sanity/queries";
import { ResourceItem } from "@/lib/sanity/types";
import { ResourceCard } from "@/components/portal/resource-card";
import { PortalHeader } from "@/components/portal/portal-header";

export const metadata = { title: "Portal · Leidy Abello" };

export default async function PortalPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const isPremium = (session.user as any).isPremium ?? false;

  const resources = await sanityFetch<ResourceItem[]>({
    query: portalResourcesQuery,
    tags: ["resourceItem"],
  });

  const freeResources = resources.filter((r) => r.isFree);
  const premiumResources = resources.filter((r) => !r.isFree);

  return (
    <div className="min-h-screen bg-brand-50">
      <PortalHeader user={session.user} />

      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        {/* Welcome */}
        <div className="mb-10 space-y-1">
          <h1 className="font-serif text-3xl font-medium text-neutral-900 md:text-4xl">
            Hola, {session.user.name?.split(" ")[0] ?? "bienvenida"} ✨
          </h1>
          <p className="text-neutral-500">
            {isPremium
              ? "Tienes acceso completo a toda la biblioteca de recursos."
              : "Accede a recursos gratuitos o activa el plan premium para desbloquear todo el contenido."}
          </p>
        </div>

        {/* Premium CTA for free users */}
        {!isPremium && (
          <div className="mb-10 rounded-[20px] border border-brand-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="font-serif text-lg font-medium text-neutral-900">
                  Desbloquea el acceso premium
                </p>
                <p className="text-sm text-neutral-500">
                  Escríbeme por WhatsApp y activa tu acceso a todos los recursos
                  exclusivos.
                </p>
              </div>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent("Hola Leidy, quiero activar mi acceso premium al portal.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
              >
                <span>💬</span> Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Filter links */}
        <div className="mb-8 flex gap-3">
          <Link
            href="/portal"
            className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white"
          >
            Todo
          </Link>
          <Link
            href="/portal/biblioteca?tipo=video"
            className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-600 hover:border-brand-300 hover:text-brand-600"
          >
            Videos
          </Link>
          <Link
            href="/portal/biblioteca?tipo=podcast"
            className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-600 hover:border-brand-300 hover:text-brand-600"
          >
            Podcasts
          </Link>
          <Link
            href="/portal/biblioteca?tipo=lookbook"
            className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-600 hover:border-brand-300 hover:text-brand-600"
          >
            Lookbooks
          </Link>
        </div>

        {/* Free section */}
        {freeResources.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 font-serif text-xl font-medium text-neutral-900">
              Acceso libre
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {freeResources.map((resource) => (
                <ResourceCard
                  key={resource.slug.current}
                  resource={resource}
                  isPremiumUser={isPremium}
                />
              ))}
            </div>
          </section>
        )}

        {/* Premium section */}
        {premiumResources.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-xl font-medium text-neutral-900">
              Contenido premium
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {premiumResources.map((resource) => (
                <ResourceCard
                  key={resource.slug.current}
                  resource={resource}
                  isPremiumUser={isPremium}
                />
              ))}
            </div>
          </section>
        )}

        {resources.length === 0 && (
          <div className="py-24 text-center text-neutral-400">
            <p className="font-serif text-2xl">Próximamente</p>
            <p className="mt-2 text-sm">
              Los recursos se publicarán muy pronto.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
