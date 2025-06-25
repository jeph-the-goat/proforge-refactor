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

  const sortedBlogs = BlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredBlog = sortedBlogs[0];

  const remainingBlogs = sortedBlogs.slice(1);

  const filteredBlogs = remainingBlogs
    .filter((blog) => {
      const matchesCategory = selectedCategory === "all" ||
        blog.tags.some(tag => tag.value === selectedCategory);

      // Search filter (case-insensitive, searches title only)
      const matchesSearch = searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

  const currentBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMoreBlogs = visibleCount < filteredBlogs.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(blogsPerPage);
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
          isClearable={true}
          onClear={() => setSearchTerm('')}
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
                <p className="c-text-px18 c-gradient-text">
                  No blogs found matching your criteria.
                </p>
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