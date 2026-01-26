// @ts-nocheck
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity";
import { BlogPost } from "@/lib/sanity.types";
import { PortableText } from "@/components/common/portable-text";

export async function generateStaticParams() {
  const posts: BlogPost[] = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: BlogPost = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPost = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Blog
        </p>
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="text-sm text-neutral-500">
          {new Date(post.publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readTime}
        </p>
      </header>
      <div className="prose prose-lg max-w-none">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
