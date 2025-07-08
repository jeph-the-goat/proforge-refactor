import { z } from 'zod';

// LLC Details sub-schema
const LLCDetailsSchema = z.object({
  memberType: z.enum(['Single', 'Multi']),
  managementType: z.enum(['Manager', 'Member']),
});

// Corporation Details sub-schema
const CorporationDetailsSchema = z.object({
  type: z.enum(['C-Corp', 'S-Corp']),
  shareholderCount: z.number()
    .int('Must be a whole number')
    .positive('Must have at least one shareholder'),
});

// Main business structure schema
export const BusinessStructureSchema = z.object({
  businessType: z.enum([
    'LLC',
    'Corporation',
    'SoleProprietorship',
    'Partnership',
    'NonProfit'
  ]),
  
  llcDetails: LLCDetailsSchema.optional(),
  corporationDetails: CorporationDetailsSchema.optional(),
  
  taxId: z.string()
    .min(1, 'Tax ID is required')
    .regex(/^(\d{2}-\d{7}|\d{9})$/, 'Tax ID must be in format XX-XXXXXXX or XXXXXXXXX'),
  
  fiscalYearStart: z.string()
    .min(1, 'Fiscal year start is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    
  fiscalYearEnd: z.string()
    .min(1, 'Fiscal year end is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
}).refine(
  (data) => {
    // Validate LLC details are present when LLC is selected
    if (data.businessType === 'LLC' && !data.llcDetails) {
      return false;
    }
    // Validate Corporation details are present when Corporation is selected
    if (data.businessType === 'Corporation' && !data.corporationDetails) {
      return false;
    }
    // Ensure no orphaned details
    if (data.businessType !== 'LLC' && data.llcDetails) {
      return false;
    }
    if (data.businessType !== 'Corporation' && data.corporationDetails) {
      return false;
    }
    return true;
  },
  {
    message: 'Business type details must match the selected business type',
    path: ['businessType'],
  }
);

export type BusinessStructure = z.infer<typeof BusinessStructureSchema>;