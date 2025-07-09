"use client";
import styles from "@/styles/FaqSectionAccordion.module.scss";
import { IcnCircleHelp, IcnFilter, IcnSearch } from "@assets/icons";

import React, { useState, useMemo } from 'react';
import { clsx } from "clsx";

import { FaqFilters, FaqList } from "@/utils";
import { useMediaQuerySafe } from "@/hooks";

import { Accordion, Section, Input, InputRadioCheckbox, Banner, ButtonLink, InputSelect } from "@/components";

export const FaqSectionAccordion = () => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAndSearchedFaqs = useMemo(() => {
    let filtered = FaqList;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.categories.includes(selectedCategory));
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.title.toLowerCase().includes(searchLower) ||
        (typeof faq.content === 'string' && faq.content.toLowerCase().includes(searchLower)) ||
        faq.categories.some(category => category.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.id);
  };

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <Section
      extraClassName={clsx(styles.cFaqSectionAccordion, "c-faq-section-accordion")}
      hideSectionTitle
    >
      <div className="c-faq-section-accordion-header">
        <Input
          type="search"
          name="integration_search"
          labelText="Search"
          labelIsHidden
          placeholder="Search FAQs"
          inputGroupIcon={<IcnSearch />}
          value={searchTerm}
          isClearable={true}
          onClear={() => setSearchTerm('')}
          onChange={handleSearchChange}
        />
        {isMobile && (
          <InputSelect
            extraClassName="c-mobile"
            name="faq_select"
            options={FaqFilters}
            labelText="Filter"
            labelIsHidden
            inputGroupIcon={<IcnFilter/>}
            placeholder="Filter..."
            value={selectedCategory}
            onValueChange={handleSelectChange}
          />
        )}
      </div>

      <div className="c-faq-section-accordion-grid">
        {!isMobile && (
          <div className="c-faq-section-accordion-grid-filters c-desktop">
            <div className="c-button-group">
              {FaqFilters.map((filter) => (
                <InputRadioCheckbox
                  key={filter.value}
                  labelText={filter.label}
                  isLabelButton
                  type="radio"
                  id={filter.value}
                  name="faq_filter"
                  checked={selectedCategory === filter.value}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        )}

        <div className="c-faq-section-accordion-grid-content">
          {filteredAndSearchedFaqs.length > 0 ? (
            <Accordion accordionItems={filteredAndSearchedFaqs} name="faq" />
          ) : (
            <div className="c-no-results">
              <p className="c-text-px18 c-gradient-text">
                No FAQs found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Banner
        icon={<IcnCircleHelp/>}
        title="Still have questions?"
        paragraph="Contact us or check out our full documentation"
      >
        <div className="c-button-container">
          <ButtonLink href="/contact" btnText="Contact Us"/>
          <ButtonLink href="#" btnText="Documentation" btnColor="dark"/>
        </div>
      </Banner>
    </Section>
  );
};