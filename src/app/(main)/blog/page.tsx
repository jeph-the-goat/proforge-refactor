import type { Metadata } from 'next';
import {BlogSectionBanner, BlogSectionGrid, BlogSectionHero, SectionFooterBanner} from "@/components";

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
      <BlogSectionBanner/>
      <SectionFooterBanner/>
    </>
  );
}

export default Blog