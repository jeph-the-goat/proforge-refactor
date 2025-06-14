import type { Metadata } from 'next';
import {FaqSectionHero, SectionFooterBanner} from "@/components";
import FaqSectionAccordion from "@/components/FaqSectionAccordion";

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