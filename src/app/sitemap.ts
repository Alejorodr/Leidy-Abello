import type { MetadataRoute } from "next";

import {
  getBlogPosts,
  getServices,
  getPortfolioCases,
  getPodcastEpisodes,
} from "@/lib/sanity";
import {
  BlogPost,
  Service,
  PortfolioCase,
  PodcastEpisode,
} from "@/lib/sanity.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://leidy-abello-neon.vercel.app/";

  const routes = [
    "",
    "/sobre-mi",
    "/servicios",
    "/portafolio",
    "/blog",
    "/podcast",
    "/contacto",
  ];

  const [services, blogPosts, portfolioCases, podcastEpisodes]: [
    Service[],
    BlogPost[],
    PortfolioCase[],
    PodcastEpisode[],
  ] = await Promise.all([
    getServices(),
    getBlogPosts(),
    getPortfolioCases(),
    getPodcastEpisodes(),
  ]);

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/servicios/${service.slug.current}`,
      lastModified: new Date(),
    })),
    ...portfolioCases.map((item) => ({
      url: `${baseUrl}/portafolio/${item.slug.current}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(),
    })),
    ...podcastEpisodes.map((episode) => ({
      url: `${baseUrl}/podcast/${episode.slug.current}`,
      lastModified: new Date(),
    })),
  ];
}
