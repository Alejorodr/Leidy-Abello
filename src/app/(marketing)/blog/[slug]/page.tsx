import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity";
import { BlogPost } from "@/lib/sanity.types";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts: BlogPost[] = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function BlogDetailPage({ params }: PageProps) {
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
      <div className="card space-y-4 text-sm text-neutral-600">
        <p>
          {post.excerpt} Aquí encontrarás reflexiones adicionales, ejercicios de
          escritura y prácticas simples para reconectar con tu autoestima.
        </p>
        <p>
          Te invito a leer con calma, elegir una idea y convertirla en un ritual
          de cuidado personal. La belleza auténtica se cultiva con presencia.
        </p>
      </div>
    </article>
  );
}
