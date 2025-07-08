import { 
  RunInstancesCommand, 
  DescribeInstancesCommand,
  _InstanceType
} from '@aws-sdk/client-ec2';
import { ec2Client, EC2_CONFIG, DEFAULT_TAGS } from './client';
import { buildUserData, validateDataSize, type UserDataContext } from './user-data-builder';
import type { OnboardingData } from '@/lib/schemas/onboarding';

export interface LaunchInstanceParams {
  onboardingData: OnboardingData;
  userId: string;
  sessionId: string;
  instanceToken: string; 
}

export interface InstanceInfo {
  instanceId: string;
  publicIp?: string;
  privateIp?: string;
  state: string;
  launchTime: Date;
}

export class InstanceManager {
  async launchInstance({ 
    onboardingData, 
    userId, 
    sessionId,
    instanceToken 
  }: LaunchInstanceParams): Promise<InstanceInfo> {
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/provision/callback`;
    const trackingId = `proforge-${userId}-${Date.now()}`;

    const userDataContext: UserDataContext = {
      onboardingData,
      userId,
      instanceId: trackingId,
      callbackUrl,
      instanceToken, 
    };

    const sizeValidation = validateDataSize(userDataContext);
    if (!sizeValidation.valid) {
      throw new Error(`User data too large: ${sizeValidation.size} bytes (max: ${sizeValidation.maxSize})`);
    }

    const userData = buildUserData(userDataContext);


    try {
      const command = new RunInstancesCommand({
        ImageId: EC2_CONFIG.AMI_ID,
        InstanceType: EC2_CONFIG.INSTANCE_TYPE as _InstanceType,
        SecurityGroupIds: [EC2_CONFIG.SECURITY_GROUP_ID],
        SubnetId: EC2_CONFIG.SUBNET_ID,
        MinCount: 1,
        MaxCount: 1,
        UserData: Buffer.from(userData).toString('base64'),
        TagSpecifications: [
          {
            ResourceType: 'instance',
            Tags: [
              { Key: 'Name', Value: `ProForge-${onboardingData.businessInfo.companyName}` },
              { Key: 'ProForgeUserId', Value: userId },
              { Key: 'ProForgeSessionId', Value: sessionId },
              { Key: 'ProForgeTrackingId', Value: trackingId },
              { Key: 'Project', Value: DEFAULT_TAGS.Project },
              { Key: 'Environment', Value: DEFAULT_TAGS.Environment },
              { Key: 'ManagedBy', Value: DEFAULT_TAGS.ManagedBy },
            ],
          },
        ],
      });

      const response = await ec2Client.send(command);
      const instance = response.Instances?.[0];

      if (!instance?.InstanceId) {
        throw new Error('Failed to launch instance - no instance ID returned');
      }


      await new Promise(resolve => setTimeout(resolve, 2000));

      let detailedInfo: Partial<InstanceInfo> = {};
      
      try {
        const detailsResult = await this.getInstanceStatus(instance.InstanceId);
        if (detailsResult) {
          detailedInfo = {
            publicIp: detailsResult.publicIp,
            privateIp: detailsResult.privateIp,
            state: detailsResult.state,
          };
        }
      } catch (describeError: any) {
        console.warn('Could not retrieve detailed instance info:', describeError.message);
      }

      const result: InstanceInfo = {
        instanceId: instance.InstanceId,
        privateIp: detailedInfo.privateIp || instance.PrivateIpAddress,
        publicIp: detailedInfo.publicIp,
        state: detailedInfo.state || instance.State?.Name || 'pending',
        launchTime: instance.LaunchTime || new Date(),
      };

      return result;

    } catch (error: any) {
      
      const errorMessage = error.message || 'Unknown AWS error';
      const errorCode = error.Code;
      const requestId = error.RequestId;
      
      let detailedMessage = `Instance launch failed: ${errorMessage}`;
      if (errorCode) detailedMessage += ` (Code: ${errorCode})`;
      if (requestId) detailedMessage += ` (RequestId: ${requestId})`;
      
      throw new Error(detailedMessage);
    }
  }

  async getInstanceStatus(instanceId: string): Promise<InstanceInfo | null> {
    try {
      const command = new DescribeInstancesCommand({
        InstanceIds: [instanceId],
      });

      const response = await ec2Client.send(command);
      const instance = response.Reservations?.[0]?.Instances?.[0];

      if (!instance) {
        console.warn(`Instance ${instanceId} not found in AWS`);
        return null;
      }

      return {
        instanceId: instance.InstanceId!,
        publicIp: instance.PublicIpAddress,
        privateIp: instance.PrivateIpAddress,
        state: instance.State?.Name || 'unknown',
        launchTime: instance.LaunchTime || new Date(),
      };
    } catch (error: any) {
      console.error('Failed to get instance status:', error);
      
      if (error.Code === 'InvalidInstanceID.NotFound') {
        console.warn(`Instance ${instanceId} does not exist in AWS`);
        return null;
      }
      
      console.error(`AWS error getting instance ${instanceId}:`, {
        message: error.message,
        code: error.Code,
        requestId: error.RequestId
      });
      
      return null;
    }
  }
}