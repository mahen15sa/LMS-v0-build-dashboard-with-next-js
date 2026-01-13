"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { useSystemParameter } from "@/contexts/SystemParameterContext"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { MegaMenu } from "@/components/mega-menu"
import { DashboardFooter } from "@/components/dashboard-footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { MultiSelectDropdown } from "@/components/multi-select-dropdown"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Printer, LinkIcon, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  productType: string
  allowedSweepCategory: string[]
  structureType: string[]
  allowedSweepType: string[]
  operatingCurrencyMode: string[]
  balanceType: string[]
  allowedSweepFrequency: string[]
  allowedSweepExecutionMode: string[]
  sweepReversal: boolean
  maxTTDurationFrom: string
  maxTTDurationTo: string
  holidayTreatment: string
  holidayTreatmentCurrencyHoliday: string
  sweepPostCurrencyCutOff: boolean
}

export default function SystemParameterInitiatePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { addRecord } = useSystemParameter()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    productType: "",
    allowedSweepCategory: [],
    structureType: [],
    allowedSweepType: [],
    operatingCurrencyMode: [],
    balanceType: [],
    allowedSweepFrequency: [],
    allowedSweepExecutionMode: [],
    sweepReversal: false,
    maxTTDurationFrom: "",
    maxTTDurationTo: "",
    holidayTreatment: "",
    holidayTreatmentCurrencyHoliday: "",
    sweepPostCurrencyCutOff: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (formData.productType) {
      setFormData((prev) => ({
        ...prev,
        allowedSweepCategory: [],
        structureType: [],
        allowedSweepType: [],
        operatingCurrencyMode: [],
        balanceType: [],
        allowedSweepFrequency: [],
        allowedSweepExecutionMode: [],
        sweepReversal: false,
        maxTTDurationFrom: "",
        maxTTDurationTo: "",
        holidayTreatment: "",
        holidayTreatmentCurrencyHoliday: "",
        sweepPostCurrencyCutOff: false,
      }))
      setErrors({})
    }
  }, [formData.productType])

  const handleMultiSelectChange = (field: keyof FormData, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.productType) {
      newErrors.productType = "Product Type is mandatory"
      setErrors(newErrors)
      return false
    }

    if (formData.productType === "Sweep") {
      if (formData.allowedSweepCategory.length === 0) {
        newErrors.allowedSweepCategory = "Required"
      }
      if (formData.structureType.length === 0) {
        newErrors.structureType = "Required"
      }
      if (formData.allowedSweepType.length === 0) {
        newErrors.allowedSweepType = "Required"
      }
      if (formData.operatingCurrencyMode.length === 0) {
        newErrors.operatingCurrencyMode = "Required"
      }
      if (formData.balanceType.length === 0) {
        newErrors.balanceType = "Required"
      }
      if (formData.allowedSweepFrequency.length === 0) {
        newErrors.allowedSweepFrequency = "Required"
      }
      if (formData.allowedSweepExecutionMode.length === 0) {
        newErrors.allowedSweepExecutionMode = "Required"
      }
      if (!formData.holidayTreatment) {
        newErrors.holidayTreatment = "Required"
      }
      if (!formData.holidayTreatmentCurrencyHoliday) {
        newErrors.holidayTreatmentCurrencyHoliday = "Required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      addRecord({
        productType: formData.productType,
        allowedSweepCategory: formData.allowedSweepCategory,
        structureType: formData.structureType,
        allowedSweepType: formData.allowedSweepType,
        operatingCurrencyMode: formData.operatingCurrencyMode.join(", "),
        balanceType: formData.balanceType.join(", "),
        allowedSweepFrequency: formData.allowedSweepFrequency,
        allowedSweepExecutionMode: formData.allowedSweepExecutionMode,
        sweepReversal: formData.sweepReversal,
        maxTTDurationFrom: formData.maxTTDurationFrom,
        maxTTDurationTo: formData.maxTTDurationTo,
        holidayTreatment: formData.holidayTreatment,
        holidayTreatmentCurrencyHoliday: formData.holidayTreatmentCurrencyHoliday,
        sweepPostCurrencyCutOff: formData.sweepPostCurrencyCutOff,
        action: "Create",
        allowedCurrencies: [],
      })

      toast({
        title: "Success",
        description: "System Parameter initiated successfully",
      })

      setTimeout(() => {
        router.push("/lms/maintenance/system-parameter/listing")
      }, 1500)
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all mandatory fields",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    router.push("/lms/maintenance/system-parameter/listing")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader
        onMenuClick={() => setSidebarOpen(true)}
        onMegaMenuClick={() => {
          setMegaMenuOpen(true)
          setSidebarOpen(false)
        }}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      <main className="flex-1 pt-16 lg:pl-[384px] transition-all duration-300">
        <div className="p-6">
          <BreadcrumbNav
            items={[
              { label: "System Parameter", href: "#" },
              { label: "LMS", href: "/dashboard" },
              { label: "Maintenance", href: "#" },
              { label: "System Parameter", href: "#" },
            ]}
          />

          <div className="flex items-center justify-end gap-2 mb-6 mt-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <LinkIcon className="h-4 w-4 mr-2" />
              Link
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Section 1: System Parameter - Top row with 4 fields */}
              <div className="grid grid-cols-4 gap-4">
                {/* Product Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Product Type <span className="text-primary">*</span>
                  </Label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => handleInputChange("productType", value)}
                  >
                    <SelectTrigger className={`h-10 ${errors.productType ? "border-red-500" : "border-gray-300"}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sweep">Sweep</SelectItem>
                      <SelectItem value="Pool">Pool</SelectItem>
                      <SelectItem value="ICL">ICL</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.productType && <p className="text-xs text-red-500">{errors.productType}</p>}
                </div>

                {/* Allowed Sweep Category */}
                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Allowed Sweep Category"
                    required
                    placeholder="Select"
                    options={["Domestic", "Cross Border", "Cross Bank"]}
                    value={formData.allowedSweepCategory}
                    onChange={(values) => handleMultiSelectChange("allowedSweepCategory", values)}
                    error={errors.allowedSweepCategory}
                  />
                )}

                {/* Structure Type */}
                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Structure Type"
                    required
                    placeholder="Select"
                    options={["Single Tier", "Hierarchy"]}
                    value={formData.structureType}
                    onChange={(values) => handleMultiSelectChange("structureType", values)}
                    error={errors.structureType}
                  />
                )}

                {/* Allowed Sweep Type */}
                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Allowed Sweep Type"
                    required
                    placeholder="Select"
                    options={["Target Balance", "Threshold Balance", "Percentage"]}
                    value={formData.allowedSweepType}
                    onChange={(values) => handleMultiSelectChange("allowedSweepType", values)}
                    error={errors.allowedSweepType}
                  />
                )}
              </div>

              {/* Second row with Operating Currency Mode and Balance Type */}
              {formData.productType === "Sweep" && (
                <div className="grid grid-cols-4 gap-4">
                  <MultiSelectDropdown
                    label="Operating Currency Mode"
                    required
                    placeholder="Select"
                    options={["Mono CCY", "Cross CCY", "Multi CCY"]}
                    value={formData.operatingCurrencyMode}
                    onChange={(values) => handleMultiSelectChange("operatingCurrencyMode", values)}
                    error={errors.operatingCurrencyMode}
                  />

                  <MultiSelectDropdown
                    label="Balance Type"
                    required
                    placeholder="Select"
                    options={["Available Balance", "Ledger Balance", "Current Balance"]}
                    value={formData.balanceType}
                    onChange={(values) => handleMultiSelectChange("balanceType", values)}
                    error={errors.balanceType}
                  />
                </div>
              )}

              {/* Section 2: Execution Mode and Frequency */}
              {formData.productType === "Sweep" && (
                <>
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Execution Mode and Frequency</h2>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <MultiSelectDropdown
                        label="Allowed Sweep Frequency"
                        required
                        placeholder="Select"
                        options={["Daily", "Weekly", "Monthly", "On Demand"]}
                        value={formData.allowedSweepFrequency}
                        onChange={(values) => handleMultiSelectChange("allowedSweepFrequency", values)}
                        error={errors.allowedSweepFrequency}
                      />

                      <MultiSelectDropdown
                        label="Allowed Sweep Execution Mode"
                        required
                        placeholder="Select"
                        options={["EOD", "Time Triggered", "Balance Triggered"]}
                        value={formData.allowedSweepExecutionMode}
                        onChange={(values) => handleMultiSelectChange("allowedSweepExecutionMode", values)}
                        error={errors.allowedSweepExecutionMode}
                      />

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Sweep Reversal</Label>
                        <div className="flex items-center h-10">
                          <Switch
                            checked={formData.sweepReversal}
                            onCheckedChange={(checked) => handleInputChange("sweepReversal", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Max TT Duration From (HH:MM)</Label>
                        <div className="relative">
                          <Input
                            type="time"
                            value={formData.maxTTDurationFrom}
                            onChange={(e) => handleInputChange("maxTTDurationFrom", e.target.value)}
                            className="h-10 border-gray-300"
                          />
                          <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Max TT Duration To (HH:MM)</Label>
                        <div className="relative">
                          <Input
                            type="time"
                            value={formData.maxTTDurationTo}
                            onChange={(e) => handleInputChange("maxTTDurationTo", e.target.value)}
                            className="h-10 border-gray-300"
                          />
                          <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Section 3: Holiday Handling */}
              {formData.productType === "Sweep" && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Holiday Handling</h2>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Holiday Treatment <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={formData.holidayTreatment}
                        onValueChange={(value) => handleInputChange("holidayTreatment", value)}
                      >
                        <SelectTrigger
                          className={`h-10 ${errors.holidayTreatment ? "border-red-500" : "border-gray-300"}`}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skip">Skip</SelectItem>
                          <SelectItem value="Execute">Execute</SelectItem>
                          <SelectItem value="Next Working Day">Next Working Day</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.holidayTreatment && <p className="text-xs text-red-500">{errors.holidayTreatment}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Holiday Treatment (Currency Holiday) <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={formData.holidayTreatmentCurrencyHoliday}
                        onValueChange={(value) => handleInputChange("holidayTreatmentCurrencyHoliday", value)}
                      >
                        <SelectTrigger
                          className={`h-10 ${errors.holidayTreatmentCurrencyHoliday ? "border-red-500" : "border-gray-300"}`}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skip">Skip</SelectItem>
                          <SelectItem value="Execute">Execute</SelectItem>
                          <SelectItem value="Next Working Day">Next Working Day</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.holidayTreatmentCurrencyHoliday && (
                        <p className="text-xs text-red-500">{errors.holidayTreatmentCurrencyHoliday}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Sweep Post Currency Cut-Off</Label>
                      <div className="flex items-center h-10">
                        <Switch
                          checked={formData.sweepPostCurrencyCutOff}
                          onCheckedChange={(checked) => handleInputChange("sweepPostCurrencyCutOff", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                <Button variant="ghost" onClick={handleCancel} className="text-primary hover:text-primary/80">
                  CANCEL
                </Button>
                <Button onClick={handleSubmit} className="bg-gray-300 hover:bg-gray-400 text-gray-700">
                  REVIEW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
