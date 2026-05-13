"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, MapPin, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, projectRegions, projectTypes } from "@/content/projects";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";
import { cn } from "@/lib/utils";

type Props = { dict: Dictionary; locale: Locale };

const ALL = "__all__";

export function ProjectsBrowser({ dict, locale }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [region, setRegion] = useState<string>(
    searchParams?.get("region") ?? ALL,
  );
  const [type, setType] = useState<string>(
    searchParams?.get("type") ?? ALL,
  );

  const updateUrl = useCallback(
    (nextRegion: string, nextType: string) => {
      const sp = new URLSearchParams();
      if (nextRegion !== ALL) sp.set("region", nextRegion);
      if (nextType !== ALL) sp.set("type", nextType);
      const qs = sp.toString();
      router.replace(
        `/${locale}/projects${qs ? `?${qs}` : ""}`,
        { scroll: false },
      );
    },
    [locale, router],
  );

  useEffect(() => {
    updateUrl(region, type);
  }, [region, type, updateUrl]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (region !== ALL && p.region !== region) return false;
      if (type !== ALL && p.type !== type) return false;
      return true;
    });
  }, [region, type]);

  const d = dict.projectsSection;
  const reset = () => {
    setRegion(ALL);
    setType(ALL);
  };

  return (
    <div>
      <div className="space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {d.filterRegion}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRegion(ALL)}
              className={cn(
                "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
                region === ALL
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-stone-300 bg-white text-stone-600 hover:border-neutral-950",
              )}
            >
              {d.filterAll}
            </button>
            {projectRegions.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                className={cn(
                  "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
                  region === r.id
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-stone-300 bg-white text-stone-600 hover:border-neutral-950",
                )}
              >
                {d.regions[r.id] ?? r.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {d.filterType}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setType(ALL)}
              className={cn(
                "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
                type === ALL
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-stone-300 bg-white text-stone-600 hover:border-neutral-950",
              )}
            >
              {d.filterAll}
            </button>
            {projectTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={cn(
                  "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
                  type === t.id
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-stone-300 bg-white text-stone-600 hover:border-neutral-950",
                )}
              >
                {d.types[t.id] ?? t.name}
              </button>
            ))}
          </div>
        </div>

        {(region !== ALL || type !== ALL) ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 hover:text-neutral-950"
          >
            <X className="h-3.5 w-3.5" />
            {dict.common.close}
          </button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center text-stone-500">
            {d.empty}
          </p>
        ) : (
          filtered.map((project) => (
            <Card
              key={project.id}
              id={project.id}
              className="group scroll-mt-28 overflow-hidden rounded-none border border-stone-200 bg-white transition-[box-shadow,border-color] hover:border-[var(--accent-gold)] hover:shadow-xl"
            >
              <Link href={`/${locale}/projects/${project.id}`} className="block">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <Image
                      src={project.images[0]}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="rounded-none bg-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-wider text-[var(--derchi-dark)]">
                        {d.types[project.type] ?? project.type}
                      </Badge>
                      <Badge className="rounded-none bg-white/90 text-[10px] font-semibold text-neutral-900">
                        {project.year}
                      </Badge>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-semibold leading-snug text-white">
                        {project.name}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-white/80">
                        <MapPin className="h-4 w-4 opacity-90" />
                        {project.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="mb-3 line-clamp-2 text-sm text-stone-600">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {project.products.slice(0, 3).map((product) => (
                        <span
                          key={product}
                          className="rounded-none border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] text-stone-600"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-amber-800 transition group-hover:text-amber-950">
                      {d.cardCta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
