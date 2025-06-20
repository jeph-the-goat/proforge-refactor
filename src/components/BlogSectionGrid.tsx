"use client";

import styles from "@/styles/BlogSectionGrid.module.scss";
import { IcnSearch } from "@assets/icons";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

import { BlogCategories, BlogPosts } from "@/utils";

import { Button } from "@/components/common";
import { Input, InputRadioCheckbox } from "@/components/form-elements";

export const BlogSectionGrid = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Single state for search
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const filteredBlogs = BlogPosts
    .filter((blog) => {
      // Category filter
      const matchesCategory = selectedCategory === "all" ||
        blog.tags.some(tag => tag.value === selectedCategory);

      // Search filter (case-insensitive, searches title only)
      const matchesSearch = searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className={clsx(styles.cBlogSectionGrid, "c-blog-section-grid")}>

      <div className="c-container">

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

          <div className="c-button-container">
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

        <div className="c-blog-section-grid-content">

          <div className="c-blog-section-grid-cards">

            {currentBlogs.length === 0 ? (
              <div className="c-no-results">
                <p>No blogs found matching your criteria.</p>
              </div>
            ) : (
              currentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  className="c-blog-section-grid-card"
                  href={`/blog/${blog.id}`}
                  title={`Read more about: ${blog.title}`}
                  aria-label={`Read more about: ${blog.title}`}
                >
                  <span className="c-blog-section-grid-card-image">

                    <Image
                      src="/images/blog-placeholder-image-x1.webp"
                      alt={blog.title}
                      width={366}
                      height={222}
                    />

                  </span>

                  <span className="c-blog-section-grid-card-body">

                    <p className="h6">
                      {blog.title}
                    </p>

                    <small>
                      {blog.date}
                    </small>

                  </span>

                </Link>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="c-blog-section-grid-pagination">
              <Button
                extraClassName="c-pagination-button previous"
                btnText="Previous"
                btnColor="dark"
                btnSize="md"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  extraClassName={clsx("c-pagination-button index", currentPage === page && "is-active" )}
                  btnColor="dark"
                  btnVariant="icon"
                  btnSize="md"
                  btnText={page.toString()}
                  onClick={() => handlePageChange(page)}
                />
              ))}

              <Button
                extraClassName="c-pagination-button next"
                btnText="Next"
                btnColor="dark"
                btnSize="md"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              />
            </div>
          )}

        </div>

      </div>

    </section>
  );
};