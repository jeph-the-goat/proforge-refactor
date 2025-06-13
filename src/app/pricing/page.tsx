import type { Metadata } from 'next';
import { PricingSectionHero } from "@/components";

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
    </>
  );
}

export default Pricing