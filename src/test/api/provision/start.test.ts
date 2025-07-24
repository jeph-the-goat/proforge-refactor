import { testApiHandler } from 'next-test-api-route-handler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getServerSession } from 'next-auth';
import { mockPrisma, mockUserSession, setupSuccessfulAuth } from '../../mocks/auth';
import {
  mockOnboardingData,
  mockOnboardingDataMinimal,
} from '../../mocks/onboarding'; // ✅ Import shared data

const mockProvisionManager = vi.hoisted(() => ({
  startERPProvisioning: vi.fn(),
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

// ✅ Update the schema mock to use the shared data structure
vi.mock('@/lib/schemas/onboarding', () => ({
  OnboardingDataSchema: {
    safeParse: vi.fn().mockReturnValue({
      success: true,
      data: mockOnboardingData, // ✅ Use the complete shared data
    }),
  },
}));


// Mock the validation function
vi.mock('@/lib/schemas/onboarding', async () => {
  const actual = await vi.importActual('@/lib/schemas/onboarding');
  return {
    ...actual,
    validateOnboardingData: vi.fn()
  };
});

// Get the mocked function with proper typing
const mockValidateOnboardingData = vi.mocked(validateOnboardingData);

import * as handler from '@/app/api/provision/start/route';
import {validateOnboardingData} from "@/lib/schemas/onboarding";

describe('/api/provision/start', () => {
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

  it('should successfully start ERP provisioning', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.startERPProvisioning.mockResolvedValue({
      success: true,
      instanceId: 'i-0bae6945462b3b5f3',
      redirectUrl: '/setup/status/i-0bae6945462b3b5f3',
      message: 'ERP provisioning started successfully',
    });

    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            onboardingData: mockOnboardingData, // ✅ Use complete shared data
          }),
        });

        expect(response.status).toBe(200);
        
        const data = await response.json();
        expect(data).toEqual({
          success: true,
          message: 'ERP provisioning started successfully',
          instanceId: 'i-0bae6945462b3b5f3',
          redirectUrl: '/setup/status/i-0bae6945462b3b5f3',
        });
      },
    });
  });

  it('should return 401 when user is not authenticated', async () => {
    mockGetServerSession.mockResolvedValue(null);
    
    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({}),
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({
          error: 'Authentication required'
        });
      },
    });
  });

  it('should handle provisioning service errors', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.startERPProvisioning.mockResolvedValue({
      success: false,
      message: 'Valid subscription required to provision ERP system.',
      redirectUrl: '/pricing',
    });

    mockValidateOnboardingData.mockReturnValue(mockOnboardingData);


    await testApiHandler({
      appHandler: handler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            onboardingData: mockOnboardingDataMinimal, // ✅ Use minimal variant for error case
          }),
        });

        expect(response.status).toBe(400);
        
        const data = await response.json();
        expect(data).toEqual({
          error: 'Valid subscription required to provision ERP system.',
          redirectUrl: '/pricing',
        });
      },
    });
  });

  it('should handle unexpected errors', async () => {
    mockGetServerSession.mockResolvedValue(mockUserSession);
    setupSuccessfulAuth();

    mockProvisionManager.startERPProvisioning.mockRejectedValue(
      new Error('Database connection failed')
    );

    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            onboardingData: mockOnboardingData, // ✅ Use complete shared data
          }),
        });

        expect(response.status).toBe(500);
        
        const data = await response.json();
        expect(data).toEqual({
          error: 'Internal server error',
        });
      },
    });
  });
});
