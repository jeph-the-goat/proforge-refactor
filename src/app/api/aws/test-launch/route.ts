import { NextRequest, NextResponse } from 'next/server';
import { EC2Client, RunInstancesCommand, DescribeInstancesCommand, type RunInstancesCommandInput } from '@aws-sdk/client-ec2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!process.env.API_AWS_ACCESS_KEY_ID || !process.env.API_AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS credentials not found in environment variables');
    }

    const region = process.env.API_AWS_REGION || 'us-east-1';
    
    // Initialize EC2 client
    const ec2Client = new EC2Client({
      region: region,
      credentials: {
        accessKeyId: process.env.API_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY,
      },
      maxAttempts: 3,
    });


    // Use parameters from env file only
    const instanceType = body.instanceType || process.env.API_AWS_INSTANCE_TYPE;
    const amiId = body.amiId || process.env.API_AWS_AMI_ID;
    const securityGroupId = body.securityGroupId || process.env.API_AWS_SECURITY_GROUP_ID;
    const subnetId = body.subnetId || process.env.API_AWS_SUBNET_ID;

    // Validate required parameters
    if (!amiId) {
      throw new Error('API_AWS_AMI_ID not found in environment variables');
    }
    if (!instanceType) {
      throw new Error('API_AWS_INSTANCE_TYPE not found in environment variables');
    }
    if (!securityGroupId) {
      throw new Error('API_AWS_SECURITY_GROUP_ID not found in environment variables');
    }
    if (!subnetId) {
      throw new Error('API_AWS_SUBNET_ID not found in environment variables');
    }

    // Simple user data script for testing
    const userData = `#!/bin/bash
echo "ProForge ERP Test Instance Started at $(date)" > /tmp/proforge-test.log
echo "Test payload: ${JSON.stringify(body)}" >> /tmp/proforge-test.log
`;

    const runInstancesParams: RunInstancesCommandInput = {
      ImageId: amiId,
      InstanceType: instanceType,
      MinCount: 1,
      MaxCount: 1,
      UserData: Buffer.from(userData).toString('base64'),
      SecurityGroupIds: [securityGroupId],
      SubnetId: subnetId,
      TagSpecifications: [
        {
          ResourceType: 'instance' as const,
          Tags: [
            { Key: 'Name', Value: `ProForge-Test-${Date.now()}` },
            { Key: 'Project', Value: 'ProForge-ERP-Test' },
            { Key: 'Environment', Value: 'test' },
            { Key: 'CreatedBy', Value: 'direct-api-test' },
            { Key: 'TestRun', Value: new Date().toISOString() },
          ],
        },
      ],
    };


    // Launch the instance
    const runCommand = new RunInstancesCommand(runInstancesParams);
    const runResponse = await ec2Client.send(runCommand);

    const instance = runResponse.Instances?.[0];
    if (!instance?.InstanceId) {
      throw new Error('Failed to launch instance - no instance ID returned');
    }


    // Wait a moment for the instance to be available for describe calls
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get detailed instance information with retry logic
    let describeResponse;
    let detailedInstance;
    
    try {
      const describeCommand = new DescribeInstancesCommand({
        InstanceIds: [instance.InstanceId],
      });
      
      describeResponse = await ec2Client.send(describeCommand);
      detailedInstance = describeResponse.Reservations?.[0]?.Instances?.[0];
    } catch (describeError: any) {
      console.warn('Could not retrieve detailed instance info:', describeError.message);
      // Continue without detailed info rather than failing completely
      describeResponse = null;
      detailedInstance = null;
    }

    const result = {
      success: true,
      message: 'EC2 instance launched successfully!',
      data: {
        instanceId: instance.InstanceId,
        state: instance.State?.Name,
        instanceType: instance.InstanceType,
        imageId: instance.ImageId,
        launchTime: instance.LaunchTime,
        placement: instance.Placement,
        securityGroups: instance.SecurityGroups,
        tags: instance.Tags,
        // Detailed info from describe call
        detailed: detailedInstance ? {
          publicIpAddress: detailedInstance.PublicIpAddress,
          privateIpAddress: detailedInstance.PrivateIpAddress,
          publicDnsName: detailedInstance.PublicDnsName,
          privateDnsName: detailedInstance.PrivateDnsName,
          subnetId: detailedInstance.SubnetId,
          vpcId: detailedInstance.VpcId,
        } : {
          note: 'Detailed instance info not available yet - instance is still initializing'
        }
      },
      awsResponse: {
        runInstances: runResponse,
        describeInstances: describeResponse,
      }
    };


    return NextResponse.json(result);

  } catch (error: any) {
    
    const errorResult = {
      success: false,
      message: 'Failed to launch EC2 instance',
      error: error.message,
      errorCode: error.Code,
      requestId: error.RequestId,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };

    
    return NextResponse.json(errorResult, { status: 500 });
  }
}

// GET method to check current configuration
export async function GET() {
  try {
    const config = {
      awsRegion: process.env.API_AWS_REGION || 'us-east-1',
      hasCredentials: !!(process.env.API_AWS_ACCESS_KEY_ID && process.env.API_AWS_SECRET_ACCESS_KEY),
      amiId: process.env.API_AWS_AMI_ID || 'not-set',
      instanceType: process.env.API_AWS_INSTANCE_TYPE || 'not-set',
      securityGroupId: process.env.API_AWS_SECURITY_GROUP_ID || 'not-set',
      subnetId: process.env.API_AWS_SUBNET_ID || 'not-set',
      vpcId: process.env.API_AWS_VPC_ID || 'not-set',
    };

    return NextResponse.json({
      success: true,
      message: 'AWS configuration check',
      config,
      ready: config.hasCredentials,
      note: 'Use POST to this endpoint with optional parameters to test EC2 launch'
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to check AWS configuration',
      error: error.message
    }, { status: 500 });
  }
}
