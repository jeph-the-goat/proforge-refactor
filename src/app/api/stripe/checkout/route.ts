import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userCount, isAnnual, selectedAddOns } = body;

    // Validate required fields
    if (!userCount || typeof userCount !== 'number') {
      return NextResponse.json(
        { error: 'Invalid user count' },
        { status: 400 }
      );
    }

    if (typeof isAnnual !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid annual flag' },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedAddOns)) {
      return NextResponse.json(
        { error: 'Invalid add-ons format' },
        { status: 400 }
      );
    }

    const result = await createCheckoutSession({
      userCount,
      isAnnual,
      selectedAddOns
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 