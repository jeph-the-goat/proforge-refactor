import { z } from 'zod';

export const SubscriptionDataSchema = z.object({
  subscriptionId: z.string().min(1),
  customerId: z.string().min(1),
  status: z.string(),
  currentPeriodEnd: z.number(),
  userCount: z.number().positive(),
  isAnnual: z.boolean(),
  addOns: z.array(z.string()),
  customerEmail: z.string().email().nullable(),
});

export type SubscriptionData = z.infer<typeof SubscriptionDataSchema>;