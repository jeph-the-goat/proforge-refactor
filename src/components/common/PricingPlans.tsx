import styles from "@/styles/common/PricingPlans.module.scss";

import React from 'react';
import {clsx} from "clsx";
import {Pricings} from "@/utils";
import {IcnBolt, IcnCircleCheck} from "@assets/icons";
import {Button, ButtonLink} from "@/components";


export const PricingPlans = () => {
  return (
    <div className={clsx(styles.cPricingPlans, "c-pricing-plans")}>

      <div className="c-pricing-plans-header">
        toggler here

      </div>

      <div className="c-pricing-plans-grid">
        {Pricings.map((plan, planIdx)=> (

          <article key={planIdx} className={clsx("c-pricing-plans-card", plan.id)}>

            <div className="c-pricing-plans-card-header">

              <div className="c-pricing-plans-card-header-icon">

                <i>{plan.icon}</i>

                {plan.mostPopular && (
                  <span>
                    <i><IcnBolt/></i>
                    <span>Most popular</span>
                  </span>
                )}

              </div>

              <div className="c-pricing-plans-card-header-text">

                <p className="h6">{plan.name}</p>

                <p>{plan.description}</p>

              </div>

            </div>

            <div className="c-pricing-plans-card-body">
              <p className="h4">
                {plan.name}
              </p>

              <ul>
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx}>

                    <i><IcnCircleCheck/></i>
                    <span> {feature}</span>

                  </li>
                ))}
              </ul>

            </div>

            <div className="c-pricing-plans-card-footer">
              {plan.id==="enterprise"?(
                <ButtonLink
                  href="/contact"
                  btnText={plan.btnText}
                  btnColor={plan.btnColor}
                />
              ):(
                <Button
                  btnText={plan.btnText}
                  btnColor={plan.btnColor}
                />
              )}

            </div>

          </article>

        ))}

      </div>

    </div>
  );
};