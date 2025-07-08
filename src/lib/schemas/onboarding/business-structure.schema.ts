import * as yup from 'yup';

// LLC Details sub-schema
const LLCDetailsSchema = yup.object({
  memberType: yup.mixed<string>().oneOf(['Single', 'Multi']),
  managementType: yup.mixed<string>().oneOf(['Manager', 'Member']),
});

// Corporation Details sub-schema
const CorporationDetailsSchema = yup.object({
  type: yup.mixed<string>().oneOf(['C-Corp', 'S-Corp']),
  shareholderCount: yup.number()
    .integer('Must be a whole number')
    .positive('Must have at least one shareholder'),
});

// Main business structure schema
export const BusinessStructureSchema = yup.object({
  businessType: yup.mixed<string>().oneOf([
    'LLC',
    'Corporation',
    'SoleProprietorship',
    'Partnership',
    'NonProfit'
  ]),
  
  llcDetails: LLCDetailsSchema.optional(),
  corporationDetails: CorporationDetailsSchema.optional(),
  
  taxId: yup.string()
    .min(1, 'Tax ID is required')
    .matches(/^(\d{2}-\d{7}|\d{9})$/, 'Tax ID must be in format XX-XXXXXXX or XXXXXXXXX'),
  
  fiscalYearStart: yup.string()
    .min(1, 'Fiscal year start is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    
  fiscalYearEnd: yup.string()
    .min(1, 'Fiscal year end is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
}).test(
  "business-type-details-match",
  "Business type details must match the selected business type",
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
    return !(data.businessType !== 'Corporation' && data.corporationDetails);
  },
);

export type BusinessStructure = {
  businessType: string;
  llcDetails: {
    memberType: string;
    managementType: string;
  };
  corporationDetails: {
    type: string;
    shareholderCount: number;
  };
  taxId: string;
  fiscalYearStart: string;
  fiscalYearEnd: string;
}