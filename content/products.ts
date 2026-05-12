export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: {
    uValue?: string;
    soundInsulation?: string;
    windResistance?: string;
    airTightness?: string;
    waterTightness?: string;
  };
  certifications: string[];
  image: string;
  gallery: string[];
  applications: string[];
}

export const productCategories = [
  {
    id: "windows",
    name: "Aluminum Windows",
    nameCn: "铝合金窗",
    description: "High-performance aluminum window systems with thermal break technology",
    image: "/images/products/windows/category.jpg",
    products: ["casement", "sliding", "picture", "awning"],
  },
  {
    id: "doors",
    name: "Aluminum Doors",
    nameCn: "铝合金门",
    description: "Durable and elegant aluminum door solutions for every entrance",
    image: "/images/products/doors/category.jpg",
    products: ["entry", "bifold", "sliding", "swing"],
  },
  {
    id: "sunroom",
    name: "Sunroom",
    nameCn: "阳光房",
    description: "Custom glass enclosures that bring the outdoors in",
    image: "/images/products/sunroom/category.jpg",
    products: ["conservatory", "garden-room", "patio-cover"],
  },
  {
    id: "wooden-doors",
    name: "Wooden Doors",
    nameCn: "实木门",
    description: "Premium wooden doors combining traditional craftsmanship with modern security",
    image: "/images/products/wooden-doors/category.jpg",
    products: ["solid-wood", "composite", "security"],
  },
];

export const products: Product[] = [
  // Windows
  {
    id: "casement-window",
    name: "Casement Window",
    category: "windows",
    description:
      "Side-hinged windows that open outward like a door. Excellent ventilation and unobstructed views with superior sealing performance.",
    features: [
      "Outward opening for maximum ventilation",
      "Multi-point locking system",
      "Thermal break aluminum frame",
      "Double or triple glazing options",
      "Mosquito screen compatible",
    ],
    specifications: {
      uValue: "1.4-1.8 W/m²K",
      soundInsulation: "35-45 dB",
      windResistance: "Class 5 (3.0 kPa)",
      airTightness: "Class 4",
      waterTightness: "Class E1050",
    },
    certifications: ["NFRC", "CE", "AS2047"],
    image: "/images/products/windows/casement.jpg",
    gallery: [
      "/images/products/windows/casement-1.jpg",
      "/images/products/windows/casement-2.jpg",
    ],
    applications: ["Residential", "Commercial", "High-rise buildings"],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    category: "windows",
    description:
      "Space-saving horizontal sliding windows ideal for balconies and areas with limited clearance.",
    features: [
      "Smooth horizontal operation",
      "Space-saving design",
      "Double or triple track options",
      "High-security locking mechanism",
      "Various mesh screen options",
    ],
    specifications: {
      uValue: "1.6-2.0 W/m²K",
      soundInsulation: "30-40 dB",
      windResistance: "Class 4 (2.4 kPa)",
      airTightness: "Class 3",
      waterTightness: "Class E750",
    },
    certifications: ["NFRC", "CE", "AS2047"],
    image: "/images/products/windows/sliding.jpg",
    gallery: [
      "/images/products/windows/sliding-1.jpg",
      "/images/products/windows/sliding-2.jpg",
    ],
    applications: ["Balconies", "Offices", "Modern homes"],
  },
  {
    id: "picture-window",
    name: "Picture Window",
    category: "windows",
    description:
      "Large fixed windows designed to frame views and maximize natural light without operable sashes.",
    features: [
      "Unobstructed panoramic views",
      "Maximum energy efficiency",
      "Custom shapes and sizes",
      "Structural glazing options",
      "Minimal frame visibility",
    ],
    specifications: {
      uValue: "1.2-1.6 W/m²K",
      soundInsulation: "40-50 dB",
      windResistance: "Class 5 (3.0 kPa)",
      airTightness: "Class 4",
      waterTightness: "Class E1050",
    },
    certifications: ["NFRC", "CE", "AS2047"],
    image: "/images/products/windows/picture.jpg",
    gallery: ["/images/products/windows/picture-1.jpg"],
    applications: ["Living rooms", "Commercial lobbies", "Showrooms"],
  },
  // Doors
  {
    id: "entry-door",
    name: "Entry Door",
    category: "doors",
    description:
      "Grand entrance doors that combine security, thermal performance, and architectural elegance.",
    features: [
      "Multi-point security locking",
      "Thermal break construction",
      "Various panel designs",
      "Smart lock compatible",
      "Hurricane-rated options",
    ],
    specifications: {
      uValue: "1.2-1.6 W/m²K",
      soundInsulation: "35-42 dB",
      windResistance: "Class 5 (3.0 kPa)",
      airTightness: "Class 4",
      waterTightness: "Class E1050",
    },
    certifications: ["NFRC", "CE", "CSA"],
    image: "/images/products/doors/entry.jpg",
    gallery: [
      "/images/products/doors/entry-1.jpg",
      "/images/products/doors/entry-2.jpg",
    ],
    applications: ["Main entrances", "Villas", "Commercial buildings"],
  },
  {
    id: "bifold-door",
    name: "Bifold Door",
    category: "doors",
    description:
      "Folding door systems that create seamless indoor-outdoor transitions with maximum opening widths.",
    features: [
      "Up to 90% opening width",
      "Smooth roller system",
      "Indoor/outdoor threshold options",
      "Multiple panel configurations",
      "Weather-resistant seals",
    ],
    specifications: {
      uValue: "1.6-2.0 W/m²K",
      soundInsulation: "32-38 dB",
      windResistance: "Class 4 (2.4 kPa)",
      airTightness: "Class 3",
      waterTightness: "Class E750",
    },
    certifications: ["NFRC", "CE", "AS2047"],
    image: "/images/products/doors/bifold.jpg",
    gallery: [
      "/images/products/doors/bifold-1.jpg",
      "/images/products/doors/bifold-2.jpg",
    ],
    applications: ["Patio access", "Pool houses", "Restaurants"],
  },
  {
    id: "sliding-door",
    name: "Sliding Door",
    category: "doors",
    description:
      "Space-efficient sliding door systems with large glass panels for panoramic views.",
    features: [
      "Lift-and-slide or standard options",
      "Large panel capabilities",
      "High-security locking",
      "Low threshold options",
      "Double or triple glazing",
    ],
    specifications: {
      uValue: "1.4-1.8 W/m²K",
      soundInsulation: "35-42 dB",
      windResistance: "Class 5 (3.0 kPa)",
      airTightness: "Class 4",
      waterTightness: "Class E1050",
    },
    certifications: ["NFRC", "CE", "AS2047"],
    image: "/images/products/doors/sliding.jpg",
    gallery: [
      "/images/products/doors/sliding-1.jpg",
      "/images/products/doors/sliding-2.jpg",
    ],
    applications: ["Terrace access", "Balconies", "Commercial spaces"],
  },
];

export const features = [
  {
    title: "Thermal Break Technology",
    description:
      "Polyamide strips between aluminum profiles create a thermal barrier, reducing heat transfer by up to 70%.",
    icon: "Thermometer",
  },
  {
    title: "Multi-Point Locking",
    description:
      "Advanced locking systems with multiple engagement points for enhanced security and weather sealing.",
    icon: "Lock",
  },
  {
    title: "Acoustic Engineering",
    description:
      "Double and triple glazing options with acoustic laminates achieving up to 50dB sound reduction.",
    icon: "VolumeX",
  },
  {
    title: "Hurricane Rated",
    description:
      "Impact-resistant systems tested to withstand wind speeds up to 200mph and large missile impacts.",
    icon: "Shield",
  },
  {
    title: "Custom Finishes",
    description:
      "Anodized, powder-coated, or wood-grain finishes in unlimited colors to match any architectural vision.",
    icon: "Palette",
  },
  {
    title: "Smart Integration",
    description:
      "Compatible with home automation systems including motorized operation and sensor integration.",
    icon: "Cpu",
  },
];
