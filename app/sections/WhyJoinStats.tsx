import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function WhyJoinStats({ dict, locale }: Props) {
  const d = dict.whyJoin;

  return (
    <section className="bg-[#111] py-16 text-white lg:py-[4.75rem]">
      <Reveal className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <p className="font-serif text-xl font-semibold italic text-[var(--accent-gold)]">
            {d.eyebrow}
          </p>
          <h2 className="mt-6 font-serif text-[clamp(1.75rem,3.8vw,2.6rem)] font-bold italic">
            {d.title}
          </h2>
          <Link
            href={`/${locale}/projects`}
            className="mt-4 inline-flex text-[12px] font-semibold uppercase tracking-[0.25em] text-stone-500 hover:text-[var(--accent-gold)]"
          >
            {d.cta} →
          </Link>
        </div>
        <div className="mt-16 grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-4">
          {d.cells.map((c, i) => (
            <div
              key={String(i)}
              className="group bg-neutral-950 px-6 py-12 text-center transition-colors hover:bg-neutral-900"
            >
              <p className="metallic-gold text-[clamp(1.875rem,3.5vw,2.625rem)] font-bold tabular-nums italic tracking-tight">
                {c.value}
              </p>
              <p className="mt-6 text-[11px] font-semibold uppercase leading-snug tracking-[0.18em] text-stone-500">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
