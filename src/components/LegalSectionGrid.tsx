"use client";
import styles from "@/styles/LegalsSectionGrid.module.scss";

import React from 'react';
import {clsx} from "clsx";
import Link from "next/link";

import {cLegalSectionGridProps} from "@/types";
import {useMediaQuerySafe, useScrollSectionTracker} from "@/hooks";
import {Dropdown} from "@/components/common";

interface LegalSectionGridProps {
  data: cLegalSectionGridProps[];
}
export const LegalSectionGrid = ({data}:LegalSectionGridProps) => {
  const isMobile = useMediaQuerySafe('(max-width: 991px)');

  const allSectionIds = data.reduce<string[]>((acc, section) => {
    acc.push(section.id);
    if (section.subItems && section.subItems.length > 0) {
      section.subItems.forEach(subItem => {
        acc.push(subItem.id);
      });
    }
    return acc;
  }, []);

  const activeSection = useScrollSectionTracker(allSectionIds);

  const isMainSectionActive = (sectionId: string, subItems?: cLegalSectionGridProps['subItems']) => {
    if (!subItems || subItems.length === 0) {
      return activeSection === sectionId;
    }
    return activeSection === sectionId;
  };

  const renderAnchors = () => (
    <>
      {data.map((anchor, anchorIdx) => (
        <li key={anchorIdx}>
          <Link
            href={`#${anchor.id}`}
            className={clsx(isMainSectionActive(anchor.id, anchor.subItems) && "active")}
            title={`See ${anchor.title}`}
            aria-label={`See ${anchor.title}`}
          >
            {anchor.title}
          </Link>

          {anchor.subItems && anchor.subItems.length > 0 && (
            <ul className="c-legal-section-grid-sidebar-anchors-subitems">
              {anchor.subItems.map((subAnchor, subAnchorIdx) => (
                <li key={subAnchorIdx}>
                  <Link
                    href={`#${subAnchor.id}`}
                    className={clsx(activeSection === subAnchor.id && 'active')}
                    title={`See ${anchor.title}`}
                    aria-label={`See ${anchor.title}`}
                  >
                    {subAnchor.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );

  return (
    <section className={clsx(styles.cLegalSectionGrid, "c-legal-section-grid")}>

      <div className="c-container">

        <aside className="c-legal-section-grid-sidebar">

          <div className="c-legal-section-grid-sidebar-wrapper">
            {isMobile? (
              <Dropdown
                extraClassName="c-mobile"
                btnText="Table of Contents"
              >
                <ul className="c-legal-section-grid-sidebar-anchors">
                  {renderAnchors()}
                </ul>

              </Dropdown>
            ):(
              <ul className="c-legal-section-grid-sidebar-anchors c-desktop">
                {renderAnchors()}
              </ul>
            )}

          </div>

        </aside>

        <div className="c-legal-section-grid-content">

          {data.map((section, sectionIdx)=> (

            <section key={sectionIdx} id={section.id} className="c-legal-section-grid-item">

              <div className="c-legal-section-grid-item-title">

                <h2 className="h6">
                  {sectionIdx+1}. {section.title}
                </h2>

                <div className="c-legal-section-grid-item-content">
                  {section.content}
                </div>

              </div>

              {section.subItems && (
                <>
                  {section.subItems.map((subSection, subSectionIdx) => (
                    <section
                      key={subSectionIdx}
                      id={subSection.id}
                      className="c-legal-section-grid-item sub-item"
                    >
                      <h3 className="c-text-px18">
                        {sectionIdx+1}.{subSectionIdx+1}. {subSection.title}
                      </h3>

                      <div className="c-legal-section-grid-item-content">
                        {subSection.content}
                      </div>

                    </section>
                  ))}
                </>
              )}
            </section>

          ))}

        </div>

      </div>

    </section>
  );
};
