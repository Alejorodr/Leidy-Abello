import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getPodcastEpisodes } from "@/lib/sanity";
import { PodcastEpisode } from "@/lib/sanity.types";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Episodios sobre bienestar, autoestima y estética consciente.",
};

export default async function PodcastPage() {
  const podcastEpisodes: PodcastEpisode[] = await getPodcastEpisodes();

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Podcast
        </p>
        <h1 className="text-4xl font-semibold">Conversaciones que sostienen</h1>
        <p className="text-neutral-700">
          Escucha reflexiones y entrevistas diseñadas para acompañarte en tu
          camino de bienestar.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {podcastEpisodes.map((episode) => (
          <article key={episode.slug.current} className="card">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-300">
              {episode.duration}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{episode.title}</h2>
            <p className="mt-3 text-sm text-neutral-600">{episode.summary}</p>
            <Button asChild variant="outline" className="mt-6 w-fit">
              <Link href={`/podcast/${episode.slug.current}`}>
                Escuchar episodio
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
