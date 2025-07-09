import styles from "@/styles/BlogSingleSectionRelated.module.scss";

import React from 'react';
import {clsx} from "clsx";

import {BlogPostProps, BlogPosts} from "@/utils";

import {BlogCard, Section} from "@/components";

interface BlogSingleSectionRelatedProps {
  currentPost: BlogPostProps;
}

export const BlogSingleSectionRelated = ({currentPost}:BlogSingleSectionRelatedProps) => {
  function getRelatedPosts(currentPost: BlogPostProps, limit: number = 3): BlogPostProps[] {
    if (!currentPost.tags || currentPost.tags.length === 0) {
      // If no tags, return most recent posts (excluding current post)
      return BlogPosts
        .filter(post => post.id !== currentPost.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }

    // Get current post's tag labels
    const currentTags = currentPost.tags.map(tag => tag.label.toLowerCase());

    // Score posts by number of matching tags
    const scoredPosts = BlogPosts
      .filter(post => post.id !== currentPost.id)
      .map(post => {
        if (!post.tags || post.tags.length === 0) {
          return { post, score: 0 };
        }

        const postTags = post.tags.map(tag => tag.label.toLowerCase());
        const matchingTags = postTags.filter(tag => currentTags.includes(tag));

        return { post, score: matchingTags.length };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
      });

    let relatedPosts = scoredPosts.map(item => item.post);

    // Fill remaining slots with recent posts if needed
    if (relatedPosts.length < limit) {
      const additionalPosts = BlogPosts
        .filter(post =>
          post.id !== currentPost.id &&
          !relatedPosts.some(relatedPost => relatedPost.id === post.id)
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit - relatedPosts.length);

      relatedPosts = [...relatedPosts, ...additionalPosts];
    }

    return relatedPosts.slice(0, limit);
  }

  const relatedPosts = getRelatedPosts(currentPost, 3);

  if (relatedPosts.length === 0) {
    return null; // Don't render the section if no related posts
  }


  return (
    <Section
      extraClassName={clsx(styles.cBlogSingleSectionRelated, "c-blog-single-section-related")}
      hideSectionTitle
    >

      <div className="c-blog-single-section-related-header">
        <h2 className="h3 c-gradient-text">Read More</h2>
      </div>

      <div className="c-blog-single-section-related-grid">
        {relatedPosts.map(post => (
          <BlogCard
            key={post.id}
            data={post}
            imageWidth={366}
            imageHeight={222}
            hideReadMore
          />
        ))}
      </div>

    </Section>
  );
};
