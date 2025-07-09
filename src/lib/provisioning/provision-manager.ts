import { ProvisioningService } from './provision-service';
import type { OnboardingData } from '@/lib/schemas/onboarding';
import type { User } from '@prisma/client';

export interface ProvisionManagerRequest {
  user: User;
  onboardingData: OnboardingData;
  sessionId: string;
}

export interface ProvisionManagerResult {
  success: boolean;
  instanceId?: string;
  message: string;
  redirectUrl?: string;
  status?: string;
  progress?: number;
}

export class ProvisionManager {
  private provisioningService = new ProvisioningService();

  async startERPProvisioning({
    user,
    onboardingData,
    sessionId,    }: ProvisionManagerRequest): Promise<ProvisionManagerResult> {
    try {
      if (!this.hasValidSubscription(user)) {
        return {
          success: false,
          message: 'Valid subscription required to provision ERP system.',
          redirectUrl: '/pricing',
        };
      }

      const result = await this.provisioningService.startProvisioning({
        userId: user.id,
        onboardingData,
        sessionId,
      });

      return {
        success: true,
        instanceId: result.instanceId,
        message: 'ERP provisioning started successfully. You will receive an email when setup is complete.',
        redirectUrl: `/setup/status/${result.instanceId}`,
      };
    } catch (error) {
      console.error('Provision manager error:', error);
      return {
        success: false,
        message: 'Failed to start ERP provisioning. Please try again or contact support.',
      };
    }
  }

  async getProvisioningStatus(instanceId: string, userId: string): Promise<ProvisionManagerResult | null> {
    try {
      const status = await this.provisioningService.getProvisioningStatus(instanceId);
      
      if (!status) {
        return null;
      }

      const provisioning = await this.provisioningService.getProvisioningRecord(instanceId);
      if (provisioning?.userId !== userId) {
        return {
          success: false,
          message: 'Access denied.',
        };
      }

      const progress = this.calculateProgress(status.status);
      
      return {
        success: true,
        instanceId: status.instanceId,
        message: status.message || 'Processing...',
        status: status.status,
        progress,
        ...(status.status === 'completed' && {
          redirectUrl: `/setup/complete?instanceId=${instanceId}`
        })
      };
    } catch (error) {
      console.error('Failed to get provisioning status:', error);
      return {
        success: false,
        message: 'Unable to retrieve status. Please try again.',
      };
    }
  }

  private calculateProgress(status: string): number {
    switch (status) {
      case 'launching':
        return 25;
      case 'running':
        return 50;
      case 'configuring':
        return 75;
      case 'completed':
        return 100;
      case 'failed':
        return 0;
      default:
        return 15;
    }
  }

  private hasValidSubscription(user: User): boolean {
    return !!(
      user.stripeSubscriptionStatus === 'active' ||
      user.stripeSubscriptionStatus === 'trialing'
    );
  }
}