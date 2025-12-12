export interface MenuItem {
  id: string
  label: string
  icon?: string
  path?: string
  href?: string
  children?: MenuItem[]
}

export interface MegaMenuSection {
  title: string
  items: MenuItem[]
}

export const mainMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "setup",
    label: "Setup",
    path: "/setup",
  },
  {
    id: "lms",
    label: "LMS",
    path: "/lms",
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
  },
]

export const megaMenuConfig: Record<string, MegaMenuSection[]> = {
  setup: [
    {
      title: "General Masters",
      items: [
        {
          id: "currency",
          label: "Currency",
          children: [
            { id: "currency-initiate", label: "Initiate", path: "/setup/currency/initiate" },
            { id: "currency-listing", label: "Listing", path: "/setup/currency/listing" },
          ],
        },
        {
          id: "geography",
          label: "Geography",
          path: "/setup/geography",
        },
        {
          id: "location",
          label: "Location",
          path: "/setup/location",
        },
        {
          id: "location-upload",
          label: "Location Upload",
          path: "/setup/location-upload",
        },
        {
          id: "benchmark-rate",
          label: "Benchmark Rate",
          path: "/setup/benchmark-rate",
        },
        {
          id: "exchange-rate",
          label: "Exchange Rate",
          path: "/setup/exchange-rate",
        },
        {
          id: "bic-code-entry",
          label: "BIC Code Entry",
          path: "/setup/bic-code-entry",
        },
        {
          id: "bic-code-upload",
          label: "BIC Code Upload",
          path: "/setup/bic-code-upload",
        },
        {
          id: "mail-category",
          label: "Mail Category",
          path: "/setup/mail-category",
        },
        {
          id: "currency-cutoff-master",
          label: "Currency Cut off Master",
          path: "/setup/currency-cutoff-master",
        },
      ],
    },
    {
      title: "CIB Setup",
      items: [
        {
          id: "ui-configuration",
          label: "UI Configuration",
          path: "/setup/ui-configuration",
        },
        {
          id: "dynamic-form-builder",
          label: "Dynamic Form Builder",
          path: "/setup/dynamic-form-builder",
        },
        {
          id: "widget-builder",
          label: "Widget Builder",
          path: "/setup/widget-builder",
        },
        {
          id: "quick-onboarding",
          label: "Quick Onboarding",
          path: "/setup/quick-onboarding",
        },
      ],
    },
    {
      title: "Corporate Setup",
      items: [
        {
          id: "corporate-onboarding",
          label: "Corporate Onboarding",
          path: "/setup/corporate-onboarding",
        },
        {
          id: "corporate-group",
          label: "Corporate Group",
          path: "/setup/corporate-group",
        },
      ],
    },
    {
      title: "Security-Bank",
      items: [
        {
          id: "bank-role",
          label: "Bank Role",
          path: "/setup/bank-role",
        },
        {
          id: "bank-profile",
          label: "Bank Profile",
          path: "/setup/bank-profile",
        },
        {
          id: "bank-user",
          label: "Bank User",
          path: "/setup/bank-user",
        },
        {
          id: "bank-user-upload",
          label: "Bank User Upload",
          path: "/setup/bank-user-upload",
        },
        {
          id: "change-password",
          label: "Change Password",
          path: "/setup/change-password",
        },
        {
          id: "reset-bank-user",
          label: "Reset Bank User",
          path: "/setup/reset-bank-user",
        },
        {
          id: "unlock-bank-user",
          label: "Unlock Bank User",
          path: "/setup/unlock-bank-user",
        },
        {
          id: "parameter",
          label: "Parameter",
          path: "/setup/parameter",
        },
        {
          id: "broadcast-message",
          label: "Broadcast Message",
          path: "/setup/broadcast-message",
        },
        {
          id: "help-document",
          label: "Help Document",
          path: "/setup/help-document",
        },
        {
          id: "anti-phishing-image",
          label: "Anti Phishing Image",
          path: "/setup/anti-phishing-image",
        },
        {
          id: "bank-authorization-matrix",
          label: "Bank Authorization Matrix",
          path: "/setup/bank-authorization-matrix",
        },
      ],
    },
    {
      title: "Security-Corporate",
      items: [
        {
          id: "corporate-role",
          label: "Corporate Role",
          path: "/setup/corporate-role",
        },
        {
          id: "corporate-profile",
          label: "Corporate Profile",
          path: "/setup/corporate-profile",
        },
        {
          id: "corporate-user",
          label: "Corporate User",
          path: "/setup/corporate-user",
        },
        {
          id: "reset-password",
          label: "Reset Password",
          path: "/setup/reset-password",
        },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          id: "charge-template",
          label: "Charge Template",
          path: "/setup/charge-template",
        },
        {
          id: "category-wise-charges",
          label: "Category Wise Charges",
          path: "/setup/category-wise-charges",
        },
        {
          id: "data-layout",
          label: "Data Layout",
          path: "/setup/data-layout",
        },
        {
          id: "alert-template",
          label: "Alert Template",
          path: "/setup/alert-template",
        },
      ],
    },
    {
      title: "Process",
      items: [
        {
          id: "query-builder",
          label: "Query Builder",
          path: "/setup/query-builder",
        },
        {
          id: "authorization-dashboard",
          label: "Authorization Dashboard",
          path: "/setup/authorization-dashboard",
        },
        {
          id: "job-monitoring",
          label: "Job Monitoring",
          path: "/setup/job-monitoring",
        },
        {
          id: "interface-configuration",
          label: "Interface Configuration",
          path: "/setup/interface-configuration",
        },
      ],
    },
    {
      title: "Bank",
      items: [
        {
          id: "partner-bank",
          label: "Partner Bank",
          path: "/setup/partner-bank",
        },
        {
          id: "partner-bank-branch",
          label: "Partner Bank Branch",
          path: "/setup/partner-bank-branch",
        },
        {
          id: "partner-bank-branch-upload",
          label: "Partner Bank Branch Upload",
          path: "/setup/partner-bank-branch-upload",
        },
      ],
    },
  ],
  lms: [
        {
      title: "Maintenance",
      items: [
        {
          id: "system-parameter",
          label: "System Parameter",
          children: [
            { id: "system-parameter-initiate", label: "Initiate", path: "/lms/maintenance/system-parameter/initiate" },
            { id: "system-parameter-listing", label: "Listing", path: "/lms/maintenance/system-parameter/listing" },
          ],
        }
      ],
    },
  ],
  reports: [
    {
      title: "Account Reports",
      items: [
        {
          id: "account-statement",
          label: "Account Statement",
          path: "/reports/account-statement",
        },
        {
          id: "account-balance",
          label: "Account Balance",
          path: "/reports/account-balance",
        },
        {
          id: "transaction-history",
          label: "Transaction History",
          path: "/reports/transaction-history",
        },
      ],
    },
    {
      title: "Audit Reports",
      items: [
        {
          id: "audit-trail",
          label: "Audit Trail",
          path: "/reports/audit-trail",
        },
        {
          id: "user-activity",
          label: "User Activity",
          path: "/reports/user-activity",
        },
      ],
    },
  ],
}

export const setupMenuSections = megaMenuConfig.setup
export const lmsMenuSections = megaMenuConfig.lms
export const reportsMenuSections = megaMenuConfig.reports

export const frequentlyUsedMenu: MenuItem[] = [
  {
    id: "wps-1",
    label: "WPS Registered MOL / Pending Authorization Listing Page",
    path: "/frequently-used/wps-1",
  },
  {
    id: "wps-2",
    label: "WPS Registered MOL / Pending Authorization Listing Page",
    path: "/frequently-used/wps-2",
  },
]
