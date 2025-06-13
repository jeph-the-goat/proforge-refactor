import type { Metadata } from 'next';
import { PrivacyPolicySectionHero } from "@/components";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: '',
  openGraph: {
    title: 'Privacy Policy',
    description: '',
  },
};
function PrivacyPolicy() {
  return (
    <>
      <PrivacyPolicySectionHero/>
    </>
  );
}

export default PrivacyPolicy