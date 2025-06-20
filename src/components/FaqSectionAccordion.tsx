import styles from "@/styles/FaqSectionAccordion.module.scss";
import {IcnCircleHelp, IcnSearch} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {FaqFilters, FaqList} from "@/utils";

import {Accordion, Section, Input, InputRadioCheckbox, Banner, ButtonLink, InputSelect} from "@/components";


export const FaqSectionAccordion = () => {
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
          placeholder="Search integration"
          inputGroupIcon={<IcnSearch />}
        />

        <InputSelect
          extraClassName="c-mobile"
          name="faq_select"
          options={FaqFilters}
          labelText="Filter"
          labelIsHidden
          placeholder="Select"
        />
      </div>

      <div className="c-faq-section-accordion-grid">

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
              />
            ))}

          </div>

        </div>

        <div className="c-faq-section-accordion-grid-content">
          <Accordion
            accordionItems={FaqList}
            name="faq"
          />
        </div>

      </div>

      <Banner
        icon={<IcnCircleHelp/>}
        title="Still have questions?"
        paragraph="Contact us or check out our full documentation"
      >
        <div className="c-button-container">
          <ButtonLink href="/contact" btnText="Contact Us"/>
          <ButtonLink href="/" btnText="Documentation" btnColor="dark"/>
        </div>
      </Banner>

    </Section>
  );
};