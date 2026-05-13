import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from "@/content/products";
import { defaultLocale, getDict, isLocale, locales, type Locale } from "@/content/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/products` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/products`;
  });

  return {
    title: dict.productsPage.hero.title,
    description: dict.productsPage.hero.body,
    alternates: { canonical: `/${locale}/products`, languages },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const d = dict.productsPage;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-[var(--derchi-dark)] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.products}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold italic md:text-4xl">
            {d.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{d.hero.body}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {productCategories.map((category) => {
            const c =
              dict.productsSection.categories[
                category.id as keyof typeof dict.productsSection.categories
              ];
            return (
              <Card
                key={category.id}
                id={`cat-${category.id}`}
                className="group scroll-mt-28 overflow-hidden rounded-none border border-stone-200 transition-[box-shadow,border-color] duration-300 hover:border-[var(--accent-gold)] hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-square min-h-[220px] bg-stone-100 md:aspect-auto md:min-h-[300px]">
                      <Image
                        src={category.image}
                        alt={c.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
                      <span className="absolute left-0 top-0 bg-[var(--accent-gold)] px-3 py-1.5 font-serif text-[11px] font-semibold italic text-[var(--derchi-dark)]">
                        {c.tagline}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center p-8">
                      <h2 className="font-serif text-2xl font-bold italic text-neutral-950">
                        {c.name}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-stone-600">
                        {c.description}
                      </p>

                      <div className="mt-6 space-y-2">
                        {c.products.map((product) => (
                          <div
                            key={product}
                            className="flex items-center gap-2 text-sm text-stone-600"
                          >
                            <span className="h-1.5 w-1.5 bg-[var(--accent-gold)]" />
                            {product}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/${locale}/products/${category.id}`}
                        className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-amber-800 transition-colors hover:gap-3 hover:text-amber-950"
                      >
                        {d.exploreCta} {c.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-stone-200 bg-white p-8 text-center">
          <h2 className="font-serif text-2xl font-bold italic text-neutral-950">
            {d.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600">
            {d.ctaBody}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex items-center gap-2 rounded-none bg-[var(--accent)] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--accent-dark)]"
          >
            {d.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
