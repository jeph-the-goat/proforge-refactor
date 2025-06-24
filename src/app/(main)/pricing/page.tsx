import type { Metadata } from 'next';
import {
  PricingSectionCompare,
  PricingSectionHero,
  PricingSectionPlans,
  SectionFooterBanner,
  SectionLogoBanner
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