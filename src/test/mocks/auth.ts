import { vi } from 'vitest';
import type { Session } from 'next-auth';

export const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  instanceProvisioning: {
    create: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(), // ✅ ADD THIS HERE
    update: vi.fn(),
  }
};

export const mockUserSession: Session = {
  user: { 
    id: 'user_123', 
    email: 'test@example.com',
    name: 'Test User' 
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
};

export const mockDatabaseUser = {
  id: 'user_123',
  email: 'test@example.com',
  name: 'Test User',
  subscriptionId: 'sub_123',
  customerId: 'cus_123'
};

export function setupSuccessfulAuth() {
  mockPrisma.user.findUnique.mockResolvedValue(mockDatabaseUser);
}

export function setupAuthFailure() {
  mockPrisma.user.findUnique.mockResolvedValue(null);
}
