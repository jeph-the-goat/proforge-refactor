import type { FrequencyOption, ProjectDetails, SavingsResults } from "../types"

// Frequency multipliers
const FREQUENCY_MULTIPLIERS: Record<FrequencyOption, number> = {
  monthly: 12,
  "bi-weekly": 26,
  weekly: 52,
}

// Time savings constants (hours per report)
const JOB_COST_REPORT_TIME_SAVINGS = 2.0 // hours saved per report
const AIA_PAY_APP_TIME_SAVINGS = 2.5 // hours saved per pay app
const DETAILED_HOURS_REPORT_TIME_SAVINGS = 2.0 // hours saved per report
const UNION_REPORT_TIME_SAVINGS = 2.0 // hours saved per report
const WIP_REPORT_TIME_SAVINGS = 2.0 // hours saved per employee per report

// Project size time savings ranges
const PROJECT_SIZE_RANGES = [
  { min: 0, max: 1000000, minHours: 60, maxHours: 108, avgEmployees: 3 },
  { min: 1000001, max: 5000000, minHours: 84, maxHours: 140, avgEmployees: 5 },
  { min: 5000001, max: Number.POSITIVE_INFINITY, minHours: 108, maxHours: 180, avgEmployees: 8 },
]

export function calculateSavings(projectDetails: ProjectDetails): SavingsResults {
  const {
    projectSize,
    projectDuration,
    jobCostReportFrequency,
    aiaPayAppFrequency,
    hourlyLaborCost,
    numberOfProjects,
  } = projectDetails

  // Get frequency multipliers
  const jobCostFrequencyMultiplier = FREQUENCY_MULTIPLIERS[jobCostReportFrequency]
  const aiaPayAppFrequencyMultiplier = FREQUENCY_MULTIPLIERS[aiaPayAppFrequency]

  // Find the appropriate range for the project size
  const sizeRange =
    PROJECT_SIZE_RANGES.find((range) => projectSize >= range.min && projectSize <= range.max) || PROJECT_SIZE_RANGES[0]

  // Calculate individual savings
  const jobCostReportSavings = jobCostFrequencyMultiplier * (projectDuration / 12) * JOB_COST_REPORT_TIME_SAVINGS
  const aiaPayAppSavings = aiaPayAppFrequencyMultiplier * (projectDuration / 12) * AIA_PAY_APP_TIME_SAVINGS

  // Calculate new report savings
  const detailedHoursReportSavings =
    jobCostFrequencyMultiplier * (projectDuration / 12) * DETAILED_HOURS_REPORT_TIME_SAVINGS
  const unionReportSavings = jobCostFrequencyMultiplier * (projectDuration / 12) * UNION_REPORT_TIME_SAVINGS
  const wipReportSavings =
    jobCostFrequencyMultiplier * (projectDuration / 12) * WIP_REPORT_TIME_SAVINGS * sizeRange.avgEmployees

  // Calculate total time savings per project
  const totalHoursSavedPerProject =
    jobCostReportSavings + aiaPayAppSavings + detailedHoursReportSavings + unionReportSavings + wipReportSavings

  // Calculate total time savings across all projects
  const totalHoursSaved = totalHoursSavedPerProject * numberOfProjects

  // Calculate total cost savings
  const totalCostSavingsPerProject = totalHoursSavedPerProject * hourlyLaborCost
  const totalCostSavings = totalCostSavingsPerProject * numberOfProjects

  // Calculate efficiency gain (comparing to manual process)
  // Use the midpoint of the range as the baseline for manual process
  const manualProcessHours = (sizeRange.minHours + sizeRange.maxHours) / 2
  const efficiencyGain = Math.round((totalHoursSavedPerProject / manualProcessHours) * 100)

  return {
    jobCostReportSavings: Math.round(jobCostReportSavings),
    aiaPayAppSavings: Math.round(aiaPayAppSavings),
    detailedHoursReportSavings: Math.round(detailedHoursReportSavings),
    unionReportSavings: Math.round(unionReportSavings),
    wipReportSavings: Math.round(wipReportSavings),
    totalHoursSavedPerProject: Math.round(totalHoursSavedPerProject),
    totalCostSavingsPerProject: Math.round(totalCostSavingsPerProject),
    totalHoursSaved: Math.round(totalHoursSaved),
    totalCostSavings: Math.round(totalCostSavings),
    numberOfProjects,
    efficiencyGain: Math.min(efficiencyGain, 100), // Cap at 100%
  }
}

