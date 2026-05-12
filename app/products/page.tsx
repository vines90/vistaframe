import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore VistaFrame's range of aluminum windows, doors, sunrooms, and wooden doors. NFRC, CE, and AS2047 certified.",
};

export default function ProductsPage() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1a365d] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Product Solutions
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Certified aluminum window and door systems engineered for
            performance, designed for aesthetics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {productCategories.map((category) => (
            <Card
              key={category.id}
              id={`cat-${category.id}`}
              className="group scroll-mt-28 overflow-hidden rounded-sm border-[#e2e8f0] transition-[box-shadow] duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square min-h-[200px] bg-[#edf2f7] md:aspect-auto md:min-h-[280px]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="flex flex-col justify-center p-8">
                    <h2 className="text-2xl font-bold text-[#1a202c] mb-3">
                      {category.name}
                    </h2>
                    <p className="text-[#718096] mb-6">{category.description}</p>

                    <div className="space-y-2 mb-6">
                      {category.products.map((product) => (
                        <div
                          key={product}
                          className="text-sm text-[#4a5568] flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-[#c05621] rounded-full" />
                          {product
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`#cat-${category.id}`}
                      className="inline-flex items-center gap-2 text-[#1a365d] font-medium hover:text-[#c05621] transition-[color,gap] duration-200 hover:gap-3"
                    >
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white rounded-sm border border-[#e2e8f0] p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a202c] mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-[#718096] max-w-2xl mx-auto mb-6">
            We specialize in custom aluminum window and door systems. Share your
            project requirements and our engineering team will provide tailored
            solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#c05621] text-white rounded-sm font-medium hover:bg-[#dd6b20] transition-colors"
          >
            Request Custom Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
