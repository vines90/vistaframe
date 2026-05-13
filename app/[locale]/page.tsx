import { Hero } from "@/app/sections/Hero";
import { ZeroError } from "@/app/sections/ZeroError";
import { CompanyShowcase } from "@/app/sections/CompanyShowcase";
import { Products } from "@/app/sections/Products";
import { Projects } from "@/app/sections/Projects";
import { Process } from "@/app/sections/Process";
import { OneStopCustom } from "@/app/sections/OneStopCustom";
import { Testimonials } from "@/app/sections/Testimonials";
import { PartnersLogos } from "@/app/sections/PartnersLogos";
import { WhyJoinStats } from "@/app/sections/WhyJoinStats";
import { HonorsWall } from "@/app/sections/HonorsWall";
import { Faq } from "@/app/sections/Faq";
import { CTA } from "@/app/sections/CTA";
import { defaultLocale, getDict, isLocale } from "@/content/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDict(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <ZeroError dict={dict} locale={locale} />
      <CompanyShowcase dict={dict} locale={locale} />
      <Products dict={dict} locale={locale} />
      <Projects dict={dict} locale={locale} />
      <Process dict={dict} locale={locale} />
      <OneStopCustom dict={dict} locale={locale} />
      <Testimonials dict={dict} />
      <PartnersLogos dict={dict} />
      <WhyJoinStats dict={dict} locale={locale} />
      <HonorsWall dict={dict} />
      <Faq dict={dict} />
      <CTA dict={dict} locale={locale} />
    </>
  );
}
