import { z } from 'zod';
import { OnboardingDataSchema } from './onboarding';
import { SubscriptionDataSchema } from './subscription.schema';

// What gets sent to the EC2 provisioning endpoint
export const InstanceRequestSchema = z.object({
  onboardingData: OnboardingDataSchema,
  subscriptionData: SubscriptionDataSchema,
  userId: z.string(), // From NextAuth session
  instanceType: z.string().optional(), 
});

export type InstanceRequest = z.infer<typeof InstanceRequestSchema>;