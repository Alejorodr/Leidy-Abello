import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/sanity";
import { BlogPost } from "@/lib/sanity.types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Reflexiones sobre autoestima, estética consciente y bienestar.",
};

export default async function BlogPage() {
  const blogPosts: BlogPost[] = await getBlogPosts();

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">Blog</p>
        <h1 className="text-4xl font-semibold">Ideas que acompañan</h1>
        <p className="text-neutral-700">
          Contenido para nutrir tu relación con la belleza, el cuerpo y la
          autoestima.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug.current} className="card">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-300">
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readTime}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm text-neutral-600">{post.excerpt}</p>
            <Button asChild variant="outline" className="mt-6 w-fit">
              <Link href={`/blog/${post.slug.current}`}>Leer artículo</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
