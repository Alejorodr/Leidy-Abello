// src/lib/sanity.types.ts

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
}

export interface SanitySEO {
  _type: "seo";
  title: string;
  description: string;
  ogImage: SanityImage;
}

export interface HomePage {
  _id: string;
  _type: "homePage";
  title: string;
  slug: SanitySlug;
  heroImage: SanityImage;
  seo: SanitySEO;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: SanitySlug;
  description: string;
  highlights: string[];
  image: SanityImage;
  seo: SanitySEO;
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  coverImage: SanityImage;
  seo: SanitySEO;
}

export interface PortfolioCase {
  _id: string;
  _type: "portfolioCase";
  title: string;
  slug: SanitySlug;
  summary: string;
  content: any[]; // Adjust this type based on your block content structure
  consent: boolean;
  heroImage: SanityImage;
  seo: SanitySEO;
}

export interface PodcastEpisode {
  _id: string;
  _type: "podcastEpisode";
  title: string;
  slug: SanitySlug;
  summary: string;
  duration: string;
  coverImage: SanityImage;
  seo: SanitySEO;
}
