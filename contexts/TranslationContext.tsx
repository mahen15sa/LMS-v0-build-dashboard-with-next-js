"use client"

import { createContext, useContext, type ReactNode } from "react"
import messages from "@/messages/locale-en.json"

type Messages = typeof messages

interface TranslationContextType {
  t: (key: string) => string
  messages: Messages
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = messages

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <TranslationContext.Provider value={{ t, messages }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider")
  }
  return context
}
