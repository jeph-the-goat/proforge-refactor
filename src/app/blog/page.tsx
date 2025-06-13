import type { Metadata } from 'next';
import { BlogSectionHero } from "@/components";

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
    </>
  );
}

export default Blog