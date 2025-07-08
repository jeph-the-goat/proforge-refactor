import {
  RunInstancesCommand,
  DescribeInstancesCommand,
  Instance,
  InstanceState,
} from "@aws-sdk/client-ec2";
import { vi } from "vitest";

// Mock data for instances
export const createMockInstance = (overrides: Partial<Instance> = {}): Instance => ({
  InstanceId: `i-${Math.random().toString(36).substring(2, 17)}`,
  ImageId: "ami-0abcdef1234567890",
  State: {
    Code: 16,
    Name: "running",
  } as InstanceState,
  PrivateIpAddress: "10.0.1.12",
  PublicIpAddress: "203.0.113.12",
  PublicDnsName: "ec2-203-0-113-12.compute-1.amazonaws.com",
  InstanceType: "t3.medium",
  LaunchTime: new Date("2023-05-10T09:47:20.000Z"),
  Placement: {
    AvailabilityZone: "us-east-1c",
  },
  SecurityGroups: [
    {
      GroupId: "sg-1234567890abcdef0",
      GroupName: "proforge-security-group",
    },
  ],
  SubnetId: "subnet-1234567890abcdef0",
  VpcId: "vpc-1234567890abcdef0",
  Architecture: "x86_64",
  RootDeviceType: "ebs",
  VirtualizationType: "hvm",
  Hypervisor: "xen",
  ...overrides,
});

// Create mock EC2 client
export const mockEC2Client = {
  send: vi.fn(),
};

// Mock responses for different scenarios
export const mockEC2Responses = {
  // Successful instance launch (RunInstances)
  runInstances: {
    Instances: [
      createMockInstance({
        State: {
          Code: 0,
          Name: "pending",
        } as InstanceState,
        PublicIpAddress: undefined,
        PublicDnsName: undefined,
      }),
    ],
    ReservationId: "r-1234567890abcdef0",
    OwnerId: "111122223333",
  },

  // Instance status (DescribeInstances) - running
  describeInstancesRunning: {
    Reservations: [
      {
        ReservationId: "r-1234567890abcdef0",
        OwnerId: "111122223333",
        Instances: [createMockInstance()],
      },
    ],
  },

  // Instance status (DescribeInstances) - pending
  describeInstancesPending: {
    Reservations: [
      {
        ReservationId: "r-1234567890abcdef0",
        OwnerId: "111122223333",
        Instances: [
          createMockInstance({
            State: { Code: 0, Name: "pending" } as InstanceState,
            PublicIpAddress: undefined,
            PublicDnsName: undefined,
          }),
        ],
      },
    ],
  },

  // Instance status (DescribeInstances) - terminated
  describeInstancesTerminated: {
    Reservations: [
      {
        ReservationId: "r-1234567890abcdef0",
        OwnerId: "111122223333",
        Instances: [
          createMockInstance({
            State: { Code: 48, Name: "terminated" } as InstanceState,
            PublicIpAddress: undefined,
            PublicDnsName: undefined,
          }),
        ],
      },
    ],
  },
};

// Helper to setup default AWS mocks
export function setupAWSMocks() {
  // Setup default mock responses
  mockEC2Client.send.mockImplementation((command) => {
    if (command instanceof RunInstancesCommand) {
      return Promise.resolve(mockEC2Responses.runInstances);
    }
    if (command instanceof DescribeInstancesCommand) {
      return Promise.resolve(mockEC2Responses.describeInstancesRunning);
    }
    return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
  });
}

// Helper to mock specific AWS scenarios
export const mockAWSScenarios = {
  // Mock successful instance launch
  successfulLaunch: () => {
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof RunInstancesCommand) {
        return Promise.resolve({
          Instances: [
            createMockInstance({
              InstanceId: "i-success123456789",
              State: { Code: 0, Name: "pending" } as InstanceState,
            }),
          ],
        });
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });
  },

  // Mock instance launch failure
  launchFailure: () => {
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof RunInstancesCommand) {
        return Promise.reject(
          new Error("InsufficientInstanceCapacity: Insufficient capacity in availability zone")
        );
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });
  },

  // Mock running instance
  runningInstance: (instanceId: string = "i-running123456789") => {
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof DescribeInstancesCommand) {
        return Promise.resolve({
          Reservations: [
            {
              Instances: [
                createMockInstance({
                  InstanceId: instanceId,
                  State: { Code: 16, Name: "running" } as InstanceState,
                  PublicIpAddress: "203.0.113.12",
                  PublicDnsName: "ec2-203-0-113-12.compute-1.amazonaws.com",
                }),
              ],
            },
          ],
        });
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });
  },

  // Mock terminated instance
  terminatedInstance: (instanceId: string = "i-terminated123456") => {
    mockEC2Client.send.mockImplementation((command) => {
      if (command instanceof DescribeInstancesCommand) {
        return Promise.resolve({
          Reservations: [
            {
              Instances: [
                createMockInstance({
                  InstanceId: instanceId,
                  State: { Code: 48, Name: "terminated" } as InstanceState,
                  PublicIpAddress: undefined,
                  PublicDnsName: undefined,
                }),
              ],
            },
          ],
        });
      }
      return Promise.reject(new Error(`Unmocked command: ${command.constructor.name}`));
    });
  },
};
