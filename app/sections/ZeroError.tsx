import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function ZeroError({ dict, locale }: Props) {
  const d = dict.zeroError;

  return (
    <section className="relative overflow-hidden bg-[var(--derchi-muted)] py-16 text-stone-200 lg:py-24">
      <div className="pointer-events-none absolute -right-[20%] top-[-20%] h-[480px] w-[480px] rounded-full bg-[var(--accent)]/14 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-15%] h-[360px] w-[360px] rounded-full bg-[var(--accent-gold)]/10 blur-[90px]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-center">
          <Reveal>
            <p className="derchi-eyebrow">{d.eyebrow}</p>
            <h2 className="derchi-title-rule mt-4 font-serif text-[clamp(1.875rem,4vw,2.75rem)] font-bold italic leading-snug tracking-tight text-white">
              <span className="metallic-gold not-italic">{d.titleAccent}</span>
              <br />
              {d.titleRest}
            </h2>
            <Link
              href={`/${locale}/about`}
              className="mt-8 inline-flex text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-gold)] underline-offset-8 hover:underline"
            >
              {d.cta} →
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-6 border border-white/12 bg-black/35 p-6 backdrop-blur-sm lg:p-8">
              {d.points.map((line) => (
                <li key={line} className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--accent-gold)] text-[var(--derchi-dark)] shadow-md">
                    <Check className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-relaxed text-stone-300">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
