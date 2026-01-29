import { PortableText as PortableTextReact } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-10 aspect-video w-full overflow-hidden rounded-2xl shadow-sm">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Imagen de contenido"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="mb-4 mt-12 text-3xl font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-4 mt-8 text-2xl font-bold">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>,
  },
};

export function PortableText({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="prose prose-neutral max-w-none prose-p:text-neutral-600 prose-headings:text-neutral-900">
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
