import { EC2Client } from '@aws-sdk/client-ec2';

if (process.env.NODE_ENV === 'development') {
  const requiredEnvVars = ['API_AWS_ACCESS_KEY_ID', 'API_AWS_SECRET_ACCESS_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

export const ec2Client = new EC2Client({
  region: process.env.API_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.API_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY!,
  },
  maxAttempts: 3,
});

export const EC2_CONFIG = {
  AMI_ID: process.env.API_AWS_AMI_ID!,
  INSTANCE_TYPE: process.env.API_AWS_INSTANCE_TYPE || 't3.medium',
  SECURITY_GROUP_ID: process.env.API_AWS_SECURITY_GROUP_ID!,
  SUBNET_ID: process.env.API_AWS_SUBNET_ID!,
  VPC_ID: process.env.API_AWS_VPC_ID!,
} as const;

export const DEFAULT_TAGS = {
  Project: 'ProForge-ERP',
  Environment: process.env.NODE_ENV || 'production',
  ManagedBy: 'ProForge-Platform',
} as const;

export const API_AWS_REGION = process.env.API_AWS_REGION || 'us-east-1';
