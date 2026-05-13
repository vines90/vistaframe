"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Headphones,
  Mail,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";
import type { Locale } from "@/content/i18n";
import type { MultiCtaDict } from "@/content/i18n/types";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = { dict: MultiCtaDict; locale: Locale };

export function MultiChannelCta({ dict, locale }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handle = () => setShowTop(window.scrollY > 720);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const wa = (siteConfig.links.whatsapp ?? "").replace(/[^+\d]/g, "");

  const items = [
    {
      key: "wa",
      label: dict.whatsapp,
      href: `https://wa.me/${wa.replace(/^\+/, "")}`,
      icon: <MessageCircle className="h-5 w-5" />,
      external: true,
    },
    {
      key: "mail",
      label: dict.email,
      href: `mailto:${siteConfig.links.email}`,
      icon: <Mail className="h-5 w-5" />,
      external: true,
    },
    {
      key: "inquiry",
      label: dict.open,
      href: `/${locale}/contact`,
      icon: <Headphones className="h-5 w-5" />,
      external: false,
    },
  ];

  return (
    <div className="pointer-events-none fixed bottom-5 right-3 z-[55] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            aria-label={dict.top}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-neutral-950/85 text-white shadow-lg backdrop-blur transition hover:bg-neutral-900"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.ul
            key="channels"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex flex-col items-end gap-2.5"
          >
            {items.map((it, i) => (
              <motion.li
                key={it.key}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <a
                  href={it.href}
                  target={it.external ? "_blank" : undefined}
                  rel={it.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-full border border-stone-200 bg-white pl-4 pr-2 py-2 text-[12px] font-semibold text-neutral-900 shadow-lg transition hover:border-[var(--accent-gold)] hover:text-[var(--accent-dark)]"
                >
                  <span className="whitespace-nowrap">{it.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--derchi-dark)] transition group-hover:scale-105">
                    {it.icon}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? dict.close : dict.open}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl shadow-black/30 transition-[transform,background] duration-200",
          "hover:scale-105",
          open
            ? "bg-neutral-900"
            : "bg-[var(--accent-dark)] hover:bg-[var(--accent)]",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        {!open ? (
          <>
            <span
              className="absolute inset-0 -z-0 rounded-full ring-2 ring-[var(--accent-gold)]/35 motion-safe:animate-[pulse-slow-ring_2.4s_ease-in-out_infinite]"
              aria-hidden
            />
            <span
              className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
              aria-hidden
            />
          </>
        ) : null}
      </button>
    </div>
  );
}
