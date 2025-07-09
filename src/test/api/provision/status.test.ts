import { testApiHandler } from 'next-test-api-route-handler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getServerSession } from 'next-auth';
import { mockPrisma, mockUserSession, setupSuccessfulAuth } from '../../mocks/auth';

const mockProvisionManager = vi.hoisted(() => ({
  getProvisioningStatus: vi.fn(),
}));

const mockGetServerSession = vi.mocked(getServerSession);

vi.mock('next-auth', () => ({
  default: vi.fn(),
  getServerSession: vi.fn(),
}));

vi.mock('@/auth', () => ({
  authOptions: {},
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

vi.mock('@/lib/provisioning/provision-manager', () => ({
  ProvisionManager: vi.fn(() => mockProvisionManager),
}));

import * as handler from '@/app/api/provision/status/route';

describe('/api/provision/status', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetServerSession.mockClear();
    
    Object.values(mockPrisma).forEach(model => {
      Object.values(model).forEach(method => {
        if (vi.isMockFunction(method)) {
          method.mockClear();
        }
      });
    });
  });

  it('should return provisioning status when authenticated', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.getProvisioningStatus.mockResolvedValue({
      success: true,
      instanceId: 'i-1234567890abcdef0',
      message: 'ERP provisioning in progress',
      redirectUrl: '/setup/status/i-1234567890abcdef0'
    });

    await testApiHandler({
      appHandler: handler,
      url: '/api/provision/status?instanceId=i-1234567890abcdef0',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data).toEqual({
          success: true,
          instanceId: 'i-1234567890abcdef0',
          message: 'ERP provisioning in progress',
          redirectUrl: '/setup/status/i-1234567890abcdef0'
        });
      },
    });
  });

  it('should return 401 when user is not authenticated', async () => {
    mockGetServerSession.mockResolvedValue(null);
    
    await testApiHandler({
      appHandler: handler,
      url: '/api/provision/status?instanceId=i-test123',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({
          error: 'Authentication required'
        });
      },
    });
  });

  it('should return 400 when instanceId is missing', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
          error: 'Instance ID is required'
        });
      },
    });
  });

  it('should return 404 when provisioning not found', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.getProvisioningStatus.mockResolvedValue(null);

    await testApiHandler({
      appHandler: handler,
      url: '/api/provision/status?instanceId=i-nonexistent',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({
          error: 'Provisioning record not found'
        });
      },
    });
  });

  it('should return 403 when user access denied', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.getProvisioningStatus.mockResolvedValue({
      success: false,
      message: 'Access denied.'
    });

    await testApiHandler({
      appHandler: handler,
      url: '/api/provision/status?instanceId=i-unauthorized',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(403);
        expect(await response.json()).toEqual({
          error: 'Access denied.'
        });
      },
    });
  });

  it('should handle internal server errors', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.getProvisioningStatus.mockRejectedValue(
      new Error('Database connection failed')
    );

    await testApiHandler({
      appHandler: handler,
      url: '/api/provision/status?instanceId=i-errortest',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({
          error: 'Internal server error'
        });
      },
    });
  });
});
