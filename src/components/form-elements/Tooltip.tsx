import {useState} from "react";
import styles from "@/styles/form-elements/Tooltip.module.scss"
import { clsx } from "clsx";
import {InfoIcon} from "lucide-react";

interface TooltipProps {
  content: string;
  extraClassName?: string;
}

/*
 * Encompasses a section title with the tooltip icon beside it for sections that have more
 * business logic than what they lead on.
 */
export const Tooltip = ({content, extraClassName}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={clsx(styles.cTooltip, "c-tooltip", extraClassName)}
    >
      {isVisible && (
        <div className="c-tooltip-content">
          {content}
        </div>
      )}
      <InfoIcon size={22} />
    </div>
  );
};