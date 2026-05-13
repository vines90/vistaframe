import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, projectRegions } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function Projects({ dict, locale }: Props) {
  const featuredProjects = projects.filter((p) => p.featured);
  const d = dict.projectsSection;

  return (
    <section
      id="engineering-case"
      className="scroll-mt-28 border-t border-stone-200 bg-stone-100 py-16 lg:py-[4.75rem]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mb-14 text-center lg:text-left">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="derchi-eyebrow text-left lg:text-left">{d.eyebrow}</p>
              <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                {d.caseLabel}
              </p>
              <h2 className="derchi-title-rule mt-6 inline-block max-w-xl font-serif text-[clamp(1.875rem,3.6vw,2.6rem)] font-bold italic text-neutral-950">
                {d.titleNumberPrefix}
                <span className="not-italic text-amber-800">
                  {siteConfig.stats.projects}
                </span>
                {d.titleSuffix}
              </h2>
              <p className="mt-6 max-w-[36rem] text-[14px] leading-relaxed text-stone-600">
                {d.paragraph}
              </p>
            </div>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-none border-2 border-neutral-950 px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              {d.ctaLibrary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <Link
                href={`/${locale}/projects/${project.id}`}
                className="block h-full"
              >
                <Card className="group h-full overflow-hidden rounded-none border border-stone-300 bg-white shadow-none transition hover:border-[var(--accent-gold)] hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
                      <Image
                        src={project.images[0]}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover grayscale-[18%] transition-[transform,filter] duration-[640ms] group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <Badge className="absolute left-0 top-0 rounded-none bg-[var(--accent-gold)] text-[10px] font-bold italic text-[var(--derchi-dark)]">
                        CASE {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                          {d.regions[project.region] ?? project.region}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-6 py-6">
                      <p className="line-clamp-2 font-semibold italic text-neutral-950">
                        {project.name}
                      </p>
                      <p className="flex gap-2 text-[12px] text-stone-500">
                        <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                        {project.location}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-amber-800">
                        {d.cardCta}&nbsp;
                        <span className="text-lg leading-none">{">>"}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 overflow-x-auto border-y border-stone-300 bg-white py-8">
          <div className="flex min-w-full justify-between gap-x-8 gap-y-6 px-2 md:flex-wrap md:justify-center">
            {projectRegions.map((region) => (
              <Link
                key={region.id}
                href={`/${locale}/projects?region=${region.id}`}
                className="min-w-fit shrink-0 text-center font-serif text-sm font-semibold italic text-neutral-950 underline-offset-8 transition-colors hover:text-amber-800 hover:underline"
              >
                {d.regions[region.id] ?? region.name}
                <span className="mt-4 block whitespace-nowrap text-[11px] font-sans font-normal not-italic text-stone-500">
                  {d.cardCta} {">>"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
