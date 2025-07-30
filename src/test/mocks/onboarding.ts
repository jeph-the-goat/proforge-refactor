import {OnboardingData} from '@/lib/schemas/onboarding';

export const mockOnboardingData: OnboardingData = {
  businessInfo: {
    companyLogo: "",
    companyName: 'Test Company',
    address: {
      street: '123 Business Ave',
      city: 'Business City',
      state: 'CA',
      zip: '12345',
      country: 'US',
    },
    industry: 'Technology',
    employeeCount: '11-50',
    companyWebsite: 'https://test-company.com',
    contactEmail: 'admin@test-company.com',
    contactPhone: '+1-555-123-4567',
  },
  businessStructure: {
    businessType: 'LLC',
    llcDetails: {
      memberType: 'Single',
      managementType: 'Member',
    },
    corporationDetails: null,
    taxId: '12-3456789',
    fiscalYearStart: 'January',
    fiscalYearEnd: 'December',
  },
  chartOfAccounts: {
    accountingMethod: 'Accrual',
    defaultCurrency: 'USD',
    segmentation: {
      departments: true,
      costCenters: false,
      projects: true,
    },
    ownershipStructure: {
      equityAccounts: ['capital'],
      distributionHandling: 'proportional',
    },
  },
  moduleSelection: {
    inventory: true,
    manufacturing: false,
    hrPayroll: true,
    crm: true,
    projectManagement: true,
    assetManagement: false,
    qualityManagement: false,
    ecommerce: false,
    pointOfSale: false,
    aiFleet: false,
    serviceScheduling: false,
    aiAnalytics: false,
  },
  userSetup: {
    adminUser: {
      name: 'Test Admin',
      email: 'admin@test-company.com',
    },
    additionalUsers: [
      {
        name: 'John Doe',
        email: 'john@test-company.com',
        role: 'Manager',
      },
    ],
    departments: ['Executive', 'Finance', 'Operations'],
    permissions: {},
  },
  termsAccepted: true,
};

// Variations for different test scenarios
export const mockOnboardingDataMinimal: Partial<OnboardingData> = {
  businessInfo: {
    companyLogo: "",
    companyName: 'Minimal Test Company',
    address: {
      street: '456 Minimal St',
      city: 'Minimal City',
      state: 'CA',
      zip: '54321',
      country: 'US',
    },
    industry: 'Technology',
    employeeCount: '1-10',
    companyWebsite: 'https://minimal-test.com',
    contactEmail: 'admin@minimal-test.com',
    contactPhone: '+1-555-987-6543',
  },
};

export const mockOnboardingDataCorporation: OnboardingData = {
  ...mockOnboardingData,
  businessInfo: {
    ...mockOnboardingData.businessInfo,
    companyName: 'Corp Test Company',
  },
  businessStructure: {
    businessType: 'Corporation',
    corporationDetails: {
      type: 'C-Corp',
      shareholderCount: 1,
    },
    llcDetails: null,
    taxId: '98-7654321',
    fiscalYearStart: 'January',
    fiscalYearEnd: 'December',
  },
};

export const mockOnboardingDataFailed: OnboardingData = {
  ...mockOnboardingData,
  businessInfo: {
    ...mockOnboardingData.businessInfo,
    companyName: 'Fail Test Company',
  },
};