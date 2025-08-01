import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ProvisionManager } from '@/lib/provisioning/provision-manager';
import { PrismaClient } from '@prisma/client';
import {authOptions} from "@/lib/auth";

const prisma = new PrismaClient();
const provisionManager = new ProvisionManager();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const instanceId = searchParams.get('instanceId');

    if (!instanceId) {
      return NextResponse.json(
        { error: 'Instance ID is required' },
        { status: 400 }
      );
    }

    const result = await provisionManager.getProvisioningStatus(instanceId, user.id);

    if (!result) {
      return NextResponse.json(
        { error: 'Provisioning record not found' },
        { status: 404 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: result.success,
      instanceId: result.instanceId,
      message: result.message,
      status: result.status,
      progress: result.progress,
      redirectUrl: result.redirectUrl,
    });

  } catch (error) {
    console.error('Provision status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { instanceId } = body;

    if (!instanceId) {
      return NextResponse.json(
        { error: 'Instance ID is required' },
        { status: 400 }
      );
    }

    const result = await provisionManager.getProvisioningStatus(instanceId, user.id);

    if (!result) {
      return NextResponse.json(
        { error: 'Provisioning record not found' },
        { status: 404 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: result.success,
      instanceId: result.instanceId,
      message: result.message,
      status: result.status,
      progress: result.progress,
      redirectUrl: result.redirectUrl,
    });

  } catch (error) {
    console.error('Provision status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}