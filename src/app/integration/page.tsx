import type { Metadata } from 'next';
import {IntegrationSectionHero, SectionFooterBanner} from "@/components";

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
      <SectionFooterBanner/>
    </>
  );
}

export default Integration