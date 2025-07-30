import styles from "@/styles/onboarding/ProForgeOnboarding.module.scss"
import {cn} from "@lib/utils";


interface StepContentSectionProps {
  children: React.ReactNode;
  extraClassName?: string;
}

export const StepContentSection = ({children, extraClassName}:StepContentSectionProps) => {
  return (
    <section className={cn(styles.cProForgeOnboarding, "c-onboarding-content", extraClassName)}>
      {children}
    </section>
  );
}