import { z } from 'zod';
import { BusinessInfoSchema } from './business-info.schema';
import { BusinessStructureSchema } from './business-structure.schema';
import { ModuleSelectionSchema } from './module-selection.schema';
import { UserSetupSchema } from './user-setup.schema';
import { ChartOfAccountsSchema } from './chart-of-accounts.schema';

// Combined onboarding data schema
export const OnboardingDataSchema = z.object({
  businessInfo: BusinessInfoSchema,
  businessStructure: BusinessStructureSchema,
  chartOfAccounts: ChartOfAccountsSchema,
  moduleSelection: ModuleSelectionSchema,
  userSetup: UserSetupSchema,
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type OnboardingData = z.infer<typeof OnboardingDataSchema>;

// Validation helpers
export function validateOnboardingData(data: unknown): OnboardingData {
  return OnboardingDataSchema.parse(data);
}

export function isValidOnboardingData(data: unknown): data is OnboardingData {
  return OnboardingDataSchema.safeParse(data).success;
}

// Step validation helpers
export function validateBusinessInfo(data: unknown) {
  return BusinessInfoSchema.parse(data);
}

export function validateBusinessStructure(data: unknown) {
  return BusinessStructureSchema.parse(data);
}

export function validateModuleSelection(data: unknown) {
  return ModuleSelectionSchema.parse(data);
}

export function validateUserSetup(data: unknown) {
  return UserSetupSchema.parse(data);
}

export function validateChartOfAccounts(data: unknown) {
  return ChartOfAccountsSchema.parse(data);
}
