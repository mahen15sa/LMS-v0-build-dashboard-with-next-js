"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { setupMenuSections, lmsMenuSections, reportsMenuSections, frequentlyUsedMenu } from "@/config/menuConfig"
import { Search, X, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MegaMenuProps {
  open: boolean
  onClose: () => void
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [openPopover, setOpenPopover] = useState<string | null>(null)

  if (!open) return null

  const allSections = [...setupMenuSections, ...lmsMenuSections, ...reportsMenuSections]

  const handleNavigate = (path?: string) => {
    if (path) {
      router.push(path)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="h-full flex flex-col">
        <div className="border-b border-border bg-card p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t("menu.enterKeyword")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-4">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex gap-8">
              <div className="flex-1 space-y-8">
                {allSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      {section.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {section.items.map((item) => (
                        <div key={item.id}>
                          {item.children ? (
                            <Popover
                              open={openPopover === item.id}
                              onOpenChange={(open) => setOpenPopover(open ? item.id : null)}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-between h-auto py-2.5 px-3 hover:bg-accent text-left font-normal"
                                  onMouseEnter={() => {
                                    setHoveredItem(item.id)
                                    setOpenPopover(item.id)
                                  }}
                                >
                                  <span className="text-sm">{item.label}</span>
                                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-2 flex-shrink-0" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                side="right"
                                align="start"
                                className="w-56 p-1"
                                onMouseLeave={() => setOpenPopover(null)}
                              >
                                <div className="space-y-0.5">
                                  {item.children.map((child) => (
                                    <Button
                                      key={child.id}
                                      variant="ghost"
                                      className="w-full justify-start h-auto py-2 px-3 text-sm font-normal"
                                      onClick={() => handleNavigate(child.path)}
                                    >
                                      {child.label}
                                    </Button>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <Button
                              variant="ghost"
                              className="w-full justify-start h-auto py-2.5 px-3 hover:bg-accent text-left font-normal"
                              onClick={() => handleNavigate(item.path)}
                            >
                              <span className="text-sm">{item.label}</span>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-80 space-y-4 flex-shrink-0">
                <div className="sticky top-0">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    {t("menu.frequentlyUsed")}
                  </h3>
                  <div className="space-y-2">
                    {frequentlyUsedMenu.map((item) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        className="w-full justify-start h-auto py-3 px-4 text-left bg-transparent"
                        onClick={() => handleNavigate(item.path)}
                      >
                        <Clock className="h-4 w-4 mr-3 flex-shrink-0 text-muted-foreground" />
                        <span className="text-xs leading-tight">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
