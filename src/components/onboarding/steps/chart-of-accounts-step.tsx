// src/components/onboarding/steps/ChartOfAccountsStep.tsx
'use client';

import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@/components/form-elements/Label';
import { Switch } from '@/components/form-elements/Switch';
import { InputSelect } from '@/components/form-elements/InputSelect';
import { ChartOfAccountsSchema, type ChartOfAccounts } from '@/lib/schemas/onboarding/chart-of-accounts.schema';
import { clsx } from "clsx";
import {Subsection} from "@/components/form-elements/Subsection";
import {StepContentSection} from "@/components/onboarding/StepContentSection";
import styles from '@/styles/onboarding/steps/ChartOfAccountsStep.module.scss';

type ChartOfAccountsStepProps = {
  data: ChartOfAccounts;
  businessType: string;
  onUpdate: (data: { chartOfAccounts: ChartOfAccounts }) => void;
};

const CURRENCIES = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
];

export function ChartOfAccountsStep({
  data,
  businessType,
  onUpdate,
}: ChartOfAccountsStepProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<ChartOfAccounts>({
    resolver: yupResolver(ChartOfAccountsSchema),
    defaultValues: {
      accountingMethod: data.accountingMethod || 'Cash',
      defaultCurrency: data.defaultCurrency || 'USD',
      segmentation: {
        departments: data.segmentation?.departments || false,
        costCenters: data.segmentation?.costCenters || false,
        projects: data.segmentation?.projects || false,
      },
      ownershipStructure: {
        equityAccounts: data.ownershipStructure?.equityAccounts || [],
        distributionHandling: data.ownershipStructure?.distributionHandling || "",
        stockStructure: data.ownershipStructure?.stockStructure || "",
        retainedEarnings: data.ownershipStructure?.retainedEarnings || "",
      },
    },
    mode: 'onChange'
  });

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate({ chartOfAccounts: value as ChartOfAccounts });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <StepContentSection
      extraClassName={clsx(styles.cChartOfAccountsStep, "c-chart-of-accounts-step")}>
      <Subsection
        title="Basic Settings"
        extraClassName="c-account-settings"
      >
        <div className="c-account-toggle">
          <Label title="Accounting Method"/>
          <Controller
            name="accountingMethod"
            control={control}
            render={({field}) => (
              <div className="c-switch-group">
                    <span
                      className={`c-switch-label ${
                        field.value === 'Cash' ? 'active' : ''
                      }`}
                    >
                      Cash
                    </span>
                <Switch
                  checked={field.value === 'Accrual'}
                  onCheckedChange={(checked) => field.onChange(checked ? 'Accrual' : 'Cash')}
                />
                <span
                  className={`c-switch-label ${
                    field.value === 'Accrual' ? 'active' : ''
                  }`}
                >
                      Accrual
                    </span>
              </div>
            )}
          />
        </div>
        <Controller
          name="defaultCurrency"
          control={control}
          render={({field}) => (
            <InputSelect
              labelText="Default Currency"
              name="currency"
              placeholder="Select currency"
              options={CURRENCIES}
              value={field.value}
              onValueChange={field.onChange}
              hasErrors={!!errors.defaultCurrency}
              errorText={errors.defaultCurrency?.message}
            />
          )}
        />
      </Subsection>

      <Subsection
        title="Account Segmentation"
        tooltip="Segment your accounts for better financial tracking and reporting"
        extraClassName="c-account-settings"
      >
        <div className="c-account-toggle">
          <Label
            title="Departments"
            description="Track finances by department"
          >
          </Label>
          <Controller
            name="segmentation.departments"
            control={control}
            render={({field}) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="c-account-toggle">
          <Label
            title="Cost Centers"
            description="Track finances by cost center">
          </Label>
          <Controller
            name="segmentation.costCenters"
            control={control}
            render={({field}) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="c-account-toggle">
          <Label
            title="Projects"
            description="Track finances by project">
          </Label>
          <Controller
            name="segmentation.projects"
            control={control}
            render={({field}) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </Subsection>

      {/* Entity-Specific Settings */}
      <Subsection
        title="Entity-Specific Settings"
        tooltip="Configure settings specific to your business structure"
        data-business-type={businessType}
        last
      >

        {businessType === 'LLC' && (
          <div className="c-inline-grid">
            <Controller
              name="ownershipStructure.distributionHandling"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Distribution Method"
                    name="distributionHandling"
                    placeholder="Select distribution method"
                    options={[
                      {value: 'proportional', label: 'Proportional to Ownership'},
                      {value: 'fixed', label: 'Fixed Amounts'},
                      {value: 'custom', label: 'Custom Schedule'},
                    ]}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    hasDescription
                  />
                  <p>
                    How profits and losses will be distributed among members
                  </p>
                </div>
              )}
            />

            <Controller
              name="ownershipStructure.equityAccounts"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Equity Accounts"
                    name="equityAccounts"
                    placeholder="Select equity account structure"
                    options={[
                      {value: 'capital', label: 'Capital Accounts Only'},
                      {value: 'drawing', label: 'Capital and Drawing Accounts'},
                      {value: 'basis', label: 'Tax Basis Accounts'},
                    ]}
                    value={field.value?.[0] || ''}
                    onValueChange={(value) => field.onChange([value])}
                    hasDescription
                  />
                  <p>
                    How member equity will be tracked in the system
                  </p>
                </div>
              )}
            />
          </div>
        )}

        {businessType === 'Corporation' && (
          <div className="c-inline-grid">
            <Controller
              name="ownershipStructure.stockStructure"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Stock Structure"
                    name="stockStructure"
                    placeholder="Select stock structure"
                    options={[
                      {value: 'common', label: 'Common Stock Only'},
                      {value: 'preferred', label: 'Common and Preferred Stock'},
                      {value: 'multiple', label: 'Multiple Stock Classes'},
                    ]}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    hasDescription
                  />
                  <p>
                    Type of shares your corporation will issue
                  </p>
                </div>
              )}
            />

            <Controller
              name="ownershipStructure.retainedEarnings"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Retained Earnings Policy"
                    name="retainedEarnings"
                    placeholder="Select retained earnings policy"
                    options={[
                      {value: 'reinvest', label: 'Reinvest in Business'},
                      {value: 'distribute', label: 'Regular Distribution'},
                      {value: 'hybrid', label: 'Hybrid Approach'},
                    ]}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    hasDescription
                  />
                  <p>
                    How the company will handle undistributed profits
                  </p>
                </div>
              )}
            />

            <Controller
              name="ownershipStructure.equityAccounts"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Equity Accounts"
                    name="equityAccountsCorp"
                    placeholder="Select equity account structure"
                    options={[
                      {value: 'standard', label: 'Standard Corporate Accounts'},
                      {value: 'detailed', label: 'Detailed Class Tracking'},
                      {value: 'consolidated', label: 'Consolidated Structure'},
                    ]}
                    value={field.value?.[0] || ''}
                    onValueChange={(value) => field.onChange([value])}
                    hasDescription
                  />
                  <p>
                    How shareholder equity will be tracked in the system
                  </p>
                </div>
              )}
            />
          </div>
        )}

        {(businessType === 'SoleProprietorship' || businessType === 'Partnership') && (
          <div className="c-inline-grid">
            <Controller
              name="ownershipStructure.equityAccounts"
              control={control}
              render={({field}) => (
                <div className="c-entity-setting">
                  <InputSelect
                    labelText="Equity Structure"
                    name="equityStructure"
                    placeholder="Select equity structure"
                    options={[
                      {value: 'simple', label: "Simple Owner's Equity"},
                      {value: 'detailed', label: 'Detailed Capital Accounts'},
                      ...(businessType === 'Partnership' ? [
                        {value: 'partner', label: 'Partner Capital Accounts'}
                      ] : []),
                    ]}
                    value={field.value?.[0] || ''}
                    onValueChange={(value) => field.onChange([value])}
                    hasDescription
                  />
                  <p>
                    How owner&apos;s equity will be tracked in the system
                  </p>
                </div>
              )}
            />

            {businessType === 'Partnership' && (
              <div className="c-inline-grid">
                <Controller
                  name="ownershipStructure.distributionHandling"
                  control={control}
                  render={({field}) => (
                    <div className="c-entity-setting">
                      <InputSelect
                        labelText="Profit Sharing"
                        name="profitSharing"
                        placeholder="Select profit sharing method"
                        options={[
                          {value: 'equal', label: 'Equal Distribution'},
                          {value: 'ownership', label: 'Based on Ownership %'},
                          {value: 'custom', label: 'Custom Agreement'},
                        ]}
                        value={field.value || ''}
                        onValueChange={field.onChange}
                        hasDescription
                      />
                      <p>
                        How profits and losses will be shared between partners
                      </p>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        )}

        {!['LLC', 'Corporation', 'SoleProprietorship', 'Partnership'].includes(businessType) && (
          <p>
            Please select a business type to view specific settings.
          </p>
        )}
      </Subsection>
    </StepContentSection>
  );
}