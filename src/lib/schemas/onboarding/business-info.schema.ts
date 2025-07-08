import * as yup from 'yup';

// Address sub-schema
const AddressSchema = yup.object({
  street: yup.string().min(1, 'Street address is required'),
  city: yup.string().min(1, 'City is required'),
  state: yup.string().min(1, 'State is required'),
  zip: yup.string().min(1, 'ZIP code is required'),
  country: yup.string().min(1, 'Country is required'),
});

// Main business info schema
export const BusinessInfoSchema = yup.object({
  companyName: yup.string()
    .min(1, 'Company name is required')
    .max(140, 'Company name must be less than 140 characters'),
  
  address: AddressSchema,
  
  industry: yup.string().min(1, 'Industry is required'),
  
  employeeCount: yup.mixed<string>().oneOf([
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ]),
  
  
  companyLogo: yup.string().optional(), // Base64 encoded image
  
  website: yup.string()
    .url('Please enter a valid URL'),
  
  contactEmail: yup.string()
    .min(1, 'Contact email is required')
    .email('Please enter a valid email'),
  
  contactPhone: yup.string()
    .min(1, 'Contact phone is required')
    .matches(/^[\d\s\-()+]+$/, 'Please enter a valid phone number'),
});

export type BusinessInfo = {
  companyName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  industry: string;
  employeeCount: string;
  companyLogo: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
}