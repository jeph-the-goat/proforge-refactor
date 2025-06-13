import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/ui/SectionTitle";

export const HomeSectionTestimonial = () => {
  return (
    <section className={clsx("c-home-section-testimonial")}>

      <div className="c-container">

        <SectionTitle
          leadText="Testimonials"
          headingClass="h3"
          title="Real Success, Real People"
          paragraph="Trusted by developers and enterprises worldwide. See how we’ve helped them achieve their Web3 goals."
        />

      </div>

      <div className="c-home-section-testimonial-slider">
        slider here

      </div>

    </section>
  );
};