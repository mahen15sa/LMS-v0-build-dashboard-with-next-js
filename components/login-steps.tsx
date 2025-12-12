"use client"

import { Check } from "lucide-react"

interface LoginStepsProps {
  currentStep: number
}

export function LoginSteps({ currentStep }: LoginStepsProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          currentStep >= 1 ? "bg-green-500" : "bg-muted"
        }`}
      >
        {currentStep >= 1 && <Check className="h-4 w-4 text-white" />}
      </div>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          currentStep >= 2 ? "bg-green-500" : "bg-muted"
        }`}
      >
        {currentStep >= 2 && <Check className="h-4 w-4 text-white" />}
      </div>
    </div>
  )
}
