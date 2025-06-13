import type { Metadata } from 'next';
import { TermsConditionsSectionHero } from "@/components";

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
      <TermsConditionsSectionHero/>
    </>
  );
}

export default TermsConditions