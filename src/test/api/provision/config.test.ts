import { testApiHandler } from 'next-test-api-route-handler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockPrisma } from '../../mocks/auth';

const mockProvisioningService = vi.hoisted(() => ({
  validateInstanceToken: vi.fn(),
  getProvisioningRecord: vi.fn(),
}));

vi.mock('@/lib/provisioning/provision-service', () => ({
  ProvisioningService: vi.fn(() => mockProvisioningService),
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

import * as handler from '@/app/api/provision/config/[instanceId]/route';

describe('/api/provision/config/[instanceId]', () => {
  beforeEach(() => {
    // ✅ Don't clear the service mocks - just reset them
    mockProvisioningService.validateInstanceToken.mockClear();
    mockProvisioningService.getProvisioningRecord.mockClear();
    
    // Only clear Prisma mocks
    Object.values(mockPrisma).forEach(model => {
      Object.values(model).forEach(method => {
        if (vi.isMockFunction(method)) {
          method.mockClear();
        }
      });
    });
  });

  it('should return configuration for valid instance', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(true);
    
    const configData = {
      businessInfo: { companyName: 'Test Company' },
      businessStructure: { type: 'corporation' },
      chartOfAccounts: { basedOn: 'standard' },
      moduleSelection: { modules: ['accounting', 'sales'] },
      userSetup: { adminUser: { email: 'admin@test.com' } }
    };
    
    // ✅ Mock returns a provisioning OBJECT with onboardingData property
    mockProvisioningService.getProvisioningRecord.mockResolvedValue({
      userId: 'user_123',
      onboardingData: JSON.stringify(configData) // ✅ onboardingData is the JSON string
    });

    await testApiHandler({
      appHandler: handler,
      params: { instanceId: 'i-0bae6945462b3b5f3' },
      requestPatcher(request) {
        request.headers.set('X-Instance-Token', 'valid-token-123');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data).toEqual({
          instanceId: 'i-0bae6945462b3b5f3',
          userId: 'user_123',
          businessInfo: configData.businessInfo,
          businessStructure: configData.businessStructure,
          chartOfAccounts: configData.chartOfAccounts,
          moduleSelection: configData.moduleSelection,
          userSetup: configData.userSetup,
          companyLogo: null
        });

        expect(mockProvisioningService.validateInstanceToken).toHaveBeenCalledWith(
          'i-0bae6945462b3b5f3',
          'valid-token-123'
        );
        expect(mockProvisioningService.getProvisioningRecord).toHaveBeenCalledWith(
          'i-0bae6945462b3b5f3'
        );
      },
    });
  });

  it('should reject requests with invalid token', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(false);

    await testApiHandler({
      appHandler: handler,
      params: { instanceId: 'i-0bae6945462b3b5f3' },
      requestPatcher(request) {
        request.headers.set('X-Instance-Token', 'invalid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({
          error: 'Invalid instance token'
        });
      },
    });
  });

  it('should reject requests with missing token', async () => {
    await testApiHandler({
      appHandler: handler,
      params: { instanceId: 'i-0bae6945462b3b5f3' },
      requestPatcher(request) {
        // No X-Instance-Token header
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({
          error: 'Instance token required'
        });
      },
    });
  });

  it('should handle non-existent instance', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(true);
    mockProvisioningService.getProvisioningRecord.mockResolvedValue(null);

    await testApiHandler({
      appHandler: handler,
      params: { instanceId: 'i-nonexistent' },
      requestPatcher(request) {
        request.headers.set('X-Instance-Token', 'valid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({
          error: 'Instance not found'
        });
      },
    });
  });

  it('should handle internal server errors', async () => {
    mockProvisioningService.validateInstanceToken.mockRejectedValue(
      new Error('Database connection failed')
    );

    await testApiHandler({
      appHandler: handler,
      params: { instanceId: 'i-errortest' },
      requestPatcher(request) {
        request.headers.set('X-Instance-Token', 'valid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({
          error: 'Failed to fetch configuration'
        });
      },
    });
  });
});
