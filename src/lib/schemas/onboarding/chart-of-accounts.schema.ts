// src/lib/schemas/onboarding/chart-of-accounts.schema.ts
import * as yup from 'yup';

// Segmentation sub-schema
const SegmentationSchema = yup.object({
  departments: yup.boolean(),
  costCenters: yup.boolean(),
  projects: yup.boolean(),
});


const OwnershipStructureSchema = yup.object({
  equityAccounts: yup.array(yup.string()),
  distributionHandling: yup.string().optional(),
  stockStructure: yup.string().optional(),
  retainedEarnings: yup.string().optional(),
});

// Main chart of accounts schema matching ChartOfAccountsStep.tsx
export const ChartOfAccountsSchema = yup.object({
  accountingMethod: yup.mixed<string>().oneOf(['Cash', 'Accrual']),
  
  defaultCurrency: yup.mixed<string>().oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
  
  segmentation: SegmentationSchema,
  
  ownershipStructure: OwnershipStructureSchema,
});

export type ChartOfAccounts = {
  accountingMethod: string;
  defaultCurrency: string;
  segmentation: {
    departments: boolean;
    costCenters: boolean;
    projects: boolean;
  };
  ownershipStructure: {
    equityAccounts: string[];
  }
  distributionHandling: string;
  stockStructure: string;
  retainedEarnings: string;
}