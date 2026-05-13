import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { defaultLocale, getDict, isLocale } from "@/content/i18n";
import { headers } from "next/headers";

export default async function NotFound() {
  const h = await headers();
  const headerLocale = h.get("x-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const dict = getDict(locale).notFound;

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4">
      <div className="text-center">
        <h1 className="metallic-gold text-6xl font-bold md:text-8xl">
          {dict.title}
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-neutral-950 md:text-3xl">
          {dict.subtitle}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-stone-500">{dict.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center rounded-none border-2 border-neutral-950 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dict.back}
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center rounded-none bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--derchi-dark)] transition hover:bg-white"
          >
            <Home className="mr-2 h-4 w-4" />
            {dict.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
