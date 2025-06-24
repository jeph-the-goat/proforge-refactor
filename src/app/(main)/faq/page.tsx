import type { Metadata } from 'next';
import {FaqSectionAccordion, FaqSectionHero, SectionFooterBanner} from "@/components";


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
      <FaqSectionAccordion/>
      <SectionFooterBanner/>
    </>
  );
}

export default Faq