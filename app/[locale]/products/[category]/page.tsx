import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { productCategories, products } from "@/content/products";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  type Locale,
} from "@/content/i18n";
import { siteConfig } from "@/content/site";

type Params = { locale: string; category: string };

export function generateStaticParams() {
  const out: Params[] = [];
  locales.forEach((l) => {
    productCategories.forEach((c) => out.push({ locale: l, category: c.id }));
  });
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: rawLocale, category } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const cat = productCategories.find((c) => c.id === category);
  if (!cat) return {};
  const c = dict.productsSection.categories[cat.id as keyof typeof dict.productsSection.categories];

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}/products/${category}`,
  };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/products/${category}`;
  });

  return {
    title: c.name,
    description: c.description,
    alternates: { canonical: `/${locale}/products/${category}`, languages },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: rawLocale, category } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  const cat = productCategories.find((c) => c.id === category);
  if (!cat) notFound();

  const c = dict.productsSection.categories[cat.id as keyof typeof dict.productsSection.categories];
  const items = products.filter((p) => p.category === cat.id);
  const dCat = dict.productsPage.categoryDetail;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.products, item: `${siteConfig.url}/${locale}/products` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${siteConfig.url}/${locale}/products/${category}` },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Banner */}
      <div className="relative isolate overflow-hidden bg-[var(--derchi-dark)] text-white">
        <Image
          src={cat.image}
          alt={c.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="container relative mx-auto px-4 py-20 lg:px-8 lg:py-28">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dCat.backToProducts}
          </Link>
          <h1 className="mt-5 font-serif text-4xl font-bold italic md:text-5xl">{c.name}</h1>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.32em] text-white/70">
            {c.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            {c.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto grid gap-12 px-4 py-12 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:px-8 lg:py-20">
        {/* Sticky toc */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-stone-500">
              {c.name}
            </p>
            <ul className="space-y-2 border-l border-stone-200 pl-4">
              {items.map((p) => {
                const info = dict.productsPage.productInfo[p.id as keyof typeof dict.productsPage.productInfo];
                return (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className="block text-sm text-stone-600 transition hover:text-amber-900"
                    >
                      {info?.name ?? p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="space-y-12">
          {items.length === 0 ? (
            <p className="text-stone-500">{dict.search.empty}</p>
          ) : null}
          {items.map((p) => {
            const info =
              dict.productsPage.productInfo[
                p.id as keyof typeof dict.productsPage.productInfo
              ];
            const name = info?.name ?? p.name;
            const description = info?.description ?? p.description;
            const features = info?.features ?? p.features;
            const applications = info?.applications ?? p.applications;
            const heroImg = p.image;

            return (
              <article
                key={p.id}
                id={p.id}
                className="scroll-mt-28 overflow-hidden border border-stone-200 bg-white"
              >
                <div className="grid lg:grid-cols-[1.1fr_1fr]">
                  <div className="relative aspect-[4/3] bg-stone-100 lg:aspect-auto">
                    <Image
                      src={heroImg}
                      alt={name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute left-0 top-0 flex flex-wrap gap-1 p-3">
                      {p.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1 bg-[var(--accent-gold)] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--derchi-dark)]"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 p-6 lg:p-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-900">
                        {c.name}
                      </p>
                      <h2 className="mt-2 font-serif text-2xl font-bold italic text-neutral-950 md:text-3xl">
                        {name}
                      </h2>
                      <p className="mt-3 text-[14px] leading-relaxed text-stone-600">
                        {description}
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                          {dCat.keyFeatures}
                        </p>
                        <ul className="mt-3 space-y-2 text-[13px] text-stone-700">
                          {features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent-gold)]" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                          {dCat.specifications}
                        </p>
                        <dl className="mt-3 grid gap-2 text-[12.5px]">
                          {p.specifications.uValue ? (
                            <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                              <dt className="text-stone-500">{dict.productsPage.specs.uValue}</dt>
                              <dd className="font-semibold text-neutral-900">{p.specifications.uValue}</dd>
                            </div>
                          ) : null}
                          {p.specifications.soundInsulation ? (
                            <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                              <dt className="text-stone-500">{dict.productsPage.specs.soundInsulation}</dt>
                              <dd className="font-semibold text-neutral-900">{p.specifications.soundInsulation}</dd>
                            </div>
                          ) : null}
                          {p.specifications.windResistance ? (
                            <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                              <dt className="text-stone-500">{dict.productsPage.specs.windResistance}</dt>
                              <dd className="font-semibold text-neutral-900">{p.specifications.windResistance}</dd>
                            </div>
                          ) : null}
                          {p.specifications.airTightness ? (
                            <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                              <dt className="text-stone-500">{dict.productsPage.specs.airTightness}</dt>
                              <dd className="font-semibold text-neutral-900">{p.specifications.airTightness}</dd>
                            </div>
                          ) : null}
                          {p.specifications.waterTightness ? (
                            <div className="flex justify-between gap-3">
                              <dt className="text-stone-500">{dict.productsPage.specs.waterTightness}</dt>
                              <dd className="font-semibold text-neutral-900">{p.specifications.waterTightness}</dd>
                            </div>
                          ) : null}
                        </dl>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                        {dCat.applications}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {applications.map((a) => (
                          <span
                            key={a}
                            className="border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] uppercase tracking-wide text-stone-600"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/contact`}
                      className="mt-2 inline-flex items-center gap-2 self-start rounded-none border border-neutral-950 bg-neutral-950 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-transparent hover:text-neutral-950"
                    >
                      {dCat.inquireNow}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
