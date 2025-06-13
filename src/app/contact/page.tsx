import type { Metadata } from 'next';
import { ContactSectionHero } from "@/components";

export const metadata: Metadata = {
  title: 'Contact Us',
  description: '',
  openGraph: {
    title: 'Contact Us',
    description: '',
  },
};
function Contact() {
  return (
    <>
      <ContactSectionHero/>
    </>
  );
}

export default Contact