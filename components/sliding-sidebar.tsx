"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainMenuItems, type MenuItem } from "@/config/menuConfig"
import { useTranslation } from "@/contexts/TranslationContext"

interface SlidingSidebarProps {
  isOpen: boolean
  onClose: () => void
  onMenuItemClick: (menuId: string) => void
}

export function SlidingSidebar({ isOpen, onClose, onMenuItemClick }: SlidingSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const { t } = useTranslation()

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleMenuClick = (item: MenuItem) => {
    onMenuItemClick(item.id)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sliding Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-[20%] min-w-[240px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40",
          "flex flex-col p-6 gap-4 rounded-r-lg",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0 lg:rounded-none"
        )}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto space-y-2">
          {mainMenuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all",
                  "hover:bg-blue-50 hover:text-blue-600 text-gray-700",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
              >
                <span>{t(`menu.${item.id}`) || item.label}</span>
                {item.children && item.children.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      expandedItems[item.id] && "rotate-180"
                    )}
                  />
                )}
              </button>

              {/* Expanded Sub-items */}
              {expandedItems[item.id] && item.children && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-blue-200 pl-3">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={child.path || "#"}
                      onClick={(e) => {
                        e.preventDefault()
                        onClose()
                      }}
                      className="block px-3 py-2 text-sm text-gray-600 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {t(`menu.${child.id}`) || child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-gray-200 hidden lg:block">
          <p className="text-xs text-gray-500 text-center">
            © 2024 LMS Dashboard
          </p>
        </div>
      </div>
    </>
  )
}
