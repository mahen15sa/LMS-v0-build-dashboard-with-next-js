"use client"

import { useTranslation } from "@/contexts/TranslationContext"
import { Globe, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoginHeader() {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/images/aurionpro-logo.png" alt="Aurionpro" className="h-10" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-1">
            <Globe className="h-4 w-4" />
            <span>EN</span>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
