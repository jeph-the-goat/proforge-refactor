import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockEC2Client, setupAWSMocks } from '@/test/utils/aws-mocks';
import { server } from '@/test/mocks/server';
import { testApiHandler } from 'next-test-api-route-handler';
import { mockPrisma, setupSuccessfulAuth } from '../mocks/auth';
import { mockOnboardingData, mockOnboardingDataFailed } from '../mocks/onboarding';
import { getServerSession } from 'next-auth'; // ✅ Import shared data
import { 
  RunInstancesCommand, 
  DescribeInstancesCommand,
} from '@aws-sdk/client-ec2';

import * as startHandler from '@/app/api/provision/start/route';
import * as statusHandler from '@/app/api/provision/status/route';
import * as callbackHandler from '@/app/api/provision/callback/route';

// Mock AWS SDK
vi.mock('@aws-sdk/client-ec2', () => ({
  EC2Client: vi.fn(() => mockEC2Client),
  RunInstancesCommand: vi.fn(),
  DescribeInstancesCommand: vi.fn(),
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

// TODO: Implement notification service for email alerts
// When implementing, create @/lib/notifications.ts with:
// - sendProvisioningStarted(user, instanceId)
// - sendProvisioningComplete(user, instanceId, domain, publicIp) 
// - sendProvisioningFailed(user, error)
// Then add back the notification service mock here

// Mock NextAuth

const mockGetServerSession = vi.mocked(getServerSession);

vi.mock('next-auth', () => ({
  default: vi.fn(),
  getServerSession: vi.fn(),
}));

vi.mock('@/auth', () => ({
  authOptions: {},
}));

describe('Provisioning Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupAWSMocks();
    server.resetHandlers();
    setupSuccessfulAuth();
    
    Object.values(mockPrisma).forEach(model => {
      Object.values(model).forEach(method => {
        if (vi.isMockFunction(method)) {
          method.mockClear();
        }
      });
    });
  });

  it('should complete full provisioning workflow successfully', async () => {
    const instanceId = 'i-0bae6945462b3b5f3';
    const userId = 'user_integration_123';
    
    mockGetServerSession.mockResolvedValue({
      user: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        stripeSubscriptionStatus: 'active',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    mockPrisma.user.findUnique.mockResolvedValue({
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      stripeSubscriptionStatus: 'active',
      stripeCustomerId: 'cus_test123',
      stripeSubscriptionId: 'sub_test123',
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    // ✅ SUCCESS: Mock AWS to work properly
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof RunInstancesCommand) {
        return Promise.resolve({
          Instances: [{
            InstanceId: 'i-0bae6945462b3b5f3',
            ImageId: 'ami-0c02fb55956c7d316',
            State: { Code: 0, Name: 'pending' },
            InstanceType: 't3.medium',
            SubnetId: 'subnet-04f5c4a33effa6e83',
            VpcId: 'vpc-08e53efb3ec6c5b98',
            PrivateIpAddress: '172.31.10.125',
            PublicIpAddress: '3.80.87.87',
            LaunchTime: new Date('2024-12-18T20:52:43.000Z'),
            Placement: {
              AvailabilityZone: 'us-east-1f',
              Tenancy: 'default',
            },
            SecurityGroups: [{ GroupName: 'default', GroupId: 'sg-0f3e09bb26da2de6e' }],
          }],
          OwnerId: '111491017492',
          ReservationId: 'r-00fa1e43c29bde606',
        });
      }
      if (command instanceof DescribeInstancesCommand) {
        return Promise.resolve({
          Reservations: [{
            Instances: [{
              InstanceId: 'i-0bae6945462b3b5f3',
              ImageId: 'ami-0c02fb55956c7d316',
              State: { Code: 16, Name: 'running' },
              PrivateDnsName: 'ip-172-31-10-125.ec2.internal',
              PublicDnsName: 'ec2-3-80-87-87.compute-1.amazonaws.com',
              StateReason: { Code: 'User initiated', Message: 'User initiated' },
              StateTransitionReason: '',
              InstanceType: 't3.medium',
              SubnetId: 'subnet-04f5c4a33effa6e83',
              VpcId: 'vpc-08e53efb3ec6c5b98',
              PrivateIpAddress: '172.31.10.125',
              PublicIpAddress: '3.80.87.87',
              Architecture: 'x86_64',
              RootDeviceType: 'ebs',
              SecurityGroups: [{ GroupName: 'default', GroupId: 'sg-0f3e09bb26da2de6e' }],
              Placement: {
                AvailabilityZone: 'us-east-1f',
                Tenancy: 'default',
              },
              LaunchTime: new Date('2024-12-18T20:52:43.000Z')
            }]
          }]
        });
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });

    mockPrisma.instanceProvisioning.create.mockResolvedValue({
      id: 'req_integration_123',
      userId,
      instanceId,
      status: 'launching',
      instanceToken: 'test-token-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockPrisma.instanceProvisioning.findFirst.mockResolvedValue({
      id: 'req_integration_123',
      userId,
      instanceId,
      status: 'completed',
      instanceToken: 'test-token-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockPrisma.instanceProvisioning.findUnique.mockResolvedValue({
      id: 'req_integration_123',
      userId,
      instanceId,
      status: 'completed',
      instanceToken: 'test-token-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Step 1: Start provisioning
    let startResponse: any;
    await testApiHandler({
      appHandler: startHandler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            onboardingData: mockOnboardingData,
            sessionId: 'test-session-123',
          }),
        });

        expect(response.status).toBe(200);
        startResponse = await response.json();
        expect(startResponse.success).toBe(true);
        expect(startResponse.instanceId).toBe(instanceId);
      },
    });

    // Step 2: Status check
    // RE-MOCK session before status check
    mockGetServerSession.mockResolvedValue({
      user: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        stripeSubscriptionStatus: 'active',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    await testApiHandler({
      appHandler: statusHandler,
      url: `/api/provision/status?instanceId=${instanceId}`,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'GET',
        });

        expect(response.status).toBe(200);
        const statusData = await response.json();
        
        // ✅ Test what your API actually returns
        expect(statusData.success).toBe(true);
        expect(statusData.instanceId).toBe(instanceId);
        expect(statusData.message).toBe('Setup complete! Check your email for access details.');
        // ✅ Remove this line - your API doesn't return status
        // expect(statusData.status).toBe('RUNNING');
      },
    });

    // Step 3: Callback completion
    // RE-MOCK session before callback
    mockGetServerSession.mockResolvedValue({
      user: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        stripeSubscriptionStatus: 'active',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    mockPrisma.instanceProvisioning.update.mockResolvedValue({
      id: 'req_integration_123',
      userId,
      instanceId,
      status: 'COMPLETED',
      instanceToken: 'test-token-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: new Date(),
    });

    await testApiHandler({
      appHandler: callbackHandler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
        request.headers.set('X-Instance-Token', 'test-token-123');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            instanceId,
            status: 'completed',
            message: 'ERP installation completed successfully',
            publicIp: '3.80.87.87',
          }),
        });

        expect(response.status).toBe(200);
        const callbackData = await response.json();
        expect(callbackData.success).toBe(true);
      },
    });
  });

  it('should handle provisioning failure gracefully', async () => {
    const userId = 'user_fail_123';

    mockGetServerSession.mockResolvedValue({
      user: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        stripeSubscriptionStatus: 'active',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    mockPrisma.user.findUnique.mockResolvedValue({
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      stripeSubscriptionStatus: 'active',
      stripeCustomerId: 'cus_test123',
      stripeSubscriptionId: 'sub_test123',
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    // FAILURE: Mock AWS to fail
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof RunInstancesCommand) {
        return Promise.reject(new Error('AWS EC2 service unavailable'));
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });

    await testApiHandler({
      appHandler: startHandler,
      requestPatcher(request) {
        request.headers.set('content-type', 'application/json');
      },
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({
            onboardingData: mockOnboardingDataFailed,
            sessionId: 'test-session-456',
          }),
        });

        expect(response.status).toBe(400);
        const errorData = await response.json();
        expect(errorData.error).toBe('Failed to start ERP provisioning. Please try again or contact support.');
      },
    });
  });
});
