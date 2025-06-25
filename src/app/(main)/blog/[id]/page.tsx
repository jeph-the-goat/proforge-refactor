import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostProps, BlogPosts } from "@/utils";
import {BlogSingleSectionRelated, BlogSingleSectionContent, SectionFooterBanner} from "@/components";

interface BlogPostPageProps {
  params: Promise<{ id: string; }>;
}

function getBlogPost(id: string): BlogPostProps | undefined {
  return BlogPosts.find((post: BlogPostProps) => post.id === id);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags?.map(tag => tag.label),
    },
  };
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return BlogPosts.map((post: BlogPostProps) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogSingleSectionContent post={post} />
      <BlogSingleSectionRelated currentPost={post}/>
    </>
  );
}