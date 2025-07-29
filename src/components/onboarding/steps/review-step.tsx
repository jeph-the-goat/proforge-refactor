'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Switch } from '@/components/form-elements/Switch';
import {Check, AlertCircle, Building2, Edit2, User, Briefcase} from 'lucide-react';
import { Button } from '@/components/common/Button';
import styles from '@/styles/onboarding/ReviewStep.module.scss';
import { cn } from '@/lib/utils';
import * as yup from 'yup';
import type { OnboardingData } from '@/lib/schemas/onboarding';
import { Section , Separator } from "@/components";
import {StepContentSection} from "@/components/onboarding/StepContentSection";
import {Subsection} from "@/components/form-elements/Subsection";

// Simple validation schema for review step
const ReviewStepSchema = yup.object({
  termsAccepted: yup.boolean()
    .oneOf([true], "You must accept the terms and conditions to continue")
    .default(false),
});

type ReviewStepData = yup.InferType<typeof ReviewStepSchema>;

type ReviewStepProps = {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
};

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

  // Calculate selected modules count and total price
  const selectedModules = Object.entries(data.moduleSelection).filter(([_, value]) => value);
  const totalPrice = selectedModules.length * 15; // Mock pricing

  return (
    <StepContentSection extraClassName={cn(styles.cReviewStep, "c-review-step")}>
      <Section
        title="Review Your Setup"
        paragraph="Please review all the information you've provided. You can go back to any previous step to make changes if needed."
      />

      {/* Company */}
      <Subsection
        icon={<Briefcase className="c-review-section-icon"/>}
        title="Company Information"
        editable
        extraClassName="c-review-section"
      >
        {/* Company Information */}
        <div className="c-business-info-grid">
          <div className="c-business-info-item">
            <label className="c-business-info-label">Company Name</label>
            <p className="c-business-info-value c-business-info-value-emphasis">
              {data.businessInfo.companyName || 'Not provided'}
            </p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Industry</label>
            <p className="c-business-info-value">{data.businessInfo.industry || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Employee Count</label>
            <p
              className="c-business-info-value">{data.businessInfo.employeeCount || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Website</label>
            <p
              className="c-business-info-value">{data.businessInfo.companyWebsite || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Contact Email</label>
            <p
              className="c-business-info-value">{data.businessInfo.contactEmail || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Contact Phone</label>
            <p
              className="c-business-info-value">{data.businessInfo.contactPhone || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item c-business-info-item-full">
            <label className="c-business-info-label">Business Address</label>
            {data.businessInfo.address.street && data.businessInfo.address.city &&
            data.businessInfo.address.state && data.businessInfo.address.zip &&
            data.businessInfo.address.country ?
              <p className="c-business-info-value">
                {data.businessInfo.address.street}<br/>
                {data.businessInfo.address.city}<br/>
                {data.businessInfo.address.state}<br/>
                {data.businessInfo.address.zip}<br/>
                {data.businessInfo.address.country}
              </p> : (
                <p className="c-business-info-value">Not provided</p>
              )}
            </div>
          </div>
        <Separator text={''}/>
      </Subsection>

        {/* Business Structure */}
      <Subsection
        title="Business Structure"
        icon={<Building2 className="c-review-section-icon"/>}
        editable
        extraClassName="c-review-section"
      >
        <div className="c-business-info-grid">
          <div className="c-business-info-item">
            <label className="c-business-info-label">Business Type</label>
            <p className="c-business-info-value c-business-info-value-emphasis">
              {data.businessStructure.businessType || 'Not provided'}
            </p>
          </div>
          {data.businessStructure.llcDetails && (
            <>
              <div className="c-business-info-item">
                <label className="c-business-info-label">LLC Type</label>
                <p
                  className="c-business-info-value">{data.businessStructure.llcDetails.memberType}-Member</p>
              </div>
              <div className="c-business-info-item">
                <label className="c-business-info-label">Management</label>
                <p
                  className="c-business-info-value">{data.businessStructure.llcDetails.managementType}-Managed</p>
              </div>
            </>
          )}
          {data.businessStructure.corporationDetails && (
            <>
              <div className="c-business-info-item">
                <label className="c-business-info-label">Corporation Type</label>
                <p
                  className="c-business-info-value">{data.businessStructure.corporationDetails.type || 'Not provided'}</p>
              </div>
              <div className="c-business-info-item">
                <label className="c-business-info-label">Shareholders</label>
                <p
                  className="c-business-info-value">{data.businessStructure.corporationDetails.shareholderCount?.toString() || '1'}</p>
              </div>
            </>
          )}
          <div className="c-business-info-item">
            <label className="c-business-info-label">Tax ID</label>
            <p
              className="c-business-info-value">{data.businessStructure.taxId || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Fiscal Year Start</label>
            <p
              className="c-business-info-value">{data.businessStructure.fiscalYearStart || 'Not provided'}</p>
          </div>
          <div className="c-business-info-item">
            <label className="c-business-info-label">Fiscal Year End</label>
            <p
              className="c-business-info-value">{data.businessStructure.fiscalYearEnd || 'Not provided'}</p>
          </div>
        </div>
        <Separator text={''}/>
      </Subsection>

        {/* Selected Modules */}
      <Subsection
        title="Selected Modules"
        icon={<Check className="c-review-section-icon"/>}
        editable
        extraClassName="c-review-section"
      >
        <div className="c-modules-summary">
          <div className="c-modules-count">{selectedModules.length} Modules Selected</div>
          <div className="c-modules-price">
            ${totalPrice}<span className="c-modules-price-period">/month</span>
          </div>
        </div>
        <div className="c-modules-grid">
          {selectedModules.map(([key]) => (
            <div key={key} className="c-module-item c-module-item-selected">
              <div className="c-module-item-text">
                <div className="c-module-item-name">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="c-module-item-price">$15/month</div>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

        {/* User Setup */}
      <Subsection
        title="User Setup"
        icon={<User className="c-review-section-icon"/>}
        editable
        extraClassName="c-review-section"
      >
        {/* Admin User */}
        <div className="c-admin-user">
          <div className="c-admin-user-header">
            <div className="c-admin-user-avatar">
              {data.userSetup.adminUser.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
            </div>
            <div className="c-admin-user-info">
              <div
                className="c-admin-user-name">{data.userSetup.adminUser.name || 'Not provided'}</div>
              <div
                className="c-admin-user-email">{data.userSetup.adminUser.email || 'Not provided'}</div>
            </div>
          </div>

          {/* Additional Users */}
          {data.userSetup.additionalUsers && data.userSetup.additionalUsers.length > 0 && (
            <div className="c-additional-users">
              <div className="c-additional-users-header">Additional Users
                ({data.userSetup.additionalUsers.length})
              </div>
              <div className="c-additional-users-list">
                {data.userSetup.additionalUsers.map((user, index) => (
                  <div key={index} className="c-additional-user-item">
                    <div className="c-additional-user-avatar">
                      {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                    </div>
                    <div className="c-additional-user-info">
                      <div className="c-additional-user-name">{user.name || 'Not provided'}</div>
                      <div className="c-additional-user-details">
                          <span
                            className="c-additional-user-email">{user.email || 'Not provided'}</span>
                        <span
                          className="c-additional-user-role">{user.role || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Departments */}
          {data.userSetup.departments && data.userSetup.departments.length > 0 && (
            <div className="c-departments-display">
              <div className="c-departments-header">Departments
                ({data.userSetup.departments.length})
              </div>
              <div className="c-departments-list">
                {data.userSetup.departments.map((dept, index) => (
                  <div key={index} className="c-department-tag">
                    {dept || 'Unnamed Department'}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
      </Subsection>

        {/* Terms and Conditions */}
      <Subsection
        title="Terms and Conditions"
        extraClassName="c-review-section"
      >
        <div className="c-terms-section">
          <div className="c-terms-content">
            <Controller
              name="termsAccepted"
              control={control}
              render={({field}) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="c-terms-switch"
                />
              )}
            />
            <div className="c-terms-text">
              <div className="c-terms-title">Terms and Conditions</div>
              <div className="c-terms-description">
                I agree to the <a href="/terms" target="_blank">terms of service</a> and <a
                href="/privacy" target="_blank">privacy policy</a>.
                By proceeding, I confirm that all information provided is accurate and complete.
              </div>
            </div>
          </div>
        </div>
      </Subsection>

        {/* Validation Errors */}
        {errors.termsAccepted && (
          <div className="c-validation-errors">
            <div className="c-validation-errors-title">
              <AlertCircle />
              Validation Error
            </div>
            <ul className="c-validation-errors-list">
              <li>{errors.termsAccepted.message}</li>
            </ul>
          </div>
        )}
    </StepContentSection>
  );
}