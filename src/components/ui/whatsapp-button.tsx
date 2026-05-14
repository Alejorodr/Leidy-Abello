import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SiteSettings } from "@/lib/sanity/types";
import { WhatsAppBubble } from "./whatsapp-bubble";

export async function WhatsAppButton() {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  if (!settings?.social?.whatsapp) return null;
  return <WhatsAppBubble number={settings.social.whatsapp} />;
}
