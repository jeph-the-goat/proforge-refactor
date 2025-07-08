"use server"

import type { LeadDetails, ProjectDetails, SavingsResults } from "./types"
import { calculateSavings } from "./utils/calculate-savings"

export async function submitLeadAction(
  projectDetails: ProjectDetails,
  leadDetails: LeadDetails
): Promise<{ success: boolean; message: string; results?: SavingsResults }> {
  try {
    // Calculate savings
    const results = calculateSavings(projectDetails)

    // TODO: Implement database storage for lead information
    // For now, we'll just process the submission
    
    return {
      success: true,
      message: "Form submitted successfully",
      results,
    }
  } catch (error) {
    // Production error handling
    const errorMessage = error instanceof Error ? error.message : 'Form submission error';
    return {
      success: false,
      message: errorMessage
    };
  }
}

