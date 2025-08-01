// src/lib/schemas/onboarding/chart-of-accounts.schema.ts
import * as yup from 'yup';

export type AccountingMethod = 'Cash' | 'Accrual';

// Segmentation sub-schema
const SegmentationSchema = yup.object({
  departments: yup.boolean().optional(),
  costCenters: yup.boolean().optional(),
  projects: yup.boolean().optional(),
});

const OwnershipStructureSchema = yup.object({
  equityAccounts: yup.array(yup.string()).optional(),
  distributionHandling: yup.string().optional(),
  stockStructure: yup.string().optional(),
  retainedEarnings: yup.string().optional(),
});

// Main chart of accounts schema matching ChartOfAccountsStep.tsx
export const ChartOfAccountsSchema = yup.object({
  accountingMethod: yup.mixed<AccountingMethod>().oneOf(['Cash', 'Accrual']).required(),
  
  defaultCurrency: yup.mixed<string>().oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']).required(),
  
  segmentation: SegmentationSchema.required(),
  
  ownershipStructure: OwnershipStructureSchema.required(),
});

export interface ChartOfAccounts {
  accountingMethod: AccountingMethod;
  defaultCurrency: string;
  segmentation: {
    departments?: boolean | undefined;
    costCenters?: boolean | undefined;
    projects?: boolean | undefined;
  };
  ownershipStructure: {
    equityAccounts?: (string | undefined)[] | undefined;
    distributionHandling?: string | undefined;
    stockStructure?: string | undefined;
    retainedEarnings?: string | undefined;
  };
}