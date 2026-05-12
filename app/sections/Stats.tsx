import { stats } from "@/content/process";
import { AnimatedStat } from "@/components/AnimatedStat";
import { Reveal } from "@/components/Reveal";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#1a365d] py-16 text-white lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(192,86,33,0.18),_transparent_50%),radial-gradient(ellipse_at_80%_80%,_rgba(255,255,255,0.08),_transparent_45%)]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />

      <Reveal className="container relative mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
