import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { sanityFetch } from "@/lib/sanity/client";
import { portalResourceBySlugQuery } from "@/lib/sanity/queries";
import { ResourceItem } from "@/lib/sanity/types";
import { PortalHeader } from "@/components/portal/portal-header";
import { PortableText } from "@portabletext/react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const resource = await sanityFetch<ResourceItem>({
    query: portalResourceBySlugQuery,
    params: { slug: params.slug },
    tags: ["resourceItem"],
  });
  return { title: resource?.title ?? "Recurso · Portal" };
}

export default async function RecursoPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const resource = await sanityFetch<ResourceItem>({
    query: portalResourceBySlugQuery,
    params: { slug: params.slug },
    tags: ["resourceItem"],
  });

  if (!resource) notFound();

  const isPremium = (session.user as any).isPremium ?? false;
  const hasAccess = resource.isFree || isPremium;

  return (
    <div className="min-h-screen bg-brand-50">
      <PortalHeader user={session.user} />

      <main className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <Link
          href="/portal"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-500"
        >
          ← Volver
        </Link>

        <article className="rounded-[24px] border border-neutral-100 bg-white p-6 shadow-soft md:p-10">
          <div className="mb-2 flex items-center gap-2">
            {resource.isFree ? (
              <span className="text-brand-700 rounded-full bg-brand-100 px-3 py-0.5 text-xs font-medium">
                Acceso libre
              </span>
            ) : (
              <span className="rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600">
                Premium
              </span>
            )}
            {resource.duration && (
              <span className="text-xs text-neutral-400">
                {resource.duration}
              </span>
            )}
          </div>

          <h1 className="mb-4 font-serif text-2xl font-medium text-neutral-900 md:text-3xl">
            {resource.title}
          </h1>

          {resource.excerpt && (
            <p className="mb-6 leading-relaxed text-neutral-600">
              {resource.excerpt}
            </p>
          )}

          {hasAccess ? (
            <div className="space-y-6">
              {/* Video embed */}
              {resource.resourceType === "video" && resource.youtubeId && (
                <div className="aspect-video overflow-hidden rounded-[16px]">
                  <iframe
                    src={`https://www.youtube.com/embed/${resource.youtubeId}`}
                    title={resource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              )}

              {/* Podcast audio */}
              {resource.resourceType === "podcast" && resource.audioUrl && (
                <div className="rounded-[16px] border border-neutral-100 p-4">
                  <audio controls className="w-full" src={resource.audioUrl}>
                    Tu navegador no soporta la reproducción de audio.
                  </audio>
                </div>
              )}

              {/* Lookbook PDF */}
              {resource.resourceType === "lookbook" && resource.pdfUrl && (
                <a
                  href={resource.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
                >
                  📥 Descargar Lookbook
                </a>
              )}

              {/* Article body */}
              {resource.resourceType === "article" && resource.body && (
                <div className="prose prose-neutral max-w-none">
                  <PortableText value={resource.body} />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[16px] border border-dashed border-brand-200 bg-brand-50 p-8 text-center">
              <p className="mb-1 text-2xl">🔒</p>
              <p className="mb-1 font-serif text-lg font-medium text-neutral-900">
                Contenido exclusivo para clientas premium
              </p>
              <p className="mb-6 text-sm text-neutral-500">
                Escríbeme por WhatsApp para activar tu acceso y disfrutar de
                todos los recursos.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent(`Hola Leidy, me interesa acceder al recurso "${resource.title}" y activar el plan premium.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
              >
                💬 Activar acceso premium
              </a>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
