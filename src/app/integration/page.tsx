import type { Metadata } from 'next';
import { IntegrationSectionHero } from "@/components";

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
    </>
  );
}

export default Integration