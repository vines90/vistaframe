import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/app/sections/Faq";
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
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/resources/faqs` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/resources/faqs`;
  });
  return {
    title: dict.resources.faqsTitle,
    description: dict.resources.faqsBody,
    alternates: { canonical: `/${locale}/resources/faqs`, languages },
  };
}

export default async function FaqsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const r = dict.resources;

  // FAQPage JSON-LD
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="bg-[var(--derchi-dark)] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.resources}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold italic md:text-4xl">
            {r.faqsTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{r.faqsBody}</p>
        </div>
      </div>
      <Faq dict={dict} />
      <div className="bg-stone-100 py-12 text-center">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 rounded-none border-2 border-neutral-950 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
        >
          {dict.cta.primary}
        </Link>
      </div>
    </div>
  );
}
