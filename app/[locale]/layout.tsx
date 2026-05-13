import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { MultiChannelCta } from "@/components/MultiChannelCta";
import { StructuredData } from "@/components/StructuredData";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  localePath,
  type Locale,
} from "@/content/i18n";
import { siteConfig } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}`,
  };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}`;
  });

  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: localePath(locale, "/"),
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: siteConfig.name,
      locale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "es_ES",
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => (l === "en" ? "en_US" : l === "zh" ? "zh_CN" : "es_ES")),
      images: [
        { url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDict(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[var(--accent-gold)] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950"
      >
        Skip to content
      </a>
      <StructuredData locale={locale} />
      <Header dict={dict} locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MultiChannelCta dict={dict.multiCta} locale={locale} />
      <Footer dict={dict} locale={locale} />
      <CookieConsent dict={dict.cookie} />
    </>
  );
}
