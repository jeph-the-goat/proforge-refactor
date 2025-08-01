import { ONBOARDING_STORAGE_KEY } from "@/constants/onboarding";
import {SubscriptionData} from "@/components/onboarding/proforge-onboarding";

// Load saved progress from localStorage
export const loadSavedProgress = (subscriptionData: SubscriptionData) => {
  try {
    const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Merge with subscription data to ensure latest info
      return {
        ...parsedData,
        businessInfo: {
          ...parsedData.businessInfo,
          contactEmail: subscriptionData ? subscriptionData.customerEmail : parsedData.businessInfo.contactEmail,
        },
        moduleSelection: {
          ...parsedData.moduleSelection,
          // Update modules based on current subscription
          aiFleet: subscriptionData !== undefined && subscriptionData.addOns.includes('ai-fleet'),
          serviceScheduling: subscriptionData !== undefined && subscriptionData.addOns.includes('service-scheduling'),
          aiAnalytics: subscriptionData !== undefined && subscriptionData.addOns.includes('ai-analytics'),
        },
      };
    }
  } catch (error) {
    console.error('Failed to load saved progress:', error);
  }
  return null;
};

// Clear saved progress on the form (reset data)
export const clearSavedProgress = () => {
  if (confirm('Are you sure you want to clear your saved progress?')) {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    window.location.reload();
  }
};