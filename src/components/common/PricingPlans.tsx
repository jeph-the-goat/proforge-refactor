import styles from "@/styles/common/PricingPlans.module.scss";

import React from 'react';
import {clsx} from "clsx";
import {Pricings} from "@/utils";
import {IcnBolt, IcnCircleCheck} from "@assets/icons";
import {Button, ButtonLink} from "@/components";
import {ToggleSwitch} from "@/components/form-elements/ToggleSwitch";


export const PricingPlans = () => {
  return (
    <div className={clsx(styles.cPricingPlans, "c-pricing-plans")}>

      <div className="c-pricing-plans-header">
        <ToggleSwitch
          toggleSwitchStyle="duo"
          name="ya bitch"
          labelText="Monthly"
          labelCheckedText={
          <>
          <span>Annual</span>
            <span className="c-toggle-switch-label-badge">
              <em>save</em>
              <span>20%</span>
            </span>
          </>
        }
        />

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
                    <span>Popular!</span>
                  </span>
                )}

              </div>

              <div className="c-pricing-plans-card-header-text">

                <p className="h6">{plan.name}</p>

                <p>{plan.description}</p>

              </div>

            </div>

            <div className="c-pricing-plans-card-body">

              <p>
                <span className={clsx("h4", plan.id !== "pro" && "c-gradient-text")}>
                  {plan.price}
                </span>
                {plan.period && (
                  <sub className="h6">
                    /{plan.period}
                  </sub>
                )}
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