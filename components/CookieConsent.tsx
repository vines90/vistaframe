"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { CookieDict } from "@/content/i18n/types";

const STORAGE_KEY = "vf_consent_v1";

export function CookieConsent({ dict }: { dict: CookieDict }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const t = window.setTimeout(() => setShow(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const set = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 sm:px-6 sm:pb-6"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
        >
          <div className="pointer-events-auto w-full max-w-[44rem] border border-white/10 bg-neutral-950/95 p-4 text-stone-200 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-5">
            <p className="text-[13px] leading-relaxed">{dict.message}</p>
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => set("rejected")}
                className="rounded-none border border-stone-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:border-stone-500 hover:text-white"
              >
                {dict.reject}
              </button>
              <button
                type="button"
                onClick={() => set("accepted")}
                className="rounded-none bg-[var(--accent-gold)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--derchi-dark)] transition hover:bg-white"
              >
                {dict.accept}
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
