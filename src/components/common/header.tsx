import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";
import { ScrollAwareHeader } from "./scroll-aware-header";

export async function Header() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  return (
    <ScrollAwareHeader
      title={settings?.title ?? "Leidy Abello"}
      navLinks={settings?.navigation ?? []}
      social={settings?.social}
    />
  );
}
