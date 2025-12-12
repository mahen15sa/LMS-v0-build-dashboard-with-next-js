"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface SystemParameterRecord {
  id: string
  productType: string
  allowedSweepCategory: string[]
  allowedCurrencies: string[]
  structureType: string[]
  allowedSweepType: string[]
  operatingCurrencyMode: string
  balanceType: string
  allowedSweepFrequency: string[]
  allowedSweepExecutionMode: string[]
  sweepReversal: boolean
  maxTTDurationFrom: string
  maxTTDurationTo: string
  holidayTreatment: string
  holidayTreatmentCurrencyHoliday: string
  sweepPostCurrencyCutOff: boolean
  status: "pending" | "authorized" | "rejected" | "disabled"
  maker: string
  makerDateTime: string
  checker?: string
  checkerDateTime?: string
  rejectReason?: string
  action: "Create" | "Update" | "Delete"
}

interface SystemParameterContextType {
  records: SystemParameterRecord[]
  addRecord: (record: Omit<SystemParameterRecord, "id" | "status" | "maker" | "makerDateTime">) => void
  authorizeRecord: (id: string, checker: string) => void
  rejectRecord: (id: string, checker: string, reason: string) => void
  disableRecord: (id: string) => void
  getPendingRecords: () => SystemParameterRecord[]
  getAuthorizedRecords: () => SystemParameterRecord[]
  getRejectedRecords: () => SystemParameterRecord[]
  getDisabledRecords: () => SystemParameterRecord[]
}

const SystemParameterContext = createContext<SystemParameterContextType | undefined>(undefined)

export function SystemParameterProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<SystemParameterRecord[]>([
    // Mock authorized records
    {
      id: "1",
      productType: "Sweep",
      allowedSweepCategory: ["Domestic"],
      allowedCurrencies: ["USD", "EUR"],
      structureType: ["Single Tier"],
      allowedSweepType: ["Zero Balance Account"],
      operatingCurrencyMode: "Mono CCY",
      balanceType: "Available Balance",
      allowedSweepFrequency: ["Daily"],
      allowedSweepExecutionMode: ["Manual"],
      sweepReversal: false,
      maxTTDurationFrom: "09:00",
      maxTTDurationTo: "17:00",
      holidayTreatment: "Next Working Day",
      holidayTreatmentCurrencyHoliday: "Next Working Day",
      sweepPostCurrencyCutOff: false,
      status: "authorized",
      maker: "john.doe",
      makerDateTime: "10-Jul-2024 10:30:00",
      checker: "admin.user",
      checkerDateTime: "10-Jul-2024 11:00:00",
      action: "Create",
    },
    {
      id: "2",
      productType: "Sweep",
      allowedSweepCategory: ["Cross Border"],
      allowedCurrencies: ["GBP", "JPY"],
      structureType: ["Hierarchy"],
      allowedSweepType: ["Fixed Sweep"],
      operatingCurrencyMode: "Cross CCY",
      balanceType: "Ledger Balance",
      allowedSweepFrequency: ["Weekly"],
      allowedSweepExecutionMode: ["Automatic"],
      sweepReversal: true,
      maxTTDurationFrom: "08:00",
      maxTTDurationTo: "18:00",
      holidayTreatment: "Previous Working Day",
      holidayTreatmentCurrencyHoliday: "Previous Working Day",
      sweepPostCurrencyCutOff: true,
      status: "authorized",
      maker: "jane.smith",
      makerDateTime: "09-Jul-2024 14:15:00",
      checker: "admin.user",
      checkerDateTime: "09-Jul-2024 15:30:00",
      action: "Update",
    },
  ])

  const addRecord = (record: Omit<SystemParameterRecord, "id" | "status" | "maker" | "makerDateTime">) => {
    const newRecord: SystemParameterRecord = {
      ...record,
      id: Date.now().toString(),
      status: "pending",
      maker: "current.user",
      makerDateTime: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }
    setRecords((prev) => [...prev, newRecord])
  }

  const authorizeRecord = (id: string, checker: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "authorized" as const,
              checker,
              checkerDateTime: new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            }
          : record,
      ),
    )
  }

  const rejectRecord = (id: string, checker: string, reason: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "rejected" as const,
              checker,
              checkerDateTime: new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
              rejectReason: reason,
            }
          : record,
      ),
    )
  }

  const disableRecord = (id: string) => {
    setRecords((prev) => prev.map((record) => (record.id === id ? { ...record, status: "disabled" as const } : record)))
  }

  const getPendingRecords = () => records.filter((r) => r.status === "pending")
  const getAuthorizedRecords = () => records.filter((r) => r.status === "authorized")
  const getRejectedRecords = () => records.filter((r) => r.status === "rejected")
  const getDisabledRecords = () => records.filter((r) => r.status === "disabled")

  return (
    <SystemParameterContext.Provider
      value={{
        records,
        addRecord,
        authorizeRecord,
        rejectRecord,
        disableRecord,
        getPendingRecords,
        getAuthorizedRecords,
        getRejectedRecords,
        getDisabledRecords,
      }}
    >
      {children}
    </SystemParameterContext.Provider>
  )
}

export function useSystemParameter() {
  const context = useContext(SystemParameterContext)
  if (!context) {
    throw new Error("useSystemParameter must be used within a SystemParameterProvider")
  }
  return context
}
