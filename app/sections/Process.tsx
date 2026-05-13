import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function Process({ dict, locale }: Props) {
  const d = dict.process;

  return (
    <section
      id="engineering-process"
      className="relative scroll-mt-28 overflow-hidden border-t border-stone-200 bg-white py-16 lg:py-[4.75rem]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/30 to-transparent lg:block"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow">{d.eyebrow}</p>
          <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {d.processLabel}
          </p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block font-serif text-[clamp(1.75rem,3.5vw,2.375rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-4 sm:gap-8 lg:flex-wrap lg:justify-between lg:overflow-visible lg:gap-y-16">
            {d.steps.map((step, idx) => (
              <Reveal
                key={step.title}
                delay={(idx % 4) * 0.04}
                className="relative shrink-0 snap-start"
              >
                <div className="flex w-[10.5rem] flex-col items-center gap-5 text-center lg:w-auto lg:max-w-[8.75rem]">
                  <span className="text-[clamp(3rem,5vw,3.625rem)] font-black leading-none text-stone-200">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="relative h-12 w-[2px] bg-gradient-to-b from-[var(--accent-gold)] to-[var(--accent)]">
                    <span
                      className="absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-[var(--accent-gold)] motion-safe:animate-connector-dot"
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-semibold italic text-neutral-950">{step.title}</h3>
                  <p className="text-[11.5px] leading-relaxed text-stone-500">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 text-center" delay={0.05}>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex rounded-none border-2 border-neutral-950 px-14 py-4 text-[12px] font-bold uppercase tracking-[0.28em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
            >
              {d.cta} →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
