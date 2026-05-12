/**
 * Navigation structure modeled on common B2B exporter patterns (DERCHI-style IA).
 * All links point to VistaFrame routes or in-page anchors.
 */
export const productsMega = [
  {
    category: "Aluminum Doors",
    href: "/products#cat-doors",
    items: ["Entry Door", "Bifold Door", "Sliding Door", "Swing Door"],
  },
  {
    category: "Aluminum Windows",
    href: "/products#cat-windows",
    items: ["Casement Window", "Picture Window", "Sliding Window"],
  },
  { category: "Sunroom", href: "/products#cat-sunroom", items: [] as string[] },
  { category: "Wooden Doors", href: "/products#cat-wooden-doors", items: [] as string[] },
] as const;

export const companyMenu = [
  { name: "About Us", href: "/about" },
  { name: "Certificates", href: "/about#certificates" },
  { name: "Catalog", href: "/contact" },
  { name: "FAQ", href: "/contact" },
] as const;
