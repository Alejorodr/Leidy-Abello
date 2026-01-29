import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    navigation,
    social,
    seo
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    featuredServices[]->{
      title,
      slug,
      excerpt,
      image
    },
    seo
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title,
    slug,
    excerpt,
    image,
    highlights
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    body,
    image,
    highlights,
    seo
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    readTime,
    seo
  }
`;

export const portfolioCasesQuery = groq`
  *[_type == "portfolioCase"] | order(_createdAt desc) {
    title,
    slug,
    summary,
    images[0]
  }
`;

export const portfolioCaseBySlugQuery = groq`
  *[_type == "portfolioCase" && slug.current == $slug][0] {
    title,
    slug,
    summary,
    body,
    images,
    consent,
    seo
  }
`;

export const podcastEpisodesQuery = groq`
  *[_type == "podcastEpisode"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    image,
    publishedAt,
    duration
  }
`;

export const podcastEpisodeBySlugQuery = groq`
  *[_type == "podcastEpisode" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    body,
    image,
    publishedAt,
    duration,
    audioUrl,
    seo
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    introduction,
    body,
    portrait,
    seo
  }
`;
