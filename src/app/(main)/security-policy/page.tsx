import type { Metadata } from 'next';
import {SecuritySectionGrid, SecuritySectionHero} from "@/components";

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: '',
  openGraph: {
    title: 'Terms and conditions',
    description: '',
  },
};
function SecurityPolicy() {
  return (
    <>
      <SecuritySectionHero/>
      <SecuritySectionGrid/>
    </>
  );
}

export default SecurityPolicy