import { NextResponse } from 'next/server';
import { handleSubscriptionSuccess } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Call the server-side function that has access to Stripe secret key
    const result = await handleSubscriptionSuccess(sessionId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Session verification failed:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Session verification failed' 
      },
      { status: 500 }
    );
  }
} 