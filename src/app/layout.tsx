import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://leidy-abello-neon.vercel.app/",
  ),
  title: {
    default: "Leidy Abello · Tu templo es tu arte",
    template: "%s · Leidy Abello",
  },
  description:
    "Estética, bienestar y acompañamiento integral para potenciar tu identidad y autoestima.",
  openGraph: {
    title: "Leidy Abello · Tu templo es tu arte",
    description:
      "Estética, bienestar y acompañamiento integral para potenciar tu identidad y autoestima.",
    url: "/",
    siteName: "Leidy Abello",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leidy Abello · Tu templo es tu arte",
    description:
      "Estética, bienestar y acompañamiento integral para potenciar tu identidad y autoestima.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-brand-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
