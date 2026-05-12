import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from "@/content/products";
import { Reveal } from "@/components/Reveal";

export function Products() {
  return (
    <section id="products" className="scroll-mt-28 border-t border-stone-200 bg-white py-16 lg:py-[4.75rem]">
      <div className="container relative mx-auto px-4 lg:px-8">
        <Reveal className="text-center lg:mb-14">
          <p className="derchi-eyebrow text-center">Product series</p>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-stone-500">Product</p>
          <h2 className="derchi-title-rule mx-auto mt-5 inline-block max-w-[min(100%,54rem)] font-serif text-[clamp(1.75rem,3.8vw,2.6rem)] font-bold italic text-neutral-950">
            Intelligent manufacturing delivers beyond expectation
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05} className="h-full">
              <Card className="group h-full overflow-hidden rounded-none border border-stone-300 bg-neutral-50 shadow-none transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)] hover:shadow-lg">
                <CardContent className="h-full p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[640ms] group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-0 top-0 bg-[var(--accent-gold)] px-3 py-1.5 font-serif text-xs font-semibold italic text-[var(--derchi-dark)]">
                      {category.name.split(" ").slice(-1)[0]}
                    </span>
                  </div>
                  <div className="flex min-h-[11.5rem] flex-col gap-4 border-x border-t border-transparent p-6">
                    <h3 className="font-serif text-lg font-semibold italic text-neutral-950">{category.name}</h3>
                    <Link
                      href={`/products#cat-${category.id}`}
                      className="mt-auto inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.15em] text-amber-800 transition-colors hover:text-amber-950"
                    >
                      More
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 grid grid-cols-2 gap-3 border border-stone-200 bg-neutral-950 p-px md:grid-cols-4">
          {[
            { label: "Thermal Strategy", value: "Up to 70%" },
            { label: "Acoustics", value: "≤ 50 dB class" },
            { label: "Wind Load", value: "Class 5 envelope" },
            { label: "Certifications", value: "6+ markets" },
          ].map((s) => (
            <div key={s.label} className="bg-neutral-950 px-4 py-6 text-center text-stone-200">
              <p className="text-lg font-bold italic text-[var(--accent-gold)] md:text-xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">{s.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Button
            asChild
            className="rounded-none border border-neutral-950 bg-neutral-950 px-10 py-7 text-[12px] font-bold uppercase tracking-[0.26em] text-white hover:bg-transparent hover:text-neutral-950"
          >
            <Link href="/products">View catalogue →</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
