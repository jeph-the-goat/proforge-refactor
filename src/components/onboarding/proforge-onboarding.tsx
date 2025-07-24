// src/components/onboarding/ProForgeOnboarding.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, Rocket } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Separator } from '@/components/common/Separator';
import type { OnboardingData } from '@/lib/schemas/onboarding';
import { WelcomeStep } from '@/components/onboarding/steps/welcome-step';
import { BusinessStructureStep } from '@/components/onboarding/steps/business-structure-step';
import { ChartOfAccountsStep } from '@/components/onboarding/steps/chart-of-accounts-step';
import { ModuleSelectionStep } from '@/components/onboarding/steps/module-selection-step';
import { UserSetupStep } from '@/components/onboarding/steps/user-setup-step';
import { ReviewStep } from '@/components/onboarding/steps/review-step';
import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import styles from '@/styles/onboarding/ProForgeOnboarding.module.scss';

type SubscriptionData = {
  subscriptionId: string;
  customerId: string;
  status: string;
  currentPeriodEnd: number;
  userCount: number;
  isAnnual: boolean;
  addOns: string[];
  customerEmail: string | null;
};

// Local storage key
const ONBOARDING_STORAGE_KEY = 'proforge-onboarding-progress';

// Initial state values
const INITIAL_ONBOARDING_DATA: OnboardingData = {
  businessInfo: {
    companyName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    industry: '',
    employeeCount: '1-10',
    website: '',
    contactEmail: '',
    contactPhone: '',
  },
  businessStructure: {
    businessType: 'LLC',
    llcDetails: {
      memberType: 'Single',
      managementType: 'Member',
    },
    taxId: '',
    fiscalYearStart: '',
    fiscalYearEnd: '',
  },
  chartOfAccounts: {
    accountingMethod: 'Accrual',
    defaultCurrency: 'USD',
    segmentation: {
      departments: false,
      costCenters: false,
      projects: false,
    },
    ownershipStructure: {
      equityAccounts: [],
    },
  },
  moduleSelection: {
    inventory: false,
    manufacturing: false,
    hrPayroll: false,
    crm: false,
    projectManagement: false,
    assetManagement: false,
    qualityManagement: false,
    ecommerce: false,
    pointOfSale: false,
    aiFleet: false,
    serviceScheduling: false,
    aiAnalytics: false,
  },
  userSetup: {
    adminUser: {
      name: '',
      email: '',
    },
    additionalUsers: [],
    departments: [],
    permissions: {},
  },
  termsAccepted: false,
};

export default function ProForgeOnboarding({ 
  sessionId, 
  subscriptionData 
}: { 
  sessionId: string;
  subscriptionData: SubscriptionData;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Load saved progress from localStorage
  const loadSavedProgress = () => {
    try {
      const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        // Merge with subscription data to ensure latest info
        return {
          ...parsedData,
          businessInfo: {
            ...parsedData.businessInfo,
            contactEmail: subscriptionData.customerEmail || parsedData.businessInfo.contactEmail,
          },
          moduleSelection: {
            ...parsedData.moduleSelection,
            // Update modules based on current subscription
            aiFleet: subscriptionData.addOns.includes('ai-fleet'),
            serviceScheduling: subscriptionData.addOns.includes('service-scheduling'),
            aiAnalytics: subscriptionData.addOns.includes('ai-analytics'),
          },
        };
      }
    } catch (error) {
      console.error('Failed to load saved progress:', error);
    }
    return null;
  };

  const [onboardingData, setOnboardingData] = useState<OnboardingData>(() => {
    const savedData = loadSavedProgress();
    if (savedData) {
      return savedData;
    }
    
    return {
      ...INITIAL_ONBOARDING_DATA,
      businessInfo: {
        ...INITIAL_ONBOARDING_DATA.businessInfo,
        contactEmail: subscriptionData.customerEmail || '',
      },
      moduleSelection: {
        ...INITIAL_ONBOARDING_DATA.moduleSelection,
        // Enable modules based on selected add-ons
        inventory: subscriptionData.addOns.includes('inventory'),
        manufacturing: subscriptionData.addOns.includes('manufacturing'),
        hrPayroll: subscriptionData.addOns.includes('hr-payroll'),
        crm: subscriptionData.addOns.includes('crm'),
        projectManagement: subscriptionData.addOns.includes('project-management'),
        assetManagement: subscriptionData.addOns.includes('asset-management'),
        qualityManagement: subscriptionData.addOns.includes('quality-management'),
        ecommerce: subscriptionData.addOns.includes('ecommerce'),
        pointOfSale: subscriptionData.addOns.includes('point-of-sale'),
        aiFleet: subscriptionData.addOns.includes('ai-fleet'),
        serviceScheduling: subscriptionData.addOns.includes('service-scheduling'),
        aiAnalytics: subscriptionData.addOns.includes('ai-analytics'),
      },
      userSetup: {
        ...INITIAL_ONBOARDING_DATA.userSetup,
        adminUser: {
          ...INITIAL_ONBOARDING_DATA.userSetup.adminUser,
          email: subscriptionData.customerEmail || '',
        },
      },
    };
  });

  const totalSteps = 6;

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(onboardingData));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [onboardingData]);

  const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSubmitMessage('Saving your configuration...');

    try {
      // Step 1: Save onboarding data to Stripe
      setSubmitMessage('Updating your account information...');
      const onboardingResponse = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          onboardingData,
        }),
      });

      if (!onboardingResponse.ok) {
        const errorData = await onboardingResponse.json();
        throw new Error(errorData.error || 'Failed to save onboarding information');
      }

      // Step 2: Start ERP provisioning
      setSubmitMessage('Starting your ERP system setup...');
      const provisionResponse = await fetch('/api/provision/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          onboardingData,
        }),
      });

      if (!provisionResponse.ok) {
        const errorData = await provisionResponse.json();
        throw new Error(errorData.error || 'Failed to start ERP provisioning');
      }

      const provisionResult = await provisionResponse.json();

      // Clear saved progress since we're done
      localStorage.removeItem(ONBOARDING_STORAGE_KEY);

      // Redirect to status page
      if (provisionResult.redirectUrl) {
        router.push(provisionResult.redirectUrl);
      } else if (provisionResult.instanceId) {
        router.push(`/setup/status/${provisionResult.instanceId}`);
      } else {
        // Fallback to dashboard if no redirect info
        router.push('/dashboard');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Setup failed';
      setError(errorMessage);
      setSubmitMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSavedProgress = () => {
    if (confirm('Are you sure you want to clear your saved progress?')) {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <div className={cn(styles.cProForgeOnboarding, "c-proforge-onboarding")}>
      <div className="c-onboarding-container">
        {/* Sidebar */}
        <div className="c-onboarding-sidebar">
          <div className="c-onboarding-sidebar-header">
            <h2 className="c-onboarding-sidebar-title">Setup Progress</h2>
            <p className="c-onboarding-sidebar-subtitle">Complete your ProForge setup</p>
            {/* Show saved progress indicator */}
            {loadSavedProgress() && (
              <Button
                extraClassName="c-onboarding-clear-progress-btn"
                onClick={clearSavedProgress}
              >
                Clear saved progress
              </Button>
            )}
          </div>
          <Separator text={''} />
          <nav className="c-onboarding-sidebar-nav">
            {[
              'Welcome & Business Info',
              'Business Structure',
              'Chart of Accounts',
              'Module Selection',
              'User Setup',
              'Review & Submit',
            ].map((step, index) => (
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
                  {index + 1 < currentStep ? <CheckCircle className="c-onboarding-sidebar-step-icon" /> : index + 1}
                </div>
                <span className="c-onboarding-sidebar-step-text">{step}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="c-onboarding-main">
          <main className="c-onboarding-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="c-onboarding-step-container"
                >
                  {error && (
                    <div className="c-onboarding-alert c-onboarding-alert-error">
                      <AlertCircle className="c-onboarding-alert-icon" />
                      <p className="c-onboarding-alert-text">{error}</p>
                    </div>
                  )}

                  {/* Submission message */}
                  {submitMessage && (
                    <div className="c-onboarding-alert c-onboarding-alert-info">
                      <Rocket className="c-onboarding-alert-icon c-onboarding-alert-icon-pulse" />
                      <p className="c-onboarding-alert-text">{submitMessage}</p>
                    </div>
                  )}

                  {/* Step content */}
                  {currentStep === 1 && onboardingData.businessInfo && (
                    <WelcomeStep data={onboardingData.businessInfo} onUpdate={updateOnboardingData} />
                  )}
                  {currentStep === 2 && onboardingData.businessStructure && (
                    <BusinessStructureStep
                      businessStructure={onboardingData.businessStructure}
                      onUpdate={(businessStructure) => updateOnboardingData({ businessStructure })}
                    />
                  )}
                  {currentStep === 3 && onboardingData.chartOfAccounts && onboardingData.businessStructure && (
                    <ChartOfAccountsStep
                      data={onboardingData.chartOfAccounts}
                      businessType={onboardingData.businessStructure.businessType}
                      onUpdate={updateOnboardingData}
                    />
                  )}
                  {currentStep === 4 && (
                    <ModuleSelectionStep
                      data={onboardingData.moduleSelection}
                      onUpdate={updateOnboardingData}
                    />
                  )}
                  {currentStep === 5 && (
                    <UserSetupStep data={onboardingData.userSetup} onUpdate={updateOnboardingData} />
                  )}
                  {currentStep === 6 && (
                    <ReviewStep data={onboardingData} onUpdate={updateOnboardingData} />
                  )}

                  {/* Navigation buttons */}
                  <div className="c-onboarding-navigation">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 1 || isSubmitting}
                      extraClassName="c-onboarding-nav-btn c-onboarding-nav-btn-previous"
                    >
                      Previous
                    </Button>
                    {currentStep < totalSteps ? (
                      <Button 
                        onClick={handleNext} 
                        disabled={isSubmitting}
                        extraClassName="c-onboarding-nav-btn c-onboarding-nav-btn-next"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !onboardingData.termsAccepted}
                        extraClassName="c-onboarding-nav-btn c-onboarding-nav-btn-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="c-onboarding-nav-btn-icon c-onboarding-nav-btn-icon-spin" />
                            {submitMessage || 'Processing...'}
                          </>
                        ) : (
                          <>
                            <Rocket className="c-onboarding-nav-btn-icon" />
                            Launch My ERP System
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}