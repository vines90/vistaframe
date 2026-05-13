"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: { src: string; alt: string }[];
  className?: string;
};

export function Lightbox({ images, className }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-3", className)}>
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-[4/3] overflow-hidden border border-stone-300 bg-stone-100"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 px-4 py-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/15"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/15"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="relative max-h-[88vh] w-full max-w-5xl">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-[12px] uppercase tracking-[0.18em] text-white/70">
              {index + 1} / {images.length} — {images[index].alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
