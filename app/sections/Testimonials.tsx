"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials({ dict }: Props) {
  const d = dict.testimonials;
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 6500, stopOnInteraction: true })],
  );
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setTick((t) => t + 1);
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <section className="relative overflow-hidden border-y border-stone-200 bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="derchi-eyebrow justify-center text-center">{d.eyebrow}</p>
          <h2 className="derchi-title-rule mx-auto mt-6 inline-block font-serif text-[clamp(1.75rem,3.6vw,2.4rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-stone-600">
            {d.subtitle}
          </p>
        </Reveal>

        <div className="relative mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex">
              {d.items.map((t) => (
                <article
                  key={t.name}
                  className="ml-6 w-full shrink-0 grow-0 basis-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
                >
                  <div className="flex h-full flex-col gap-6 border border-stone-200 bg-stone-50 p-6 lg:p-8">
                    <Quote
                      className="h-8 w-8 text-[var(--accent-gold)]"
                      strokeWidth={1.4}
                    />
                    <p className="text-[15px] leading-relaxed text-neutral-800">
                      “{t.quote}”
                    </p>
                    <div className="mt-auto flex items-center gap-4 border-t border-stone-200 pt-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent-gold)] bg-[var(--derchi-dark)] text-sm font-bold text-[var(--accent-gold)]">
                        {initials(t.name)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">
                          {t.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {t.role} · {t.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => embla?.scrollPrev()}
              className="flex h-10 w-10 items-center justify-center border border-stone-300 text-neutral-900 transition hover:bg-neutral-950 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => embla?.scrollNext()}
              className="flex h-10 w-10 items-center justify-center border border-stone-300 text-neutral-900 transition hover:bg-neutral-950 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
