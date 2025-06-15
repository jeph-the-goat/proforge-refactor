import type { Metadata } from 'next';
import {BlogSectionGrid, BlogSectionHero, SectionFooterBanner} from "@/components";

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
      <BlogSectionGrid/>
      <SectionFooterBanner/>
    </>
  );
}

export default Blog