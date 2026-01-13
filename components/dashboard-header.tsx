"use client"
import { useTranslation } from "@/contexts/TranslationContext"
import { useRouter } from "next/navigation"
import { Menu, Search, Grid, Mail, Bell, Moon, Calculator, Globe, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  onMenuClick: () => void
  onMegaMenuClick: () => void
}

export function DashboardHeader({ onMenuClick, onMegaMenuClick }: DashboardHeaderProps) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="cursor-pointer select-none" onClick={() => router.push("/dashboard")} title="Go to Dashboard">
            <img src="/images/aurionpro-logo.png" alt="Aurionpro" className="h-8 brightness-0 invert" />
          </div>
          <div className="hidden md:flex items-center gap-2 ml-4">
            <Search className="h-4 w-4 text-primary-foreground/70" />
            <Input
              placeholder="Enter Keyword to search"
              className="w-64 h-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Calculator className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onMegaMenuClick}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Moon className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-primary-foreground/20 mx-1" />
          <Button variant="ghost" size="sm" className="gap-1 text-primary-foreground hover:bg-primary-foreground/10">
            <Globe className="h-4 w-4" />
            <span>EN</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/d1.png" />
                  <AvatarFallback className="bg-primary text-primary">JB</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/images/d1.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JB</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">James Bond</div>
                    <div className="text-xs text-muted-foreground">{t("dashboard.admin")}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="text-muted-foreground">{t("dashboard.branchName")} - Bishan</div>
                  <div className="text-muted-foreground">{t("dashboard.lastLoggedIn")} - 11-Dec-2025 06:33 pm</div>
                  <div className="text-muted-foreground">{t("dashboard.lastFailedLogin")} - 09-Dec-2025 08:33:37</div>
                </div>
              </div>
              <DropdownMenuItem className="cursor-pointer">{t("dashboard.settings")}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{t("dashboard.myPreferences")}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{t("dashboard.editProfile")}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{t("dashboard.changePassword")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => router.push("/")}>
                {t("dashboard.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
