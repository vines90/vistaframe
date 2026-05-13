import Image from "next/image";
import { siteConfig } from "@/content/site";
import { HeroContent } from "@/components/HeroContent";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

const EXTRA_CERTS = ["AGWA", "Hurricane"];

function certCircleLabel(name: string) {
  if (name === "Energy Star") return "ES";
  if (name === "ISO 9001") return "ISO";
  return name;
}

function HeroCertStrip({ label }: { label: string }) {
  const certs = [...siteConfig.certifications.map((c) => c.name)];
  EXTRA_CERTS.filter((x) => !certs.includes(x)).forEach((x) => certs.push(x));
  const row = certs.slice(0, 8);

  return (
    <div className="relative z-10 w-full shrink-0 border-t border-white/12 bg-neutral-950/88 px-4 py-5 backdrop-blur-md lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85 lg:text-left">
          <span className="mr-2 inline-block h-px w-6 align-middle bg-[var(--accent-gold)]/55" aria-hidden />
          {label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {row.map((name) => (
            <div
              key={name}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/65 bg-transparent text-[9px] font-bold uppercase tracking-tighter text-white shadow-[0_4px_18px_rgba(0,0,0,0.35)] ring-2 ring-black/30 transition-transform hover:-translate-y-0.5 hover:border-[var(--accent-gold)] sm:h-14 sm:w-14 sm:text-[10px]"
              title={name}
            >
              <span className="px-1 text-center leading-[1.1]">{certCircleLabel(name)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Props = { dict: Dictionary; locale: Locale };

export function Hero({ dict, locale }: Props) {
  const headerOverlapRem = "4.125rem";

  return (
    <section className="relative isolate -mt-[4.125rem] min-h-[100dvh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt={dict.about?.factoryAlt ?? "VistaFrame aluminum windows and doors"}
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center animate-ken-burns"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-black/85"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-[min(100%,52rem)] bg-gradient-to-l from-neutral-950/55 to-transparent"
          aria-hidden
        />
        <div className="hero-dot-matrix pointer-events-none absolute inset-0 opacity-[0.13]" aria-hidden />

        {/* Brand crosshair: horizontal + vertical hairlines */}
        <span
          className="pointer-events-none absolute top-[calc(4.125rem+5vh)] left-[6%] hidden h-px w-[28%] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/60 to-transparent lg:block"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute top-[calc(4.125rem+4.6vh)] left-[6%] hidden h-[24vh] w-px bg-gradient-to-b from-[var(--accent-gold)]/60 via-[var(--accent-gold)]/20 to-transparent lg:block"
          aria-hidden
        />
        {/* Brand wordmark frame on left bottom */}
        <div
          className="pointer-events-none absolute bottom-[14vh] left-[6%] hidden flex-col gap-2 lg:flex"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/60">
            VistaFrame · 001
          </span>
          <span className="font-serif text-[clamp(2rem,4.4vw,3.5rem)] italic text-white/12 leading-none">
            Precision
          </span>
        </div>
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[100vw] flex-col"
        style={{ paddingTop: `calc(${headerOverlapRem})` }}
      >
        <div className="flex min-h-0 flex-1 items-center pb-12 pt-10 sm:pb-14">
          <div className="container mx-auto max-w-[100vw] px-5 lg:px-10 xl:max-w-none">
            <HeroContent dict={dict.hero} locale={locale} />
          </div>
        </div>

        <HeroCertStrip label={dict.hero.certStripLabel} />
      </div>
    </section>
  );
}
