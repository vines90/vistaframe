import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/content/site";

const PILLARS = [
  { title: "Capacity Guarantee", subtitle: "Scalable fabrication & delivery timelines." },
  { title: "Innovation‑driven", subtitle: "R&D support from concept to commissioning." },
  { title: "Global Recognition", subtitle: "Certificates aligned with major regional codes." },
  { title: "Professional Customization", subtitle: "Finishes · glass · hardware · geometry." },
  { title: "Global Trust", subtitle: "Architects · builders · developers worldwide." },
];

export function CompanyShowcase() {
  const s = siteConfig.stats;
  const metrics = [
    { value: `${siteConfig.stats.productionArea} m²`, label: "Production Base" },
    { value: s.annualCapacity, label: "Annual Capacity (m²)" },
    { value: s.rdExperts, label: "R&D Experts" },
    { value: s.employees, label: "Employees" },
  ];

  return (
    <section className="relative bg-stone-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow justify-center text-center">About Us</p>
          <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.24em] text-stone-500">Introduction</p>
          <h2 className="derchi-title-rule mx-auto mt-6 inline-block font-serif text-[clamp(1.875rem,3.8vw,2.5rem)] font-bold italic text-neutral-950">
            Company Profile
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm italic leading-relaxed text-stone-600 md:text-[15px]">
            Engineering‑first aluminum window & door supplier for discerning projects worldwide —
            one‑stop feasibility, quoting, fabrication, and export logistics.
          </p>
          <div className="mx-auto mt-8 max-w-4xl px-4">
            <h3 className="font-serif text-2xl font-bold italic leading-snug tracking-tight text-neutral-950 md:text-3xl">
              VistaFrame delivers global buyers one‑stop customization for façade openings.
            </h3>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.18fr] lg:gap-14 lg:items-start">
          <Reveal className="order-2 grid grid-cols-2 gap-x-6 gap-y-8 border border-stone-200 bg-white p-6 lg:order-1 lg:p-8">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[clamp(1.375rem,2.6vw,1.875rem)] font-bold tabular-nums italic text-neutral-950">{m.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">{m.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.06} className="order-1 space-y-6 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-stone-300 bg-neutral-900 shadow-xl">
              <Image
                src="/images/og-image.jpg"
                alt={siteConfig.name}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover opacity-92"
              />
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center bg-black/35 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-black/45"
              >
                Enterprise Video
              </button>
            </div>
            <p className="text-[14px] leading-relaxed italic text-stone-600">{siteConfig.description}</p>
            <p className="text-[13px] font-semibold text-neutral-950">Why choose us?</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <li key={p.title}>
                  <p className="text-sm font-semibold text-neutral-900">{p.title}</p>
                  <p className="text-xs italic text-stone-600">{p.subtitle}</p>
                </li>
              ))}
            </ul>
            <Link href="/products" className="inline-flex text-[13px] font-semibold uppercase tracking-[0.2em] text-amber-800 hover:text-amber-950">
              View Catalog →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
