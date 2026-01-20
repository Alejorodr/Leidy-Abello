import type { MetadataRoute } from "next";

import { blogPosts } from "@/modules/blog/data";
import { podcastEpisodes } from "@/modules/podcast/data";
import { portfolioCases } from "@/modules/portfolio/data";
import { services } from "@/modules/services/data";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/servicios/${service.slug}`,
      lastModified: new Date(),
    })),
    ...portfolioCases.map((item) => ({
      url: `${baseUrl}/portafolio/${item.slug}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    })),
    ...podcastEpisodes.map((episode) => ({
      url: `${baseUrl}/podcast/${episode.slug}`,
      lastModified: new Date(),
    })),
  ];
}
