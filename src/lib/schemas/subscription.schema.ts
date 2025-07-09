import * as yup from 'yup';

export const SubscriptionDataSchema = yup.object({
  subscriptionId: yup.string().min(1),
  customerId: yup.string().min(1),
  status: yup.string(),
  currentPeriodEnd: yup.number(),
  userCount: yup.number().positive(),
  isAnnual: yup.boolean(),
  addOns: yup.array(yup.string()),
  customerEmail: yup.string().email().nullable(),
});

export type SubscriptionData = yup.InferType<typeof SubscriptionDataSchema>;