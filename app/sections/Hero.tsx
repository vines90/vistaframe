import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";
import { siteConfig } from "@/content/site";
import { HeroContent } from "@/components/HeroContent";

const EXTRA_CERTS = ["AGWA", "Hurricane"];

function certCircleLabel(name: string) {
  if (name === "Energy Star") return "ES";
  if (name === "ISO 9001") return "ISO";
  return name;
}

/** DESCHY-style floating quote strip + primary action */
function FloatingQuotePulse() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[60] md:bottom-8 md:right-8">
      <div className="pointer-events-auto flex max-w-[min(100vw-2rem,24rem)] items-center gap-3 sm:gap-4">
        <div className="rounded-lg border border-neutral-200/90 bg-white/98 px-3.5 py-2.5 shadow-lg shadow-black/20 backdrop-blur-sm sm:px-4 sm:py-3">
          <p className="text-[13px] font-semibold leading-tight text-neutral-900">
            {siteConfig.hero.floatingQuoteLead}
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-neutral-600">
            {siteConfig.hero.floatingQuoteSub}
          </p>
        </div>
        <Link
          href="/contact"
          aria-label={siteConfig.hero.floatingQuoteLead}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg shadow-black/25 transition-[transform,box-shadow] hover:scale-105 hover:shadow-xl"
        >
          <Headphones className="h-6 w-6" aria-hidden />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/** Bottom certification band inside hero viewport */
function HeroCertStrip() {
  const certs = [...siteConfig.certifications.map((c) => c.name)];
  EXTRA_CERTS.filter((x) => !certs.includes(x)).forEach((x) => certs.push(x));
  const row = certs.slice(0, 10);

  return (
    <div className="relative z-10 w-full shrink-0 border-t border-white/12 bg-neutral-950/88 px-4 py-5 backdrop-blur-md lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 sm:gap-8 lg:justify-between lg:gap-6">
        {row.map((name) => (
          <div
            key={name}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/75 bg-transparent text-[9px] font-bold uppercase tracking-tighter text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-4 ring-black/35 sm:h-16 sm:w-16 sm:text-[10px]"
            title={name}
          >
            <span className="px-1 text-center leading-[1.1]">{certCircleLabel(name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  /** Single nav row overlap on homepage (utility bar hidden at top via Header) — matches `components/Header.tsx` main row height */
  const headerOverlapRem = "4.125rem";

  return (
    <section className="relative isolate -mt-[4.125rem] min-h-[100dvh] overflow-hidden bg-black">
      {/* Full-bleed under transparent/fixed stacking: background from top edge of viewport */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="VistaFrame aluminum windows and doors in a coastal residence"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center animate-ken-burns"
        />

        {/* Readability: keep architecture visible on left, deepen toward right-aligned type */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/28 to-black/82"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-[min(100%,52rem)] bg-gradient-to-l from-neutral-950/55 to-transparent"
          aria-hidden
        />

        <div className="hero-dot-matrix pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      </div>

      <FloatingQuotePulse />

      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] max-w-[100vw] flex-col`}
        style={{ paddingTop: `calc(${headerOverlapRem})` }}
      >
        <div className="flex min-h-0 flex-1 items-center pb-12 pt-10 sm:pb-14">
          <div className="container mx-auto max-w-[100vw] px-5 lg:px-10 xl:max-w-none">
            <HeroContent />
          </div>
        </div>

        <HeroCertStrip />
      </div>
    </section>
  );
}
