import {cn} from "@lib/utils";
import {Tooltip} from "@/components/form-elements/Tooltip";
import styles from "@/styles/form-elements/Subsection.module.scss";
import {Edit2} from "lucide-react";
import {Button} from "@/components";
import React from "react";

interface SubsectionProps {
  title?: string;
  description?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  extraClassName?: string;
  children?: React.ReactNode;

  // Flags
  noHeader?: boolean;
  inline?: boolean;
  noBorder?: boolean;
  last?: boolean;
  editable?: boolean;
}

/*
 * Subsection within a step form during onboarding to help dissect and pad the sub-sections within
 * that step form.
 */
export const Subsection = ({
                             title, description, extraClassName,
                             tooltip, icon, last, children, noHeader, noBorder, inline,
                             editable
                           }: SubsectionProps) => {
  return (
    <section className={cn(styles.cSubsection, "c-subsection", last && "last",
      noBorder && "no-border", extraClassName)}>
      {!noHeader && inline ? (
        <div className="c-section-title-inline">
          {icon && icon}
          {title && <h3>{title} {children}</h3>}
          {tooltip && <Tooltip content={tooltip}/>}
          {description && <p>{description}</p>}
          {editable &&
              <Button
                  btnText="Edit"
                  icon={<Edit2/>}
                  extraClassName="c-section-edit"
              />
          }
        </div>
      ) : !noHeader && (
        <>
          <div className="c-section-title">
            {icon && icon}
            {title && <h3>{title}</h3>}
            {tooltip && <Tooltip content={tooltip}/>}
            {description && <p>{description}</p>}
            {editable &&
                <Button
                    btnText="Edit"
                    icon={<Edit2/>}
                    extraClassName="c-section-edit"
                />
            }
          </div>
          {children}
        </>
      )}
    </section>
  );
}