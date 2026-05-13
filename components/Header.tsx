"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchDialog } from "@/components/SearchDialog";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/content/i18n";
import type { Dictionary } from "@/content/i18n/types";

type Props = { dict: Dictionary; locale: Locale };

export function Header({ dict, locale }: Props) {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === `/${locale}` || pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroOverlay = isHome && !scrolled;
  const showUtilityTier = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const productCats = [
    { id: "doors", items: dict.productsSection.categories.doors.products },
    { id: "windows", items: dict.productsSection.categories.windows.products },
    { id: "sunroom", items: dict.productsSection.categories.sunroom.products },
    {
      id: "wooden-doors",
      items: dict.productsSection.categories["wooden-doors"].products,
    },
  ] as const;

  const companyMenu = [
    { name: dict.nav.about, href: lp("/about") },
    { name: dict.nav.certifications, href: lp("/resources/certifications") },
    { name: dict.nav.faqs, href: lp("/resources/faqs") },
    { name: dict.nav.contact, href: lp("/contact") },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      data-hero-overlay={heroOverlay ? "true" : undefined}
    >
      {showUtilityTier ? (
        <div className="hidden border-b border-white/10 bg-[var(--derchi-dark)] text-[11px] text-stone-400 sm:block">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
                <MessageCircle
                  className="h-3.5 w-3.5 text-[var(--accent-gold)]/90"
                  aria-hidden
                />
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
              {dict.hero.floatingQuoteLead}
              <span className="text-stone-500">
                {" "}
                — {dict.hero.floatingQuoteSub}
              </span>
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
          <Link href={lp("/")} className="flex shrink-0 items-center gap-2.5">
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
                heroOverlay
                  ? "text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]"
                  : "text-neutral-950",
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex-nowrap gap-0 text-[11px] font-semibold uppercase tracking-wide">
                <NavigationMenuItem>
                  <Link href={lp("/")} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent",
                        isHome && heroOverlay && "border-b-2 border-white pb-0.5",
                        isHome && !heroOverlay && "border-b-2 border-amber-700 pb-0.5",
                      )}
                    >
                      {dict.nav.home}
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
                    {dict.nav.products}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-0 mt-1 w-[min(92vw,44rem)] md:w-[640px]">
                    <div className="grid gap-8 border border-stone-200 bg-white p-6 shadow-xl md:grid-cols-2">
                      {productCats.map((cat) => {
                        const c =
                          dict.productsSection.categories[
                            cat.id as keyof typeof dict.productsSection.categories
                          ];
                        return (
                          <div key={cat.id} className="min-h-[140px]">
                            <Link
                              href={lp(`/products/${cat.id}`)}
                              className="text-[15px] font-semibold text-neutral-950 hover:text-amber-800"
                            >
                              {c.name}
                            </Link>
                            {cat.items.length ? (
                              <ul className="mt-3 space-y-2 border-l-2 border-amber-600/70 pl-3">
                                {cat.items.map((sub) => (
                                  <li key={sub}>
                                    <Link
                                      href={lp(`/products/${cat.id}`)}
                                      className="text-sm italic text-stone-600 transition-colors hover:text-amber-800"
                                    >
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 text-sm text-stone-500">
                                {c.tagline}
                              </p>
                            )}
                          </div>
                        );
                      })}
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
                    {dict.nav.about}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-0 mt-1">
                    <ul className="grid w-[240px] gap-1 border border-stone-200 bg-white p-3 shadow-lg">
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
                  <Link href={lp("/projects")} legacyBehavior passHref>
                    <NavigationMenuLink className="derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent">
                      {dict.nav.projects}
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
                    {dict.nav.resources}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-0 mt-1">
                    <ul className="grid w-[240px] gap-1 border border-stone-200 bg-white p-3 shadow-lg">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href={lp("/resources/faqs")}
                            className="block rounded-none px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100"
                          >
                            {dict.nav.faqs}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href={lp("/resources/certifications")}
                            className="block rounded-none px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100"
                          >
                            {dict.nav.certifications}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={lp("/contact")} legacyBehavior passHref>
                    <NavigationMenuLink className="derchi-nav-link h-10 !bg-transparent px-2 italic data-[active]:bg-transparent">
                      {dict.nav.contact}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
            <SearchDialog
              dict={dict}
              locale={locale}
              trigger={
                <button
                  type="button"
                  aria-label={dict.search.open}
                  className={cn(
                    "rounded-none p-2 transition-[background,color]",
                    heroOverlay
                      ? "border border-white/35 bg-black/35 text-white hover:bg-white/10"
                      : "border border-stone-300 text-neutral-950 hover:bg-stone-100",
                  )}
                >
                  <Search className="h-4 w-4 shrink-0" />
                </button>
              }
            />

            <LanguageSwitcher
              current={locale}
              variant={heroOverlay ? "light" : "dark"}
            />

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
              <Link href={lp("/contact")}>{dict.nav.inquiry}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher
              current={locale}
              variant={heroOverlay ? "light" : "dark"}
            />
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
              <Link href={lp("/contact")}>{dict.nav.inquiry}</Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-none",
                    heroOverlay
                      ? "border-white/45 bg-black/35 text-white"
                      : "border-stone-300",
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{dict.nav.search}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(100vw,20rem)] border-stone-200 bg-stone-50 p-6"
              >
                <SheetTitle className="text-left font-semibold uppercase tracking-widest">
                  VistaFrame
                </SheetTitle>
                <div className="mt-8 flex flex-col gap-5 text-[15px]">
                  <Link
                    href={lp("/")}
                    className="italic"
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav.home}
                  </Link>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                      {dict.nav.products}
                    </p>
                    <div className="space-y-2 border-l-2 border-amber-700/60 pl-3">
                      {productCats.map((c) => {
                        const cat =
                          dict.productsSection.categories[
                            c.id as keyof typeof dict.productsSection.categories
                          ];
                        return (
                          <Link
                            key={c.id}
                            href={lp(`/products/${c.id}`)}
                            className="block italic text-stone-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  {companyMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="italic"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href={lp("/projects")}
                    className="italic"
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav.projects}
                  </Link>
                  <Link
                    href={lp("/contact")}
                    className="italic"
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav.contact}
                  </Link>

                  <div className="mt-4 border-t border-stone-200 pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      {dict.nav.language}
                    </p>
                    <div className="mt-3">
                      <LanguageSwitcher current={locale} />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
