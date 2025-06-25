import type { Metadata } from 'next';
import {IntegrationSectionGrid, IntegrationSectionHero} from "@/components";

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
    </>
  );
}

export default Integration