"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { FooterDict } from "@/content/i18n/types";
import type { Locale } from "@/content/i18n";
import { cn } from "@/lib/utils";

type Props = {
  dict: FooterDict;
  locale: Locale;
  variant?: "footer" | "inline";
};

export function Newsletter({ dict, locale, variant = "footer" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) setEmail("");
    } catch {
      setState("err");
    }
  };

  const isInline = variant === "inline";

  return (
    <div
      className={cn(
        isInline ? "" : "border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.22em]",
          isInline ? "text-[var(--accent-gold)]" : "text-[var(--accent-gold)]/90",
        )}
      >
        {dict.newsletterHeading}
      </p>
      <p
        className={cn(
          "mt-2 text-[12.5px] leading-relaxed",
          isInline ? "text-stone-300" : "text-white/70",
        )}
      >
        {dict.newsletterBody}
      </p>
      <form onSubmit={submit} className="mt-4 flex items-stretch gap-2">
        <label className="sr-only" htmlFor="newsletter-email">
          {dict.newsletterPlaceholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.newsletterPlaceholder}
          className={cn(
            "min-w-0 flex-1 rounded-none border bg-transparent px-3 py-2 text-sm outline-none transition-colors",
            isInline
              ? "border-stone-300 text-neutral-900 focus:border-[var(--accent)]"
              : "border-white/15 text-white placeholder:text-white/40 focus:border-[var(--accent-gold)]",
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-none px-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition disabled:opacity-60",
            "bg-[var(--accent-gold)] text-[var(--derchi-dark)] hover:bg-white",
          )}
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {dict.newsletterCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>
      {state === "ok" ? (
        <p
          className={cn(
            "mt-2 text-[12px]",
            isInline ? "text-emerald-700" : "text-emerald-400",
          )}
        >
          {dict.newsletterSuccess}
        </p>
      ) : state === "err" ? (
        <p
          className={cn(
            "mt-2 text-[12px]",
            isInline ? "text-red-600" : "text-red-300",
          )}
        >
          {dict.newsletterError}
        </p>
      ) : null}
    </div>
  );
}
