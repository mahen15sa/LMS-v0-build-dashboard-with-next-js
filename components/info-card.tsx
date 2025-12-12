"use client"

import { useTranslation } from "@/contexts/TranslationContext"
import { Megaphone, MessageSquare } from "lucide-react"

interface InfoCardProps {
  type: "info" | "message"
}

export function InfoCard({ type }: InfoCardProps) {
  const { t } = useTranslation()

  const isInfo = type === "info"
  const icon = isInfo ? Megaphone : MessageSquare
  const title = isInfo ? t("infoCard.importantInformation") : t("infoCard.message")
  const message = isInfo ? t("infoCard.importantInfoText") : t("infoCard.messageText")

  const Icon = icon

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-muted p-2">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  )
}
