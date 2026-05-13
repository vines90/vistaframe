/**
 * Locale type definitions and the master Dictionary interface for VistaFrame.
 * Every page-level string must live in this dictionary so all locales stay in sync.
 */

export type Locale = "en" | "zh" | "es";

export interface NavDict {
  home: string;
  products: string;
  projects: string;
  about: string;
  contact: string;
  resources: string;
  faqs: string;
  certifications: string;
  partner: string;
  privacy: string;
  terms: string;
  search: string;
  inquiry: string;
  language: string;
}

export interface HeroDict {
  eyebrow: string;
  /** Bold word rendered in metallic gold */
  titleAccent: string;
  /** Following words (rest of the title) */
  titleRest: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  floatingQuoteLead: string;
  floatingQuoteSub: string;
  kpis: { value: string; label: string }[];
  certStripLabel: string;
}

export interface ZeroErrorDict {
  eyebrow: string;
  titleAccent: string;
  titleRest: string;
  cta: string;
  points: string[];
}

export interface CompanyDict {
  eyebrow: string;
  introduction: string;
  title: string;
  intro: string;
  highlight: string;
  videoLabel: string;
  description: string;
  whyTitle: string;
  pillars: { title: string; subtitle: string }[];
  catalog: string;
  metrics: { value: string; label: string }[];
}

export interface ProductsSectionDict {
  eyebrow: string;
  productLabel: string;
  title: string;
  more: string;
  highlights: { value: string; label: string }[];
  cta: string;
  categories: Record<
    "windows" | "doors" | "sunroom" | "wooden-doors",
    { name: string; tagline: string; description: string; products: string[] }
  >;
}

export interface ProjectsSectionDict {
  eyebrow: string;
  caseLabel: string;
  titleNumberPrefix: string;
  titleSuffix: string;
  paragraph: string;
  ctaLibrary: string;
  cardCta: string;
  filterRegion: string;
  filterType: string;
  filterAll: string;
  empty: string;
  detailLabels: {
    location: string;
    region: string;
    type: string;
    year: string;
    productsUsed: string;
    next: string;
    previous: string;
    related: string;
  };
  regions: Record<string, string>;
  types: Record<string, string>;
}

export interface ProcessDict {
  eyebrow: string;
  processLabel: string;
  title: string;
  cta: string;
  steps: { title: string; detail: string }[];
}

export interface OneStopDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: string[];
  cta: string;
  vrLabel: string;
  vrCta: string;
  tourTitle: string;
  tourCaption: string;
  tourImages: { title: string; description: string }[];
}

export interface WhyJoinDict {
  eyebrow: string;
  title: string;
  cta: string;
  cells: { value: string; label: string }[];
}

export interface HonorsDict {
  eyebrow: string;
  title: string;
  intro: string;
  mapTitle: string;
  mapBody: string;
  viewCertificate: string;
  certificateDialogTitle: string;
  certificateDialogBody: string;
}

export interface CtaDict {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  responseLabel: string;
}

export interface TestimonialsDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: { quote: string; name: string; role: string; country: string }[];
}

export interface FaqDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: { question: string; answer: string }[];
}

export interface PartnersDict {
  eyebrow: string;
  caption: string;
}

export interface FooterDict {
  tagline: string;
  description: string;
  productsHeading: string;
  resourcesHeading: string;
  contactHeading: string;
  newsletterHeading: string;
  newsletterBody: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  newsletterSuccess: string;
  newsletterError: string;
  legal: { privacy: string; terms: string; sitemap: string };
  copyright: string;
  shippingTerms: string;
}

export interface ContactDict {
  pageTitle: string;
  pageBody: string;
  panelHeading: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  businessHoursValue: string;
  fastResponse: string;
  fastResponseBody: string;
  formHeading: string;
  formBody: string;
  steps: { title: string; description: string }[];
  fields: {
    company: string;
    country: string;
    countryPlaceholder: string;
    businessType: string;
    businessTypePlaceholder: string;
    projectType: string;
    projectTypePlaceholder: string;
    quantity: string;
    quantityPlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    productInterest: string;
    productInterestPlaceholder: string;
    specifications: string;
    specificationsPlaceholder: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
  };
  options: {
    countries: { value: string; label: string }[];
    businessTypes: { value: string; label: string }[];
    projectTypes: { value: string; label: string }[];
    quantities: { value: string; label: string }[];
    timelines: { value: string; label: string }[];
    productInterests: { value: string; label: string }[];
  };
  buttons: {
    next: string;
    previous: string;
    submit: string;
    submitting: string;
  };
  successTitle: string;
  successBody: string;
}

export interface AboutDict {
  hero: { title: string; body: string };
  storyTitle: string;
  storyParagraphs: string[];
  capabilitiesTitle: string;
  capabilities: { title: string; description: string; icon: string }[];
  qcTitle: string;
  qcBody: string;
  qcPoints: string[];
  certificatesTitle: string;
  factoryAlt: string;
  qcAlt: string;
}

export interface ProductsPageDict {
  hero: { title: string; body: string };
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  exploreCta: string;
  categoryDetail: {
    overview: string;
    keyFeatures: string;
    specifications: string;
    applications: string;
    inquireNow: string;
    backToProducts: string;
    relatedProducts: string;
  };
  specs: {
    uValue: string;
    soundInsulation: string;
    windResistance: string;
    airTightness: string;
    waterTightness: string;
  };
  productInfo: Record<
    string,
    {
      name: string;
      description: string;
      features: string[];
      applications: string[];
    }
  >;
}

export interface CookieDict {
  message: string;
  accept: string;
  reject: string;
  manage: string;
  learnMore: string;
}

export interface SearchDict {
  placeholder: string;
  empty: string;
  groupPages: string;
  groupProducts: string;
  groupProjects: string;
  open: string;
}

export interface MultiCtaDict {
  whatsapp: string;
  email: string;
  wechat: string;
  top: string;
  open: string;
  close: string;
}

export interface NotFoundDict {
  title: string;
  subtitle: string;
  body: string;
  back: string;
  home: string;
}

export interface ResourcesDict {
  faqsTitle: string;
  faqsBody: string;
  certsTitle: string;
  certsBody: string;
}

export interface LegalDict {
  privacyTitle: string;
  privacyBody: string;
  termsTitle: string;
  termsBody: string;
  lastUpdated: string;
}

export interface CommonDict {
  loading: string;
  next: string;
  previous: string;
  more: string;
  close: string;
  exploreMore: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: NavDict;
  hero: HeroDict;
  zeroError: ZeroErrorDict;
  company: CompanyDict;
  productsSection: ProductsSectionDict;
  projectsSection: ProjectsSectionDict;
  process: ProcessDict;
  oneStop: OneStopDict;
  whyJoin: WhyJoinDict;
  honors: HonorsDict;
  cta: CtaDict;
  testimonials: TestimonialsDict;
  faq: FaqDict;
  partners: PartnersDict;
  footer: FooterDict;
  contact: ContactDict;
  about: AboutDict;
  productsPage: ProductsPageDict;
  cookie: CookieDict;
  search: SearchDict;
  multiCta: MultiCtaDict;
  notFound: NotFoundDict;
  resources: ResourcesDict;
  legal: LegalDict;
  common: CommonDict;
}
