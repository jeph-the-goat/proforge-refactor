import { clsx } from "clsx";
import styles from "@/styles/onboarding/Form.module.scss"


interface StepContentSectionProps {
  children: React.ReactNode;
  extraClassName?: string;
}

export const StepContentSection = ({children, extraClassName}:StepContentSectionProps) => {
  return (
    <section className={clsx(styles.cOnboardingForm, "c-onboarding-content", extraClassName)}>
      {children}
    </section>
  );
}