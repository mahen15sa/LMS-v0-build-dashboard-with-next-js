"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Toaster } from "@/components/ui/toaster"

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with integrated sidebar */}
      <DashboardHeader />
      
      {/* Main content - no sidebar margin since it's now a drawer */}
      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          {children}
        </div>
      </main>
      
      <DashboardFooter />
      <Toaster />
    </div>
  )
}
