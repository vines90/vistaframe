import { siteConfig } from "@/content/site";
import type { Locale } from "@/content/i18n";

type Props = { locale: Locale };

export function StructuredData({ locale }: Props) {
  const baseUrl = siteConfig.url;
  const url = `${baseUrl}/${locale}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url,
    logo: `${baseUrl}${siteConfig.ogImage}`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.links.email,
        telephone: siteConfig.links.phone,
        contactType: "Sales",
        areaServed: ["NA", "EU", "AU", "ME", "AS"],
        availableLanguage: ["English", "Chinese", "Spanish"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.links.address,
      addressLocality: "Foshan",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${locale}/projects?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
