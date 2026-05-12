export const siteConfig = {
  name: "VistaFrame",
  tagline: "Precision Crafted Views",
  taglineCn: "精工匠造，视野无界",
  /** Hero headline (DESCHY-style exporter band: stacked uppercase lines + one-stop line) */
  hero: {
    titleLine1: "WINDOWS",
    titleLine2: "& DOORS",
    subtitleEn:
      "Provide one‑stop professional solutions for customized doors and windows to global users",
    floatingQuoteLead: "Need a Project Quote?",
    floatingQuoteSub: "Fast reply within 10 minutes",
  },
  description:
    "VistaFrame is a leading manufacturer of precision-engineered aluminum window and door systems. We deliver certified, customizable solutions for global commercial and residential projects.",
  descriptionCn:
    "VistaFrame是领先的精密铝合金门窗系统制造商，为全球商业和住宅项目提供认证化、定制化的解决方案。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vistaframe.com",
  ogImage: "/images/og-image.jpg",
  links: {
    email: "info@vistaframe.com",
    phone: "+86-xxx-xxxx-xxxx",
    whatsapp: "+86-xxx-xxxx-xxxx",
    address: "Foshan, Guangdong, China",
  },
  social: {
    facebook: "https://facebook.com/vistaframe",
    linkedin: "https://linkedin.com/company/vistaframe",
    instagram: "https://instagram.com/vistaframe",
    youtube: "https://youtube.com/vistaframe",
  },
  stats: {
    productionArea: "150,000",
    annualCapacity: "800,000",
    rdExperts: "25+",
    employees: "500+",
    projects: "15,000+",
    countries: "80+",
    patents: "80+",
  },
  certifications: [
    { name: "NFRC", description: "North American Fenestration Rating Council" },
    { name: "CE", description: "European Conformity" },
    { name: "AS2047", description: "Australian Standard for Windows" },
    { name: "CSA", description: "Canadian Standards Association" },
    { name: "Energy Star", description: "Energy Efficiency Certification" },
    { name: "ISO 9001", description: "Quality Management System" },
  ],
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    products: [
      { name: "Aluminum Windows", href: "/products#cat-windows" },
      { name: "Aluminum Doors", href: "/products#cat-doors" },
      { name: "Sunroom", href: "/products#cat-sunroom" },
      { name: "Wooden Doors", href: "/products#cat-wooden-doors" },
    ],
    resources: [
      { name: "Technical Docs", href: "/resources/technical" },
      { name: "Certifications", href: "/resources/certifications" },
      { name: "FAQs", href: "/resources/faqs" },
    ],
  },
};
