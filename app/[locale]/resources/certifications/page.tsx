import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
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
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/resources/certifications` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/resources/certifications`;
  });
  return {
    title: dict.resources.certsTitle,
    description: dict.resources.certsBody,
    alternates: { canonical: `/${locale}/resources/certifications`, languages },
  };
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const r = dict.resources;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-[var(--derchi-dark)] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.resources}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold italic md:text-4xl">
            {r.certsTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{r.certsBody}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.certifications.map((cert) => (
            <article
              key={cert.name}
              className="flex flex-col items-center gap-5 border border-stone-200 bg-white p-8 text-center"
            >
              <span className="inline-flex min-h-[5rem] min-w-[7rem] items-center justify-center border-2 border-[var(--accent-gold)] px-5 text-2xl font-black tracking-tighter text-neutral-950">
                {cert.name}
              </span>
              <h2 className="font-serif text-xl font-semibold italic text-neutral-950">
                {cert.name}
              </h2>
              <p className="text-sm leading-relaxed text-stone-600">
                {cert.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
