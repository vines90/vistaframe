import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { productCategories } from "@/content/products";
import { projects } from "@/content/projects";
import { defaultLocale, locales, type Locale } from "@/content/i18n";

function makeLanguages(path: string) {
  const out: Record<string, string> = {
    "x-default": `${siteConfig.url}/${defaultLocale}${path}`,
  };
  locales.forEach((l) => {
    const tag = l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES";
    out[tag] = `${siteConfig.url}/${l}${path}`;
  });
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; freq: "daily" | "weekly" | "monthly"; priority: number }[] = [
    { path: "", freq: "daily", priority: 1 },
    { path: "/products", freq: "weekly", priority: 0.9 },
    { path: "/projects", freq: "weekly", priority: 0.85 },
    { path: "/about", freq: "monthly", priority: 0.7 },
    { path: "/contact", freq: "monthly", priority: 0.9 },
    { path: "/resources/faqs", freq: "monthly", priority: 0.6 },
    { path: "/resources/certifications", freq: "monthly", priority: 0.6 },
    { path: "/legal/privacy", freq: "monthly", priority: 0.3 },
    { path: "/legal/terms", freq: "monthly", priority: 0.3 },
  ];

  productCategories.forEach((c) =>
    routes.push({ path: `/products/${c.id}`, freq: "weekly", priority: 0.8 }),
  );
  projects.forEach((p) =>
    routes.push({ path: `/projects/${p.id}`, freq: "monthly", priority: 0.6 }),
  );

  const items: MetadataRoute.Sitemap = [];
  routes.forEach((r) => {
    locales.forEach((l: Locale) => {
      items.push({
        url: `${siteConfig.url}/${l}${r.path}`,
        lastModified: now,
        changeFrequency: r.freq,
        priority: r.priority,
        alternates: { languages: makeLanguages(r.path) },
      });
    });
  });

  return items;
}
