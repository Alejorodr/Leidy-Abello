"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { ResourceItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  video: "Video",
  podcast: "Podcast",
  lookbook: "Lookbook",
  article: "Artículo",
};

const TYPE_ICON: Record<string, string> = {
  video: "🎬",
  podcast: "🎙",
  lookbook: "📖",
  article: "📝",
};

interface ResourceCardProps {
  resource: ResourceItem;
  isPremiumUser: boolean;
}

export function ResourceCard({ resource, isPremiumUser }: ResourceCardProps) {
  const hasAccess = resource.isFree || isPremiumUser;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[20px] border border-neutral-100 bg-white shadow-soft transition hover:shadow-md",
        !hasAccess && "opacity-90",
      )}
    >
      {/* Cover */}
      <div className="relative aspect-video w-full overflow-hidden bg-brand-50">
        {resource.coverImage ? (
          <Image
            src={urlFor(resource.coverImage).width(640).height(360).url()}
            alt={resource.title}
            fill
            className={cn(
              "object-cover transition duration-500 group-hover:scale-105",
              !hasAccess && "blur-[2px]",
            )}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            {TYPE_ICON[resource.resourceType] ?? "📄"}
          </div>
        )}

        {/* Lock overlay */}
        {!hasAccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-900/40 backdrop-blur-[1px]">
            <span className="text-2xl">🔒</span>
            <span className="text-xs font-medium text-white">Premium</span>
          </div>
        )}

        {/* Type badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-neutral-700 backdrop-blur-sm">
          {TYPE_ICON[resource.resourceType]}{" "}
          {TYPE_LABELS[resource.resourceType]}
        </span>

        {resource.isFree && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-400 px-2.5 py-0.5 text-xs font-medium text-white">
            Libre
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1 space-y-1.5">
          <h3 className="font-serif text-base font-medium leading-snug text-neutral-900">
            {resource.title}
          </h3>
          {resource.excerpt && (
            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
              {resource.excerpt}
            </p>
          )}
        </div>

        {resource.duration && (
          <p className="text-xs text-neutral-400">{resource.duration}</p>
        )}

        {hasAccess ? (
          <Link
            href={`/portal/recurso/${resource.slug.current}`}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 active:scale-[0.98]"
          >
            Ver recurso
          </Link>
        ) : (
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent("Hola Leidy, me interesa acceder al contenido premium del portal.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-600 transition hover:bg-brand-50 active:scale-[0.98]"
          >
            <span>💬</span> Activar acceso premium
          </a>
        )}
      </div>
    </div>
  );
}
