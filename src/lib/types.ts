export interface ProjectDetails {
  projectSize: number
  projectDuration: number
  jobCostReportFrequency: FrequencyOption
  aiaPayAppFrequency: FrequencyOption
  hourlyLaborCost: number
  numberOfProjects: number
}

export interface LeadDetails {
  fullName: string
  email: string
  companyName: string
}

export interface SavingsResults {
  jobCostReportSavings: number
  aiaPayAppSavings: number
  detailedHoursReportSavings: number
  unionReportSavings: number
  wipReportSavings: number
  totalHoursSavedPerProject: number
  totalCostSavingsPerProject: number
  totalHoursSaved: number
  totalCostSavings: number
  numberOfProjects: number
  efficiencyGain: number
}

export type FrequencyOption = "monthly" | "bi-weekly" | "weekly"

export interface FormErrors {
  [key: string]: string | null
}

export interface FrequencyOptionType {
  value: FrequencyOption
  label: string
}

