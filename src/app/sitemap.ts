import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import {
  servicesQuery,
  blogPostsQuery,
  portfolioCasesQuery,
  podcastEpisodesQuery
} from "@/lib/sanity/queries";
import { Service, BlogPost, PortfolioCase, PodcastEpisode } from "@/lib/sanity/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leidyabello.com";

  const staticRoutes = [
    "",
    "/sobre-mi",
    "/servicios",
    "/portafolio",
    "/blog",
    "/podcast",
    "/contacto",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const [services, blogPosts, portfolioCases, podcastEpisodes] = await Promise.all([
      client.fetch<Service[]>(servicesQuery),
      client.fetch<BlogPost[]>(blogPostsQuery),
      client.fetch<PortfolioCase[]>(portfolioCasesQuery),
      client.fetch<PodcastEpisode[]>(podcastEpisodesQuery),
    ]);

    const dynamicRoutes = [
        ...(services || []).map((s) => ({ url: `${baseUrl}/servicios/${s.slug.current}`, lastModified: new Date() })),
        ...(blogPosts || []).map((b) => ({ url: `${baseUrl}/blog/${b.slug.current}`, lastModified: new Date() })),
        ...(portfolioCases || []).map((p) => ({ url: `${baseUrl}/portafolio/${p.slug.current}`, lastModified: new Date() })),
        ...(podcastEpisodes || []).map((e) => ({ url: `${baseUrl}/podcast/${e.slug.current}`, lastModified: new Date() })),
    ].map(route => ({
        ...route,
        changeFrequency: 'weekly' as const,
        priority: 0.6
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    console.error("Error generating sitemap:", e);
    return staticRoutes;
  }
}
