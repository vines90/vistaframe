"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary };

export function Faq({ dict }: Props) {
  const d = dict.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-stone-200 bg-white py-16 lg:py-24"
    >
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="derchi-eyebrow">{d.eyebrow}</p>
          <h2 className="derchi-title-rule mt-6 inline-block font-serif text-[clamp(1.75rem,3.4vw,2.4rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-stone-600">
            {d.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-3">
          {d.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.question}
                className={cn(
                  "border bg-white transition-colors",
                  isOpen ? "border-[var(--accent-gold)]" : "border-stone-200",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-neutral-950">
                    {it.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200",
                      isOpen && "rotate-180 text-[var(--accent)]",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0">
                    <p className="border-t border-stone-200 px-5 py-4 text-[14px] leading-relaxed text-stone-600">
                      {it.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
