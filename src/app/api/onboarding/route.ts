// src/app/api/onboarding/route.ts
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { OnboardingDataSchema } from '@/lib/schemas/onboarding';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, onboardingData } = body;

    // Validate session ID format
    if (!sessionId?.startsWith('cs_') && !sessionId?.startsWith('session_')) {
      return NextResponse.json(
        { error: 'Invalid session ID format' },
        { status: 400 }
      );
    }

    // For Stripe session IDs
    let customerId: string | undefined;
    if (sessionId.startsWith('cs_')) {
      // Verify the checkout session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (!session || session.status !== 'complete') {
        return NextResponse.json(
          { error: 'Invalid or incomplete session' },
          { status: 400 }
        );
      }
      customerId = session.customer as string;
    }

    const validationResult = OnboardingDataSchema.safeParse(onboardingData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Update Stripe customer if we have one
    if (customerId) {
      await stripe.customers.update(customerId, {
        name: validatedData.businessInfo.companyName,
        email: validatedData.businessInfo.contactEmail,
        phone: validatedData.businessInfo.contactPhone,
        address: {
          line1: validatedData.businessInfo.address.street,
          city: validatedData.businessInfo.address.city,
          state: validatedData.businessInfo.address.state,
          postal_code: validatedData.businessInfo.address.zip,
          country: validatedData.businessInfo.address.country,
        },
        metadata: {
          industry: validatedData.businessInfo.industry,
          employeeCount: validatedData.businessInfo.employeeCount,
          website: validatedData.businessInfo.website || '',
          businessType: validatedData.businessStructure.businessType,
          taxId: validatedData.businessStructure.taxId,
          fiscalYearStart: validatedData.businessStructure.fiscalYearStart,
          fiscalYearEnd: validatedData.businessStructure.fiscalYearEnd,
          accountingMethod: validatedData.chartOfAccounts.accountingMethod,
          defaultCurrency: validatedData.chartOfAccounts.defaultCurrency,
          // Store modules as comma-separated list
          selectedModules: Object.entries(validatedData.moduleSelection)
            .filter(([_, enabled]) => enabled)
            .map(([module]) => module)
            .join(','),
          departments: validatedData.userSetup.departments.join(','),
          additionalUsersCount: validatedData.userSetup.additionalUsers.length.toString(),
        },
      });
    }

    return NextResponse.json({ 
      success: true,
      customerId,
      message: 'Onboarding data saved successfully'
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Onboarding error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}