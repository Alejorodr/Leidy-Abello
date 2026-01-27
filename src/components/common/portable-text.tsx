import { PortableText as PortableTextReact } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-10 aspect-video w-full overflow-hidden rounded-xl">
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
};

export function PortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />;
}
