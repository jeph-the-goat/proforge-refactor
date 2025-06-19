'use client';
import styles from "@/styles/PricingSectionCompare.module.scss";
import {IcnCircleHelp, IcnCircleMinus, IcnFilter} from "@assets/icons";
import IcnProDark from "@assets/images/icn-pricing-pro-dark.svg";

import React from 'react';
import { clsx } from "clsx";

import { Plans, ComparePlansLabels } from "@/utils";
import {Banner, Button, ButtonLink, Section} from "@/components";
import {useMediaQuerySafe} from "@/hooks";


export const PricingSectionCompare = () => {
  const isPhablet = useMediaQuerySafe('(max-width: 767px)');

  return (
    <Section
      extraClassName={clsx(styles.cPricingSectionCompare, "c-pricing-section-compare")}
      addWrapper
      leadIcon={<IcnFilter/>}
      leadText="Compare"
      headingClass="h3"
      title="Compare Our Pricing Plans"
      paragraph="Find the plan that fits your project's needs, whether you're just starting or scaling fast."
    >

      <div className="c-pricing-section-compare-content">
        {isPhablet? (
          <div className="c-pricing-section-compare-grid c-phablet-up">
            {Plans.map(plan => (
              <article
                key={plan.id}
                className={clsx("c-pricing-section-compare-card", `${plan.id}`)}
              >

                <header className="c-pricing-section-compare-card-header">
                  <i className="c-pricing-section-compare-card-icon">
                    {plan.id === "pro" ? (
                      <IcnProDark/>
                    ) : (
                      plan.icon
                    )}
                  </i>

                  <div className="c-pricing-section-compare-card-info">
                    <p>{plan.name}</p>
                    <p className="h4">
                      {plan.id === 'pro' ? '$99/month' : plan.price}
                    </p>
                  </div>

                  <div className="c-pricing-section-compare-card-cta">
                    {plan.id === "enterprise" ? (
                      <ButtonLink
                        href="/contact"
                        btnText={plan.btnText}
                        btnColor="dark"
                        btnSize="md"
                      />
                    ) : (
                      <Button
                        btnText={plan.btnText}
                        btnColor={plan.id === "starter" ? "dark" : undefined}
                        btnSize="md"
                      />
                    )}
                  </div>
                </header>

                <div className="c-pricing-section-compare-card-body">

                  <dl className="c-pricing-section-compare-card-features">

                    {Object.entries(ComparePlansLabels).map(([key, label]) => (

                      <div key={key} className="c-pricing-section-compare-card-feature">

                        <dt className="c-pricing-section-compare-card-feature-label">
                          {label}
                        </dt>

                        <dd className="c-pricing-section-compare-card-feature-value">
                          {plan[key] === 'Not Included' ? (
                            <span className="feature-not-included">
                              <i className="icon-cross">✕</i>
                              Not Included
                            </span>
                          ) : (
                            <span className="feature-included">
                              {plan[key]}
                            </span>
                          )}
                        </dd>
                      </div>

                    ))}

                  </dl>

                </div>

              </article>
            ))}
          </div>
        ):(
          <table className="c-table c-phablet-down">

            <thead>

              <tr>
                <th>
                  <div className="c-table-cell">
                    Features
                  </div>
                </th>

                {Plans.map(plan => (

                  <th key={plan.id} className={`c-table-th-${plan.id}`}>

                    <div className="c-table-cell">

                      <i className="c-table-cell-icon">
                        {plan.id=== "pro"? (
                          <IcnProDark/>
                        ):(
                          plan.icon
                        )}
                      </i>

                      <div className="c-table-cell-text">

                        <p>
                          {plan.name}
                        </p>

                        <p className="h6">
                          {plan.id === 'pro' ? '$99/month' : plan.price}
                        </p>

                      </div>

                      <div className="plan-cta">
                        {plan.id === "enterprise" ? (
                          <ButtonLink
                            href="/contact"
                            btnText={plan.btnText}
                            btnColor="dark"
                            btnSize="md"
                          />
                        ) : (
                          <Button
                            btnText={plan.btnText}
                            btnColor={plan.id === "starter"? "dark": undefined}
                            btnSize="md"
                          />
                        )}
                      </div>

                    </div>

                  </th>

                ))}
              </tr>
            </thead>

            <tbody>
              {Object.entries(ComparePlansLabels).map(([key, label]) => (
                <tr key={key}>

                  <td>
                    <div className="c-table-cell">
                      {label}
                    </div>
                  </td>

                  {Plans.map(plan => (
                    <td key={plan.id}>
                      <div className="c-table-cell">
                        {plan[key] === 'Not Included' ? (
                          <span className="c-table-cell-feature-not-included">
                            <i><IcnCircleMinus/></i>
                            Not Included
                          </span>
                        ) : (
                          <span className="feature-included">
                            {plan[key]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

      <Banner
        bgColor="var(--neutral-800)"
        icon={<IcnCircleHelp/>}
        title="Not sure which plan is right for you?"
        paragraph="Contact our team to learn more."
      >
        <ButtonLink
          href="/contact"
          btnText="Contact Us"
        />

      </Banner>

    </Section>
  );
};