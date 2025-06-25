import type { Metadata } from 'next';
import {
  PricingSectionHero,
  PricingSectionPlans,
  SectionLogoBanner,
  PricingSectionCompare,
} from "@/components";


export const metadata: Metadata = {
  title: 'Pricing',
  description: '',
  openGraph: {
    title: 'Pricing',
    description: '',
  },
};
function Pricing() {
  return (
    <>
      <PricingSectionHero/>
      <PricingSectionPlans/>
      <SectionLogoBanner/>
      <PricingSectionCompare/>
    </>
  );
}

export default Pricing