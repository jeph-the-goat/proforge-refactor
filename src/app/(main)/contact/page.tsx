import type { Metadata } from 'next';
import {ContactSectionHero, ContactSectionOffice} from "@/components";

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
      <ContactSectionOffice/>
    </>
  );
}

export default Contact