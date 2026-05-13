import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function CompanyShowcase({ dict, locale }: Props) {
  const d = dict.company;

  return (
    <section className="relative bg-stone-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow justify-center text-center">{d.eyebrow}</p>
          <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.24em] text-stone-500">
            {d.introduction}
          </p>
          <h2 className="derchi-title-rule mx-auto mt-6 inline-block font-serif text-[clamp(1.875rem,3.8vw,2.5rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-stone-600 md:text-[15px]">
            {d.intro}
          </p>
          <div className="mx-auto mt-8 max-w-4xl px-4">
            <h3 className="font-serif text-2xl font-bold italic leading-snug tracking-tight text-neutral-950 md:text-3xl">
              {d.highlight}
            </h3>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.18fr] lg:gap-14 lg:items-start">
          <Reveal className="order-2 grid grid-cols-2 gap-x-6 gap-y-8 border border-stone-200 bg-white p-6 lg:order-1 lg:p-8">
            {d.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[clamp(1.375rem,2.6vw,1.875rem)] font-bold tabular-nums italic text-neutral-950">
                  {m.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {m.label}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.06} className="order-1 space-y-6 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-stone-300 bg-neutral-900 shadow-xl">
              <Image
                src="/images/og-image.jpg"
                alt={d.videoLabel}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover opacity-92"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-between p-5 text-sm text-white">
                <span className="font-serif text-base italic">{d.videoLabel}</span>
                <Link
                  href={`/${locale}/about`}
                  className="rounded-none border border-white/40 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md hover:bg-white hover:text-neutral-950"
                >
                  {d.catalog} →
                </Link>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-stone-600">{d.description}</p>
            <p className="text-[13px] font-semibold text-neutral-950">{d.whyTitle}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {d.pillars.map((p) => (
                <li key={p.title}>
                  <p className="text-sm font-semibold text-neutral-900">{p.title}</p>
                  <p className="text-xs italic text-stone-600">{p.subtitle}</p>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/products`}
              className="inline-flex text-[13px] font-semibold uppercase tracking-[0.2em] text-amber-800 hover:text-amber-950"
            >
              {d.catalog} →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
