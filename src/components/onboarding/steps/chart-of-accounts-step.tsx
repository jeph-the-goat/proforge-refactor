// src/components/onboarding/steps/ChartOfAccountsStep.tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@/components/form-elements/Label';
import { Switch } from '@/components/form-elements/Switch';
import { InputSelect } from '@/components/form-elements/InputSelect';
import { InfoIcon } from 'lucide-react';
import { ChartOfAccountsSchema, type ChartOfAccounts } from '@/lib/schemas/onboarding/chart-of-accounts.schema';
import { cn } from '@/lib/utils';
import styles from '@/styles/onboarding/ChartOfAccountsStep.module.scss';

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

// Simple tooltip component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="c-tooltip-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ cursor: 'help' }}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="c-tooltip-content"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            backgroundColor: 'var(--neutral-800)',
            color: 'var(--neutral-200)',
            borderRadius: '6px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          {content}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid var(--neutral-800)',
            }}
          />
        </div>
      )}
    </div>
  );
};

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
        distributionHandling: data.ownershipStructure?.distributionHandling,
        stockStructure: data.ownershipStructure?.stockStructure,
        retainedEarnings: data.ownershipStructure?.retainedEarnings,
      },
    },
    mode: 'onChange',
  });

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate({ chartOfAccounts: value as ChartOfAccounts });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className={cn(styles.cChartOfAccountsStep, "c-chart-of-accounts-step")}>
      <div className="c-chart-of-accounts-step-header">
        <h2 className="c-chart-of-accounts-step-title">Chart of Accounts</h2>
        <p className="c-chart-of-accounts-step-description">
          Configure your accounting settings and financial structure.
        </p>
      </div>

      <div className="c-chart-of-accounts-step-content">
        {/* Basic Accounting Settings */}
        <div className="c-chart-of-accounts-step-card">
          <h3 className="c-chart-of-accounts-step-card-title">Basic Settings</h3>
          <div className="c-chart-of-accounts-step-card-content">
            <div className="c-chart-of-accounts-step-field">
              <div className="c-chart-of-accounts-step-field-info">
                <Label>Accounting Method</Label>
                <p className="c-chart-of-accounts-step-field-description">
                  Choose between cash or accrual accounting
                </p>
              </div>
              <Controller
                name="accountingMethod"
                control={control}
                render={({ field }) => (
                  <div className="c-chart-of-accounts-step-switch-group">
                    <span
                      className={`c-chart-of-accounts-step-switch-label ${
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
                      className={`c-chart-of-accounts-step-switch-label ${
                        field.value === 'Accrual' ? 'active' : ''
                      }`}
                    >
                      Accrual
                    </span>
                  </div>
                )}
              />
            </div>
            {errors.accountingMethod && (
              <p className="c-chart-of-accounts-step-error">{errors.accountingMethod.message}</p>
            )}

            <div className="c-chart-of-accounts-step-field">
              <Controller
                name="defaultCurrency"
                control={control}
                render={({ field }) => (
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
            </div>
          </div>
        </div>

        {/* Account Segmentation */}
        <div className="c-chart-of-accounts-step-card">
          <div className="c-chart-of-accounts-step-card-header">
            <h3 className="c-chart-of-accounts-step-card-title">Account Segmentation</h3>
            <Tooltip content="Segment your accounts for better financial tracking and reporting">
              <InfoIcon className="c-chart-of-accounts-step-tooltip-icon" />
            </Tooltip>
          </div>
          <div className="c-chart-of-accounts-step-card-content">
            <div className="c-chart-of-accounts-step-field">
              <div className="c-chart-of-accounts-step-field-info">
                <Label>Departments</Label>
                <p className="c-chart-of-accounts-step-field-description">Track finances by department</p>
              </div>
              <Controller
                name="segmentation.departments"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="c-chart-of-accounts-step-field">
              <div className="c-chart-of-accounts-step-field-info">
                <Label>Cost Centers</Label>
                <p className="c-chart-of-accounts-step-field-description">Enable cost center tracking</p>
              </div>
              <Controller
                name="segmentation.costCenters"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="c-chart-of-accounts-step-field">
              <div className="c-chart-of-accounts-step-field-info">
                <Label>Projects</Label>
                <p className="c-chart-of-accounts-step-field-description">Track finances by project</p>
              </div>
              <Controller
                name="segmentation.projects"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Entity-Specific Settings */}
        <div className="c-chart-of-accounts-step-card">
          <div className="c-chart-of-accounts-step-card-header">
            <h3 className="c-chart-of-accounts-step-card-title">Entity-Specific Settings</h3>
            <Tooltip content="Configure settings specific to your business structure">
              <InfoIcon className="c-chart-of-accounts-step-tooltip-icon" />
            </Tooltip>
          </div>

          {businessType === 'LLC' && (
            <div className="c-chart-of-accounts-step-card-content">
              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.distributionHandling"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Distribution Method"
                      name="distributionHandling"
                      placeholder="Select distribution method"
                      options={[
                        { value: 'proportional', label: 'Proportional to Ownership' },
                        { value: 'fixed', label: 'Fixed Amounts' },
                        { value: 'custom', label: 'Custom Schedule' },
                      ]}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  How profits and losses will be distributed among members
                </p>
              </div>

              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.equityAccounts"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Equity Accounts"
                      name="equityAccounts"
                      placeholder="Select equity account structure"
                      options={[
                        { value: 'capital', label: 'Capital Accounts Only' },
                        { value: 'drawing', label: 'Capital and Drawing Accounts' },
                        { value: 'basis', label: 'Tax Basis Accounts' },
                      ]}
                      value={field.value?.[0] || ''} 
                      onValueChange={(value) => field.onChange([value])}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  How member equity will be tracked in the system
                </p>
              </div>
            </div>
          )}

          {businessType === 'Corporation' && (
            <div className="c-chart-of-accounts-step-card-content">
              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.stockStructure"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Stock Structure"
                      name="stockStructure"
                      placeholder="Select stock structure"
                      options={[
                        { value: 'common', label: 'Common Stock Only' },
                        { value: 'preferred', label: 'Common and Preferred Stock' },
                        { value: 'multiple', label: 'Multiple Stock Classes' },
                      ]}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  Type of shares your corporation will issue
                </p>
              </div>

              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.retainedEarnings"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Retained Earnings Policy"
                      name="retainedEarnings"
                      placeholder="Select retained earnings policy"
                      options={[
                        { value: 'reinvest', label: 'Reinvest in Business' },
                        { value: 'distribute', label: 'Regular Distribution' },
                        { value: 'hybrid', label: 'Hybrid Approach' },
                      ]}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  How the company will handle undistributed profits
                </p>
              </div>

              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.equityAccounts"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Equity Accounts"
                      name="equityAccountsCorp"
                      placeholder="Select equity account structure"
                      options={[
                        { value: 'standard', label: 'Standard Corporate Accounts' },
                        { value: 'detailed', label: 'Detailed Class Tracking' },
                        { value: 'consolidated', label: 'Consolidated Structure' },
                      ]}
                      value={field.value?.[0] || ''} 
                      onValueChange={(value) => field.onChange([value])}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  How shareholder equity will be tracked in the system
                </p>
              </div>
            </div>
          )}

          {(businessType === 'SoleProprietorship' || businessType === 'Partnership') && (
            <div className="c-chart-of-accounts-step-card-content">
              <div className="c-chart-of-accounts-step-field">
                <Controller
                  name="ownershipStructure.equityAccounts"
                  control={control}
                  render={({ field }) => (
                    <InputSelect
                      labelText="Equity Structure"
                      name="equityStructure"
                      placeholder="Select equity structure"
                      options={[
                        { value: 'simple', label: "Simple Owner's Equity" },
                        { value: 'detailed', label: 'Detailed Capital Accounts' },
                        ...(businessType === 'Partnership' ? [
                          { value: 'partner', label: 'Partner Capital Accounts' }
                        ] : []),
                      ]}
                      value={field.value?.[0] || ''} 
                      onValueChange={(value) => field.onChange([value])}
                    />
                  )}
                />
                <p className="c-chart-of-accounts-step-field-description">
                  How owner&apos;s equity will be tracked in the system
                </p>
              </div>

              {businessType === 'Partnership' && (
                <div className="c-chart-of-accounts-step-field">
                  <Controller
                    name="ownershipStructure.distributionHandling"
                    control={control}
                    render={({ field }) => (
                      <InputSelect
                        labelText="Profit Sharing"
                        name="profitSharing"
                        placeholder="Select profit sharing method"
                        options={[
                          { value: 'equal', label: 'Equal Distribution' },
                          { value: 'ownership', label: 'Based on Ownership %' },
                          { value: 'custom', label: 'Custom Agreement' },
                        ]}
                        value={field.value || ''}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  <p className="c-chart-of-accounts-step-field-description">
                    How profits and losses will be shared between partners
                  </p>
                </div>
              )}
            </div>
          )}

          {!['LLC', 'Corporation', 'SoleProprietorship', 'Partnership'].includes(businessType) && (
            <div className="c-chart-of-accounts-step-card-content">
              <p className="c-chart-of-accounts-step-field-description">
                Please select a business type to view specific settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}