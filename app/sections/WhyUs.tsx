import { Award, Factory, Palette, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { whyChooseUs } from "@/content/process";
import { CertMarquee } from "@/components/CertMarquee";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Factory,
  Palette,
  Users,
};

export function WhyUs() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c05621]">
            Manufacturing & Innovation
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[#1a202c] md:text-4xl">Why VistaFrame</h2>
          <p className="mx-auto max-w-2xl text-lg text-[#718096]">
            Engineering excellence meets architectural vision. Trusted by builders,
            architects, and homeowners worldwide.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 0.06} className="h-full">
                <Card className="group relative h-full overflow-hidden rounded-sm border-[#e2e8f0] transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:border-[#1a365d]/40 hover:shadow-xl">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 scale-x-[0.2] bg-gradient-to-r from-transparent via-[#c05621]/90 to-transparent opacity-70 transition-[transform] duration-500 group-hover:scale-x-100"
                  />

                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-[#1a365d]/10 transition-[transform,background-color,color] duration-300 motion-safe:group-hover:rotate-[-4deg] motion-safe:group-hover:scale-105 group-hover:bg-[#1a365d]">
                      {Icon && (
                        <Icon className="h-6 w-6 text-[#1a365d] transition-colors duration-300 group-hover:text-white" />
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-3xl font-bold text-[#c05621]">{feature.stat}</span>
                      <p className="text-sm text-[#718096]">{feature.statLabel}</p>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-[#1a202c]">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[#718096]">{feature.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 border-t border-[#e2e8f0] pt-12">
          <p className="mb-6 text-center text-sm text-[#718096]">
            Trusted worldwide. Certified everywhere.
          </p>
          <p className="sr-only">
            Certifications include NFRC, CE, AS2047, CSA, Energy Star, and ISO 9001.
          </p>
          <CertMarquee />
        </div>
      </div>
    </section>
  );
}
