import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { podcastEpisodes } from "@/modules/podcast/data";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const episode = podcastEpisodes.find((item) => item.slug === params.slug);

  return {
    title: episode?.title ?? "Episodio",
    description: episode?.description ?? "Detalle del episodio.",
  };
}

export default function PodcastDetailPage({ params }: PageProps) {
  const episode = podcastEpisodes.find((item) => item.slug === params.slug);

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
        <p>{episode.description}</p>
        <p>
          Este episodio invita a reflexionar sobre tu relación con el cuerpo y a
          construir rutinas que acompañen tu bienestar emocional.
        </p>
      </div>
    </article>
  );
}
