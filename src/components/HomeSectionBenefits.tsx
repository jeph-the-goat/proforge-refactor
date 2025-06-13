import React from 'react';
import {clsx} from "clsx";
import {SectionTitle} from "@/components/common";


export const HomeSectionBenefits = () => {
  return (
    <section className={clsx("c-home-section-benefits")}>

      <div className="c-container">

        <SectionTitle
          leadText="Benefits"
          headingClass="h3"
          title="Why Developers and Teams Love Us"
          paragraph="We take the headaches out of building Web3 projects, so you can focus on creating."
        />

        <div className="c-home-section-benefits-body">

          <div className="c-home-section-benefits-image">
            {/*<img src="" alt=""/>*/}

          </div>

            <div className="c-home-section-benefits-grid">



            </div>

        </div>

      </div>

    </section>
  );
};