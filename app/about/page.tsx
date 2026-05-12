import type { Metadata } from "next";
import { Award, Factory, Users, Globe, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/content/site";
import { stats } from "@/content/process";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about VistaFrame - a leading aluminum window and door manufacturer with 150,000m² production base, 25+ R&D experts, and global certifications.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Hero */}
      <div className="bg-[#1a365d] text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Engineering Excellence in Aluminum Systems
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Since our founding, VistaFrame has been dedicated to crafting
              precision-engineered window and door solutions that combine
              cutting-edge technology with timeless design.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-[#e2e8f0]">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#718096]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a202c] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-[#4a5568] leading-relaxed">
              <p>
                Founded in Foshan, China&apos;s aluminum manufacturing hub, VistaFrame
                began with a simple mission: to create window and door systems that
                would meet the most demanding global standards while maintaining
                the craftsmanship that defines fine architecture.
              </p>
              <p>
                Today, we operate from a 150,000 square meter smart manufacturing
                facility, serving clients across 80+ countries. Our products have
                been specified in prestigious projects ranging from luxury hotels
                to high-end residential developments.
              </p>
              <p>
                What sets us apart is our commitment to precision. Every window
                and door that leaves our facility has passed rigorous quality
                testing and meets the certifications required in its destination
                market—whether that&apos;s NFRC for North America, CE for Europe, or
                AS2047 for Australia.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] bg-[#edf2f7] rounded-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-[#1a365d] rounded-sm flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">VF</span>
                </div>
                <p className="text-[#718096]">Company Overview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a202c] mb-12 text-center">
            Our Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Factory,
                title: "Smart Manufacturing",
                description:
                  "150,000m² production facility with German CNC equipment and automated assembly lines.",
              },
              {
                icon: Users,
                title: "R&D Excellence",
                description:
                  "25+ engineers developing innovative solutions with 80+ patents held.",
              },
              {
                icon: Award,
                title: "Global Certifications",
                description:
                  "NFRC, CE, AS2047, CSA, Energy Star, and ISO 9001 certified.",
              },
              {
                icon: Globe,
                title: "Worldwide Service",
                description:
                  "Engineering support and logistics expertise for projects in 80+ countries.",
              },
            ].map((capability) => (
              <Card
                key={capability.title}
                className="border-[#e2e8f0] rounded-sm"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#1a365d]/10 rounded-sm flex items-center justify-center mb-4">
                    <capability.icon className="h-6 w-6 text-[#1a365d]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a202c] mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-[#718096]">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quality Control */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 aspect-[4/3] bg-[#edf2f7] rounded-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-[#c05621]/10 rounded-sm flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-[#c05621]" />
                </div>
                <p className="text-[#718096]">Quality Control</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a202c] mb-6">
              360° Quality Control
            </h2>
            <p className="text-[#4a5568] mb-6 leading-relaxed">
              Quality isn&apos;t just a step in our process—it&apos;s integrated into every
              stage of manufacturing. Our comprehensive quality management system
              ensures that every product meets or exceeds international standards.
            </p>
            <ul className="space-y-3">
              {[
                "Incoming material inspection",
                "In-process quality checks",
                "Performance testing (air/water/structural)",
                "Final inspection before packaging",
                "Certification compliance verification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#c05621] mt-0.5 shrink-0" />
                  <span className="text-[#4a5568]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div id="certificates" className="bg-white rounded-sm border border-[#e2e8f0] p-8 lg:p-12 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a202c] mb-8 text-center">
            Our Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-4 p-4 bg-[#f7fafc] rounded-sm"
              >
                <div className="w-12 h-12 bg-[#1a365d] rounded-sm flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">{cert.name}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a202c]">{cert.name}</h3>
                  <p className="text-sm text-[#718096]">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
