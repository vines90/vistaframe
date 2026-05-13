import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { defaultLocale, isLocale } from "@/content/i18n";

// 使用系统字体变量（无需下载 Google 字体）
const fontSans = {
  variable: "--font-geist-sans",
  style: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" },
};

const fontSerif = {
  variable: "--font-serif",
  style: { fontFamily: "Georgia, 'Times New Roman', 'Playfair Display', serif" },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      { url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const headerLocale = h.get("x-locale");
  const lang = isLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html
      lang={lang}
      className="h-full"
      style={{
        [fontSans.variable]: fontSans.style.fontFamily,
        [fontSerif.variable]: fontSerif.style.fontFamily,
      }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
