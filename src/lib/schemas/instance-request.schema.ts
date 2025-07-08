import * as yup from 'yup';
import { OnboardingDataSchema } from './onboarding';
import { SubscriptionDataSchema } from './subscription.schema';

// What gets sent to the EC2 provisioning endpoint
export const InstanceRequestSchema = yup.object({
  onboardingData: OnboardingDataSchema,
  subscriptionData: SubscriptionDataSchema,
  userId: yup.string(), // From NextAuth session
  instanceType: yup.string().optional(),
});

export type InstanceRequest = yup.InferType<typeof InstanceRequestSchema>;