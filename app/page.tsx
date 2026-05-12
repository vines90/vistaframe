import { Hero } from "./sections/Hero";
import { ZeroError } from "./sections/ZeroError";
import { CompanyShowcase } from "./sections/CompanyShowcase";
import { Products } from "./sections/Products";
import { Projects } from "./sections/Projects";
import { Process } from "./sections/Process";
import { OneStopCustom } from "./sections/OneStopCustom";
import { WhyJoinStats } from "./sections/WhyJoinStats";
import { HonorsWall } from "./sections/HonorsWall";
import { CTA } from "./sections/CTA";

/** Homepage IA aligned with DERCHY-style exporter flow (reference: derchi exporter pattern). Brand: VistaFrame. */
export default function Home() {
  return (
    <>
      <Hero />
      <ZeroError />
      <CompanyShowcase />
      <Products />
      <Projects />
      <Process />
      <OneStopCustom />
      <WhyJoinStats />
      <HonorsWall />
      <CTA />
    </>
  );
}
