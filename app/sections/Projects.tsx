import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, projectRegions } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="engineering-case" className="scroll-mt-28 border-t border-stone-200 bg-stone-100 py-16 lg:py-[4.75rem]">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mb-14 text-center lg:text-left">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="derchi-eyebrow text-left lg:text-left">Engineering case</p>
              <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">Case</p>
              <h2 className="derchi-title-rule mt-6 inline-block max-w-xl font-serif text-[clamp(1.875rem,3.6vw,2.6rem)] font-bold italic text-neutral-950">
                <span className="not-italic text-amber-800">{siteConfig.stats.projects}</span>
                {" "}completed global footprints
              </h2>
              <p className="mt-6 max-w-[36rem] text-[14px] leading-relaxed italic text-stone-600">
                Services span drawing review · R&D · budgeting · QA documentation · container planning · remote installation guidance —
                Built for turnkey export programs worldwide.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-12 shrink-0 rounded-none border-neutral-950 px-8 text-[12px] font-semibold uppercase tracking-[0.2em] italic text-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              <Link href="/projects">
                Case library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <Card className="group overflow-hidden rounded-none border border-stone-300 bg-white shadow-none hover:border-[var(--accent-gold)] hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
                    <Image
                      src={project.images[0]}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale-[22%] transition-transform duration-[640ms] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <Badge className="absolute left-0 top-0 rounded-none bg-[var(--accent-gold)] text-[10px] font-bold italic text-[var(--derchi-dark)]">
                      CASE {index + 1}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3 px-6 py-6">
                    <p className="line-clamp-2 font-semibold italic text-neutral-950">{project.name}</p>
                    <p className="flex gap-2 text-[12px] text-stone-500">
                      <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                      {project.location}
                    </p>
                    <Link
                      href={`/projects#${project.id}`}
                      className="mt-2 inline-flex items-center gap-3 text-[12px] font-semibold italic uppercase tracking-[0.08em] text-amber-800 transition-colors hover:text-amber-950"
                    >
                      More cases&nbsp;
                      <span className="text-lg leading-none">{">>"}</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 overflow-x-auto border-y border-stone-300 bg-white py-8">
          <div className="flex min-w-full justify-between gap-x-8 gap-y-6 px-2 md:flex-wrap md:justify-center">
            {projectRegions.map((region) => (
              <Link
                key={region.id}
                href={`/projects?region=${region.id}`}
                className="min-w-fit shrink-0 text-center font-serif text-sm font-semibold italic text-neutral-950 underline-offset-8 transition-colors hover:text-amber-800 hover:underline"
              >
                {region.name.replace("-", " ")}
                <span className="mt-4 block whitespace-nowrap text-[11px] font-sans font-normal not-italic text-stone-500">
                  More cases {">>"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
