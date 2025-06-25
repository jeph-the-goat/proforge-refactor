import type { Metadata } from 'next';
import {PrivacySectionGrid, PrivacySectionHero} from "@/components";

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
      <PrivacySectionHero/>
      <PrivacySectionGrid/>
    </>
  );
}

export default PrivacyPolicy