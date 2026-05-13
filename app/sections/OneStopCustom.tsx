"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

const TOUR_SRC = [
  "/images/factory/line.jpg",
  "/images/factory/cnc.jpg",
  "/images/factory/qc.jpg",
  "/images/factory/packaging.jpg",
];

export function OneStopCustom({ dict, locale }: Props) {
  const d = dict.oneStop;
  const [tour, setTour] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = () => setTour(false);
  const next = () => setIdx((i) => (i + 1) % d.tourImages.length);
  const prev = () =>
    setIdx((i) => (i - 1 + d.tourImages.length) % d.tourImages.length);

  return (
    <section className="border-y border-stone-300 bg-neutral-950 py-16 text-stone-200 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="derchi-eyebrow text-[var(--accent-gold)]">{d.eyebrow}</p>
            <h2 className="derchi-title-rule mt-4 font-serif text-3xl font-bold italic text-white md:text-4xl">
              {d.title}
            </h2>
            <p className="mt-10 text-xl font-semibold italic text-[var(--accent-gold)]">
              {d.subtitle}
            </p>
            <ul className="mt-8 space-y-5">
              {d.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 border-l-2 border-[var(--accent-gold)] ps-5 text-[15px] leading-relaxed text-stone-400"
                >
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/contact`}
              className="mt-10 inline-flex rounded-none border border-[var(--accent-gold)] bg-transparent px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10"
            >
              {d.cta} →
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => {
                setIdx(0);
                setTour(true);
              }}
              className="group relative aspect-[16/11] w-full overflow-hidden border-2 border-[var(--accent-gold)]/50 bg-neutral-900 text-left"
              aria-label={d.tourTitle}
            >
              <Image
                src="/images/factory/line.jpg"
                alt={d.tourTitle}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-4 flex flex-col items-center justify-center border border-dashed border-white/22 bg-neutral-950/80 text-center backdrop-blur-sm">
                <Box
                  className="mb-6 h-12 w-12 text-[var(--accent-gold)]"
                  strokeWidth={1.25}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                  {d.vrLabel}
                </span>
                <p className="mt-2 font-serif text-2xl font-bold italic text-white">
                  {d.tourTitle}
                </p>
                <span className="mt-8 inline-flex bg-[var(--accent-gold)] px-10 py-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--derchi-dark)] transition group-hover:bg-white">
                  {d.vrCta} →
                </span>
              </div>
              <span className="absolute right-6 top-6 text-[3rem] font-black leading-none text-white/8">
                360°
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      {tour ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={d.tourTitle}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 px-4 py-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-[min(56rem,94vw)] overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl">
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/30 bg-black/40 p-1.5 text-white hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-[16/9] bg-black">
              <Image
                src={TOUR_SRC[idx]}
                alt={d.tourImages[idx].title}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Previous"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/15"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="border-t border-white/10 px-6 py-5 text-stone-200">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-gold)]/85">
                {d.vrLabel} · {String(idx + 1).padStart(2, "0")} / {String(d.tourImages.length).padStart(2, "0")}
              </p>
              <h4 className="mt-2 font-serif text-xl font-semibold italic">
                {d.tourImages[idx].title}
              </h4>
              <p className="mt-1 text-[13px] text-stone-400">
                {d.tourImages[idx].description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
