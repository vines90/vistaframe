"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  locales,
  localeNames,
  localeShortNames,
  replaceLocaleInPath,
  type Locale,
} from "@/content/i18n";
import { setCookie } from "@/lib/cookies";
import { cn } from "@/lib/utils";

type Props = {
  current: Locale;
  variant?: "light" | "dark";
};

export function LanguageSwitcher({ current, variant = "dark" }: Props) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const onPick = (target: Locale) => {
    setOpen(false);
    if (target === current) return;
    setCookie("NEXT_LOCALE", target);
    const next = replaceLocaleInPath(pathname, target);
    startTransition(() => {
      router.push(next);
      router.refresh();
    });
  };

  const isLight = variant === "light";

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-none px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors",
          isLight
            ? "border border-white/30 bg-black/30 text-white hover:bg-white/10"
            : "border border-stone-300 text-neutral-950 hover:bg-stone-100",
        )}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden />
        <span>{localeShortNames[current]}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className={cn(
            "absolute right-0 top-full z-[70] mt-1 min-w-[10rem] border bg-white py-1 shadow-xl",
            isLight ? "border-stone-200" : "border-stone-200",
          )}
          onMouseLeave={() => setOpen(false)}
        >
          {locales.map((l) => {
            const target = replaceLocaleInPath(pathname, l);
            return (
              <Link
                key={l}
                href={target}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  onPick(l);
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm transition-colors",
                  current === l
                    ? "bg-stone-100 font-semibold text-[var(--derchi-dark)]"
                    : "text-stone-700 hover:bg-stone-100",
                )}
              >
                <span>{localeNames[l]}</span>
                {current === l ? (
                  <Check className="h-4 w-4 text-[var(--accent-gold)]" />
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
