import { z } from 'zod';

const AdminUserSchema = z.object({
  name: z.string()
    .min(1, 'Admin name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .min(1, 'Admin email is required')
    .email('Please enter a valid email'),
});

// Additional user sub-schema
const AdditionalUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  role: z.enum([
    'Administrator',
    'Manager',
    'Accountant',
    'Sales Representative',
    'Inventory Manager',
    'HR Manager',
    'Project Manager',
    'Quality Control',
    'General Staff',
  ]),
});

// Main user setup schema
export const UserSetupSchema = z.object({
  adminUser: AdminUserSchema,
  
  additionalUsers: z.array(AdditionalUserSchema)
    .max(50, 'Maximum 50 additional users allowed'),
  
  departments: z.array(z.string())
    .min(1, 'At least one department is required')
    .max(20, 'Maximum 20 departments allowed'),
  
  permissions: z.record(z.string(), z.array(z.string()))
    .default({}).optional(),
});

export type UserSetup = z.infer<typeof UserSetupSchema>;