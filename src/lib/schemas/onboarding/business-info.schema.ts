import { z } from 'zod';

// Address sub-schema
const AddressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

// Main business info schema
export const BusinessInfoSchema = z.object({
  companyName: z.string()
    .min(1, 'Company name is required')
    .max(140, 'Company name must be less than 140 characters'),
  
  address: AddressSchema,
  
  industry: z.string().min(1, 'Industry is required'),
  
  employeeCount: z.enum([
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ]),
  
  
  companyLogo: z.string().optional(), // Base64 encoded image
  
  website: z.string()
    .url('Please enter a valid URL')
    .or(z.literal('')), 
  
  contactEmail: z.string()
    .min(1, 'Contact email is required')
    .email('Please enter a valid email'),
  
  contactPhone: z.string()
    .min(1, 'Contact phone is required')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number'),
});

export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;