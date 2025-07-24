import { testApiHandler } from 'next-test-api-route-handler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockPrisma } from '../../mocks/auth';

const mockProvisioningService = vi.hoisted(() => ({
  validateInstanceToken: vi.fn(),
  updateProvisioningStatus: vi.fn(),
}));

vi.mock('@/lib/provisioning/provision-service', () => ({
  ProvisioningService: vi.fn(() => mockProvisioningService),
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

import * as handler from '@/app/api/provision/callback/route';

describe('/api/provision/callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    Object.values(mockPrisma).forEach(model => {
      Object.values(model).forEach(method => {
        if (vi.isMockFunction(method)) {
          method.mockClear();
        }
      });
    });
  });

  it('should handle successful instance ready callback', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(true);
    mockProvisioningService.updateProvisioningStatus.mockResolvedValue(undefined);

    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'valid-instance-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-0bae6945462b3b5f3',
            status: 'completed',
            message: 'ERP installation completed successfully',
            timestamp: new Date().toISOString(),
            publicIp: '3.80.87.87'
          }),
        });

        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data).toEqual({
          success: true,
          message: 'Status updated successfully',
        });

        expect(mockProvisioningService.validateInstanceToken).toHaveBeenCalledWith(
          'i-0bae6945462b3b5f3',
          'valid-instance-token'
        );
        expect(mockProvisioningService.updateProvisioningStatus).toHaveBeenCalledWith(
          'i-0bae6945462b3b5f3',
          'completed'
        );
      },
    });
  });

  it('should handle failed instance callback', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(true);
    mockProvisioningService.updateProvisioningStatus.mockResolvedValue(undefined);

    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'valid-instance-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-failed123',
            status: 'failed',
            message: 'ERPNext installation failed'
          }),
        });

        expect(response.status).toBe(200);
        expect(mockProvisioningService.updateProvisioningStatus).toHaveBeenCalledWith(
          'i-failed123',
          'failed'
        );
      },
    });
  });

  it('should return 400 when required fields are missing', async () => {
    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'valid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-0bae6945462b3b5f3',
            // Missing status
          }),
        });

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
          error: 'Instance ID, status, and token are required'
        });
      },
    });
  });

  it('should return 401 when token is invalid', async () => {
    mockProvisioningService.validateInstanceToken.mockResolvedValue(false);

    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'invalid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-0bae6945462b3b5f3',
            status: 'running',
          }),
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({
          error: 'Unauthorized'
        });
      },
    });
  });

  it('should return 401 when token header is missing', async () => {
    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        // No X-Instance-Token header
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-0bae6945462b3b5f3',
            status: 'running',
          }),
        });

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
          error: 'Instance ID, status, and token are required'
        });
      },
    });
  });

  it('should handle internal server errors', async () => {
    mockProvisioningService.validateInstanceToken.mockRejectedValue(new Error('Database error'));

    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'valid-token');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId: 'i-0bae6945462b3b5f3',
            status: 'running',
          }),
        });

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({
          error: 'Internal server error'
        });
      },
    });
  });
});
