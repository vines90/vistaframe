export interface Project {
  id: string;
  name: string;
  location: string;
  region: string;
  type: string;
  description: string;
  products: string[];
  images: string[];
  year: string;
  featured: boolean;
}

export const projectRegions = [
  { id: "north-america", name: "North America" },
  { id: "europe", name: "Europe" },
  { id: "australia", name: "Australia" },
  { id: "middle-east", name: "Middle East" },
  { id: "asia", name: "Asia" },
  { id: "africa", name: "Africa" },
];

export const projectTypes = [
  { id: "hotel", name: "Hotel & Resort" },
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "hospital", name: "Healthcare" },
  { id: "education", name: "Education" },
];

export const projects: Project[] = [
  {
    id: "hilton-los-angeles",
    name: "Hilton Downtown Los Angeles",
    location: "Los Angeles, USA",
    region: "north-america",
    type: "hotel",
    description:
      "Complete window and door systems for the luxury hotel renovation, featuring thermal break casement windows and grand entry doors.",
    products: ["Casement Window", "Entry Door", "Picture Window"],
    images: [
      "/images/projects/hilton-la-1.jpg",
      "/images/projects/hilton-la-2.jpg",
    ],
    year: "2024",
    featured: true,
  },
  {
    id: "beverly-hills-villa",
    name: "Beverly Hills Private Villa",
    location: "Beverly Hills, USA",
    region: "north-america",
    type: "residential",
    description:
      "Custom bifold and sliding door systems creating seamless indoor-outdoor living spaces with panoramic views.",
    products: ["Bifold Door", "Sliding Door", "Picture Window"],
    images: [
      "/images/projects/beverly-hills-1.jpg",
      "/images/projects/beverly-hills-2.jpg",
    ],
    year: "2024",
    featured: true,
  },
  {
    id: "dubai-marina-towers",
    name: "Dubai Marina Towers",
    location: "Dubai, UAE",
    region: "middle-east",
    type: "residential",
    description:
      "High-rise window systems with hurricane-rated performance for luxury residential towers overlooking the marina.",
    products: ["Sliding Window", "Casement Window"],
    images: [
      "/images/projects/dubai-marina-1.jpg",
      "/images/projects/dubai-marina-2.jpg",
    ],
    year: "2023",
    featured: true,
  },
  {
    id: "sydney-harbour-residences",
    name: "Sydney Harbour Residences",
    location: "Sydney, Australia",
    region: "australia",
    type: "residential",
    description:
      "AS2047 certified window and door systems with high wind resistance for waterfront properties.",
    products: ["Sliding Door", "Casement Window", "Entry Door"],
    images: [
      "/images/projects/sydney-harbour-1.jpg",
      "/images/projects/sydney-harbour-2.jpg",
    ],
    year: "2023",
    featured: true,
  },
  {
    id: "london-business-center",
    name: "London Business Center",
    location: "London, UK",
    region: "europe",
    type: "commercial",
    description:
      "CE certified aluminum curtain wall and window systems for the modern office complex.",
    products: ["Picture Window", "Casement Window"],
    images: [
      "/images/projects/london-business-1.jpg",
      "/images/projects/london-business-2.jpg",
    ],
    year: "2023",
    featured: false,
  },
  {
    id: "marriott-toronto",
    name: "Marriott Downtown Toronto",
    location: "Toronto, Canada",
    region: "north-america",
    type: "hotel",
    description:
      "CSA certified window systems with superior thermal performance for the Canadian climate.",
    products: ["Casement Window", "Picture Window", "Entry Door"],
    images: [
      "/images/projects/marriott-toronto-1.jpg",
      "/images/projects/marriott-toronto-2.jpg",
    ],
    year: "2023",
    featured: false,
  },
  {
    id: "singapore-sky-residence",
    name: "Sky Residence Singapore",
    location: "Singapore",
    region: "asia",
    type: "residential",
    description:
      "High-performance windows with excellent sound insulation for luxury high-rise living.",
    products: ["Sliding Window", "Casement Window"],
    images: [
      "/images/projects/singapore-sky-1.jpg",
      "/images/projects/singapore-sky-2.jpg",
    ],
    year: "2024",
    featured: false,
  },
  {
    id: "cape-town-resort",
    name: "Cape Town Coastal Resort",
    location: "Cape Town, South Africa",
    region: "africa",
    type: "hotel",
    description:
      "Corrosion-resistant aluminum systems with expansive glass for oceanfront resort villas.",
    products: ["Sliding Door", "Bifold Door", "Picture Window"],
    images: [
      "/images/projects/cape-town-1.jpg",
      "/images/projects/cape-town-2.jpg",
    ],
    year: "2023",
    featured: false,
  },
];
