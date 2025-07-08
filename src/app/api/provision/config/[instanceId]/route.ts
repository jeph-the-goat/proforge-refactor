// src/app/api/provision/config/[instanceId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProvisioningService } from '@/lib/provisioning/provision-service';

const provisioningService = new ProvisioningService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ instanceId: string }> }
) {
  try {
    // Await the params since they're now a Promise
    const { instanceId } = await params;
    
    const instanceToken = request.headers.get('X-Instance-Token');
    
    if (!instanceToken) {
      return NextResponse.json(
        { error: 'Instance token required' },
        { status: 401 }
      );
    }

    const isValid = await provisioningService.validateInstanceToken(instanceId, instanceToken);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid instance token' },
        { status: 401 }
      );
    }

    const provisioningRecord = await provisioningService.getProvisioningRecord(instanceId);
    
    if (!provisioningRecord) {
      return NextResponse.json(
        { error: 'Instance not found' },
        { status: 404 }
      );
    }

    const onboardingData = JSON.parse(provisioningRecord.onboardingData as string);
    
    return NextResponse.json({
      instanceId,
      userId: provisioningRecord.userId,
      businessInfo: onboardingData.businessInfo,
      businessStructure: onboardingData.businessStructure,
      chartOfAccounts: onboardingData.chartOfAccounts,
      moduleSelection: onboardingData.moduleSelection,
      userSetup: onboardingData.userSetup,
      companyLogo: onboardingData.businessInfo?.companyLogo || null
    });

  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}