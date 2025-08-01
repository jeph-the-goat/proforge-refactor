const requiredEnvVars = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
] as const;

export function getDomain(): string {
  const domain = process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://proforgeerp.com' 
      : 'http://localhost:3000');
      
  // Ensure the domain is properly formatted
  try {
    const url = new URL(domain);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Invalid protocol');
    }
    return domain;
  } catch {
    // Fallback to development URL if there's an error
    return 'http://localhost:3000';
  }
}

export function validateEnv() {
  // Check for required environment variables
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate Stripe key format
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  if (!stripeKey?.startsWith('sk_')) {
    throw new Error('Invalid STRIPE_SECRET_KEY format');
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey?.startsWith('pk_')) {
    throw new Error('Invalid STRIPE_PUBLISHABLE_KEY format');
  }

  // Validate domain format and accessibility
  try {
    const domain = getDomain();
    new URL(domain);

    // Additional validation for production (but only when actually deployed, not during build)
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      if (!domain.startsWith('https://')) {
        throw new Error('Production domain must use HTTPS');
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // Only throw in actual production deployment, not during build
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      throw new Error(`Invalid domain configuration: ${errorMessage}`);
    }
    // Just log in development or build-time
    console.warn(`Domain configuration warning: ${errorMessage}`);
  }
}

export function getEnvVar(key: typeof requiredEnvVars[number]): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// Helper to check if we're in production
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
} 