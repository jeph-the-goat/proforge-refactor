import { InstanceManager } from '@/lib/aws/instance-manager';
import { PrismaClient } from '@prisma/client';
import type { OnboardingData } from '@/lib/schemas/onboarding';
import crypto from 'crypto';

const prisma = new PrismaClient();

export interface ProvisioningRequest {
  sessionId: string;
  onboardingData: OnboardingData;
  userId: string;
}

export interface ProvisioningResult {
  instanceId: string;
  status: 'launching' | 'running' | 'configuring' | 'completed' | 'failed';
  message?: string;
}

export class ProvisioningService {
  private instanceManager = new InstanceManager();

  async startProvisioning({ 
    sessionId, 
    onboardingData, 
    userId 
  }: ProvisioningRequest): Promise<ProvisioningResult> {
    try {
      const instanceToken = crypto.randomBytes(32).toString('hex');

      const instanceInfo = await this.instanceManager.launchInstance({
        onboardingData,
        userId,
        sessionId,
        instanceToken, 
      });

      await prisma.instanceProvisioning.create({
        data: {
          instanceId: instanceInfo.instanceId,
          userId,
          sessionId,
          instanceToken, 
          status: 'launching',
          onboardingData: JSON.stringify(onboardingData),
        },
      });

      return {
        instanceId: instanceInfo.instanceId,
        status: 'launching',
        message: 'Your ERP instance is being launched. You will receive an email when setup is complete.',
      };
    } catch (error) {
      console.error('Provisioning failed:', error);
      throw new Error(`Provisioning failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getProvisioningStatus(instanceId: string): Promise<ProvisioningResult | null> {
    try {
      const [instanceInfo, provisioningRecord] = await Promise.all([
        this.instanceManager.getInstanceStatus(instanceId),
        prisma.instanceProvisioning.findUnique({ where: { instanceId } }),
      ]);

      if (!instanceInfo || !provisioningRecord) {
        return null;
      }

      const status = this.determineStatus(instanceInfo.state, provisioningRecord);

      if (status === 'completed' && provisioningRecord.status !== 'completed') {
        await this.updateProvisioningStatus(instanceId, 'completed');
      }

      return {
        instanceId,
        status,
        message: this.getStatusMessage(status),
      };
    } catch (error) {
      console.error('Failed to get provisioning status:', error);
      return null;
    }
  }

  async updateProvisioningStatus(instanceId: string, status: string): Promise<void> {
    try {
      await prisma.instanceProvisioning.update({
        where: { instanceId },
        data: {
          status,
          updatedAt: new Date(),
          ...(status === 'completed' && { completedAt: new Date() }),
        },
      });
    } catch (error) {
      console.error('Failed to update provisioning status:', error);
    }
  }

  async getProvisioningRecord(instanceId: string) {
    return await prisma.instanceProvisioning.findUnique({
      where: { instanceId },
    });
  }

  // New method to validate instance token
  async validateInstanceToken(instanceId: string, token: string): Promise<boolean> {
    const record = await prisma.instanceProvisioning.findUnique({
      where: { instanceId },
      select: { instanceToken: true },
    });

    return record?.instanceToken === token;
  }

  private determineStatus(instanceState: string, provisioningRecord: any): ProvisioningResult['status'] {
    if (provisioningRecord.status === 'completed') {
      return 'completed';
    }

    if (provisioningRecord.status === 'failed') {
      return 'failed';
    }

    switch (instanceState) {
      case 'pending':
        return 'launching';
      case 'running':
        return provisioningRecord.status === 'launching' ? 'configuring' : 'running';
      case 'terminated':
      case 'stopping':
      case 'stopped':
      case 'shutting-down':
        return 'failed';
      case 'rebooting':
        return 'configuring';
      default:
        console.warn(`Unknown instance state: ${instanceState}`);
        return 'launching';
    }
  }

  private getStatusMessage(status: ProvisioningResult['status']): string {
    switch (status) {
      case 'launching':
        return 'Launching your ERP instance...';
      case 'running':
        return 'Instance is running, finalizing configuration...';
      case 'configuring':
        return 'Setting up your ERP system with your business data...';
      case 'completed':
        return 'Setup complete! Check your email for access details.';
      case 'failed':
        return 'Setup failed. Please contact support.';
      default:
        return 'Processing...';
    }
  }
}