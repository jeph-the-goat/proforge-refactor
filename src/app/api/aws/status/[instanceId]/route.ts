import { NextRequest, NextResponse } from 'next/server';
import { ProvisioningService } from '@/lib/provisioning/provision-service';
import {getServerAuthSession} from "@lib/auth";

const provisioningService = new ProvisioningService();

type Params = {
  params: Promise<{ instanceId: string }>
}

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const params = await context.params;
    
    // Authenticate user
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const instanceId = params.instanceId;

    if (!instanceId) {
      return NextResponse.json(
        { error: 'Instance ID is required' },
        { status: 400 }
      );
    }

    // Get provisioning status
    const status = await provisioningService.getProvisioningStatus(instanceId);

    return NextResponse.json(status);

  } catch (error) {
    console.error('Failed to get instance status:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get instance status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}