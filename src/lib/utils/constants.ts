import type { FrequencyOptionType } from "../types"

export const FREQUENCY_OPTIONS: FrequencyOptionType[] = [
  { value: "monthly", label: "Monthly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "weekly", label: "Weekly" },
]

export const DEFAULT_PROJECT_DETAILS = {
  projectSize: 1000000,
  projectDuration: 12,
  jobCostReportFrequency: "monthly" as const,
  aiaPayAppFrequency: "monthly" as const,
  hourlyLaborCost: 30,
  numberOfProjects: 1,
}

export const DEFAULT_LEAD_DETAILS = {
  fullName: "",
  email: "",
  companyName: "",
}

