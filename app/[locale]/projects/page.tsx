import type { Metadata } from "next";
import { ProjectsBrowser } from "./ProjectsBrowser";
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

  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/projects` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/projects`;
  });

  return {
    title: dict.nav.projects,
    description: dict.projectsSection.paragraph,
    alternates: { canonical: `/${locale}/projects`, languages },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-[var(--derchi-dark)] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.projects}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold italic md:text-4xl">
            {dict.projectsSection.titleNumberPrefix}
            <span className="metallic-gold not-italic">15,000+</span>
            {dict.projectsSection.titleSuffix}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">
            {dict.projectsSection.paragraph}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <ProjectsBrowser dict={dict} locale={locale} />
      </div>
    </div>
  );
}
