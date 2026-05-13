"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale, Dictionary } from "@/content/i18n";

const productCats = [
  { id: "windows", name: "铝窗系统", items: ["平开窗", "推拉窗", "固定窗"] },
  { id: "doors", name: "铝门系统", items: ["入户门", "折叠门", "推拉门"] },
  { id: "sunroom", name: "阳光房", items: [] },
  { id: "wooden-doors", name: "木门系统", items: [] },
];

const aboutMenu = [
  { name: "公司简介", href: "/about" },
  { name: "荣誉证书", href: "/about#certificates" },
  { name: "视频中心", href: "/about#videos" },
  { name: "VR展厅", href: "/about#vr" },
];

const resourcesMenu = [
  { name: "常见问题", href: "/resources/faqs" },
  { name: "国际认证", href: "/resources/certifications" },
];

type HeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "center";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  heroOverlay?: boolean;
}

function Dropdown({ trigger, children, align = "left", isOpen, onOpenChange, heroOverlay }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          "flex cursor-pointer items-center gap-1 px-2 py-2 text-[11px] font-semibold uppercase tracking-wide italic transition-colors",
          heroOverlay ? "text-white hover:text-white/80" : "text-neutral-900 hover:text-neutral-700"
        )}
      >
        {trigger}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 min-w-[200px] border border-stone-200 bg-white p-2 shadow-lg",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "left" && "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroOverlay = isHome && !scrolled;
  const showUtilityTier = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper to add locale prefix to paths
  const lp = (path: string) => path.startsWith("/") ? `/${locale}${path}` : `/${locale}/${path}`;

  const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) => (
    <Link
      href={lp(href)}
      className={cn(
        "px-2 py-2 text-[11px] font-semibold uppercase tracking-wide italic transition-colors",
        heroOverlay
          ? "text-white hover:text-white/80"
          : "text-neutral-900 hover:text-neutral-700",
        isActive && heroOverlay && "border-b-2 border-white pb-0.5",
        isActive && !heroOverlay && "border-b-2 border-amber-700 pb-0.5"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      {showUtilityTier && (
        <div className="hidden border-b border-white/10 bg-[var(--derchi-dark)] text-[11px] text-stone-400 sm:block">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
                <MessageCircle className="h-3.5 w-3.5 text-[var(--accent-gold)]/90" aria-hidden />
                WhatsApp Live Chat
              </span>
              <a href={`mailto:${siteConfig.links.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-stone-200">
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {siteConfig.links.email}
              </a>
            </div>
            <p className="text-[var(--accent-gold)]/85">
              Need a project quote? <span className="text-stone-500">— fast reply within business hours.</span>
            </p>
          </div>
        </div>
      )}

      {/* Main navigation */}
      <div
        className={cn(
          "border-b transition-[background,border-color,box-shadow] duration-300",
          heroOverlay
            ? "border-white/22 bg-transparent"
            : cn("border-stone-200 bg-white/95 backdrop-blur-md", scrolled && "shadow-md")
        )}
      >
        <div className="container mx-auto flex h-[4.125rem] items-center justify-between gap-4 px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center text-sm font-black tracking-tighter transition-colors",
                heroOverlay
                  ? "border border-[var(--accent-gold)]/80 bg-black/40 text-[var(--accent-gold)]"
                  : "bg-[var(--derchi-dark)] text-[var(--accent-gold)]"
              )}
            >
              VF
            </div>
            <span
              className={cn(
                "text-lg font-semibold uppercase tracking-[0.12em]",
                heroOverlay ? "text-white" : "text-neutral-950"
              )}
            >
              VistaFrame
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center lg:flex">
            <div className="flex items-center">
              <NavLink href="/" isActive={pathname === "/"}>首页</NavLink>

              <Dropdown
                trigger="产品中心"
                isOpen={openDropdown === "products"}
                onOpenChange={(open) => setOpenDropdown(open ? "products" : null)}
                heroOverlay={heroOverlay}
                align="left"
              >
                <div className="grid w-[400px] gap-4 p-3 md:grid-cols-2">
                  {productCats.map((cat) => (
                    <div key={cat.id}>
                      <Link
                        href={lp(`/products/${cat.id}`)}
                        className="block text-[14px] font-semibold text-neutral-950 hover:text-amber-800"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {cat.name}
                      </Link>
                      {cat.items.length > 0 && (
                        <ul className="mt-2 space-y-1 border-l-2 border-amber-600/70 pl-3">
                          {cat.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={lp(`/products/${cat.id}`)}
                                className="text-sm italic text-stone-600 hover:text-amber-800"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Dropdown>

              <Dropdown
                trigger="关于我们"
                isOpen={openDropdown === "about"}
                onOpenChange={(open) => setOpenDropdown(open ? "about" : null)}
                heroOverlay={heroOverlay}
                align="left"
              >
                <ul className="w-[200px]">
                  {aboutMenu.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={lp(item.href)}
                        className="block px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100 hover:text-neutral-950"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dropdown>

              <NavLink href="/projects">工程案例</NavLink>

              <Dropdown
                trigger="资源中心"
                isOpen={openDropdown === "resources"}
                onOpenChange={(open) => setOpenDropdown(open ? "resources" : null)}
                heroOverlay={heroOverlay}
                align="left"
              >
                <ul className="w-[200px]">
                  {resourcesMenu.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={lp(item.href)}
                        className="block px-3 py-2 text-sm italic text-stone-700 hover:bg-stone-100 hover:text-neutral-950"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dropdown>

              <NavLink href="/contact">联系我们</NavLink>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="搜索"
              className={cn(
                "rounded-none p-2 transition-colors",
                heroOverlay
                  ? "border border-white/35 bg-black/35 text-white hover:bg-white/10"
                  : "border border-stone-300 text-neutral-950 hover:bg-stone-100"
              )}
            >
              <Search className="h-4 w-4" />
            </button>

            <LanguageSwitcher current={locale} variant={heroOverlay ? "light" : "dark"} />

            <Link href={lp("/contact")}>
              <Button
                size="default"
                className={cn(
                  "rounded-none px-3 py-5 text-[11px] font-semibold uppercase tracking-wider",
                  heroOverlay
                    ? "border-2 border-white bg-transparent text-white hover:bg-white hover:text-neutral-950"
                    : "bg-[var(--derchi-dark)] text-white hover:bg-neutral-900"
                )}
              >
                立即询价
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href={lp("/contact")}>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-none",
                  heroOverlay ? "border-white/50 bg-transparent text-white" : "border-neutral-950"
                )}
              >
                询价
              </Button>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-none",
                    heroOverlay ? "border-white/45 bg-black/35 text-white" : "border-stone-300"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-stone-200 bg-stone-50 p-6">
                <SheetTitle className="text-left font-semibold uppercase tracking-widest">
                  VistaFrame
                </SheetTitle>
                <div className="mt-8 flex flex-col gap-4">
                  <Link href={lp("/")} className="text-lg italic" onClick={() => setIsMobileMenuOpen(false)}>首页</Link>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">产品中心</p>
                    {productCats.map((c) => (
                      <Link
                        key={c.id}
                        href={lp(`/products/${c.id}`)}
                        className="block pl-3 italic text-stone-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                  <Link href={lp("/projects")} className="text-lg italic" onClick={() => setIsMobileMenuOpen(false)}>工程案例</Link>
                  <Link href={lp("/contact")} className="text-lg italic" onClick={() => setIsMobileMenuOpen(false)}>联系我们</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
