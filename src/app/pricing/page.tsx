import type { Metadata } from 'next';
import {PricingSectionHero, SectionFooterBanner, SectionLogoBanner} from "@/components";

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
      <SectionLogoBanner/>
      <SectionFooterBanner/>
    </>
  );
}

export default Pricing