"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const translations = {
  en: {
    title: "Elfares Merchandising Platform",
    subtitle: "Welcome to the Elfares company workspace",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    invalidCredentials: "Invalid email or password",
    poweredBy: "Powered by HG Communication",
  },
  ar: {
    title: "منصة الفارس للتسويق الميداني",
    subtitle: "مرحباً بك في بيئة عمل شركة الفارس",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    poweredBy: "مدعوم من HG Communication",
  },
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [locale, setLocale] = useState<"en" | "ar">("en")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const t = translations[locale]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      setError(t.invalidCredentials)
      setLoading(false)
      return
    }

    // Fetch role to redirect to the right shell
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single()

    const role = profile?.role
    if (role === "merchandiser") {
      router.push("/field/today")
    } else if (role === "platform_admin") {
      router.push("/hg/dashboard")
    } else {
      router.push("/app/dashboard")
    }
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-[420px] rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Logo Section */}
        <div className="mb-6 flex items-center justify-center gap-4">
          {/* Elfares Logo - Stylized wheat/plant */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Elfares logo"
          >
            <path
              d="M20 36V20"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 20C18 16 14 12 12 8C14 10 18 14 20 16"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 20C22 16 26 12 28 8C26 10 22 14 20 16"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 26C17 22 13 18 11 14C13 16 17 20 20 22"
              stroke="#F9A825"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 26C23 22 27 18 29 14C27 16 23 20 20 22"
              stroke="#F9A825"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-300" />

          {/* HGC Text */}
          <span className="text-lg font-bold text-[#E8505B]">hgc</span>
        </div>

        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-gray-900">
          {t.title}
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          {t.subtitle}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="mt-6 space-y-4"
        >
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password">{t.password}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember me / Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <Label htmlFor="remember" className="text-sm font-normal text-gray-600">
                {t.rememberMe}
              </Label>
            </div>
            <a
              href="#"
              className="text-sm text-[#E8505B] hover:underline"
            >
              {t.forgotPassword}
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-10 w-full bg-[#E8505B] text-white hover:bg-[#D4444F]"
          >
            {loading ? t.signingIn : t.signIn}
          </Button>
        </form>

        {/* Language Switcher */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "en"
                  ? "font-semibold text-gray-900"
                  : "hover:text-gray-700"
              }`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                locale === "ar"
                  ? "font-semibold text-gray-900"
                  : "hover:text-gray-700"
              }`}
            >
              AR
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          {t.poweredBy}
        </p>
      </div>
    </div>
  )
}
