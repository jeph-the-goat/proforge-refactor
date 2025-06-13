import type { Metadata } from 'next';
import {AboutSectionHero} from "@/components";

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
    </>
  );
}

export default About