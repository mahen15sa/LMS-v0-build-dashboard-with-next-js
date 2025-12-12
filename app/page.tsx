"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { LoginHeader } from "@/components/login-header"
import { LoginSteps } from "@/components/login-steps"
import { InfoCard } from "@/components/info-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Keyboard, MessageSquare, Smartphone, Fingerprint } from "lucide-react"

export default function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [verificationMode, setVerificationMode] = useState<"sms" | "mobile" | "biometrics">("sms")
  const [countdown, setCountdown] = useState(53)
  const [canResend, setCanResend] = useState(false)

  const handleProceed = () => {
    if (step === 1) {
      setStep(2)
    } else {
      router.push("/dashboard")
    }
  }

  const handleResendCode = () => {
    setCountdown(53)
    setCanResend(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <LoginHeader />
      <div className="pt-16 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl flex gap-8 items-stretch">
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-2/5 bg-card rounded-2xl shadow-lg p-8 flex flex-col">
            <LoginSteps currentStep={step} />

            {step === 1 ? (
              <>
                <h1 className="text-2xl font-semibold mb-6 text-foreground">{t("login.title")}</h1>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      {t("login.username")}
                    </Label>
                    <Input id="username" placeholder={t("login.username")} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t("login.password")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("login.password")}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Button variant="link" className="p-0 h-auto text-primary">
                      {t("login.forgotPassword")}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <Keyboard className="h-4 w-4" />
                      {t("login.showVirtualKeyboard")}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      {t("login.termsConditions")}
                    </Label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleProceed}
                    disabled={!agreed}
                    className="flex-1 h-11 bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    {t("common.proceed")}
                  </Button>
                  <Button variant="outline" className="flex-1 h-11 bg-transparent">
                    {t("common.reset")}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold mb-6 text-foreground">{t("login.authentication")}</h1>
                <div className="space-y-6 flex-1">
                  <div className="flex gap-3">
                    <Button
                      variant={verificationMode === "sms" ? "default" : "outline"}
                      onClick={() => setVerificationMode("sms")}
                      className="flex-1 h-16 flex flex-col items-center gap-1"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-xs">{t("login.sms")}</span>
                    </Button>
                    <Button
                      variant={verificationMode === "mobile" ? "default" : "outline"}
                      onClick={() => setVerificationMode("mobile")}
                      className="flex-1 h-16 flex flex-col items-center gap-1"
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">{t("login.mobile")}</span>
                    </Button>
                    <Button
                      variant={verificationMode === "biometrics" ? "default" : "outline"}
                      onClick={() => setVerificationMode("biometrics")}
                      className="flex-1 h-16 flex flex-col items-center gap-1"
                    >
                      <Fingerprint className="h-5 w-5" />
                      <span className="text-xs">{t("login.biometrics")}</span>
                    </Button>
                  </div>

                  {verificationMode === "sms" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{t("login.verificationCodeSent")} XXXXXX9898</p>
                      <div className="space-y-2">
                        <Label htmlFor="code" className="text-sm font-medium">
                          {t("login.verificationCode")}
                        </Label>
                        <div className="relative">
                          <Input id="code" placeholder={t("login.verificationCode")} className="h-11 pr-10" />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary"
                          disabled={!canResend}
                          onClick={handleResendCode}
                        >
                          {t("login.resendCode")}
                        </Button>
                        {!canResend && (
                          <span className="text-muted-foreground">00:{countdown.toString().padStart(2, "0")}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {verificationMode === "mobile" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{t("login.enterVerificationCodeMobile")}</p>
                      <div className="space-y-2">
                        <Label htmlFor="code-mobile" className="text-sm font-medium">
                          {t("login.verificationCode")}
                        </Label>
                        <Input id="code-mobile" placeholder={t("login.verificationCode")} className="h-11" />
                      </div>
                    </div>
                  )}

                  {verificationMode === "biometrics" && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div className="rounded-full bg-primary/10 p-8">
                        <Fingerprint className="h-16 w-16 text-primary" />
                      </div>
                      <p className="text-sm text-center text-muted-foreground">{t("login.putFingerprint")}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-3 mt-6">
                  <Button onClick={handleProceed} className="w-full h-11">
                    {t("common.proceed")}
                  </Button>
                  <Button variant="link" className="w-full text-sm text-primary">
                    {t("login.useDifferentMode")}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Info Cards and Banner */}
          <div className="hidden lg:flex lg:w-3/5 flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <InfoCard type="info" />
              <InfoCard type="message" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg flex-1 relative min-h-[400px]">
              <img
                src="/images/l1.png"
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-foreground text-balance">{t("banner.newBranch")}</h2>
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
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
