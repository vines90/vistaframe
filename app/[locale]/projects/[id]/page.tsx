import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import { projects } from "@/content/projects";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  type Locale,
} from "@/content/i18n";
import { siteConfig } from "@/content/site";

type Params = { locale: string; id: string };

export function generateStaticParams() {
  const out: Params[] = [];
  locales.forEach((l) => {
    projects.forEach((p) => out.push({ locale: l, id: p.id }));
  });
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}/projects/${id}`,
  };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/projects/${id}`;
  });

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/${locale}/projects/${id}`, languages },
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.images[0], width: 1600, height: 1200, alt: project.name }],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const d = dict.projectsSection;

  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) notFound();
  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.projects, item: `${siteConfig.url}/${locale}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteConfig.url}/${locale}/projects/${id}` },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    locationCreated: { "@type": "Place", name: project.location },
    image: project.images.map((img) => `${siteConfig.url}${img}`),
    dateCreated: project.year,
    creator: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />

      {/* Hero image */}
      <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden bg-neutral-900">
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-12 text-white lg:px-8 lg:pb-16">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.nav.projects}
          </Link>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-bold italic md:text-5xl">
            {project.name}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--accent-gold)]" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4 text-[var(--accent-gold)]" />
              {d.types[project.type] ?? project.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--accent-gold)]" />
              {project.year}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid gap-12 px-4 py-14 lg:grid-cols-[1fr_18rem] lg:gap-16 lg:px-8 lg:py-20">
        <article className="space-y-10">
          <p className="text-[16px] leading-relaxed text-stone-700">{project.description}</p>

          <section>
            <h2 className="font-serif text-xl font-bold italic text-neutral-950 md:text-2xl">
              {d.detailLabels.productsUsed}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.products.map((p) => (
                <span
                  key={p}
                  className="border border-stone-300 bg-white px-3 py-1.5 text-[12px] font-medium uppercase tracking-wider text-stone-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </section>

          {project.images.length > 1 ? (
            <section>
              <h2 className="font-serif text-xl font-bold italic text-neutral-950 md:text-2xl">
                {d.related}
              </h2>
              <div className="mt-5">
                <Lightbox
                  images={project.images.map((src, i) => ({
                    src,
                    alt: `${project.name} — ${i + 1}`,
                  }))}
                />
              </div>
            </section>
          ) : null}
        </article>

        <aside className="space-y-6">
          <div className="border border-stone-200 bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
              {d.detailLabels.region}
            </p>
            <p className="mt-2 font-serif text-lg font-semibold italic text-neutral-950">
              {d.regions[project.region] ?? project.region}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="block border border-neutral-950 bg-neutral-950 px-6 py-5 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-transparent hover:text-neutral-950"
          >
            {dict.cta.primary}
          </Link>

          <div className="grid gap-3">
            <Link
              href={`/${locale}/projects/${prev.id}`}
              className="group flex items-center justify-between border border-stone-200 bg-white px-4 py-3 text-sm transition hover:border-[var(--accent-gold)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                ← {d.detailLabels.previous}
              </span>
              <span className="truncate text-right font-medium text-neutral-900">
                {prev.name}
              </span>
            </Link>
            <Link
              href={`/${locale}/projects/${next.id}`}
              className="group flex items-center justify-between border border-stone-200 bg-white px-4 py-3 text-sm transition hover:border-[var(--accent-gold)]"
            >
              <span className="truncate text-left font-medium text-neutral-900">
                {next.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                {d.detailLabels.next} →
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
