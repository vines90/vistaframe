import Link from "next/link";
import { Mail, MapPin, Phone, Truck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Newsletter } from "@/components/Newsletter";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

type Props = { dict: Dictionary; locale: Locale };

export function Footer({ dict, locale }: Props) {
  const lp = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const productLinks = [
    { name: dict.productsSection.categories.windows.name, href: lp("/products/windows") },
    { name: dict.productsSection.categories.doors.name, href: lp("/products/doors") },
    { name: dict.productsSection.categories.sunroom.name, href: lp("/products/sunroom") },
    { name: dict.productsSection.categories["wooden-doors"].name, href: lp("/products/wooden-doors") },
  ];

  const resourceLinks = [
    { name: dict.nav.faqs, href: lp("/resources/faqs") },
    { name: dict.nav.certifications, href: lp("/resources/certifications") },
    { name: dict.nav.projects, href: lp("/projects") },
    { name: dict.nav.about, href: lp("/about") },
  ];

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href={lp("/")}
              className="group flex items-center gap-2 transition-opacity duration-200 hover:opacity-95"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-none border border-[var(--accent-gold)]/45 bg-neutral-950 shadow-sm transition-[transform,box-shadow] duration-300 group-hover:scale-[1.03] group-hover:border-[var(--accent-gold)]">
                <span className="bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent)] bg-clip-text font-bold text-sm text-transparent">
                  VF
                </span>
              </div>
              <span className="text-xl font-bold tracking-[0.08em]">{siteConfig.name}</span>
            </Link>
            <p className="font-serif text-sm italic text-white/85">{dict.footer.tagline}</p>
            <p className="text-sm leading-relaxed text-white/70">
              {dict.footer.description}
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { href: siteConfig.social.facebook, label: "Facebook", el: <FacebookIcon /> },
                { href: siteConfig.social.linkedin, label: "LinkedIn", el: <LinkedinIcon /> },
                { href: siteConfig.social.instagram, label: "Instagram", el: <InstagramIcon /> },
                { href: siteConfig.social.youtube, label: "YouTube", el: <YoutubeIcon /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition hover:border-[var(--accent-gold)] hover:text-white"
                >
                  {s.el}
                </a>
              ))}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <Truck className="h-3.5 w-3.5 text-[var(--accent-gold)]/85" />
              {dict.footer.shippingTerms}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              {dict.footer.productsHeading}
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-flex text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              {dict.footer.resourcesHeading}
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-flex text-sm text-white/70 transition hover:translate-x-0.5 hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              {dict.footer.contactHeading}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                <span className="text-sm text-white/85">{siteConfig.links.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-white/70" />
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="text-sm text-white/85 transition hover:text-white"
                >
                  {siteConfig.links.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-white/70" />
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-sm text-white/85 transition hover:text-white"
                >
                  {siteConfig.links.email}
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Newsletter dict={dict.footer} locale={locale} />
            </div>
          </div>
        </div>

        {/* Cert chips */}
        <div className="mt-12 border-t border-white/12 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {siteConfig.certifications.map((cert) => (
              <span
                key={cert.name}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                title={cert.description}
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/12 pt-6 text-center text-sm text-white/55 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px]">
            <Link href={lp("/legal/privacy")} className="hover:text-white">
              {dict.footer.legal.privacy}
            </Link>
            <Link href={lp("/legal/terms")} className="hover:text-white">
              {dict.footer.legal.terms}
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              {dict.footer.legal.sitemap}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
