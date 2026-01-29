import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Título Hero",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtítulo Hero",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen Hero",
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
      name: "featuredServices",
      title: "Servicios destacados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
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
