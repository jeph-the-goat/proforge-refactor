'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@/components/form-elements/Label';
import { Switch } from '@/components/form-elements/Switch';
import { Check, AlertCircle, Building2 } from 'lucide-react';
import styles from '@/styles/onboarding/ReviewStep.module.scss';
import * as yup from 'yup';
import type { OnboardingData } from '@/lib/schemas/onboarding';

// Simple validation schema for review step
const ReviewStepSchema = yup.object({
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms and conditions to continue"),
});

interface ReviewStepData {
  termsAccepted: boolean;
}

type ReviewStepProps = {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
};

type InfoRowProps = {
  label: string;
  value: string | React.ReactElement;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="c-review-step-section-title">{children}</h3>
);

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="c-review-step-info-row">
    <span className="c-review-step-info-label">{label}</span>
    {typeof value === 'string' ? (
      <span className="c-review-step-info-value">{value}</span>
    ) : (
      value
    )}
  </div>
);

export function ReviewStep({ data, onUpdate }: ReviewStepProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<ReviewStepData>({
    resolver: yupResolver(ReviewStepSchema),
    defaultValues: {
      termsAccepted: data.termsAccepted || false,
    },
    mode: 'onChange',
  });

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate({ termsAccepted: value.termsAccepted });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className={styles.cReviewStep}>
      <div className="c-review-step-header">
        <div className="c-review-step-title-container">
          <Check className="c-review-step-check-icon" />
          <h2 className="c-review-step-title">Review Your Setup</h2>
        </div>
        <p className="c-review-step-description">
          Please review all the information you&apos;ve provided. You can go back to any previous step to make changes if needed.
        </p>
      </div>
      
      <div className="c-review-step-scroll-container">
        <div className="c-review-step-content">
          {/* Company Information */}
          <div className="c-review-step-card">
            <SectionTitle>Company Information</SectionTitle>
            <div className="c-review-step-card-content">
              <InfoRow label="Company Name" value={data.businessInfo.companyName || 'Not provided'} />
              <InfoRow label="Industry" value={data.businessInfo.industry || 'Not provided'} />
              <InfoRow label="Employee Count" value={data.businessInfo.employeeCount || 'Not provided'} />
              <InfoRow label="Website" value={data.businessInfo.website || 'Not provided'} />
              <InfoRow 
                label="Contact" 
                value={
                  <div className="c-review-step-contact-info">
                    <div className="c-review-step-contact-value">{data.businessInfo.contactEmail}</div>
                    <div className="c-review-step-contact-value">{data.businessInfo.contactPhone}</div>
                  </div>
                } 
              />
              <InfoRow 
                label="Address" 
                value={
                  <div className="c-review-step-address-info">
                    <div className="c-review-step-address-value">{data.businessInfo.address.street}</div>
                    <div className="c-review-step-address-value">
                      {data.businessInfo.address.city}, {data.businessInfo.address.state} {data.businessInfo.address.zip}
                    </div>
                    <div className="c-review-step-address-value">{data.businessInfo.address.country}</div>
                  </div>
                } 
              />
            </div>
          </div>

          {/* Business Structure */}
          <div className="c-review-step-card">
            <SectionTitle>Business Structure</SectionTitle>
            <div className="c-review-step-card-content">
              <InfoRow label="Business Type" value={data.businessStructure.businessType || 'Not provided'} />
              {data.businessStructure.llcDetails && (
                <>
                  <InfoRow label="LLC Type" value={`${data.businessStructure.llcDetails.memberType}-Member`} />
                  <InfoRow label="Management" value={`${data.businessStructure.llcDetails.managementType}-Managed`} />
                </>
              )}
              {data.businessStructure.corporationDetails && (
                <>
                  <InfoRow label="Corporation Type" value={data.businessStructure.corporationDetails.type || 'Not provided'} />
                  <InfoRow label="Shareholders" value={data.businessStructure.corporationDetails.shareholderCount?.toString() || '1'} />
                </>
              )}
              <InfoRow label="Tax ID" value={data.businessStructure.taxId || 'Not provided'} />
              <InfoRow 
                label="Fiscal Year" 
                value={
                  <div className="c-review-step-fiscal-year">
                    <div className="c-review-step-fiscal-value">Start: {data.businessStructure.fiscalYearStart}</div>
                    <div className="c-review-step-fiscal-value">End: {data.businessStructure.fiscalYearEnd}</div>
                  </div>
                } 
              />
            </div>
          </div>

          {/* Accounting Setup */}
          <div className="c-review-step-card">
            <SectionTitle>Accounting Setup</SectionTitle>
            <div className="c-review-step-card-content">
              <InfoRow label="Accounting Method" value={data.chartOfAccounts.accountingMethod || 'Not provided'} />
              <InfoRow label="Default Currency" value={data.chartOfAccounts.defaultCurrency || 'Not provided'} />
              <InfoRow 
                label="Account Segmentation" 
                value={
                  <div className="c-review-step-segmentation">
                    {data.chartOfAccounts.segmentation.departments && (
                      <div className="c-review-step-segmentation-item">
                        <Check className="c-review-step-segmentation-check" />
                        <span>Departments</span>
                      </div>
                    )}
                    {data.chartOfAccounts.segmentation.costCenters && (
                      <div className="c-review-step-segmentation-item">
                        <Check className="c-review-step-segmentation-check" />
                        <span>Cost Centers</span>
                      </div>
                    )}
                    {data.chartOfAccounts.segmentation.projects && (
                      <div className="c-review-step-segmentation-item">
                        <Check className="c-review-step-segmentation-check" />
                        <span>Projects</span>
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          </div>

          {/* Selected Modules */}
          <div className="c-review-step-card">
            <SectionTitle>Selected Modules</SectionTitle>
            <div className="c-review-step-modules-grid">
              {Object.entries(data.moduleSelection).map(([key, value]) => (
                value && (
                  <div key={key} className="c-review-step-module-item">
                    <Check className="c-review-step-module-check" />
                    <span className="c-review-step-module-name">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* User Setup */}
          <div className="c-review-step-card">
            <SectionTitle>User Setup</SectionTitle>
            <div className="c-review-step-card-content">
              <div className="c-review-step-user-section">
                <h4 className="c-review-step-subsection-title">Admin User</h4>
                <div className="c-review-step-user-details">
                  <InfoRow label="Name" value={data.userSetup.adminUser.name || 'Not provided'} />
                  <InfoRow label="Email" value={data.userSetup.adminUser.email || 'Not provided'} />
                </div>
              </div>

              {data.userSetup.additionalUsers && data.userSetup.additionalUsers.length > 0 && (
                <div className="c-review-step-user-section">
                  <h4 className="c-review-step-subsection-title">Additional Users</h4>
                  {data.userSetup.additionalUsers.map((user, index) => (
                    <div key={index} className="c-review-step-user-info">
                      <InfoRow label="Name" value={user.name || 'Not provided'} />
                      <InfoRow label="Email" value={user.email || 'Not provided'} />
                      <InfoRow label="Role" value={user.role || 'Not provided'} />
                    </div>
                  ))}
                </div>
              )}

              <div className="c-review-step-user-section">
                <h4 className="c-review-step-subsection-title">Departments</h4>
                <div className="c-review-step-departments-grid">
                  {data.userSetup.departments && data.userSetup.departments.length > 0 ? (
                    data.userSetup.departments.map((dept, index) => (
                      <div key={index} className="c-review-step-department-item">
                        <Building2 className="c-review-step-department-icon" />
                        {dept || 'Unnamed Department'}
                      </div>
                    ))
                  ) : (
                    <p className="c-review-step-no-departments">No departments configured</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="c-review-step-card">
            <div className="c-review-step-terms-container">
              <div className="c-review-step-terms-info">
                <Label htmlFor="terms" className="c-review-step-terms-label">Terms and Conditions</Label>
                <p className="c-review-step-terms-description">
                  I agree to the terms of service and privacy policy
                </p>
              </div>
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            {errors.termsAccepted && (
              <div className="c-review-step-error">
                <AlertCircle className="c-review-step-error-icon" />
                <p className="c-review-step-error-message">You must accept the terms and conditions to continue</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}