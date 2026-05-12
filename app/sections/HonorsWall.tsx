import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function HonorsWall() {
  return (
    <section id="honors" className="scroll-mt-28 border-t border-stone-200 bg-stone-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center">
          <p className="derchi-eyebrow text-center justify-center text-amber-900">CERTIFICATIONS · HONORS</p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block font-serif text-[clamp(1.75rem,3.5vw,2.375rem)] font-bold italic text-neutral-950">
            Honors
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[14px] leading-relaxed italic text-stone-600">
            {siteConfig.certifications.slice(0, 4).map((c) => c.description).join(" · ")}
            — plus regional compliance dossiers tailored to bidding packages.
          </p>
        </Reveal>
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.certifications.map((cert) => (
            <article
              key={cert.name}
              className="border border-stone-300 bg-white p-6 text-center shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex min-h-[4rem] min-w-[5.75rem] items-center justify-center border-2 border-[var(--accent-gold)] px-4 text-lg font-black leading-tight tracking-tighter text-neutral-950">
                {cert.name}
              </span>
              <p className="mt-4 text-[11px] font-medium uppercase leading-snug tracking-wide text-stone-600">
                {cert.description}
              </p>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-14 border border-dashed border-stone-400 bg-neutral-950 px-8 py-10 text-center text-stone-300">
          <span className="text-[28px] font-black tracking-widest text-[var(--accent-gold)]">MAP · SERVICE</span>
          <p className="mx-auto mt-4 max-w-2xl text-sm italic leading-relaxed text-stone-500">
            Foshan, China — export hub for North America, Europe, Oceania & Middle‑East façade programs with on‑site QC and containerized shipments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
