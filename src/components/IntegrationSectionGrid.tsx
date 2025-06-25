"use client";
import styles from "@/styles/IntegrationSectionGrid.module.scss";
import { IcnSearch } from "@assets/icons";

import React, { useState } from 'react';
import { clsx } from "clsx";

import { IntegrationCards, IntegrationCategories } from "@/utils";

import { Input, InputRadioCheckbox, InputSelect, Card, Section, IntegrationBanner } from "@/components";

export const IntegrationSectionGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-integrations');

  const filteredIntegrations = IntegrationCards.filter(integration => {
    const matchesSearch = searchTerm === '' ||
      integration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all-integrations' ||
      integration.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategorySelectChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <Section
      hideSectionTitle
      extraClassName={clsx(styles.cIntegrationSectionGrid, "c-integration-section-grid")}
    >
      <div className="c-integration-section-grid-content">

        <div className="c-integration-section-grid-content-sidebar">

          <div className="c-integration-section-grid-content-sidebar-wrapper">

            <h2 className="h6">
              Category
            </h2>

            <Input
              type="search"
              name="integration_search"
              labelText="Search"
              labelIsHidden
              placeholder="Search integration"
              inputGroupIcon={<IcnSearch />}
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="c-button-group c-desktop">
              {IntegrationCategories.map((category) => (
                <InputRadioCheckbox
                  key={category.value}
                  labelText={category.label}
                  isLabelButton
                  type="radio"
                  id={category.value}
                  name="category_filter"
                  value={category.value}
                  checked={selectedCategory === category.value}
                  onChange={handleCategoryChange}
                />
              ))}
            </div>

            <InputSelect
              extraClassName="c-mobile"
              name="category_select"
              options={IntegrationCategories}
              labelText="Category"
              labelIsHidden
              value={selectedCategory}
              onValueChange={handleCategorySelectChange}
              placeholder="Select"
            />

            <IntegrationBanner extraClassName="c-desktop" />

          </div>

        </div>

        <div className="c-integration-section-grid-content-cards">

          <div className={clsx(
            "c-integration-section-grid-content-cards-wrapper",
            filteredIntegrations.length > 0 && filteredIntegrations.length < 2 && "is-contained"
          )}
          >

            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  useIconBox
                  icon={integration.icon}
                  title={integration.title}
                  text={integration.text}
                />
              ))
            ) : (
              <div className="c-integration-no-results">
                <p className="h6">
                  No integrations found matching your search criteria.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      <IntegrationBanner extraClassName="c-mobile" />

    </Section>
  );
};