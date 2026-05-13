import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from "@/content/products";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function Products({ dict, locale }: Props) {
  const d = dict.productsSection;

  return (
    <section
      id="products"
      className="scroll-mt-28 border-t border-stone-200 bg-white py-16 lg:py-[4.75rem]"
    >
      <div className="container relative mx-auto px-4 lg:px-8">
        <Reveal className="text-center lg:mb-14">
          <p className="derchi-eyebrow text-center">{d.eyebrow}</p>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {d.productLabel}
          </p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block max-w-[min(100%,54rem)] font-serif text-[clamp(1.75rem,3.8vw,2.6rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, index) => {
            const c = d.categories[category.id as keyof typeof d.categories];
            return (
              <Reveal key={category.id} delay={index * 0.05} className="h-full">
                <Card className="group relative h-full overflow-hidden rounded-none border border-stone-300 bg-neutral-50 shadow-none transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)] hover:shadow-lg">
                  <CardContent className="h-full p-0">
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                      <Image
                        src={category.image}
                        alt={c.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[640ms] group-hover:scale-[1.06]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                      <span className="absolute left-0 top-0 bg-[var(--accent-gold)] px-3 py-1.5 font-serif text-xs font-semibold italic text-[var(--derchi-dark)]">
                        {c.products[c.products.length - 1]}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                          {c.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex min-h-[12.5rem] flex-col gap-4 border-x border-t border-transparent p-6">
                      <h3 className="font-serif text-lg font-semibold italic text-neutral-950">
                        {c.name}
                      </h3>
                      <p className="text-[12.5px] leading-relaxed text-stone-600">
                        {c.description}
                      </p>
                      <Link
                        href={`/${locale}/products/${category.id}`}
                        className="mt-auto inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.15em] text-amber-800 transition-colors hover:text-amber-950"
                      >
                        {d.more}
                        <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 grid grid-cols-2 gap-3 border border-stone-200 bg-neutral-950 p-px md:grid-cols-4">
          {d.highlights.map((s) => (
            <div
              key={s.label}
              className="bg-neutral-950 px-4 py-6 text-center text-stone-200"
            >
              <p className="metallic-gold text-lg font-bold italic md:text-xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 rounded-none border border-neutral-950 bg-neutral-950 px-10 py-4 text-[12px] font-bold uppercase tracking-[0.26em] text-white hover:bg-transparent hover:text-neutral-950"
          >
            {d.cta} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
