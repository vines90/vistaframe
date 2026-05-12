"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { motion, useReducedMotion } from "framer-motion";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-stone-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="overflow-hidden rounded-none border border-white/14 bg-neutral-950 shadow-[0_32px_80px_-28px_rgba(0,0,0,0.55)] ring-1 ring-[var(--accent-gold)]/12"
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-gold)]/75">
                Speak with Engineers
              </p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mb-10 max-w-lg text-lg text-white/80">
                Get a detailed quotation within 24 hours. Our team is ready to help you find the
                perfect window and door solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-none border border-transparent bg-[var(--accent)] px-8 font-semibold text-white shadow-[0_14px_40px_-14px_rgba(180,83,9,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-gold)] hover:bg-black hover:text-[var(--accent-gold)] motion-safe:hover:-translate-y-0.5"
                >
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none border-[var(--accent-gold)]/55 bg-transparent px-8 font-semibold text-[var(--accent-gold)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-neutral-950 motion-safe:hover:-translate-y-0.5"
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/18 pt-8">
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="group/email flex items-center gap-3 text-white/72 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-5 w-5 shrink-0 transition-transform motion-safe:group-hover/email:-rotate-12" />
                  <span className="text-sm">{siteConfig.links.email}</span>
                </a>
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="group/phone flex items-center gap-3 text-white/72 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-5 w-5 shrink-0 transition-transform motion-safe:group-hover/phone:-rotate-[8deg]" />
                  <span className="text-sm">{siteConfig.links.phone}</span>
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden bg-[#0a0a0a] lg:min-h-0">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/10 via-transparent to-black/40" />

              <div className="relative flex min-h-[280px] flex-col items-center justify-center lg:min-h-full">
                <div className="pointer-events-none absolute flex h-[140%] w-[140%] items-center justify-center opacity-85">
                  <div className="h-[min(520px,90vw)] w-[min(520px,90vw)] rounded-full border border-white/[0.06] motion-safe:animate-[pulse-slow-ring_13s_ease-in-out_infinite]" />
                  <div className="absolute h-[min(380px,70vw)] w-[min(380px,70vw)] rounded-full border border-white/[0.04] motion-safe:animate-[pulse-slower-ring_11s_ease-in-out_infinite]" />
                </div>

                <div className="relative mx-auto rounded-full border border-[var(--accent-gold)]/40 bg-black/35 p-[1px] shadow-2xl shadow-black/50 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:scale-[1.04]">
                  <div className="rounded-full px-14 py-[2.85rem] text-center backdrop-blur-sm">
                    <div className="text-5xl font-bold tabular-nums text-white lg:text-[3rem]">
                      24<span className="text-2xl text-[var(--accent-gold)]/85">h</span>
                    </div>
                    <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
                      Response Time
                    </p>
                  </div>
                </div>

                {/* corner accents */}
                <div className="pointer-events-none absolute bottom-10 right-10 h-10 w-10 border-r border-b border-[var(--accent-gold)]/25" aria-hidden />
                <div className="pointer-events-none absolute left-10 top-10 h-10 w-10 border-l border-t border-[var(--accent-gold)]/20" aria-hidden />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
