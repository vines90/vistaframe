"use client";

import { useReducedMotion } from "framer-motion";

const DEFAULT_CERTS = ["NFRC", "CE", "AS2047", "CSA", "Energy Star", "ISO 9001"];

type CertMarqueeProps = {
  items?: string[];
};

export function CertMarquee({ items = DEFAULT_CERTS }: CertMarqueeProps) {
  const reduce = useReducedMotion();
  const row = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-hidden={!reduce ? true : undefined}
    >
      <div
        className={
          reduce
            ? "flex flex-wrap justify-center gap-8 md:gap-14"
            : "flex w-max animate-marquee-x gap-10 md:gap-16 lg:gap-20 motion-safe:pause-on-hover"
        }
      >
        {reduce
          ? items.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-[#1a202c]"
              >
                <span className="h-px w-8 bg-[#e2e8f0]" />
                {cert}
                <span className="h-px w-8 bg-[#e2e8f0]" />
              </span>
            ))
          : row.map((cert, i) => (
              <span
                key={`${cert}-${i}`}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-[#1a202c]"
              >
                <span className="h-px w-8 bg-[#e2e8f0]" />
                {cert}
                <span className="h-px w-8 bg-[#e2e8f0]" />
              </span>
            ))}
      </div>
    </div>
  );
}
