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

    const validationResult = OnboardingDataSchema.validateSync(onboardingData);
    if (!validationResult) {
      console.error('Invalid onboarding data:', onboardingData);
      return NextResponse.json({
          error: 'Invalid onboarding data',
          status: 400,
        });
    }

    // Update Stripe customer if we have one
    if (customerId && validationResult.businessInfo && validationResult.businessStructure) {
      await stripe.customers.update(customerId, {
        name: validationResult.businessInfo.companyName,
        email: validationResult.businessInfo.contactEmail,
        phone: validationResult.businessInfo.contactPhone,
        address: {
          line1: validationResult.businessInfo.address.street,
          city: validationResult.businessInfo.address.city,
          state: validationResult.businessInfo.address.state,
          postal_code: validationResult.businessInfo.address.zip,
          country: validationResult.businessInfo.address.country,
        },
        metadata: {
          industry: validationResult.businessInfo.industry!,
          employeeCount: validationResult.businessInfo.employeeCount!,
          website: validationResult.businessInfo.website || '',
          businessType: validationResult.businessStructure.businessType!,
          taxId: validationResult.businessStructure.taxId!,
          fiscalYearStart: validationResult.businessStructure.fiscalYearStart!,
          fiscalYearEnd: validationResult.businessStructure.fiscalYearEnd!,
          accountingMethod: validationResult.chartOfAccounts.accountingMethod!,
          defaultCurrency: validationResult.chartOfAccounts.defaultCurrency!,
          // Store modules as comma-separated list
          selectedModules: Object.entries(validationResult.moduleSelection)
            .filter(([e, enabled]) => {
              void e;
              return enabled;
            })
            .map(([module]) => module)
            .join(','),
          departments: validationResult.userSetup.departments!.join(','),
          additionalUsersCount: validationResult.userSetup.additionalUsers!.length.toString(),
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