import { siteConfig } from "@/content/site";

const EXTRA = ["AGWA", "Hurricane", "SA"];

export function CertPartnersStrip() {
  const badges = [...siteConfig.certifications.map((c) => c.name), ...EXTRA];

  return (
    <section aria-label="Partners and certifications" className="border-y border-stone-300 bg-neutral-950 py-6 text-stone-200">
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-gold)]/90 md:flex-nowrap">
          <span className="tabular-nums">01</span>
          <span className="hidden flex-1 justify-center gap-2 px-8 md:flex" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={String(i)} className="opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </span>
          <span className="tabular-nums">08</span>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4 lg:justify-between lg:gap-x-6">
          {badges.slice(0, 8).map((name) => (
            <span
              key={name}
              className="relative text-center font-serif text-base font-semibold italic text-white md:text-lg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
