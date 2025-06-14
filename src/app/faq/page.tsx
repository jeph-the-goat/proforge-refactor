import type { Metadata } from 'next';
import {FaqSectionHero, SectionFooterBanner} from "@/components";

export const metadata: Metadata = {
  title: 'Faq',
  description: '',
  openGraph: {
    title: 'Faq',
    description: '',
  },
};
function Faq() {
  return (
    <>
      <FaqSectionHero/>
      <SectionFooterBanner/>
    </>
  );
}

export default Faq