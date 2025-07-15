'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/form-elements/Input';
import { InputSelect } from '@/components/form-elements/InputSelect';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { BusinessInfoSchema, type BusinessInfo } from '@/lib/schemas/onboarding/business-info.schema';
import { cn } from '@/lib/utils';
import styles from '@/styles/onboarding/WelcomeStep.module.scss';

type WelcomeStepProps = {
  data: BusinessInfo;
  onUpdate: (data: { businessInfo: BusinessInfo }) => void;
};

const INDUSTRIES = [
  'Construction',
  'Manufacturing',
  'Technology',
  'Healthcare',
  'Retail',
  'Professional Services',
  'Education',
  'Finance',
  'Real Estate',
  'Other',
];

const EMPLOYEE_RANGES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

export function WelcomeStep({ data, onUpdate }: WelcomeStepProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BusinessInfo>({
    resolver: yupResolver(BusinessInfoSchema),
    defaultValues: data,
    mode: 'onChange', // Validate on change for real-time feedback
  });

  // Watch form changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate({ businessInfo: value as BusinessInfo });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const handleFileUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('companyLogo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn(styles.cWelcomeStep, "c-welcome-step")}>
      <div className="c-welcome-step-header">
        <h2 className="h2">Welcome to ProForge ERP</h2>
        <p>Let&#39;s get started by setting up your business profile.</p>
      </div>

      <div className="c-welcome-step-content">
        {/* Company Logo Upload */}
        <div className="c-welcome-step-logo-section">
          <div className="c-welcome-step-logo-upload">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Company logo preview"
                width={96}
                height={96}
                className="c-welcome-step-logo-preview"
              />
            ) : (
              <div className="c-welcome-step-logo-placeholder">
                <Upload />
              </div>
            )}
            <div className="c-welcome-step-logo-text">
              <h3>Company Logo</h3>
              <p>Upload your company logo. Recommended size: 400x400px.</p>
              <Controller
                name="companyLogo"
                control={control}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <Input
                    type="file"
                    name="companyLogo"
                    labelText="Upload Logo"
                    accept="image/*"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const file = target.files?.[0];
                      if (file) {
                        handleFileUpload(file);
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="c-welcome-step-form">
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                name="companyName"
                labelText="Company Name"
                placeholder="Enter your company name"
                value={field.value || ''}
                onChange={field.onChange}
                hasErrors={!!errors.companyName}
                errorText={errors.companyName?.message}
              />
            )}
          />

          <div className="c-welcome-step-form-grid">
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <InputSelect
                  name={field.name}
                  labelText="Industry"
                  placeholder="Select industry"
                  options={INDUSTRIES.map(industry => ({
                    value: industry.toLowerCase(),
                    label: industry
                  }))}
                  value={field.value}
                  onValueChange={field.onChange}
                  hasErrors={!!errors.industry}
                  errorText={errors.industry?.message}
                />
              )}
            />

            <Controller
              name="employeeCount"
              control={control}
              render={({ field }) => (
                <InputSelect
                  name={field.name}
                  labelText="Number of Employees"
                  placeholder="Select range"
                  options={EMPLOYEE_RANGES.map(range => ({
                    value: range,
                    label: range
                  }))}
                  value={field.value}
                  onValueChange={field.onChange}
                  hasErrors={!!errors.employeeCount}
                  errorText={errors.employeeCount?.message}
                />
              )}
            />
          </div>

          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Input
                type="url"
                name="website"
                labelText="Website"
                placeholder="https://yourcompany.com"
                value={field.value || ''}
                onChange={field.onChange}
                hasErrors={!!errors.website}
                errorText={errors.website?.message}
              />
            )}
          />

          {/* Contact Information */}
          <div className="c-welcome-step-form-section">
            <h3 className="c-welcome-step-form-section-title">Contact Information</h3>
            <div className="c-welcome-step-form-grid">
              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <Input
                    name={field.name}
                    type="email"
                    labelText="Contact Email"
                    placeholder="contact@company.com"
                    value={field.value}
                    onChange={field.onChange}
                    hasErrors={!!errors.contactEmail}
                    errorText={errors.contactEmail?.message}
                  />
                )}
              />

              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    name={field.name}
                    type="tel"
                    labelText="Contact Phone"
                    placeholder="(555) 123-4567"
                    value={field.value}
                    onChange={field.onChange}
                    hasErrors={!!errors.contactPhone}
                    errorText={errors.contactPhone?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Business Address */}
          <div className="c-welcome-step-form-section">
            <h3 className="c-welcome-step-form-section-title">Business Address</h3>
            <div className="c-welcome-step-form-grid">
              <div className="c-welcome-step-form-grid-full">
                <Controller
                  name="address.street"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      name="address.street"
                      labelText="Street Address"
                      placeholder="123 Main St"
                      value={field.value || ''}
                      onChange={field.onChange}
                      hasErrors={!!errors.address?.street}
                      errorText={errors.address?.street?.message}
                    />
                  )}
                />
              </div>

              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name="address.city"
                    labelText="City"
                    placeholder="City"
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasErrors={!!errors.address?.city}
                    errorText={errors.address?.city?.message}
                  />
                )}
              />

              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name="address.state"
                    labelText="State/Province"
                    placeholder="State"
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasErrors={!!errors.address?.state}
                    errorText={errors.address?.state?.message}
                  />
                )}
              />

              <Controller
                name="address.zip"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name="address.zip"
                    labelText="ZIP/Postal Code"
                    placeholder="12345"
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasErrors={!!errors.address?.zip}
                    errorText={errors.address?.zip?.message}
                  />
                )}
              />

              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    name="address.country"
                    labelText="Country"
                    placeholder="Country"
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasErrors={!!errors.address?.country}
                    errorText={errors.address?.country?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}