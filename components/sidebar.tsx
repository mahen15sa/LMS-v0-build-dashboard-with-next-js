"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"
import { mainMenuItems, megaMenuConfig, type MenuItem } from "@/config/menuConfig"
import { LayoutDashboard, Settings, FolderOpen, FileText, ChevronRight, X, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useRef } from "react"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  setup: Settings,
  lms: FolderOpen,
  reports: FileText,
}

export function Sidebar({ open, onClose }: SidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null)

    // Close sidebar if clicking outside (desktop and mobile)
    useEffect(() => {
      if (!open) return
      function handleClick(event: MouseEvent) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          onClose()
        }
      }
      document.addEventListener("mousedown", handleClick)
      return () => document.removeEventListener("mousedown", handleClick)
    }, [open, onClose])
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<string>("lms")
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({ "system-parameter": true })
  const [searchQuery, setSearchQuery] = useState("")
  const [hoverItem, setHoverItem] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleMouseEnter = (itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      if (hoverTimeout) clearTimeout(hoverTimeout)
      setHoverItem(itemId)
    }
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoverItem(null)
    }, 200)
    setHoverTimeout(timeout)
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems[item.id]
    const showPopup = hoverItem === item.id && hasChildren

    return (
      <div key={item.id} className="relative">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between h-10 px-3 hover:bg-accent text-sm font-normal",
            level === 0 && "font-medium",
          )}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onMouseEnter={() => handleMouseEnter(item.id, hasChildren)}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (item.path) {
              window.location.href = item.path
            }
          }}
        >
          <span className="text-left flex-1">{item.label}</span>
          {hasChildren && (
            <ChevronRight
              className={cn("h-4 w-4 text-muted-foreground transition-transform", isExpanded && "rotate-90")}
            />
          )}
        </Button>

        {showPopup && (
          <div
            className="absolute left-full top-0 ml-2 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-2"
            onMouseEnter={() => {
              if (hoverTimeout) clearTimeout(hoverTimeout)
              setHoverItem(item.id)
            }}
            onMouseLeave={handleMouseLeave}
          >
            {item.children?.map((child) => (
              <Link
                key={child.id}
                href={child.path || "#"}
                className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}

        {hasChildren && isExpanded && (
          <div className="space-y-0.5">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  const menuSections = megaMenuConfig[activeMenu] || []

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <div
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 h-screen bg-white z-50 transition-transform duration-300 flex",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="mb-4"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose()
              }
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {mainMenuItems.map((item) => {
            const Icon = iconMap[item.id] || FolderOpen
            const isActive = activeMenu === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-lg",
                  isActive
                    ? "bg-[#00897B] hover:bg-[#00897B]/90 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                onClick={() => setActiveMenu(item.id)}
              >
                <Icon className="h-5 w-5" />
              </Button>
            )
          })}
        </div>

        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="lg:hidden absolute right-4 top-4 z-10">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Enter Keyword to search"
                className="pl-10 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {menuSections.map((section) => (
              <div key={section.title} className="py-2">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="px-2 space-y-0.5">{section.items.map((item) => renderMenuItem(item))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
