"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { useSystemParameter } from "@/contexts/SystemParameterContext"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { MegaMenu } from "@/components/mega-menu"
import { DashboardFooter } from "@/components/dashboard-footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { FormFieldWrapper } from "@/components/form-field-wrapper"
import { systemParameterFormConfig } from "@/config/formConfig"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { RefreshCw, Printer, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SystemParameterInitiatePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { addRecord } = useSystemParameter()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    productType: "",
    allowedSweepCategory: [] as string[],
    allowedCurrencies: [] as string[],
    structureType: [] as string[],
    allowedSweepType: [] as string[],
    operatingCurrencyMode: "",
    balanceType: "",
    allowedSweepFrequency: [] as string[],
    allowedSweepExecutionMode: [] as string[],
    sweepReversal: false,
    maxTTDurationFrom: "",
    maxTTDurationTo: "",
    holidayTreatment: "",
    holidayTreatmentCurrencyHoliday: "",
    sweepPostCurrencyCutOff: false,
    action: "Create" as const,
  })

  const handleMegaMenuOpen = () => {
    setMegaMenuOpen(true)
    setSidebarOpen(false)
  }

  const shouldShowField = (fieldId: string) => {
    if (fieldId === "allowedSweepCategory") {
      return formData.productType === "Sweep"
    }
    if (fieldId === "allowedCurrencies") {
      return formData.operatingCurrencyMode === "Mono CCY" || formData.operatingCurrencyMode === "Cross CCY"
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.productType) {
      toast({
        title: "Validation Error",
        description: "Product Type is required",
        variant: "destructive",
      })
      return
    }

    addRecord(formData)

    toast({
      title: "Success",
      description: "System Parameter record created and sent for authorization",
    })

    router.push("/lms/maintenance/system-parameter/listing")
  }

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const breadcrumbItems = [
    { label: "System Parameter", href: "/lms" },
    { label: "LMS" },
    { label: "Maintenance" },
    { label: "System Parameter" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onMegaMenuClick={handleMegaMenuOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      <main className="flex-1 pt-16 lg:ml-[384px] transition-all duration-300">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <BreadcrumbNav items={breadcrumbItems} />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h1 className="text-2xl font-semibold mb-6 text-foreground">System Parameter - Initiate</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {systemParameterFormConfig.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-6">
                  {section.title && (
                    <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                      {section.title}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {section.fields
                      .filter((field) => shouldShowField(field.id))
                      .map((field) => (
                        <FormFieldWrapper key={field.id} label={field.label} required={field.required}>
                          {field.type === "select" && (
                            <Select
                              value={formData[field.id as keyof typeof formData] as string}
                              onValueChange={(value) => handleFieldChange(field.id, value)}
                            >
                              <SelectTrigger className="h-10 bg-background">
                                <SelectValue placeholder={`Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          {field.type === "toggle" && (
                            <div className="flex items-center">
                              <Switch
                                id={field.id}
                                checked={formData[field.id as keyof typeof formData] as boolean}
                                onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                              />
                            </div>
                          )}
                          {field.type === "time" && (
                            <Input
                              type="time"
                              className="h-10 bg-background"
                              value={formData[field.id as keyof typeof formData] as string}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            />
                          )}
                        </FormFieldWrapper>
                      ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-24 bg-transparent"
                  onClick={() => router.push("/lms/maintenance/system-parameter/listing")}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" className="min-w-24 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
