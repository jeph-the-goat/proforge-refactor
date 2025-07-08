import type { FormErrors, LeadDetails } from "../types"

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateLeadForm(formData: LeadDetails): FormErrors {
  const errors: FormErrors = {}

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required"
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required"
  }

  return errors
}

