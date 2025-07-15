'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/form-elements/Input';
import { InputSelect } from '@/components/form-elements/InputSelect';
import { Building2, Users, Shield, TrendingUp } from 'lucide-react';
import { BusinessStructureSchema, type BusinessStructure } from '@/lib/schemas/onboarding/business-structure.schema';
import { cn } from '@/lib/utils';
import styles from '@/styles/onboarding/BusinessStructureStep.module.scss';

interface BusinessStructureStepProps {
  businessStructure: BusinessStructure | undefined;
  onUpdate: (businessStructure: BusinessStructure) => void;
}

const BUSINESS_TYPE_ICONS = {
  'SoleProprietorship': Shield,
  'Partnership': TrendingUp,
  'LLC': Users,
  'Corporation': Building2,
};

const BUSINESS_TYPE_LABELS = {
  'SoleProprietorship': 'Sole Proprietorship',
  'Partnership': 'Partnership',
  'LLC': 'LLC',
  'Corporation': 'Corporation',
};

const BUSINESS_TYPE_DESCRIPTIONS = {
  'SoleProprietorship': 'Single owner business structure',
  'Partnership': 'Two or more owners sharing profits',
  'LLC': 'Limited liability company structure',
  'Corporation': 'Separate legal entity with shareholders',
};

export function BusinessStructureStep({ businessStructure, onUpdate }: BusinessStructureStepProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BusinessStructure>({
    resolver: yupResolver(BusinessStructureSchema),
    defaultValues: businessStructure || {
      businessType: 'LLC',
      llcDetails: {
        memberType: 'Single',
        managementType: 'Member'
      },
      corporationDetails: {
        type: 'C-Corp',
        shareholderCount: 1
      },
      taxId: '',
      fiscalYearStart: 'January',
      fiscalYearEnd: 'December'
    },
    mode: 'onChange',
  });

  const businessType = watch('businessType');

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as BusinessStructure);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // Handle business type changes with proper cleanup
  const handleTypeChange = (type: BusinessStructure['businessType']) => {
    // Clear previous type-specific details
    if (type !== 'LLC') {
      setValue('llcDetails', {
        memberType: 'Single',
        managementType: "Member"
      });
    } else if (!businessStructure?.llcDetails) {
      setValue('llcDetails', { memberType: 'Single', managementType: 'Member' });
    }

    if (type !== 'Corporation') {
      setValue('corporationDetails', {
        type: 'C-Corp',
        shareholderCount: 1
      });
    } else if (!businessStructure?.corporationDetails) {
      setValue('corporationDetails', { type: 'C-Corp', shareholderCount: 1 });
    }

    setValue('businessType', type);
  };

  return (
    <div className={cn(styles.cBusinessStructureStep, "c-business-structure-step")}>
      <div className="c-business-structure-header">
        <h2>Business Structure</h2>
        <p>Configure your business structure and fiscal settings.</p>
      </div>

      <div className="c-business-structure-content">
        {/* Business Type Selection */}
        <div className="c-business-type-section">
          <h3 className="c-business-type-section-title">Choose Your Business Type</h3>
          <div className="c-business-type-grid">
            {Object.entries(BUSINESS_TYPE_ICONS).map(([type, Icon]) => {
              const isSelected = businessType === type;
              return (
                <div
                  key={type}
                  className={cn(
                    "c-business-type-card",
                    isSelected && "is-selected"
                  )}
                  onClick={() => handleTypeChange(type as BusinessStructure['businessType'])}
                >
                  <div className="c-business-type-card-icon">
                    <Icon />
                  </div>
                  <div className="c-business-type-card-content">
                    <h3>{BUSINESS_TYPE_LABELS[type as keyof typeof BUSINESS_TYPE_LABELS]}</h3>
                    <p>{BUSINESS_TYPE_DESCRIPTIONS[type as keyof typeof BUSINESS_TYPE_DESCRIPTIONS]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Business Details */}
        <div className="c-business-details-section">
          <h3 className="c-business-details-section-title">Business Details</h3>
          <div className="c-business-details-form">
            
            {/* LLC Details */}
            {businessType === 'LLC' && (
              <div className="c-business-details-subsection">
                <h4 className="c-business-details-subsection-title">LLC Details</h4>
                <div className="c-business-details-subsection-content">
                  <Controller
                    name="llcDetails.memberType"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        name={field.name}
                        labelText="Member Type"
                        options={[
                          { value: 'Single', label: 'Single Member' },
                          { value: 'Multi', label: 'Multi Member' }
                        ]}
                        value={field.value || 'Single'}
                        onValueChange={field.onChange}
                        hasErrors={!!errors.llcDetails?.memberType}
                        errorText={errors.llcDetails?.memberType?.message}
                      />
                    )}
                  />
                  <Controller
                    name="llcDetails.managementType"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        name={field.name}
                        labelText="Management Type"
                        options={[
                          { value: 'Member', label: 'Member Managed' },
                          { value: 'Manager', label: 'Manager Managed' }
                        ]}
                        value={field.value || 'Member'}
                        onValueChange={field.onChange}
                        hasErrors={!!errors.llcDetails?.managementType}
                        errorText={errors.llcDetails?.managementType?.message}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Corporation Details */}
            {businessType === 'Corporation' && (
              <div className="c-business-details-subsection">
                <h4 className="c-business-details-subsection-title">Corporation Details</h4>
                <div className="c-business-details-subsection-content">
                  <Controller
                    name="corporationDetails.type"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        name={field.name}
                        labelText="Corporation Type"
                        options={[
                          { value: 'C-Corp', label: 'C-Corporation' },
                          { value: 'S-Corp', label: 'S-Corporation' }
                        ]}
                        value={field.value || 'C-Corp'}
                        onValueChange={field.onChange}
                        hasErrors={!!errors.corporationDetails?.type}
                        errorText={errors.corporationDetails?.type?.message}
                      />
                    )}
                  />
                  <Controller
                    name="corporationDetails.shareholderCount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        name={field.name}
                        labelText="Number of Shareholders"
                        placeholder="1"
                        value={field.value?.toString() || '1'}
                        onChange={(e) => field.onChange(parseInt(e.currentTarget.value) || 1)}
                        hasErrors={!!errors.corporationDetails?.shareholderCount}
                        errorText={errors.corporationDetails?.shareholderCount?.message}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Tax Information */}
            <div className="c-business-details-form-grid">
              <Controller
                name="taxId"
                control={control}
                render={({ field }) => (
                  <Input
                    type="tel"
                    name={field.name}
                    labelText="Tax ID (EIN)"
                    placeholder="XX-XXXXXXX"
                    value={field.value || ''}
                    onChange={field.onChange}
                    hasErrors={!!errors.taxId}
                    errorText={errors.taxId?.message}
                  />
                )}
              />
              <div className="c-business-details-form-grid-full">
                <div className="c-date-picker-group">
                  <Controller
                    name="fiscalYearStart"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        name={field.name}
                        labelText="Fiscal Year Start"
                        options={[
                          { value: 'January', label: 'January' },
                          { value: 'February', label: 'February' },
                          { value: 'March', label: 'March' },
                          { value: 'April', label: 'April' },
                          { value: 'May', label: 'May' },
                          { value: 'June', label: 'June' },
                          { value: 'July', label: 'July' },
                          { value: 'August', label: 'August' },
                          { value: 'September', label: 'September' },
                          { value: 'October', label: 'October' },
                          { value: 'November', label: 'November' },
                          { value: 'December', label: 'December' }
                        ]}
                        value={field.value || 'January'}
                        onValueChange={field.onChange}
                        hasErrors={!!errors.fiscalYearStart}
                        errorText={errors.fiscalYearStart?.message}
                      />
                    )}
                  />
                  <Controller
                    name="fiscalYearEnd"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        name={field.name}
                        labelText="Fiscal Year End"
                        options={[
                          { value: 'January', label: 'January' },
                          { value: 'February', label: 'February' },
                          { value: 'March', label: 'March' },
                          { value: 'April', label: 'April' },
                          { value: 'May', label: 'May' },
                          { value: 'June', label: 'June' },
                          { value: 'July', label: 'July' },
                          { value: 'August', label: 'August' },
                          { value: 'September', label: 'September' },
                          { value: 'October', label: 'October' },
                          { value: 'November', label: 'November' },
                          { value: 'December', label: 'December' }
                        ]}
                        value={field.value || 'December'}
                        onValueChange={field.onChange}
                        hasErrors={!!errors.fiscalYearEnd}
                        errorText={errors.fiscalYearEnd?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}