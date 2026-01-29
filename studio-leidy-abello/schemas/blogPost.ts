import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Post del blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha publicación",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Tiempo de lectura",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Cuerpo",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Título" },
        { name: "description", type: "text", title: "Descripción" },
        {
          name: "ogImage",
          type: "image",
          title: "Imagen Open Graph",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
