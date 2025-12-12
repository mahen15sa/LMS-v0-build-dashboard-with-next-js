"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FormFieldWrapperProps {
  label: string
  required?: boolean
  children: React.ReactNode
  helpText?: string
}

export function FormFieldWrapper({ label, required, children, helpText }: FormFieldWrapperProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {helpText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </div>
  )
}
