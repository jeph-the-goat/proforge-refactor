// src/lib/schemas/onboarding/chart-of-accounts.schema.ts
import { z } from 'zod';

// Segmentation sub-schema
const SegmentationSchema = z.object({
  departments: z.boolean(),
  costCenters: z.boolean(),
  projects: z.boolean(),
});


const OwnershipStructureSchema = z.object({
  equityAccounts: z.array(z.string()),
  distributionHandling: z.string().optional(),
  stockStructure: z.string().optional(),
  retainedEarnings: z.string().optional(),
});

// Main chart of accounts schema matching ChartOfAccountsStep.tsx
export const ChartOfAccountsSchema = z.object({
  accountingMethod: z.enum(['Cash', 'Accrual']),
  
  defaultCurrency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY']),
  
  segmentation: SegmentationSchema,
  
  ownershipStructure: OwnershipStructureSchema,
});

export type ChartOfAccounts = z.infer<typeof ChartOfAccountsSchema>;