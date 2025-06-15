import {IcnDollarSign} from "@assets/icons";
import React from 'react';
import {Section} from "@/components/common";
import {clsx} from "clsx";
import {ComparePlans, ComparePlansLabels} from "@/utils";

export const PricingSectionCompare = () => {
  return (
    <Section
      extraClassName={clsx("c-pricing-section-compare")}
      addWrapper
      leadIcon={<IcnDollarSign/>}
      leadText="Compare"
      headingClass="h3"
      title="Compare Our Pricing Plans"
      paragraph="Find the plan that fits your project’s needs, whether you’re just starting or scaling fast."
    >

      <div className="c-pricing-section-compare-table">

        <table>

          <thead>
            <tr>
              <th>Features</th>
              {ComparePlans.map(plan => <th key={plan.id}>{plan.name}</th>)}
            </tr>
          </thead>

          <tbody>
            {Object.entries(ComparePlansLabels).map(([key, label]) => (
              <tr key={key}>
                <td>{label}</td>
                {ComparePlans.map(plan => <td key={plan.id}>{plan[key]}</td>)}
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </Section>
  );
};