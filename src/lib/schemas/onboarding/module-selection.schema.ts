import { z } from 'zod';

// Module selection schema matching ModuleSelectionStep.tsx
export const ModuleSelectionSchema = z.object({
  // Standard modules
  inventory: z.boolean(),
  manufacturing: z.boolean(),
  hrPayroll: z.boolean(),
  crm: z.boolean(),
  projectManagement: z.boolean(),
  assetManagement: z.boolean(),
  qualityManagement: z.boolean(),
  
  // Commerce modules
  ecommerce: z.boolean(),
  pointOfSale: z.boolean(),
  
  // AI-powered modules
  aiFleet: z.boolean(),
  serviceScheduling: z.boolean(),
  aiAnalytics: z.boolean(),
});

export type ModuleSelection = z.infer<typeof ModuleSelectionSchema>;

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
    .filter(([_, enabled]) => enabled)
    .reduce((total, [module]) => total + modulePrices[module as keyof typeof modulePrices], 0);
}