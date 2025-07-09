import styles from "@/styles/common/Footer.module.scss";
import React from 'react'
import {clsx} from "clsx";

import {LegalNavItems, FooterNavItems, SocialNavItems} from "@/utils";
import {ButtonLink, Logo} from "@/components";

export const Footer = () => {
  return (
    <footer className={clsx(styles.cFooter, "c-footer")}>

      <div className="c-container">

        <div className="c-footer-logo">

          <Logo/>

          <p className="c-footer-address">
            9330 N Court Street, Elmiraland 93666
          </p>

        </div>

        <div className="c-footer-social">
          {SocialNavItems.map((socialLink, socialLinkIdx) => (
            <ButtonLink
              key={socialLinkIdx}
              extraClassName="c-footer-social-link"
              href={socialLink.url}
              btnTitle={socialLink.label}
              btnVariant="icon"
              btnColor="ghost"
              btnSize="md"
              icon={socialLink.icon}
              isExternal
            />
          ))}
        </div>

        <nav className="c-footer-nav">
          {FooterNavItems.map((footerCategory) => {
            return (
              <div
                key={footerCategory.id}
                className="c-footer-nav-category"
              >
                <p>{footerCategory.category}</p>

                <div>
                  {footerCategory.links.map((footerLink, footerLinkIdx) => (
                    <ButtonLink
                      key={footerLinkIdx}
                      href={footerLink.url}
                      btnText={footerLink.label}
                      btnVariant="link"
                      isExternal={footerLink.isExternal}
                    />
                  ))}

                </div>

              </div>
            )
          })}
        </nav>

        <div className="c-footer-foot">
          <span>©️2025 All Rights Reserved</span>

          <div className="c-footer-legal">
            {LegalNavItems.map((legalLink, legalLinkIdx) => (
              <ButtonLink
                key={legalLinkIdx}
                href={legalLink.url}
                btnText={legalLink.label}
                btnVariant="link"
                isExternal={legalLink.isExternal}
              />
            ))}
          </div>

        </div>

      </div>

    </footer>
  )
}