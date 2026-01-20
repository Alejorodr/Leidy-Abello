import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { blogPosts } from "@/modules/blog/data";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);

  return {
    title: post?.title ?? "Artículo",
    description: post?.excerpt ?? "Detalle del artículo.",
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

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
          {post.date} · {post.readTime}
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
