"use client"

import { useState, useMemo } from "react"
import { X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { megaMenuConfig, frequentlyUsedMenu, type MenuItem } from "@/config/menuConfig"
import { useTranslation } from "@/contexts/TranslationContext"
import { useRouter } from "next/navigation"

interface MegaMenuProps {
  isOpen: boolean
  selectedMenu: string | null
  onClose: () => void
}

export function MegaMenu({ isOpen, selectedMenu, onClose }: MegaMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const { t } = useTranslation()
  const router = useRouter()

  const selectedMenuSections = selectedMenu
    ? megaMenuConfig[selectedMenu as keyof typeof megaMenuConfig]
    : []

  // Flatten and filter all items based on search
  const filteredItems = useMemo(() => {
    if (!selectedMenuSections) return []

    const allItems: (MenuItem & { section?: string })[] = []
    selectedMenuSections.forEach((section) => {
      section.items.forEach((item) => {
        allItems.push({ ...item, section: section.title })
      })
    })

    if (!searchQuery.trim()) return allItems

    return allItems.filter((item) =>
      (t(`menu.${item.id}`) || item.label)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, selectedMenuSections, t])

  const handleNavigate = (path?: string) => {
    if (path) {
      router.push(path)
      onClose()
    }
  }

  const handleItemHover = (itemId: string) => {
    setHoveredCategory(itemId)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Mega Menu Panel */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 transform transition-all duration-300 ease-in-out overflow-hidden",
          "flex flex-col",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedMenuSections && selectedMenuSections.length > 0
              ? selectedMenuSections[0].title
              : t("menu.menu") || "Menu"}
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close mega menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("common.search") || "Enter Keyword to search"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden gap-6">
          {/* Left Column - Menu Items */}
          <div className="flex-1 overflow-y-auto p-6 border-r border-gray-200">
            <div className="space-y-3">
              {filteredItems && filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group"
                    onMouseEnter={() => handleItemHover(item.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button
                      onClick={() => {
                        if (!item.children || item.children.length === 0) {
                          handleNavigate(item.path)
                        }
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200",
                        hoveredCategory === item.id
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      {t(`menu.${item.id}`) || item.label}
                    </button>

                    {/* Sub-items dropdown on hover */}
                    {hoveredCategory === item.id && item.children && item.children.length > 0 && (
                      <div className="mt-2 ml-4 space-y-1 pl-3 border-l-2 border-blue-300 animate-in fade-in duration-200">
                        {item.children.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigate(subItem.path)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 rounded hover:bg-blue-100 hover:text-blue-600 transition-colors"
                          >
                            {t(`menu.${subItem.id}`) || subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">
                    {t("common.noResults") || "No results found"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Frequently Used */}
          <div className="w-64 bg-gray-50 p-6 overflow-y-auto border-l border-gray-200 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {t("menu.frequentlyUsed") || "Frequently Used"}
            </h3>
            <div className="space-y-2">
              {frequentlyUsedMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-white hover:text-blue-600 hover:shadow transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
