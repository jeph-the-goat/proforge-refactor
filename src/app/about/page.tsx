import type { Metadata } from 'next';
import {AboutSectionHero, SectionFooterBanner, SectionLogoBanner, SectionTestimonial} from "@/components";

export const metadata: Metadata = {
  title: 'About Us',
  description: '',
  openGraph: {
    title: 'About Us',
    description: '',
  },
};
function About() {
  return (
    <>
      <AboutSectionHero/>
      <SectionLogoBanner/>
      <SectionTestimonial/>
      <SectionFooterBanner/>
    </>
  );
}

export default About