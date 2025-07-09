import type { Metadata } from 'next';
import {TermsSectionHero} from "@/components";
import {TermsSectionGrid} from "@/components/TermsSectionGrid";

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: '',
  openGraph: {
    title: 'Terms and conditions',
    description: '',
  },
};
function TermsConditions() {
  return (
    <>
      <TermsSectionHero/>
      <TermsSectionGrid/>
    </>
  );
}

export default TermsConditions