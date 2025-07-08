import { NextRequest, NextResponse } from 'next/server';
import { ProvisioningService } from '@/lib/provisioning/provision-service';

const provisioningService = new ProvisioningService();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      instanceId, 
      status, 
      message,
      timestamp,
      publicIp 
    } = body;

    // Get instance token from header
    const instanceToken = request.headers.get('X-Instance-Token');

    // Basic validation
    if (!instanceId || !status || !instanceToken) {
      return NextResponse.json(
        { error: 'Instance ID, status, and token are required' },
        { status: 400 }
      );
    }

    // Validate instance token
    const isValidToken = await provisioningService.validateInstanceToken(instanceId, instanceToken);
    if (!isValidToken) {
      console.warn(`Invalid token for instance ${instanceId}`);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update status in database
    await provisioningService.updateProvisioningStatus(
      instanceId, 
      status
    );


    // Handle different status types
    switch (status) {
      case 'configuring':
        console.log(`Instance ${instanceId} started ERP configuration`);
        break;
        
      case 'completed':
        console.log(`Instance ${instanceId} setup completed successfully`);
        // TODO: Send completion email to user
        break;
        
      case 'failed':
        console.error(`Instance ${instanceId} setup failed:`, message);
        // TODO: Send failure notification
        break;
        
      default:
        console.log(`Instance ${instanceId} status: ${status}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
    });

  } catch (error) {
    console.error('Provision callback API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint for instances to test connectivity
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Callback endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}