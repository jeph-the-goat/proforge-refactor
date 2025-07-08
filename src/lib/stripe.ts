import Stripe from 'stripe';
import { validateEnv, getEnvVar } from './env';

// Validate all environment variables
validateEnv();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://proforgeerp.com' 
    : 'http://localhost:3000');

if (process.env.NODE_ENV === 'production' && process.env.VERCEL && !baseUrl.startsWith('https://') && !baseUrl.includes('localhost')) {
  throw new Error('Production domain must use HTTPS');
}

const stripe = new Stripe(getEnvVar('STRIPE_SECRET_KEY'), {
  apiVersion: '2025-04-30.basil',
  typescript: true,
  appInfo: {
    name: 'ProForge ERP',
    version: '0.1.0',
  },
  maxNetworkRetries: 2, // Add automatic retries for failed requests
  timeout: 20000, // Set reasonable timeout (20 seconds)
});

export default stripe;

// Export base URL for consistent usage
export { baseUrl };