import {cn} from "@lib/utils";
import {Tooltip} from "@/components/form-elements/Tooltip";
import {Edit2} from "lucide-react";
import {Button} from "@/components";
import styles from "@/styles/form-elements/Subsection.module.scss";

interface SubsectionProps {
  title?: string;
  description?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  extraClassName?: string;
  children?: React.ReactNode;

  // Flags
  noTitle?: boolean;
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
                             tooltip, icon, last, children,
                             noTitle,
                             noBorder,
                             inline,
                             editable
                           }: SubsectionProps) => {

  const renderModule = () => {
    if (noTitle) {
      return children;
    }

    if (inline) {
      return (
        <div className="c-subsection-inline">
          {icon && icon}
          <h3 className="c-subsection-header">{title}</h3>
          {editable &&
              <Button
                  btnText="Edit"
                  icon={<Edit2/>}
                  extraClassName="c-subsection-edit"
              />
          }
          {children}
          {tooltip && <Tooltip content={tooltip}/>}
          {description && <p>{description}</p>}
        </div>
      );
    }

    return (
      <section>
        <div className="c-subsection-header">
          {icon && icon}
          <h3>{title}</h3>
          {tooltip && <Tooltip content={tooltip}/>}
          {editable &&
              <Button
                  btnText="Edit"
                  icon={<Edit2/>}
                  extraClassName="c-subsection-edit"
              />
          }
        </div>
        {description && <p>{description}</p>}
        {children}
      </section>
    )
  };

  return (
    <section className={cn(styles.cSubsection, "c-subsection", last && "last",
      noBorder && "no-border", noTitle && "no-title", extraClassName)}>
      {renderModule()}
    </section>
  );
}