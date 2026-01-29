import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { podcastEpisodeBySlugQuery } from "@/lib/sanity/queries";
import { PodcastEpisode } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const episode = await sanityFetch<PodcastEpisode>({
    query: podcastEpisodeBySlugQuery,
    params,
    tags: [`podcastEpisode:${params.slug}`],
  });

  if (!episode) {
    return {
      title: "Episodio no encontrado",
    };
  }

  return {
    title: episode.seo?.title || episode.title,
    description: episode.seo?.description || episode.excerpt,
  };
}

export default async function PodcastDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const episode = await sanityFetch<PodcastEpisode>({
    query: podcastEpisodeBySlugQuery,
    params,
    tags: [`podcastEpisode:${params.slug}`],
  });

  if (!episode) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-12 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Podcast
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">{episode.title}</h1>
        <div className="flex gap-4 text-sm text-neutral-500">
            <span>{episode.duration}</span>
            {episode.publishedAt && (
                <span>· {new Date(episode.publishedAt).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
        </div>
      </header>

      {episode.audioUrl && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
              <iframe
                src={episode.audioUrl.replace('open.spotify.com', 'open.spotify.com/embed')}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
          </div>
      )}

      <div className="prose prose-neutral max-w-none prose-lg">
        {episode.body ? (
          <PortableText value={episode.body} />
        ) : (
          <p className="text-xl text-neutral-600">{episode.excerpt}</p>
        )}
      </div>
    </article>
  );
}
