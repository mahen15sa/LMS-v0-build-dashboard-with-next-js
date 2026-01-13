"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { LoginHeader } from "@/components/login-header"
import { InfoCard } from "@/components/info-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()

  const [view, setView] = useState<"login" | "forgot">("login")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resetIdentifier, setResetIdentifier] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string; otp?: string; reset?: string }>({})
  const [showResetSuccess, setShowResetSuccess] = useState(false)

  useEffect(() => {
    if (showOtpModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [showOtpModal, countdown])

  const validateLogin = () => {
    const newErrors: typeof errors = {}
    if (!username.trim()) newErrors.username = t("login.usernameRequired")
    if (!password.trim()) newErrors.password = t("login.passwordRequired")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOtp = () => {
    if (otp.some((digit) => !digit)) {
      setErrors({ otp: t("login.otpRequired") })
      return false
    }
    return true
  }

  const validateReset = () => {
    if (!resetIdentifier.trim()) {
      setErrors({ reset: t("login.identifierRequired") })
      return false
    }
    return true
  }

  const handleLogin = () => {
    if (validateLogin()) {
      setShowOtpModal(true)
      setCountdown(30)
      setCanResend(false)
    }
  }

  const handleVerifyOtp = () => {
    if (validateOtp()) {
      router.push("/dashboard")
    }
  }

  const handleResendOtp = () => {
    setCountdown(30)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus()
      }
    }
  }

  const handleSendReset = () => {
    if (validateReset()) {
      setShowResetSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginHeader />

      <div className="pt-16 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl flex gap-8 items-stretch">
          {/* Left Panel - Login/Forgot Password Form */}
          <div className="w-full lg:w-2/5 bg-white rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <img src="/images/aurionpro-logo.png" alt="Aurionpro" className="h-12" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">iCashPro+ LMS</h1>
              <p className="text-sm text-gray-500 mt-1">{t("login.subtitle")}</p>
            </div>

            {view === "login" ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">{t("login.loginTitle")}</h2>

                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      {t("login.username")}
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setErrors({ ...errors, username: undefined })
                      }}
                      placeholder={t("login.usernamePlaceholder")}
                      className="h-11"
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t("login.password")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setErrors({ ...errors, password: undefined })
                        }}
                        placeholder={t("login.passwordPlaceholder")}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
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

                <div className="space-y-3 mt-6">
                  <Button
                    onClick={handleLogin}
                    disabled={!agreed}
                    className="w-full h-11 bg-[#00897B] hover:bg-[#00897B]/90 text-white"
                  >
                    {t("login.loginButton")}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <Button variant="link" className="p-0 h-auto text-[#00897B] hover:text-[#00897B]/80">
                      {t("login.needHelp")}
                    </Button>
                    <Button variant="link" className="p-0 h-auto text-[#00897B] hover:text-[#00897B]/80">
                      {t("login.registerNow")}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setView("forgot")}
                      className="text-[#00897B] hover:text-[#00897B]/80"
                    >
                      {t("login.forgotPassword")}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">{t("login.forgotPasswordTitle")}</h2>

                {!showResetSuccess ? (
                  <>
                    <div className="space-y-4 flex-1">
                      <p className="text-sm text-gray-600 mb-4">{t("login.forgotPasswordDesc")}</p>

                      <div className="space-y-2">
                        <Label htmlFor="resetId" className="text-sm font-medium">
                          {t("login.mobileOrUserId")}
                        </Label>
                        <Input
                          id="resetId"
                          value={resetIdentifier}
                          onChange={(e) => {
                            setResetIdentifier(e.target.value)
                            setErrors({ ...errors, reset: undefined })
                          }}
                          placeholder={t("login.enterMobileOrUserId")}
                          className="h-11"
                        />
                        {errors.reset && <p className="text-sm text-red-500">{errors.reset}</p>}
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button
                        onClick={handleSendReset}
                        className="w-full h-11 bg-[#00897B] hover:bg-[#00897B]/90 text-white"
                      >
                        {t("login.sendResetLink")}
                      </Button>

                      <div className="text-center">
                        <Button
                          variant="link"
                          onClick={() => setView("login")}
                          className="text-[#00897B] hover:text-[#00897B]/80"
                        >
                          {t("login.backToLogin")}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{t("login.resetSuccess")}</h3>
                        <p className="text-sm text-gray-600">{t("login.resetSuccessDesc")}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setView("login")
                        setShowResetSuccess(false)
                        setResetIdentifier("")
                      }}
                      className="w-full h-11 bg-[#00897B] hover:bg-[#00897B]/90 text-white"
                    >
                      {t("login.backToLogin")}
                    </Button>
                  </>
                )}
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#00897B]/20 to-[#00897B]/5" />
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900 text-balance">{t("banner.newBranch")}</h2>
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="h-2 w-2 rounded-full bg-[#00897B]" />
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t("login.otpVerificationTitle")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">{t("login.otpSentMessage")}</p>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("login.enterOtp")}</Label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digit && index > 0) {
                        document.getElementById(`otp-${index - 1}`)?.focus()
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>
              {errors.otp && <p className="text-sm text-red-500 text-center">{errors.otp}</p>}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              {canResend ? (
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  className="p-0 h-auto text-[#00897B] hover:text-[#00897B]/80"
                >
                  {t("login.resendOtp")}
                </Button>
              ) : (
                <>
                  <span className="text-gray-500">{t("login.resendIn")}</span>
                  <span className="font-semibold text-gray-900">00:{countdown.toString().padStart(2, "0")}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowOtpModal(false)
                setOtp(["", "", "", "", "", ""])
                setErrors({})
              }}
              className="flex-1"
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleVerifyOtp} className="flex-1 bg-[#00897B] hover:bg-[#00897B]/90 text-white">
              {t("login.verifyOtp")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
