import type { Metadata } from 'next';
import {BlogSectionHero, SectionFooterBanner} from "@/components";

export const metadata: Metadata = {
  title: 'Blog',
  description: '',
  openGraph: {
    title: 'Blog',
    description: '',
  },
};
function Blog() {
  return (
    <>
      <BlogSectionHero/>
      <SectionFooterBanner/>
    </>
  );
}

export default Blog