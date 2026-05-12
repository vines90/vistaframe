import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with VistaFrame for aluminum window and door solutions. Request a quote or technical consultation.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1a365d] text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Ready to start your project? Our team is here to help with technical
            consultation, quotations, and any questions you may have.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-sm border border-[#e2e8f0] p-6">
              <h2 className="text-xl font-semibold text-[#1a202c] mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a365d]/10 rounded-sm flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a202c]">Email</p>
                    <a
                      href={`mailto:${siteConfig.links.email}`}
                      className="text-sm text-[#718096] hover:text-[#1a365d] transition-colors"
                    >
                      {siteConfig.links.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a365d]/10 rounded-sm flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a202c]">Phone</p>
                    <a
                      href={`tel:${siteConfig.links.phone}`}
                      className="text-sm text-[#718096] hover:text-[#1a365d] transition-colors"
                    >
                      {siteConfig.links.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a365d]/10 rounded-sm flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a202c]">Address</p>
                    <p className="text-sm text-[#718096]">
                      {siteConfig.links.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a365d]/10 rounded-sm flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a202c]">Business Hours</p>
                    <p className="text-sm text-[#718096]">
                      Mon - Sat: 8:00 AM - 6:00 PM CST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-[#1a365d] rounded-sm p-6 text-white">
              <h3 className="font-semibold mb-2">Fast Response</h3>
              <p className="text-sm text-white/80">
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-[#e2e8f0] p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-[#1a202c] mb-2">
                Request a Quote
              </h2>
              <p className="text-[#718096] mb-6">
                Fill out the form below and we&apos;ll get back to you with a
                detailed quotation.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
