"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { companyMenu, productsMega } from "@/content/navigation-extended";

function UkFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 34" width="26" height="14" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill="#012169" d="M0 0h60v34H0z" />
      <path fill="#FFF" d="m0 0 60 34M60 0 0 34" stroke="#FFF" strokeWidth="12" strokeLinecap="square" />
      <path fill="none" stroke="#C8102E" strokeWidth="6.5" d="m0 0 60 34M60 0 0 34" strokeLinecap="square" />
      <path stroke="#FFF" strokeWidth="16" strokeLinecap="square" d="M30 0v34M0 17h60" />
      <path stroke="#C8102E" strokeWidth="10" strokeLinecap="square" d="M30 0v34M0 17h60" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroOverlay = isHome && !scrolled;
  /** Show DERCHy-style tier-1 strips after scroll or Off home */
  const showUtilityTier = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      data-hero-overlay={heroOverlay ? "true" : undefined}
    >
      {/* Top utility — hidden atop homepage so Hero reads full-bleed like reference */}
      {showUtilityTier ? (
        <div className="hidden border-b border-white/10 bg-[var(--derchi-dark)] text-[11px] text-stone-400 sm:block">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
                <MessageCircle className="h-3.5 w-3.5 text-[var(--accent-gold)]/90" aria-hidden />
                WhatsApp Live Chat
              </span>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-stone-200"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {siteConfig.links.email}
              </a>
            </div>
            <p className="text-[var(--accent-gold)]/85">
              Need a project quote?
              <span className="text-stone-500"> — fast reply within business hours.</span>
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "border-b transition-[background,border-color,box-shadow] duration-300",
          heroOverlay
            ? "border-white/22 bg-transparent"
            : cn(
                "border-stone-200 bg-white/95 backdrop-blur-md",
                scrolled && "shadow-md shadow-neutral-900/8",
              ),
        )}
      >
        <div className="container mx-auto flex h-[4.125rem] items-center justify-between gap-4 px-4 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center text-sm font-black tracking-tighter transition-colors",
                heroOverlay
                  ? "border border-[var(--accent-gold)]/80 bg-black/40 text-[var(--accent-gold)]"
                  : "bg-[var(--derchi-dark)] text-[var(--accent-gold)]",
              )}
            >
              VF
            </div>
            <span
              className={cn(
                "text-lg font-semibold uppercase tracking-[0.12em]",
                heroOverlay ? "text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]" : "text-neutral-950",
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex-nowrap gap-0 text-[11px] font-semibold uppercase tracking-wide">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent",
                        pathname === "/" && heroOverlay && "border-b-2 border-white pb-0.5",
                        pathname === "/" && !heroOverlay && "border-b-2 border-amber-700 pb-0.5",
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "derchi-nav-link h-10 !bg-transparent px-2 italic data-[state=open]:bg-stone-100",
                      heroOverlay && "hero-nav-trigger",
                    )}
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0">
                    <div className="grid w-[min(92vw,44rem)] gap-8 border border-stone-200 bg-white p-6 shadow-xl md:w-[640px] md:grid-cols-2">
                      {productsMega.map((cat) => (
                        <div key={cat.category} className="min-h-[140px]">
                          <Link
                            href={cat.href}
                            className="text-[15px] font-semibold text-neutral-950 hover:text-amber-800"
                          >
                            {cat.category}
                          </Link>
                          {cat.items.length ? (
                            <ul className="mt-3 space-y-2 border-l-2 border-amber-600/70 pl-3">
                              {cat.items.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    href={cat.href}
                                    className="text-sm italic text-stone-600 transition-colors hover:text-amber-800"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-2 text-sm text-stone-500">Solutions & specifications</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "derchi-nav-link h-10 !bg-transparent px-2 italic data-[state=open]:bg-stone-100",
                      heroOverlay && "hero-nav-trigger",
                    )}
                  >
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 border border-stone-200 bg-white p-3 shadow-lg">
                      {companyMenu.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block rounded-none px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100 hover:text-neutral-950"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/projects" legacyBehavior passHref>
                    <NavigationMenuLink
                      className="derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent"
                    >
                      Project
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "derchi-nav-link h-10 !bg-transparent px-2 italic data-[state=open]:bg-stone-100",
                      heroOverlay && "hero-nav-trigger",
                    )}
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[220px] gap-1 border border-stone-200 bg-white p-3 shadow-lg">
                      {siteConfig.navigation.resources.map((r) => (
                        <li key={r.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={r.href}
                              className="block rounded-none px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100"
                            >
                              {r.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className="derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent"
                    >
                      Partner
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className="derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent"
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className={cn("hidden shrink-0 items-center gap-1.5 lg:flex")}>
            <button
              type="button"
              aria-label="Search website"
              className={cn(
                "rounded-none p-2 transition-[background,color]",
                heroOverlay
                  ? "border border-white/35 bg-black/35 text-white hover:bg-white/10"
                  : "border border-stone-300 text-neutral-950 hover:bg-stone-100",
              )}
            >
              <Search className={cn("h-4 w-4 shrink-0", heroOverlay && "text-white")} />
            </button>

            <button
              type="button"
              className={cn(
                "hidden cursor-default items-center gap-1 rounded-none border-none bg-transparent uppercase tracking-wide lg:flex lg:text-[11px]",
                heroOverlay ? "border border-white/12 px-2 py-1.5 text-white" : "px-2 py-1.5 text-neutral-950",
              )}
            >
              <span className="overflow-hidden rounded-[2px] shadow-sm ring-[0.25px] ring-black/35">
                <UkFlag />
              </span>
              <span className="hidden xl:inline">English</span>
              <span className="xl:hidden">EN</span>
              <ChevronDown
                className={cn(
                  "h-3 w-3",
                  heroOverlay ? "text-white" : "text-neutral-900",
                )}
              />
            </button>

            <a
              href={`tel:${siteConfig.links.phone}`}
              className={cn(
                "hidden items-center gap-1 lg:flex",
                heroOverlay && "lg:hidden",
              )}
            >
              <Phone className="h-4 w-4 text-amber-800" aria-hidden />
              <span className="max-w-[7rem] truncate text-[11px] font-medium italic text-neutral-800">
                {siteConfig.links.phone}
              </span>
            </a>
            <Button
              asChild
              size="default"
              className={cn(
                "rounded-none px-3 py-5 text-[11px] font-semibold uppercase tracking-wider transition-all hover:ring-[var(--accent-gold)]/40",
                heroOverlay
                  ? "border-2 border-white bg-transparent text-white shadow-none hover:bg-white hover:text-neutral-950"
                  : "bg-[var(--derchi-dark)] text-white shadow-sm ring-2 ring-transparent hover:bg-neutral-900",
              )}
            >
              <Link href="/contact">Inquiry</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(
                "rounded-none text-[12px]",
                heroOverlay
                  ? "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  : "border-neutral-950",
              )}
            >
              <Link href="/contact">Inquiry</Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-none",
                    heroOverlay ? "border-white/45 bg-black/35 text-white" : "border-stone-300",
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100vw,20rem)] border-stone-200 bg-stone-50 p-6">
                <SheetTitle className="text-left font-semibold uppercase tracking-widest">
                  VistaFrame Menu
                </SheetTitle>
                <div className="mt-8 flex flex-col gap-6 text-[15px]">
                  <Link href="/" className="italic" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Products</p>
                    <div className="space-y-2 border-l-2 border-amber-700/60 pl-3">
                      {productsMega.map((c) => (
                        <Link
                          key={c.category}
                          href={c.href}
                          className="block italic text-stone-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {c.category}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {companyMenu.map((item) => (
                    <Link key={item.name} href={item.href} className="italic" onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/projects" className="italic" onClick={() => setIsOpen(false)}>
                    Project
                  </Link>
                  <Link href="/contact" className="italic" onClick={() => setIsOpen(false)}>
                    Contact Us / Be A Partner
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
