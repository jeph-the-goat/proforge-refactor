import * as yup from 'yup';

// Module selection schema matching ModuleSelectionStep.tsx
export const ModuleSelectionSchema = yup.object({
  // Standard modules
  inventory: yup.boolean().required().default(false),
  manufacturing: yup.boolean().required().default(false),
  hrPayroll: yup.boolean().required().default(false),
  crm: yup.boolean().required().default(false),
  projectManagement: yup.boolean().required().default(false),
  assetManagement: yup.boolean().required().default(false),
  qualityManagement: yup.boolean().required().default(false),
  
  // Commerce modules
  ecommerce: yup.boolean().required().default(false),
  pointOfSale: yup.boolean().required().default(false),
  
  // AI-powered modules
  aiFleet: yup.boolean().required().default(false),
  serviceScheduling: yup.boolean().required().default(false),
  aiAnalytics: yup.boolean().required().default(false),
});

export interface ModuleSelection {
  inventory: boolean;
  manufacturing: boolean;
  hrPayroll: boolean;
  crm: boolean;
  projectManagement: boolean;
  assetManagement: boolean;
  qualityManagement: boolean;
  ecommerce: boolean;
  pointOfSale: boolean;
  aiFleet: boolean;
  serviceScheduling: boolean;
  aiAnalytics: boolean;
}

// Helper to count selected modules
export function countSelectedModules(modules: ModuleSelection): number {
  return Object.values(modules).filter(Boolean).length;
}

// Helper to get module pricing
export function getModulePricing(modules: ModuleSelection): number {
  const modulePrices = {
    inventory: 10,
    manufacturing: 25,
    hrPayroll: 20,
    crm: 15,
    projectManagement: 20,
    assetManagement: 15,
    qualityManagement: 20,
    ecommerce: 30,
    pointOfSale: 25,
    aiFleet: 50,
    serviceScheduling: 40,
    aiAnalytics: 60,
  };
  
  return Object.entries(modules)
    .filter(([e, enabled]) => {
      void e;
      return enabled;
    })
    .reduce((total, [module]) => total + modulePrices[module as keyof typeof modulePrices], 0);
}