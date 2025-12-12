"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { MegaMenu } from "@/components/mega-menu"
import { DashboardFooter } from "@/components/dashboard-footer"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const handleMegaMenuOpen = () => {
    setMegaMenuOpen(true)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onMegaMenuClick={handleMegaMenuOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      <main className="flex-1 pt-16 transition-all duration-300">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Dashboard</h1>
            <p className="text-xl text-muted-foreground">Click the menu icon to navigate through the application</p>
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
