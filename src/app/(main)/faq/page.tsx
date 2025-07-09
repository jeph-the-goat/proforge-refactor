import type { Metadata } from 'next';
import {FaqSectionAccordion, FaqSectionHero} from "@/components";


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
    </>
  );
}

export default Faq