import React from 'react';
import styles from '@/styles/form-elements/Label.module.scss';
import {cn} from "@lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  description?: string;
  extraClassName?: string;
}

export const Label: React.FC<LabelProps> = ({
                                              title,
                                              description,
                                              extraClassName,
                                              ...props
                                            }) => {
  return (
    <div className={cn(styles.cLabelSection, "c-label-section", extraClassName)}>
      <label className="c-label" {...props}>
        {title}
    </label>
      {description && (
        <p className="c-description">{description}</p>
      )}
    </div>
  );
}; 