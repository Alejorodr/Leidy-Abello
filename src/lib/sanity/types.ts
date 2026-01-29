export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface SiteSettings {
  title: string;
  description?: string;
  navigation?: {
    label: string;
    href: string;
    order?: number;
  }[];
  social?: {
    instagram?: string;
    whatsapp?: string;
    linkedin?: string;
    email?: string;
  };
  seo?: SEO;
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage: SanityImage;
  featuredServices?: Service[];
  seo?: SEO;
}

export interface Service {
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[];
  image: SanityImage;
  highlights?: string[];
  order?: number;
  seo?: SEO;
}

export interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[];
  mainImage: SanityImage;
  publishedAt: string;
  readTime?: string;
  seo?: SEO;
}

export interface PortfolioCase {
  title: string;
  slug: { current: string };
  summary?: string;
  body?: any[];
  images?: SanityImage[];
  consent?: boolean;
  seo?: SEO;
}

export interface PodcastEpisode {
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[];
  image: SanityImage;
  publishedAt: string;
  duration?: string;
  audioUrl?: string;
  seo?: SEO;
}

export interface AboutPage {
  title: string;
  introduction?: string;
  body?: any[];
  portrait: SanityImage;
  seo?: SEO;
}
