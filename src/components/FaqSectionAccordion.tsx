import styles from "@/styles/FaqSectionAccordion.module.scss";
import React from 'react';
import {clsx} from "clsx";
import {FaqList} from "@/utils";
import {Accordion} from "@/components/common";

const FilterList = [
  {
    label: "All Questions",
    value: "all",
  },
  {
    label: "General",
    value: "general",
  },
  {
    label: "Pricing & Plans",
    value: "pricing-plans",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Integrations",
    value: "integrations",
  },
  {
    label: "Support",
    value: "support",
  },
];

const FaqSectionAccordion = () => {
  return (
    <section className={clsx(styles.cFaqSectionAccordion, "c-faq-section-accordion")}>

      <div className="c-container">

        <div className="c-faq-section-accordion-search">
          input here
        </div>

        <div className="c-faq-section-accordion-grid">

          <div className="c-faq-section-accordion-grid-filters">



          </div>

          <div className="c-faq-section-accordion-grid-content">

            <Accordion
              accordionItems={FaqList}
              name="faq"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default FaqSectionAccordion;