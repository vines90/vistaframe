"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroContent() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="ml-auto w-full max-w-[min(100%,26rem)] text-right xl:max-w-[32rem]">
        <h1 className="font-semibold uppercase leading-[0.95] tracking-[0.04em] text-white">
          <span className="block text-[clamp(2.125rem,5.5vw,3.85rem)]">{siteConfig.hero.titleLine1}</span>
          <span className="-mt-0.5 block text-[clamp(2.125rem,5.5vw,3.85rem)]">{siteConfig.hero.titleLine2}</span>
        </h1>
        <p className="mx-auto mr-0 mt-6 max-w-[22rem] text-[clamp(10px,1.95vw,12px)] font-medium uppercase leading-snug tracking-[0.12em] text-white/92 xl:max-w-[28rem] xl:text-[13px]">
          {siteConfig.hero.subtitleEn}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="ml-auto w-full max-w-[min(100%,26rem)] text-right xl:max-w-[32rem]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 18 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
        }}
      >
        <h1 className="font-semibold uppercase leading-[0.95] tracking-[0.04em] text-white">
          <span className="block text-[clamp(2.125rem,5.5vw,3.85rem)]">{siteConfig.hero.titleLine1}</span>
          <span className="-mt-0.5 block text-[clamp(2.125rem,5.5vw,3.85rem)]">{siteConfig.hero.titleLine2}</span>
        </h1>
      </motion.div>
      <motion.p
        variants={{
          hidden: { opacity: 0, x: 22 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease, delay: 0.04 } },
        }}
        className="mx-auto mr-0 mt-6 max-w-[22rem] text-[clamp(10px,1.95vw,12px)] font-medium uppercase leading-snug tracking-[0.12em] text-white/92 xl:max-w-[28rem] xl:text-[13px]"
      >
        {siteConfig.hero.subtitleEn}
      </motion.p>
    </motion.div>
  );
}
