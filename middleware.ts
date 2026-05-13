import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/content/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

function detectLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim();
    const lang = tag.split("-")[0];
    if (isLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip API, internals, and any file with an extension.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const target = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${target}` : `/${target}${pathname}`;
  url.search = search;

  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", target, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
