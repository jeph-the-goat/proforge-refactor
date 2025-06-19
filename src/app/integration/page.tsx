import type { Metadata } from 'next';
import {IntegrationSectionGrid, IntegrationSectionHero, SectionFooterBanner} from "@/components";

export const metadata: Metadata = {
  title: 'Integration',
  description: '',
  openGraph: {
    title: 'Integration',
    description: '',
  },
};
function Integration() {
  return (
    <>
      <IntegrationSectionHero/>
      <IntegrationSectionGrid/>
      <SectionFooterBanner/>
    </>
  );
}

export default Integration