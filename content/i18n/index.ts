import type { Dictionary, Locale } from "./types";
import { en } from "./en";
import { zh } from "./zh";
import { es } from "./es";

export const locales = ["en", "zh", "es"] as const;
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  es: "Español",
};

export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  zh: "中",
  es: "ES",
};

const dictionaries: Record<Locale, Dictionary> = { en, zh, es };

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Server-friendly synchronous accessor — every dictionary is bundled. */
export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Build a locale-aware path by prepending /<locale>; never double-prefix. */
export function localePath(locale: Locale, path: string = "/"): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  if (cleaned === "/") return `/${locale}`;
  return `/${locale}${cleaned}`;
}

/** Replace the locale segment of a path with `target`. */
export function replaceLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;
  if (isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return "/" + segments.join("/");
}

export type { Dictionary, Locale } from "./types";
