import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";

// Social icons as inline SVGs (compatible with all lucide versions)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="group flex items-center gap-2 transition-opacity duration-200 hover:opacity-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-none border border-[var(--accent-gold)]/45 bg-neutral-950 shadow-sm transition-[transform,box-shadow] duration-300 group-hover:scale-[1.03] group-hover:border-[var(--accent-gold)]">
                <span className="bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent)] bg-clip-text font-bold text-sm text-transparent">
                  VF
                </span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-white/70">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-[color,transform] duration-200 hover:scale-105 hover:text-white"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-[color,transform] duration-200 hover:scale-105 hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-[color,transform] duration-200 hover:scale-105 hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-[color,transform] duration-200 hover:scale-105 hover:text-white"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              Products
            </h3>
            <ul className="space-y-2">
              {siteConfig.navigation.products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="inline-flex text-sm text-white/70 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              Resources
            </h3>
            <ul className="space-y-2">
              {siteConfig.navigation.resources.map((resource) => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    className="inline-flex text-sm text-white/70 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-white"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="inline-flex text-sm text-white/70 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-white"
                >
                  Project Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-gold)]/90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/70 mt-0.5 shrink-0" />
                <span className="text-sm text-white/80">
                  {siteConfig.links.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/70 shrink-0" />
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="text-sm text-white/80 transition-[color] duration-200 hover:text-white"
                >
                  {siteConfig.links.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/70 shrink-0" />
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-sm text-white/80 transition-[color] duration-200 hover:text-white"
                >
                  {siteConfig.links.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 border-t border-white/12 pt-8">
          <div className="flex flex-wrap justify-center gap-6">
            {siteConfig.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-2 text-sm text-white/55"
              >
                <span className="font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/12 pt-8 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
