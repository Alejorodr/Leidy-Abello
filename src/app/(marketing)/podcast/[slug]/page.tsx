import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPodcastEpisodeBySlug, getPodcastEpisodes } from "@/lib/sanity";
import { PodcastEpisode } from "@/lib/sanity.types";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const episodes: PodcastEpisode[] = await getPodcastEpisodes();
  return episodes.map((episode) => ({
    slug: episode.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const episode: PodcastEpisode = await getPodcastEpisodeBySlug(params.slug);

  if (!episode) {
    return {
      title: "Episodio no encontrado",
    };
  }

  return {
    title: episode.seo?.title ?? episode.title,
    description: episode.seo?.description ?? episode.summary,
  };
}

export default async function PodcastDetailPage({ params }: PageProps) {
  const episode: PodcastEpisode = await getPodcastEpisodeBySlug(params.slug);

  if (!episode) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Podcast
        </p>
        <h1 className="text-4xl font-semibold">{episode.title}</h1>
        <p className="text-sm text-neutral-500">{episode.duration}</p>
      </header>
      <div className="card space-y-4 text-sm text-neutral-600">
        <p>{episode.summary}</p>
        <p>
          Este episodio invita a reflexionar sobre tu relación con el cuerpo y a
          construir rutinas que acompañen tu bienestar emocional.
        </p>
      </div>
    </article>
  );
}
