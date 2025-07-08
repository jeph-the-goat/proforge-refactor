import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export type LoginInput = yup.InferType<typeof loginSchema>;