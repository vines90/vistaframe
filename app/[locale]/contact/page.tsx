import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/content/site";
import {
  defaultLocale,
  getDict,
  isLocale,
  locales,
  type Locale,
} from "@/content/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/contact` };
  locales.forEach((l) => {
    languages[l === "en" ? "en-US" : l === "zh" ? "zh-CN" : "es-ES"] = `/${l}/contact`;
  });
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageBody,
    alternates: { canonical: `/${locale}/contact`, languages },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);
  const d = dict.contact;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-[var(--derchi-dark)] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]/85">
            {dict.nav.contact}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold italic md:text-4xl">
            {d.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{d.pageBody}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="border border-stone-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-950">
                {d.panelHeading}
              </h2>
              <div className="mt-6 space-y-5">
                {[
                  { icon: Mail, label: d.email, value: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
                  { icon: Phone, label: d.phone, value: siteConfig.links.phone, href: `tel:${siteConfig.links.phone}` },
                  { icon: MapPin, label: d.address, value: siteConfig.links.address },
                  { icon: Clock, label: d.businessHours, value: d.businessHoursValue },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--derchi-dark)]">
                      <item.icon className="h-5 w-5 text-[var(--accent-gold)]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-sm text-neutral-900 hover:text-amber-900"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-neutral-800">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--derchi-dark)] p-6 text-white">
              <h3 className="font-semibold text-[var(--accent-gold)]">
                {d.fastResponse}
              </h3>
              <p className="mt-2 text-sm text-white/80">{d.fastResponseBody}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-stone-200 bg-white p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-neutral-950">
                {d.formHeading}
              </h2>
              <p className="mt-2 text-stone-600">{d.formBody}</p>
              <div className="mt-6">
                <ContactForm dict={dict} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
