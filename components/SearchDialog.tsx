"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";
import { productCategories } from "@/content/products";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

type Props = {
  dict: Dictionary;
  locale: Locale;
  trigger: React.ReactNode;
};

type Entry = {
  title: string;
  href: string;
  group: "pages" | "products" | "projects";
  subtitle?: string;
};

export function SearchDialog({ dict, locale, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          !["INPUT", "TEXTAREA", "SELECT"].includes(
            (e.target as HTMLElement)?.tagName ?? "",
          )
        ) {
          e.preventDefault();
          setOpen(true);
        }
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const entries: Entry[] = useMemo(() => {
    const pageEntries: Entry[] = [
      { title: dict.nav.home, href: `/${locale}`, group: "pages" },
      { title: dict.nav.products, href: `/${locale}/products`, group: "pages" },
      { title: dict.nav.projects, href: `/${locale}/projects`, group: "pages" },
      { title: dict.nav.about, href: `/${locale}/about`, group: "pages" },
      { title: dict.nav.contact, href: `/${locale}/contact`, group: "pages" },
      { title: dict.nav.faqs, href: `/${locale}/resources/faqs`, group: "pages" },
      { title: dict.nav.certifications, href: `/${locale}/resources/certifications`, group: "pages" },
    ];
    const productEntries: Entry[] = productCategories.map((c) => ({
      title:
        dict.productsSection.categories[
          c.id as keyof typeof dict.productsSection.categories
        ].name,
      subtitle: c.tagline,
      href: `/${locale}/products/${c.id}`,
      group: "products",
    }));
    const projectEntries: Entry[] = projects.map((p) => ({
      title: p.name,
      subtitle: `${p.location} · ${p.year}`,
      href: `/${locale}/projects/${p.id}`,
      group: "projects",
    }));
    return [...pageEntries, ...productEntries, ...projectEntries];
  }, [dict, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.subtitle ?? "").toLowerCase().includes(q),
    );
  }, [entries, query]);

  const groups: { key: Entry["group"]; label: string; items: Entry[] }[] = [
    { key: "pages", label: dict.search.groupPages, items: filtered.filter((x) => x.group === "pages") },
    { key: "products", label: dict.search.groupProducts, items: filtered.filter((x) => x.group === "products") },
    { key: "projects", label: dict.search.groupProjects, items: filtered.filter((x) => x.group === "projects") },
  ].filter((g) => g.items.length > 0);

  const goto = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents">
        {trigger}
      </span>
      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/55 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.search}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="mt-[12vh] w-[min(46rem,92vw)] overflow-hidden border border-stone-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-stone-200 px-4">
              <Search className="h-4 w-4 text-stone-500" aria-hidden />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search.placeholder}
                className="flex-1 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                aria-label={dict.common.close}
                onClick={() => setOpen(false)}
                className="rounded-none p-1 text-stone-500 hover:bg-stone-100 hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {groups.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-stone-500">
                  {dict.search.empty}
                </p>
              ) : (
                groups.map((g) => (
                  <div key={g.key} className="px-2 py-2">
                    <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                      {g.label}
                    </p>
                    <ul className="mt-1">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            onClick={(e) => {
                              e.preventDefault();
                              goto(it.href);
                            }}
                            className={cn(
                              "group flex items-center justify-between gap-3 rounded-none px-3 py-2 text-sm text-neutral-900 transition-colors hover:bg-stone-100",
                            )}
                          >
                            <div className="min-w-0">
                              <p className="truncate font-medium">{it.title}</p>
                              {it.subtitle ? (
                                <p className="truncate text-xs text-stone-500">
                                  {it.subtitle}
                                </p>
                              ) : null}
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
              <span>VistaFrame Search</span>
              <span>
                <kbd className="border border-stone-300 bg-white px-1 py-px font-mono text-[10px]">
                  ESC
                </kbd>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
