import type { Metadata } from "next";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  type Locale,
} from "@/content/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/legal/privacy` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/legal/privacy`;
  });
  return {
    title: dict.legal.privacyTitle,
    description: dict.legal.privacyBody.slice(0, 160),
    alternates: { canonical: `/${locale}/legal/privacy`, languages },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-[var(--derchi-dark)] py-14 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold italic md:text-4xl">
            {dict.legal.privacyTitle}
          </h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-gold)]/85">
            {dict.legal.lastUpdated}: 2025
          </p>
        </div>
      </div>
      <article className="container mx-auto max-w-3xl px-4 py-14 lg:px-8 lg:py-20">
        <p className="text-[15px] leading-relaxed text-stone-700">
          {dict.legal.privacyBody}
        </p>
      </article>
    </div>
  );
}
