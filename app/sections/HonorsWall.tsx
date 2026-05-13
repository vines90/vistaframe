"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary };

export function HonorsWall({ dict }: Props) {
  const d = dict.honors;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="honors"
      className="scroll-mt-28 border-t border-stone-200 bg-stone-100 py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow text-center justify-center text-amber-900">
            {d.eyebrow}
          </p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block font-serif text-[clamp(1.75rem,3.5vw,2.375rem)] font-bold italic text-neutral-950">
            {d.title}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[14px] leading-relaxed text-stone-600">
            {d.intro}
          </p>
        </Reveal>
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.certifications.map((cert) => (
            <article
              key={cert.name}
              className="group flex flex-col items-center gap-4 border border-stone-300 bg-white p-6 text-center shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex min-h-[4rem] min-w-[5.75rem] items-center justify-center border-2 border-[var(--accent-gold)] px-4 text-lg font-black leading-tight tracking-tighter text-neutral-950 transition group-hover:bg-[var(--accent-gold)]">
                {cert.name}
              </span>
              <p className="text-[11px] font-medium uppercase leading-snug tracking-wide text-stone-600">
                {cert.description}
              </p>
              <button
                type="button"
                onClick={() => setOpen(cert.name)}
                className="mt-auto text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800 transition hover:text-amber-950"
              >
                {d.viewCertificate} →
              </button>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-14 border border-dashed border-stone-400 bg-neutral-950 px-8 py-10 text-center text-stone-300">
          <span className="metallic-gold text-[28px] font-black tracking-widest">
            {d.mapTitle}
          </span>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
            {d.mapBody}
          </p>
        </Reveal>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={d.certificateDialogTitle}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="relative w-[min(28rem,92vw)] border border-stone-200 bg-white p-8 text-center">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">
              {d.certificateDialogTitle}
            </p>
            <div className="mx-auto mt-5 inline-flex min-h-[6rem] min-w-[8rem] items-center justify-center border-2 border-[var(--accent-gold)] px-6 text-2xl font-black tracking-tighter text-neutral-950">
              {open}
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-stone-600">
              {d.certificateDialogBody}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
