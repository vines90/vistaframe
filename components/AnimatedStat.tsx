"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedStatProps = {
  value: string;
  label: string;
  className?: string;
};

/** Maps known stat strings → numeric animation + display formatter */
function getStatSpec(value: string) {
  if (value === "15,000+") {
    return { target: 15000, format: (n: number) => `${Math.round(n).toLocaleString("en-US")}+` };
  }
  if (value === "800K") {
    return { target: 800, format: (n: number) => `${Math.round(n)}K` };
  }
  if (value === "80+") {
    return { target: 80, format: (n: number) => `${Math.round(n)}+` };
  }
  return null;
}

function StaticStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="mb-2 text-4xl font-bold text-white md:text-5xl">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

function AnimatedStatNumber({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const spec = getStatSpec(value);
    if (!spec || !inView) return;

    const controls = animate(0, spec.target, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(spec.format(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="mb-2 text-4xl font-bold tracking-tight text-white tabular-nums md:text-5xl">{shown}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

export function AnimatedStat({ value, label, className }: AnimatedStatProps) {
  const reduce = useReducedMotion();
  const spec = getStatSpec(value);

  if (!spec || reduce === true) {
    return <StaticStat value={value} label={label} className={className} />;
  }

  return <AnimatedStatNumber value={value} label={label} className={className} />;
}
