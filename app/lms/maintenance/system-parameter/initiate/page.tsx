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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isReviewMode, setIsReviewMode] = useState(false)

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
      setFormErrors({})
    }
  }, [formData.productType])

  const handleMultiSelectChange = (field: keyof FormData, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (!formData.productType) {
      newErrors.productType = "Product Type is mandatory"
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

    setFormErrors(newErrors)
    return newErrors
  }

  const handleReview = () => {
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast({
        title: "Validation Error",
        description: "Please fix all errors before reviewing",
        variant: "destructive",
      })
      return
    }
    setIsReviewMode(true)
  }

  const handleSubmit = async () => {
    try {
      const errors = validateForm()
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        toast({
          title: "Validation Error",
          description: "Please fix all errors before submitting",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/system-parameter/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit system parameter")
      }

      const data = await response.json()

      toast({
        title: "Success",
        description: "System Parameter submitted successfully",
      })

      addRecord({
        ...formData,
        _id: data.recordId,
        status: "PENDING_AUTHORIZATION",
        createdAt: new Date(),
        maker: "USER001",
        checker: null,
      })

      router.push("/lms/maintenance/system-parameter/listing")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
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
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Product Type <span className="text-primary">*</span>
                  </Label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => handleInputChange("productType", value)}
                  >
                    <SelectTrigger className={`h-10 ${formErrors.productType ? "border-red-500" : "border-gray-300"}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sweep">Sweep</SelectItem>
                      <SelectItem value="Pool">Pool</SelectItem>
                      <SelectItem value="ICL">ICL</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.productType && <p className="text-xs text-red-500">{formErrors.productType}</p>}
                </div>

                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Allowed Sweep Category"
                    required
                    placeholder="Select"
                    options={["Domestic", "Cross Border", "Cross Bank"]}
                    value={formData.allowedSweepCategory}
                    onChange={(values) => handleMultiSelectChange("allowedSweepCategory", values)}
                    error={formErrors.allowedSweepCategory}
                  />
                )}

                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Structure Type"
                    required
                    placeholder="Select"
                    options={["Single Tier", "Hierarchy"]}
                    value={formData.structureType}
                    onChange={(values) => handleMultiSelectChange("structureType", values)}
                    error={formErrors.structureType}
                  />
                )}

                {formData.productType === "Sweep" && (
                  <MultiSelectDropdown
                    label="Allowed Sweep Type"
                    required
                    placeholder="Select"
                    options={["Target Balance", "Threshold Balance", "Percentage"]}
                    value={formData.allowedSweepType}
                    onChange={(values) => handleMultiSelectChange("allowedSweepType", values)}
                    error={formErrors.allowedSweepType}
                  />
                )}
              </div>

              {formData.productType === "Sweep" && (
                <div className="grid grid-cols-4 gap-4">
                  <MultiSelectDropdown
                    label="Operating Currency Mode"
                    required
                    placeholder="Select"
                    options={["Mono CCY", "Cross CCY", "Multi CCY"]}
                    value={formData.operatingCurrencyMode}
                    onChange={(values) => handleMultiSelectChange("operatingCurrencyMode", values)}
                    error={formErrors.operatingCurrencyMode}
                  />

                  <MultiSelectDropdown
                    label="Balance Type"
                    required
                    placeholder="Select"
                    options={["Available Balance", "Ledger Balance", "Current Balance"]}
                    value={formData.balanceType}
                    onChange={(values) => handleMultiSelectChange("balanceType", values)}
                    error={formErrors.balanceType}
                  />
                </div>
              )}

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
                        error={formErrors.allowedSweepFrequency}
                      />

                      <MultiSelectDropdown
                        label="Allowed Sweep Execution Mode"
                        required
                        placeholder="Select"
                        options={["EOD", "Time Triggered", "Balance Triggered"]}
                        value={formData.allowedSweepExecutionMode}
                        onChange={(values) => handleMultiSelectChange("allowedSweepExecutionMode", values)}
                        error={formErrors.allowedSweepExecutionMode}
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
                          className={`h-10 ${formErrors.holidayTreatment ? "border-red-500" : "border-gray-300"}`}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skip">Skip</SelectItem>
                          <SelectItem value="Execute">Execute</SelectItem>
                          <SelectItem value="Next Working Day">Next Working Day</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.holidayTreatment && (
                        <p className="text-xs text-red-500">{formErrors.holidayTreatment}</p>
                      )}
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
                          className={`h-10 ${formErrors.holidayTreatmentCurrencyHoliday ? "border-red-500" : "border-gray-300"}`}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skip">Skip</SelectItem>
                          <SelectItem value="Execute">Execute</SelectItem>
                          <SelectItem value="Next Working Day">Next Working Day</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.holidayTreatmentCurrencyHoliday && (
                        <p className="text-xs text-red-500">{formErrors.holidayTreatmentCurrencyHoliday}</p>
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

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                <Button variant="ghost" onClick={handleCancel} className="text-primary hover:text-primary/80">
                  CANCEL
                </Button>
                {!isReviewMode && (
                  <Button onClick={handleReview} className="bg-gray-300 hover:bg-gray-400 text-gray-700">
                    REVIEW
                  </Button>
                )}
                {isReviewMode && (
                  <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/80 text-white">
                    SUBMIT
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
