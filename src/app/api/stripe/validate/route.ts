import {NextResponse} from 'next/server';
import {CheckoutService} from '@/lib/services/checkout.service';
import {getServerAuthSession} from "@lib/auth";

const checkoutService = new CheckoutService();

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();
    
    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId } = body;

    if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid session ID format' }),
        { status: 400 }
      );
    }

    const result = await checkoutService.validateSession(sessionId, session.user.id);

    // Add security headers
    return new NextResponse(
      JSON.stringify(result),
      {
        status: result.isValid ? 200 : 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, private',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  } catch (error) {
    console.error('Stripe session validation error:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Validation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, private'
        }
      }
    );
  }
} 