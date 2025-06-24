import type { Metadata } from 'next';
import {TermsSectionHero} from "@/components";

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
    </>
  );
}

export default TermsConditions