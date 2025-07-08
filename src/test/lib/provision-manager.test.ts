import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProvisionManager } from '@/lib/provisioning/provision-manager';
import type { User } from '@prisma/client';
import { mockOnboardingData } from '../mocks/onboarding'; 

const mockProvisioningService = vi.hoisted(() => ({
  startProvisioning: vi.fn(),
  getProvisioningStatus: vi.fn(),
  getProvisioningRecord: vi.fn(),
}));

vi.mock('@/lib/provisioning/provision-service', () => ({
  ProvisioningService: vi.fn(() => mockProvisioningService),
}));

describe('ProvisionManager', () => {
  let provisionManager: ProvisionManager;
  
  const mockUser: User = {
    id: 'user_123',
    email: 'test@example.com',
    name: 'Test User',
    image: null,
    emailVerified: new Date(),
    password: null,
    stripeCustomerId: 'cus_test123',
    stripeSubscriptionId: 'sub_test123',
    stripeSubscriptionStatus: 'active',
    stripePriceId: null,
    stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    checkoutData: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    provisionManager = new ProvisionManager();
  });

  describe('startERPProvisioning', () => {
    it('should start provisioning for user with active subscription', async () => {
      mockProvisioningService.startProvisioning.mockResolvedValue({
        instanceId: 'i-0bae6945462b3b5f3',
        status: 'launching',
        message: 'Your ERP instance is being launched. You will receive an email when setup is complete.'
      });

      const result = await provisionManager.startERPProvisioning({
        user: mockUser,
        onboardingData: mockOnboardingData, 
        sessionId: 'session_123',
      });

      expect(result.success).toBe(true);
      expect(result.instanceId).toBe('i-0bae6945462b3b5f3');
      
      expect(result.message).toBe('ERP provisioning started successfully. You will receive an email when setup is complete.');

      expect(mockProvisioningService.startProvisioning).toHaveBeenCalledWith({
        userId: mockUser.id,
        onboardingData: mockOnboardingData,
        sessionId: 'session_123',
      });
    });

    it('should reject user without active subscription', async () => {
      const userWithoutSubscription = {
        ...mockUser,
        stripeSubscriptionStatus: 'canceled' as const,
      };

      const result = await provisionManager.startERPProvisioning({
        user: userWithoutSubscription,
        onboardingData: mockOnboardingData,
        sessionId: 'session_123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Valid subscription required to provision ERP system.');
      
      expect(mockProvisioningService.startProvisioning).not.toHaveBeenCalled();
    });

    it('should handle provisioning service errors', async () => {
      mockProvisioningService.startProvisioning.mockRejectedValue(
        new Error('AWS Error: Insufficient capacity')
      );

      const result = await provisionManager.startERPProvisioning({
        user: mockUser,
        onboardingData: mockOnboardingData,
        sessionId: 'session_123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to start ERP provisioning. Please try again or contact support.');
      expect(result.instanceId).toBeUndefined();
    });

    it('should accept user with trialing subscription', async () => {
      const trialingUser = {
        ...mockUser,
        stripeSubscriptionStatus: 'trialing' as const,
      };

      mockProvisioningService.startProvisioning.mockResolvedValue({
        instanceId: 'i-trial123456789',
        status: 'launching',
        message: 'Your ERP instance is being launched. You will receive an email when setup is complete.'
      });

      const result = await provisionManager.startERPProvisioning({
        user: trialingUser,
        onboardingData: mockOnboardingData,
        sessionId: 'session_trial',
      });

      expect(result.success).toBe(true);
      expect(result.instanceId).toBe('i-trial123456789');
    });
  });

  describe('getProvisioningStatus', () => {
    it('should return status for valid user and instance', async () => {
      const instanceId = 'i-0bae6945462b3b5f3';
      const userId = 'user_123';

      // Mock both service calls that the method makes
      mockProvisioningService.getProvisioningStatus.mockResolvedValue({
        instanceId,
        status: 'running',
        message: 'ERP system is being configured',
      });

      mockProvisioningService.getProvisioningRecord.mockResolvedValue({
        userId,
        instanceId,
        status: 'PROVISIONING',
      });

      const result = await provisionManager.getProvisioningStatus(instanceId, userId);

      expect(result?.success).toBe(true);
      expect(result?.instanceId).toBe(instanceId);
      expect(result?.message).toBe('ERP system is being configured');
    });

    it('should deny access for wrong user', async () => {
      const instanceId = 'i-0bae6945462b3b5f3';
      const requestingUserId = 'user_456';
      const ownerUserId = 'user_123';

      mockProvisioningService.getProvisioningStatus.mockResolvedValue({
        instanceId,
        status: 'running',
        message: 'ERP system is being configured',
      });

      mockProvisioningService.getProvisioningRecord.mockResolvedValue({
        userId: ownerUserId,
        instanceId,
        status: 'PROVISIONING',
      });

      const result = await provisionManager.getProvisioningStatus(instanceId, requestingUserId);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe('Access denied.');
    });

    it('should return null for non-existent instance', async () => {
      const instanceId = 'i-nonexistent';
      const userId = 'user_123';

      mockProvisioningService.getProvisioningStatus.mockResolvedValue(null);

      const result = await provisionManager.getProvisioningStatus(instanceId, userId);

      expect(result).toBeNull();
    });

    it('should handle service errors gracefully', async () => {
      const instanceId = 'i-0bae6945462b3b5f3';
      const userId = 'user_123';

      mockProvisioningService.getProvisioningStatus.mockRejectedValue(
        new Error('Database connection failed')
      );

      const result = await provisionManager.getProvisioningStatus(instanceId, userId);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe('Unable to retrieve status. Please try again.');
    });
  });
});
