import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/content/i18n/types";

const PARTNERS = [
  "ATELIER N",
  "BAY GROUP",
  "CALIBER",
  "DOMUS",
  "ENVOY",
  "FRAMEWORK",
  "GRAND HALL",
  "HORIZON",
  "MERIDIAN",
  "NORTH STAR",
];

type Props = { dict: Dictionary };

export function PartnersLogos({ dict }: Props) {
  const d = dict.partners;
  // Triple the list for a seamless marquee.
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="border-y border-stone-200 bg-stone-50 py-12 lg:py-16">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <Reveal>
          <p className="derchi-eyebrow justify-center text-center">{d.eyebrow}</p>
          <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-stone-500">
            {d.caption}
          </p>
        </Reveal>

        <div
          className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-hidden
        >
          <div className="flex w-max animate-marquee-x gap-12 motion-safe:pause-on-hover">
            {row.map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="inline-flex items-center justify-center whitespace-nowrap border border-stone-200 bg-white px-6 py-3 font-serif text-[13px] font-semibold tracking-[0.32em] text-stone-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
