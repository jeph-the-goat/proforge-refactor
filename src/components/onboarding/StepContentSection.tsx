import styles from "@/styles/onboarding/ProForgeOnboarding.module.scss"
import { clsx } from "clsx";


interface StepContentSectionProps {
  children: React.ReactNode;
  extraClassName?: string;
}

export const StepContentSection = ({children, extraClassName}:StepContentSectionProps) => {
  return (
    <section className={clsx(styles.cProForgeOnboarding, "c-onboarding-content", extraClassName)}>
      {children}
    </section>
  );
}