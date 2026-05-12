import Link from "next/link";
import { processSteps } from "@/content/process";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="engineering-process" className="scroll-mt-28 border-t border-stone-200 bg-white py-16 lg:py-[4.75rem]">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow">Personalized fabrication</p>
          <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">Process</p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block font-serif text-[clamp(1.75rem,3.5vw,2.375rem)] font-bold italic text-neutral-950">
            Engineering roadmap
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 flex justify-between text-[11px] font-black tabular-nums text-[var(--accent-gold)] opacity-85">
          {Array.from({ length: Math.min(processSteps.length, 8) }).map((_, i) => (
            <span key={String(i)} className="hidden sm:inline">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </Reveal>

        <div className="relative mt-10">
          <div className="-mx-4 flex gap-6 overflow-x-auto pb-4 pt-6 sm:gap-8 lg:flex-wrap lg:justify-between lg:overflow-visible lg:gap-y-16">
            {processSteps.map((step, idx) => (
              <Reveal key={step.step} delay={(idx % 4) * 0.035} className="relative shrink-0">
                <div className="flex w-[9.85rem] flex-col gap-6 text-center lg:w-auto lg:max-w-[8.125rem]">
                  <span className="text-[clamp(3rem,5vw,3.625rem)] font-black leading-none text-stone-200">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <div className="mx-auto h-12 w-[2px] bg-gradient-to-b from-[var(--accent-gold)] to-[var(--accent)]" />
                  <h3 className="font-semibold italic text-neutral-950">{step.title}</h3>
                  <p className="text-[11px] leading-relaxed italic text-stone-500">{step.details[0]}</p>
                  {idx < processSteps.length - 1 ? (
                    <span
                      className="absolute right-[-14px] top-[3.625rem] hidden h-[2px] w-8 bg-[var(--accent-gold)]/45 2xl:block"
                      aria-hidden
                    />
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-24 text-center" delay={0.05}>
            <Link
              href="/contact"
              className="inline-flex rounded-none border-2 border-neutral-950 px-14 py-4 text-[12px] font-bold uppercase tracking-[0.28em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
            >
              Inquiry now →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
