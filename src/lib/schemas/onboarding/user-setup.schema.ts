import * as yup from 'yup';

const AdminUserSchema = yup.object({
  name: yup.string()
    .min(1, 'Admin name is required')
    .max(100, 'Name must be less than 100 characters')
    .required(),
  
  email: yup.string()
    .min(1, 'Admin email is required')
    .email('Please enter a valid email')
    .required(),
});

// Additional user sub-schema
const AdditionalUserSchema = yup.object({
  name: yup.string().min(1, 'Name is required'),
  email: yup.string().email('Please enter a valid email'),
  role: yup.mixed<string>().oneOf([
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
export const UserSetupSchema = yup.object({
  adminUser: AdminUserSchema.required(),
  
  additionalUsers: yup.array(AdditionalUserSchema)
    .max(50, 'Maximum 50 additional users allowed')
    .optional(),
  
  departments: yup.array(yup.string())
    .min(1, 'At least one department is required')
    .max(20, 'Maximum 20 departments allowed')
    .required(),

  permissions: yup
    .object()
    .optional()
    .test('valid-permissions', 'Each value must be a string array', value => {
      if (!value) return true;
      return Object.values(value).every(
        v => Array.isArray(v) && v.every(i => typeof i === 'string')
      );
    }),
});

export type UserSetup = {
  adminUser: {
    name: string;
    email: string;
  };
  additionalUsers?: {
    name?: string | undefined;
    email?: string | undefined;
    role?: string | undefined;
  }[];
  departments: (string | undefined)[];
  permissions?: Record<string, string[]> | undefined;
}