// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import {
  HomePage,
  Service,
  BlogPost,
  SanityImage,
  PortfolioCase,
  PodcastEpisode,
} from "./sanity.types";

import { services as fallbackServices } from "@/modules/services/data";
import { blogPosts as fallbackBlogPosts } from "@/modules/blog/data";
import { portfolioCases as fallbackPortfolioCases } from "@/modules/portfolio/data";
import { podcastEpisodes as fallbackPodcastEpisodes } from "@/modules/podcast/data";

const groq = String.raw;

const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID || "missing",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

const isConfigured =
  process.env.SANITY_PROJECT_ID && process.env.SANITY_PROJECT_ID !== "missing";

// Las queries GROQ no cambian
export async function getHomePage(): Promise<HomePage> {
  if (!isConfigured) return {} as HomePage;
  const query = groq`*[_type == "homePage"][0]`;
  return await sanityClient.fetch(query);
}

export async function getServices(): Promise<Service[]> {
  if (!isConfigured) return fallbackServices as any;
  const query = groq`*[_type == "service"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  if (!isConfigured)
    return fallbackServices.find((s) => s.slug === slug) as any;
  const query = groq`*[_type == "service" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isConfigured) return fallbackBlogPosts as any;
  const query = groq`*[_type == "blogPost"] | order(publishedAt desc)`;
  return await sanityClient.fetch(query);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  if (!isConfigured)
    return fallbackBlogPosts.find((p) => p.slug === slug) as any;
  const query = groq`*[_type == "blogPost" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getPortfolioCases(): Promise<PortfolioCase[]> {
  if (!isConfigured) return fallbackPortfolioCases as any;
  const query = groq`*[_type == "portfolioCase"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getPortfolioCaseBySlug(
  slug: string,
): Promise<PortfolioCase> {
  if (!isConfigured)
    return fallbackPortfolioCases.find((p) => p.slug === slug) as any;
  const query = groq`*[_type == "portfolioCase" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  if (!isConfigured) return fallbackPodcastEpisodes as any;
  const query = groq`*[_type == "podcastEpisode"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getPodcastEpisodeBySlug(
  slug: string,
): Promise<PodcastEpisode> {
  if (!isConfigured)
    return fallbackPodcastEpisodes.find((p) => p.slug === slug) as any;
  const query = groq`*[_type == "podcastEpisode" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}
