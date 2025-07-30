import * as yup from 'yup';

// LLC Details sub-schema
const LLCDetailsSchema = yup.object({
  memberType: yup.mixed<string>().oneOf(['Single', 'Multi']).required(),
  managementType: yup.mixed<string>().oneOf(['Manager', 'Member']).required(),
});

// Corporation Details sub-schema
const CorporationDetailsSchema = yup.object({
  type: yup.mixed<string>().oneOf(['C-Corp', 'S-Corp']).required(),
  shareholderCount: yup.number()
    .integer('Must be a whole number')
    .positive('Must have at least one shareholder')
    .required()
});

// Main business structure schema
export const BusinessStructureSchema = yup.object({
  businessType: yup.mixed<string>().oneOf([
    'LLC',
    'Corporation',
    'SoleProprietorship',
    'Partnership',
    'NonProfit'
  ]).required(),
  
  llcDetails: LLCDetailsSchema.nullable(),
  corporationDetails: CorporationDetailsSchema.nullable(),
  
  taxId: yup.string()
    .min(1, 'Tax ID is required')
    .matches(/^(\d{2}-\d{7}|\d{9})$/, 'Tax ID must be in format XX-XXXXXXX or XXXXXXXXX')
    .required(),
  
  fiscalYearStart: yup.string()
    .min(1, 'Fiscal year start is required')
    .oneOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ])
    .required()
    .default("January"),
    
  fiscalYearEnd: yup.string()
    .oneOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ])
    .required()
    .default("December"),
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
    return !(data.businessType !== 'LLC' && data.llcDetails);
  },
);

export type BusinessStructure = {
  businessType: string;
  llcDetails: {
    memberType: string;
    managementType: string;
  } | null;
  corporationDetails: {
    type: string;
    shareholderCount: number;
  } | null;
  taxId: string;
  fiscalYearStart: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
  fiscalYearEnd: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
}