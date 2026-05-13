"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroDict } from "@/content/i18n/types";
import type { Locale } from "@/content/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { dict: HeroDict; locale: Locale };

export function HeroContent({ dict, locale }: Props) {
  const reduce = useReducedMotion();
  const lp = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const Wrapper: any = reduce ? "div" : motion.div;
  const wrapperProps = reduce
    ? { className: "ml-auto w-full max-w-[min(100%,30rem)] text-right xl:max-w-[36rem]" }
    : {
        className: "ml-auto w-full max-w-[min(100%,30rem)] text-right xl:max-w-[36rem]",
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        },
      };

  const Item: any = reduce ? "div" : motion.div;
  const itemFromRight = reduce
    ? {}
    : { variants: { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } } };

  return (
    <Wrapper {...wrapperProps}>
      <Item {...itemFromRight}>
        <p className="mb-4 inline-flex items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]">
          <span className="h-px w-8 bg-[var(--accent-gold)]/60" aria-hidden />
          {dict.eyebrow}
        </p>
      </Item>

      <Item {...itemFromRight}>
        <h1 className="font-semibold uppercase leading-[0.92] tracking-[0.04em] text-white">
          <span className="metallic-gold block text-[clamp(2.25rem,5.6vw,4rem)]">
            {dict.titleAccent}
          </span>
          <span className="-mt-1 block text-[clamp(2rem,5vw,3.6rem)] text-white/95">
            {dict.titleRest}
          </span>
        </h1>
      </Item>

      <Item {...itemFromRight}>
        <p className="mr-0 ml-auto mt-6 max-w-[26rem] text-[clamp(11px,1.95vw,13px)] font-medium leading-snug tracking-[0.06em] text-white/88 xl:max-w-[32rem] xl:text-[14px]">
          {dict.subtitle}
        </p>
      </Item>

      <Item {...itemFromRight}>
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <Link
            href={lp("/contact")}
            className="group inline-flex items-center gap-2 rounded-none bg-[var(--accent-gold)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--derchi-dark)] shadow-[0_18px_40px_-18px_rgba(212,168,83,0.5)] transition hover:bg-white"
          >
            {dict.primaryCta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={lp("/products")}
            className="inline-flex items-center gap-2 rounded-none border border-white/55 bg-transparent px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
          >
            {dict.secondaryCta}
          </Link>
        </div>
      </Item>

      <Item {...itemFromRight}>
        <ul className="mt-10 grid grid-cols-3 gap-3 border border-white/15 bg-black/35 p-3 backdrop-blur-md sm:grid-cols-3">
          {dict.kpis.map((k) => (
            <li
              key={k.label}
              className="flex flex-col items-center justify-center px-2 py-2 text-center"
            >
              <span className="metallic-gold text-[clamp(0.95rem,2.4vw,1.4rem)] font-bold tabular-nums">
                {k.value}
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-white/65">
                {k.label}
              </span>
            </li>
          ))}
        </ul>
      </Item>
    </Wrapper>
  );
}
