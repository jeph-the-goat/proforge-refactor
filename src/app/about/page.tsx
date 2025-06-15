import type { Metadata } from 'next';
import {
  AboutSectionHero,
  SectionLogoBanner,
  AboutSectionMission,
  AboutSectionValues,
  AboutSectionTeam,
  SectionTestimonial,
  SectionFooterBanner,
} from "@/components";

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
      <AboutSectionMission/>
      <AboutSectionValues/>
      <AboutSectionTeam/>
      <SectionTestimonial/>
      <SectionFooterBanner/>
    </>
  );
}

export default About