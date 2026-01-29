import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { blogPostBySlugQuery } from "@/lib/sanity/queries";
import { BlogPost } from "@/lib/sanity/types";
import { PortableText } from "@/components/common/portable-text";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await sanityFetch<BlogPost>({
    query: blogPostBySlugQuery,
    params,
    tags: [`blogPost:${params.slug}`],
  });

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await sanityFetch<BlogPost>({
    query: blogPostBySlugQuery,
    params,
    tags: [`blogPost:${params.slug}`],
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-12 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Blog
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">{post.title}</h1>
        <p className="text-sm text-neutral-500">
          {new Date(post.publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.readTime && ` · ${post.readTime}`}
        </p>
      </header>
      <div className="prose prose-neutral max-w-none prose-lg">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p className="text-xl text-neutral-600">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
