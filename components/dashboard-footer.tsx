"use client"

import { useTranslation } from "@/contexts/TranslationContext"

export function DashboardFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-card py-4 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-muted-foreground">{t("footer.copyright")}</div>
          <div className="flex items-center gap-6">
            <button className="text-foreground hover:text-primary transition-colors">{t("footer.activation")}</button>
            <button className="text-foreground hover:text-primary transition-colors">{t("footer.branch")}</button>
            <button className="text-foreground hover:text-primary transition-colors">{t("footer.privacy")}</button>
            <button className="text-foreground hover:text-primary transition-colors">{t("footer.contactUs")}</button>
            <button className="text-foreground hover:text-primary transition-colors">{t("footer.customerCare")}</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
