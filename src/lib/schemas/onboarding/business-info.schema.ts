import * as yup from 'yup';

// Address sub-schema
const AddressSchema = yup.object({
  street: yup.string()
    .min(1, 'Street address is required')
    .required(),
  city: yup.string()
    .min(1, 'City is required')
    .required(),
  state: yup.string()
    .min(1, 'State is required')
    .required(),
  zip: yup.string()
    .min(1, 'ZIP code is required')
    .required(),
  country: yup.string()
    .min(1, 'Country is required')
    .required(),
});

// Main business info schema
export const BusinessInfoSchema = yup.object({
  companyName: yup.string()
    .min(1, 'Company name is required')
    .max(140, 'Company name must be less than 140 characters')
    .required(),
  
  address: AddressSchema,
  
  industry: yup.string()
    .min(1, 'Industry is required')
    .required(),
  
  employeeCount: yup.mixed<string>().oneOf([
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ]).optional()
    .default('1-10'),
  
  
  companyLogo: yup.string()
    .optional()
    .default(""), // Base64 encoded image
  
  website: yup.string()
    .url('Please enter a valid URL')
    .required(),
  
  contactEmail: yup.string()
    .min(1, 'Contact email is required')
    .email('Please enter a valid email')
    .required(),
  
  contactPhone: yup.string()
    .min(1, 'Contact phone is required')
    .matches(/^[\d\s\-()+]+$/, 'Please enter a valid phone number')
    .required(),
});

export type BusinessInfo = yup.InferType<typeof BusinessInfoSchema>;