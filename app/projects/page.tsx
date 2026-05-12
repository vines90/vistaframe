import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, projectRegions } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore VistaFrame's portfolio of 15,000+ completed projects across 80+ countries. Hotels, residential, commercial, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1a365d] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Project Portfolio
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            15,000+ completed projects across 80+ countries. From luxury hotels to residential
            developments, we deliver precision-crafted solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Filter Tags */}
        <div className="mb-8">
          <p className="text-sm text-[#718096] mb-3">Filter by Region:</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="rounded-sm bg-[#1a365d] text-white hover:bg-[#2c5282] cursor-pointer"
            >
              All
            </Badge>
            {projectRegions.map((region) => (
              <Badge
                key={region.id}
                variant="outline"
                className="rounded-sm border-[#e2e8f0] text-[#4a5568] hover:border-[#1a365d] hover:text-[#1a365d] cursor-pointer"
              >
                {region.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              id={project.id}
              className="group scroll-mt-28 overflow-hidden rounded-sm border-[#e2e8f0] transition-[box-shadow] duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-[#edf2f7] relative overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/22 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-[#c05621] text-white rounded-sm text-xs">
                      {project.type}
                    </Badge>
                    <Badge className="bg-white/90 text-[#1a202c] rounded-sm text-xs">
                      {project.year}
                    </Badge>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium leading-snug">{project.name}</p>
                    <p className="flex items-center gap-1 text-white/80 text-sm">
                      <MapPin className="h-4 w-4 opacity-90" />
                      {project.location}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-[#718096] mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.products.slice(0, 3).map((product) => (
                      <span
                        key={product}
                        className="text-xs px-2 py-1 bg-[#f7fafc] text-[#4a5568] rounded-sm"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`#${project.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1a365d] transition-[color,gap] duration-200 hover:gap-2 hover:text-[#c05621]"
                  >
                    View Project Details
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#1a202c] mb-4">Have a Project in Mind?</h2>
          <p className="text-[#718096] max-w-2xl mx-auto mb-6">
            Let us help bring your architectural vision to life with our precision-engineered window and
            door systems.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#c05621] text-white rounded-sm font-medium hover:bg-[#dd6b20] transition-colors"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
