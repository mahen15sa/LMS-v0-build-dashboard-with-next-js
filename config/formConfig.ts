export interface FormField {
  id: string
  label: string
  type: "text" | "select" | "toggle" | "time"
  required?: boolean
  options?: { label: string; value: string }[]
  placeholder?: string
}

export interface FormSection {
  title: string
  fields: FormField[]
}

export const systemParameterFormConfig: FormSection[] = [
  {
    title: "",
    fields: [
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        required: true,
        options: [
          { label: "Sweep", value: "Sweep" },
          { label: "Pool", value: "Pool" },
          { label: "ICL", value: "ICL" },
        ],
      },
      {
        id: "allowedSweepCategory",
        label: "Allowed Sweep Category",
        type: "select",
        required: false,
        options: [
          { label: "Domestic", value: "Domestic" },
          { label: "Cross Border", value: "Cross Border" },
          { label: "Cross Bank", value: "Cross Bank" },
        ],
      },
      {
        id: "structureType",
        label: "Structure Type",
        type: "select",
        required: true,
        options: [
          { label: "Single Tier", value: "Single Tier" },
          { label: "Hierarchy", value: "Hierarchy" },
        ],
      },
      {
        id: "allowedSweepType",
        label: "Allowed Sweep Type",
        type: "select",
        required: true,
        options: [
          { label: "Zero Balance Account", value: "Zero Balance Account" },
          { label: "Target Balance", value: "Target Balance" },
          { label: "Fixed Sweep", value: "Fixed Sweep" },
          { label: "Threshold", value: "Threshold" },
          { label: "Range Based", value: "Range Based" },
        ],
      },
      {
        id: "operatingCurrencyMode",
        label: "Operating Currency Mode",
        type: "select",
        required: true,
        options: [
          { label: "Local CCY", value: "Local CCY" },
          { label: "Mono CCY", value: "Mono CCY" },
          { label: "Cross CCY", value: "Cross CCY" },
        ],
      },
      {
        id: "allowedCurrencies",
        label: "Allowed Currencies",
        type: "select",
        required: false,
        options: [
          { label: "AED", value: "AED" },
          { label: "INR", value: "INR" },
          { label: "USD", value: "USD" },
          { label: "EUR", value: "EUR" },
          { label: "GBP", value: "GBP" },
          { label: "JPY", value: "JPY" },
        ],
      },
      {
        id: "balanceType",
        label: "Balance Type",
        type: "select",
        required: true,
        options: [
          { label: "Available Balance", value: "Available Balance" },
          { label: "Ledger Balance", value: "Ledger Balance" },
        ],
      },
    ],
  },
  {
    title: "Execution Mode and Frequency",
    fields: [
      {
        id: "allowedSweepFrequency",
        label: "Allowed Sweep Frequency",
        type: "select",
        required: true,
        options: [
          { label: "Daily", value: "Daily" },
          { label: "Weekly", value: "Weekly" },
          { label: "Monthly", value: "Monthly" },
          { label: "Yearly", value: "Yearly" },
        ],
      },
      {
        id: "allowedSweepExecutionMode",
        label: "Allowed Sweep Execution Mode",
        type: "select",
        required: true,
        options: [
          { label: "Manual", value: "Manual" },
          { label: "Automatic", value: "Automatic" },
        ],
      },
      {
        id: "sweepReversal",
        label: "Sweep Reversal",
        type: "toggle",
      },
      {
        id: "maxTTDurationFrom",
        label: "Max TT Duration From (HH:MM)",
        type: "time",
      },
      {
        id: "maxTTDurationTo",
        label: "Max TT Duration To (HH:MM)",
        type: "time",
      },
    ],
  },
  {
    title: "Holiday Handling",
    fields: [
      {
        id: "holidayTreatment",
        label: "Holiday Treatment",
        type: "select",
        required: true,
        options: [
          { label: "Next Working Day", value: "Next Working Day" },
          { label: "Previous Working Day", value: "Previous Working Day" },
          { label: "Skip Execution", value: "Skip Execution" },
        ],
      },
      {
        id: "holidayTreatmentCurrencyHoliday",
        label: "Holiday Treatment (Currency Holiday)",
        type: "select",
        required: true,
        options: [
          { label: "Next Working Day", value: "Next Working Day" },
          { label: "Previous Working Day", value: "Previous Working Day" },
        ],
      },
      {
        id: "sweepPostCurrencyCutOff",
        label: "Sweep Post Currency Cut-Off",
        type: "toggle",
      },
    ],
  },
]
