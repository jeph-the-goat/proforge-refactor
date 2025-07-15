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
  accountingMethod: yup.mixed<AccountingMethod>().oneOf(['Cash', 'Accrual']).optional(),
  
  defaultCurrency: yup.mixed<string>().oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']).optional(),
  
  segmentation: SegmentationSchema,
  
  ownershipStructure: OwnershipStructureSchema,
});

export type Segmentation = {
  departments?: boolean;
  costCenters?: boolean;
  projects?: boolean;
};

export type ChartOfAccounts = {
  accountingMethod?: AccountingMethod;
  defaultCurrency?: string;
  segmentation: Segmentation;
  ownershipStructure: {
    equityAccounts?: string[];
    distributionHandling?: string;
    stockStructure?: string;
    retainedEarnings?: string;
  };
};