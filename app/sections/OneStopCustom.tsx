import Link from "next/link";
import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const POINTS = [
  "Structural and style adaptations with documented performance.",
  "Private project‑paced solutions across residential · hospitality · HQ.",
  "Colors · logos · glass · hardware · finishes — configurable per facade.",
];

export function OneStopCustom() {
  return (
    <section className="border-y border-stone-300 bg-neutral-950 py-16 text-stone-200 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="derchi-eyebrow text-[var(--accent-gold)]">Whole‑house customization</p>
            <h2 className="derchi-title-rule mt-4 font-serif text-3xl font-bold italic text-white md:text-4xl">
              Customized
            </h2>
            <p className="mt-10 text-xl font-semibold italic text-[var(--accent-gold)]">One‑Stop Customization</p>
            <ul className="mt-8 space-y-5">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 border-l-2 border-[var(--accent-gold)] ps-5 text-[15px] italic leading-relaxed text-stone-400">
                  {p}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="mt-10 rounded-none border-[var(--accent-gold)] bg-transparent px-8 py-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10"
            >
              <Link href="/contact">Get our full suite of custom services →</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/11] overflow-hidden border-2 border-[var(--accent-gold)]/50 bg-neutral-900">
              <div className="absolute inset-4 flex flex-col items-center justify-center border border-dashed border-white/22 bg-neutral-950/80 text-center backdrop-blur-sm">
                <Box className="mb-6 h-12 w-12 text-[var(--accent-gold)]" strokeWidth={1.25} />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Tour</span>
                <p className="mt-2 font-serif text-2xl font-bold italic text-white">Enterprise VR Preview</p>
                <button
                  type="button"
                  className="mt-8 px-10 py-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--derchi-dark)] bg-[var(--accent-gold)] transition hover:bg-white"
                >
                  Enter VR
                </button>
              </div>
              <span className="absolute right-6 top-6 text-[3rem] font-black leading-none text-white/8">VR</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
