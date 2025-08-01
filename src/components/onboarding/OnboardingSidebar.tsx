import {Button, Section, Separator} from "@/components";
import {CheckCircle} from "lucide-react";
import {clsx} from "clsx";

import { loadSavedProgress, clearSavedProgress } from "@hooks/onboarding/useSavedProgress";
import styles from "@/styles/onboarding/Navbar.module.scss";
import { SubscriptionData } from "./proforge-onboarding";

interface OnboardingSidebarProps {
  navElementHeaders: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isSubmitting: boolean;
  data: SubscriptionData;
  extraClassName?: string;
}

export const OnboardingSidebar =
  ({navElementHeaders, currentStep, setCurrentStep, isSubmitting, data, extraClassName}: OnboardingSidebarProps) => {

    return (
      <section className={clsx(styles.cOnboardingSidebar, "c-onboarding-sidebar", extraClassName)}>
        <Section
          extraClassName={clsx("c-onboarding-sidebar-header", extraClassName)}
          title="Setup Progress"
          paragraph="Complete your ProForge setup"
        >
          {/* Show saved progress indicator */}
          {loadSavedProgress(data) && (
            <Button
              extraClassName="c-onboarding-clear-progress-btn"
              onClick={clearSavedProgress}
            >
              Clear saved progress
            </Button>
          )}
        </Section>
        <Separator text={''}/>
        <nav className="c-onboarding-sidebar-nav">
          {navElementHeaders.map((step, index) => (
            <div
              key={step}
              className={clsx(
                "c-onboarding-sidebar-step",
                {
                  "is-current": currentStep === index + 1,
                  "is-completed": index + 1 < currentStep,
                  "is-disabled": isSubmitting
                }
              )}
              onClick={() => !isSubmitting && setCurrentStep(index + 1)}
            >
              <div className="c-onboarding-sidebar-step-indicator">
                {index + 1 < currentStep ?
                  <CheckCircle className="c-onboarding-sidebar-step-icon"/> : index + 1}
              </div>
              <span className="c-onboarding-sidebar-step-text">{step}</span>
            </div>
          ))}
        </nav>
      </section>
    )
  }