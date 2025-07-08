import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { ProvisionManager } from '@/lib/provisioning/provision-manager';
import { OnboardingDataSchema } from '@/lib/schemas/onboarding';  // ✅ Correct import
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const provisionManager = new ProvisionManager();

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = OnboardingDataSchema.safeParse(body.onboardingData);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid onboarding data',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    // Generate session ID for this provisioning request
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Start provisioning
    const result = await provisionManager.startERPProvisioning({
      user,
      onboardingData: validationResult.data,
      sessionId,
    });

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.message,
          redirectUrl: result.redirectUrl 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      instanceId: result.instanceId,
      message: result.message,
      redirectUrl: result.redirectUrl,
    });

  } catch (error) {
    console.error('Provision start API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}