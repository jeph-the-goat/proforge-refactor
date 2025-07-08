import * as yup from 'yup';
import { BusinessInfoSchema } from './business-info.schema';
import { BusinessStructureSchema } from './business-structure.schema';
import { ModuleSelectionSchema } from './module-selection.schema';
import { UserSetupSchema } from './user-setup.schema';
import { ChartOfAccountsSchema } from './chart-of-accounts.schema';

// Combined onboarding data schema
export const OnboardingDataSchema = yup.object({
  businessInfo: BusinessInfoSchema,
  businessStructure: BusinessStructureSchema,
  chartOfAccounts: ChartOfAccountsSchema,
  moduleSelection: ModuleSelectionSchema,
  userSetup: UserSetupSchema,
  termsAccepted: yup.boolean().test(
    'terms-accepted',
    'You must accept the terms and conditions',
    (val) => val === true
  ),
});

export type OnboardingData = {
  businessInfo: yup.InferType<typeof BusinessInfoSchema>;
  businessStructure: yup.InferType<typeof BusinessStructureSchema>;
  chartOfAccounts: yup.InferType<typeof ChartOfAccountsSchema>;
  moduleSelection: yup.InferType<typeof ModuleSelectionSchema>;
  userSetup: yup.InferType<typeof UserSetupSchema>;
  termsAccepted: boolean;
}

// Validation helpers
export function validateOnboardingData(data: unknown): OnboardingData {
  return <OnboardingData>OnboardingDataSchema.validateSync(data);
}

export function isValidOnboardingData(data: unknown): data is OnboardingData {
  try {
    OnboardingDataSchema.validateSync(data);
    return true;
  } catch {
    return false;
  }
}

// Step validation helpers
export function validateBusinessInfo(data: unknown) {
  return BusinessInfoSchema.validateSync(data);
}

export function validateBusinessStructure(data: unknown) {
  return BusinessStructureSchema.validateSync(data);
}

export function validateModuleSelection(data: unknown) {
  return ModuleSelectionSchema.validateSync(data);
}

export function validateUserSetup(data: unknown) {
  return UserSetupSchema.validateSync(data);
}

export function validateChartOfAccounts(data: unknown) {
  return ChartOfAccountsSchema.validateSync(data);
}
