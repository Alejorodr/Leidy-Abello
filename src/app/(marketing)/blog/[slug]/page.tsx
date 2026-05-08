import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostBySlugQuery } from "@/lib/sanity/queries";
import { BlogPost } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: [`blogPost:${slug}`],
  });

  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: [`blogPost:${slug}`],
  });

  if (!post) notFound();

  return (
    <div>
      {/* ── Header ── */}
      <Section
        spacing="sm"
        className="bg-gradient-to-b from-brand-100/60 to-brand-50"
      >
        <Container className="max-w-4xl">
          <Reveal direction="up" className="space-y-4">
            <p className="eyebrow">Blog</p>
            <h1 className="font-serif text-4xl font-medium md:text-5xl">
              {post.title}
            </h1>
            <p className="text-sm text-neutral-500">
              {new Date(post.publishedAt).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {post.readTime && (
                <span className="text-neutral-400"> · {post.readTime}</span>
              )}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Article body ── */}
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <Reveal direction="up">
            <div className="prose prose-lg prose-neutral max-w-none">
              {post.body ? (
                <PortableText value={post.body} />
              ) : (
                <p className="text-xl text-neutral-600">{post.excerpt}</p>
              )}
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
