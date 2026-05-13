import type { Metadata } from "next";
import Image from "next/image";
import { Award, CheckCircle, Factory, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/content/site";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  type Locale,
} from "@/content/i18n";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory,
  Users,
  Award,
  Globe,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/about` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/about`;
  });
  return {
    title: dict.nav.about,
    description: dict.about.hero.body,
    alternates: { canonical: `/${locale}/about`, languages },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const d = dict.about;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[var(--derchi-dark)] py-20 text-white lg:py-28">
        <Image
          src="/images/hero.jpg"
          alt={d.factoryAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.about}
          </p>
          <div className="mt-4 max-w-3xl">
            <h1 className="font-serif text-3xl font-bold italic md:text-4xl lg:text-5xl">
              {d.hero.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">{d.hero.body}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-stone-200 bg-white">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
          {dict.company.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="metallic-gold text-3xl font-bold tabular-nums md:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        {/* Story */}
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="derchi-eyebrow">{dict.company.eyebrow}</p>
            <h2 className="derchi-title-rule mt-6 inline-block font-serif text-2xl font-bold italic text-neutral-950 md:text-3xl">
              {d.storyTitle}
            </h2>
            <div className="mt-6 space-y-4 text-stone-600 leading-relaxed">
              {d.storyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-stone-300 bg-stone-100">
            <Image
              src="/images/og-image.jpg"
              alt={d.factoryAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-serif text-xl italic">{d.factoryAlt}</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/80">
                Foshan, China
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-24">
          <p className="derchi-eyebrow text-center justify-center">
            {d.capabilitiesTitle}
          </p>
          <h2 className="mx-auto mt-4 inline-block font-serif text-2xl font-bold italic text-neutral-950 md:text-3xl">
            {d.capabilitiesTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {d.capabilities.map((cap) => {
              const Icon = ICONS[cap.icon] ?? Factory;
              return (
                <Card
                  key={cap.title}
                  className="border-stone-200 rounded-none transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-[var(--accent-gold)] hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-950">
                      <Icon className="h-5 w-5 text-[var(--accent-gold)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-950">{cap.title}</h3>
                    <p className="mt-2 text-sm text-stone-600">{cap.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* QC */}
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] overflow-hidden border border-stone-300 bg-stone-100 lg:order-1">
            <Image
              src="/images/factory/qc.jpg"
              alt={d.qcAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-2xl font-bold italic text-neutral-950 md:text-3xl">
              {d.qcTitle}
            </h2>
            <p className="mt-6 leading-relaxed text-stone-600">{d.qcBody}</p>
            <ul className="mt-6 space-y-3">
              {d.qcPoints.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Certs */}
        <section
          id="certificates"
          className="scroll-mt-28 border border-stone-200 bg-white p-8 lg:p-12"
        >
          <h2 className="text-center font-serif text-2xl font-bold italic text-neutral-950 md:text-3xl">
            {d.certificatesTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-4 border border-stone-200 bg-stone-50 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--derchi-dark)]">
                  <span className="text-sm font-bold text-[var(--accent-gold)]">
                    {cert.name}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-950">{cert.name}</h3>
                  <p className="text-sm text-stone-600">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
