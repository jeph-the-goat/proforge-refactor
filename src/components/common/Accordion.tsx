'use client'

import styles from '@/styles/common/Accordion.module.scss';

import React, {ReactNode, useRef, useState} from 'react';
import clsx from 'clsx';

import { Button } from '@/components/common';
import {useOnClickOutside} from "usehooks-ts";
interface AccordionItemProps {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  accordionItems: AccordionItemProps[];
  name: string;
}

export const Accordion = ({ accordionItems, name }: AccordionProps) => {
  const AccordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggleOpen = (index: number) => {
    setOpenIndex(openIndex === `${name}-${index}` ? null : `${name}-${index}`);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  useOnClickOutside(AccordionRef as React.RefObject<HTMLElement>, handleClose);

  return (
    <div
      className={clsx(styles.cAccordion, "c-accordion")}
      ref={AccordionRef}
    >

      {accordionItems.map((accordion, accordionIdx) => (

        <div
          className={clsx("c-accordion-item", openIndex === `${name}-${accordionIdx}` && 'is-open')}
          key={`${name}-${accordionIdx}`}
        >

          <Button
            extraClassName={clsx("c-accordion-item-toggle", openIndex === `${name}-${accordionIdx}` && 'is-open')}
            btnText={accordion.title}
            btnVariant="link"
            icon={<span/>}
            aria-expanded={openIndex === `${name}-${accordionIdx}`}
            onClick={() => handleToggleOpen(accordionIdx)}
          />

          <div className={clsx("c-accordion-item-content", openIndex === `${name}-${accordionIdx}` && 'is-open')}>

            <div className='c-accordion-item-content-wrapper'>

              <div className="c-accordion-item-content-inner">
                {accordion.content}
              </div>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
};
