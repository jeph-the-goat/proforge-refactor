import type { Metadata } from 'next';
import {
  PricingSectionHero,
  PricingSectionPlans,
  SectionLogoBanner,
  PricingSectionCompare,
  SectionFooterBanner,
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
      <SectionFooterBanner/>
    </>
  );
}

export default Pricing