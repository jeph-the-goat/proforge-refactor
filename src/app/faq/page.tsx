import type { Metadata } from 'next';
import { FaqSectionHero } from "@/components";

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
    </>
  );
}

export default Faq