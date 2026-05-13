"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import {
  locales,
  localeNames,
  localeShortNames,
  replaceLocaleInPath,
  type Locale,
} from "@/content/i18n";
import { setCookie } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  current: Locale;
  variant?: "light" | "dark";
};

export function LanguageSwitcher({ current, variant = "dark" }: Props) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [, startTransition] = useTransition();

  const onSelect = (target: string) => {
    const locale = target as Locale;
    if (locale === current) return;
    setCookie("NEXT_LOCALE", locale);
    const next = replaceLocaleInPath(pathname, locale);
    startTransition(() => {
      router.push(next);
      router.refresh();
    });
  };

  const isLight = variant === "light";

  return (
    <Select value={current} onValueChange={onSelect}>
      <SelectTrigger
        className={cn(
          "h-8 w-auto gap-1.5 rounded-none border px-2 text-[11px] font-semibold uppercase",
          isLight
            ? "border-white/30 bg-black/30 text-white hover:bg-white/10"
            : "border-stone-300 text-neutral-950 hover:bg-stone-100"
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <SelectValue placeholder={localeShortNames[current]} />
      </SelectTrigger>
      <SelectContent
        align="end"
        className="min-w-[140px] rounded-none border-stone-200"
      >
        {locales.map((l) => (
          <SelectItem
            key={l}
            value={l}
            className="rounded-none text-sm focus:bg-stone-100"
          >
            <span className="flex items-center gap-2">
              {localeNames[l]}
              {current === l && <Check className="h-3.5 w-3.5 text-[var(--accent-gold)]" />}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
