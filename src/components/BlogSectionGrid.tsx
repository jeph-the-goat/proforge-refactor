"use client";

import styles from "@/styles/BlogSectionGrid.module.scss";
import { IcnSearch } from "@assets/icons";

import React, { useState } from 'react';
import { clsx } from "clsx";

import { BlogCategories, BlogPosts } from "@/utils";

import {Button, Input, InputRadioCheckbox, BlogCard, Section, Badge} from "@/components";

export const BlogSectionGrid = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Single state for search
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6); // Number of blogs to show

  const blogsPerPage = 6;

  // Sort all blogs by date first
  const sortedBlogs = BlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get the latest blog (most recent)
  const featuredBlog = sortedBlogs[0];

  // Get remaining blogs (excluding the latest one) for the grid
  const remainingBlogs = sortedBlogs.slice(1);

  const filteredBlogs = remainingBlogs
    .filter((blog) => {
      // Category filter
      const matchesCategory = selectedCategory === "all" ||
        blog.tags.some(tag => tag.value === selectedCategory);

      // Search filter (case-insensitive, searches title only)
      const matchesSearch = searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

  // Get currently visible blogs
  const currentBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMoreBlogs = visibleCount < filteredBlogs.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(blogsPerPage); // Reset visible count when searching
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setVisibleCount(blogsPerPage); // Reset visible count when changing category
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + blogsPerPage);
  };

  return (
    <Section
      extraClassName={clsx(styles.cBlogSectionGrid, "c-blog-section-grid")}
      hideSectionTitle
    >

        <div className="c-blog-section-grid-header">
          <Input
            type="search"
            name="blog_search"
            labelText="Search blog"
            labelIsHidden
            placeholder="Search blog"
            value={searchTerm}
            onChange={handleSearchChange}
            inputGroupIcon={<IcnSearch />}
          />
        </div>

        <div className="c-blog-section-grid-content">

          <div className="c-blog-section-grid-featured">

            <BlogCard
              data={featuredBlog}
              isFeatured
              headingClass={clsx("h4", "c-gradient-text")}
            >
              <Badge text="Featured"/>
            </BlogCard>

          </div>

          <div className="c-blog-section-grid-items">

            <div className="c-blog-section-grid-items-filters">

              <div className="c-button-group">
                {BlogCategories.map((category) => (
                  <InputRadioCheckbox
                    key={category.value}
                    labelText={category.label}
                    isLabelButton
                    type="radio"
                    id={category.value}
                    name="blog_category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={handleCategoryChange}
                  />
                ))}
              </div>

            </div>

            <div className="c-blog-section-grid-items-list">

              {currentBlogs.length === 0 ? (
                <div className="c-no-results">
                  <p>No blogs found matching your criteria.</p>
                </div>
              ) : (
                currentBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    data={blog}
                  />
                ))
              )}
            </div>

            {hasMoreBlogs && (
              <div className="c-button-container">
                <Button
                  btnText="Load More"
                  btnColor="dark"
                  onClick={handleLoadMore}
                />
              </div>
            )}

          </div>

        </div>

    </Section>
  );
};