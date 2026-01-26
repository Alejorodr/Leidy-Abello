// src/lib/sanity.ts
import { createClient, groq } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import {
  HomePage,
  Service,
  BlogPost,
  SanityImage,
  PortfolioCase,
  PodcastEpisode,
} from "./sanity.types";

const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-01-01", // YYYY-MM-DD
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// GROQ Queries
export async function getHomePage(): Promise<HomePage> {
  const query = groq`*[_type == "homePage"][0]`;
  return await sanityClient.fetch(query);
}

export async function getServices(): Promise<Service[]> {
  const query = groq`*[_type == "service"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const query = groq`*[_type == "service" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = groq`*[_type == "blogPost"] | order(publishedAt desc)`;
  return await sanityClient.fetch(query);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const query = groq`*[_type == "blogPost" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getPortfolioCases(): Promise<PortfolioCase[]> {
  const query = groq`*[_type == "portfolioCase"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getPortfolioCaseBySlug(
  slug: string,
): Promise<PortfolioCase> {
  const query = groq`*[_type == "portfolioCase" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const query = groq`*[_type == "podcastEpisode"] | order(title asc)`;
  return await sanityClient.fetch(query);
}

export async function getPodcastEpisodeBySlug(
  slug: string,
): Promise<PodcastEpisode> {
  const query = groq`*[_type == "podcastEpisode" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug });
}
