"use client"

import { getProviders, signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const benefits = [
    {
      icon: "✅",
      text: "100 free WhatsApp alerts per month",
      tooltip: "Get started with generous free tier"
    },
    {
      icon: "🔍", 
      text: "Gmail integration for important emails",
      tooltip: "Smart filtering for your most important messages"
    },
    {
      icon: "⏰",
      text: "Custom scheduled reminders", 
      tooltip: "Never forget important tasks or deadlines"
    },
    {
      icon: "🚀",
      text: "No credit card required",
      tooltip: "Start immediately without any payment"
    }
  ];

  useEffect(() => {
    // Check if already signed in
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard")
      } else {
        setSession(null)
      }
    })

    // Get available providers
    getProviders().then((providers) => {
      setProviders(providers)
    })
  }, [router])

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true)
    try {
      await signIn(providerId, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Sign in error:", error)
      setIsLoading(false)
    }
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-black/80"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 relative z-10"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-black/80"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Benefits */}
          <div className="text-center md:text-left animate-fade-in-up">
            <Link href="/" className="inline-block mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                PerAlert
              </h1>
            </Link>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 animate-wave">
                Welcome Back
              </h2>
              <p className="text-gray-300 text-lg animate-fade-in-up delay-100">
                Sign in to your account to manage your intelligent alerts
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white text-lg mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                What you get with PerAlert:
              </h3>
              
              {benefits.map((benefit, index) => (
                <div key={index} className={`flex items-center md:justify-start justify-center cursor-pointer group animate-fade-in-up delay-${(index + 2) * 100}`} title={benefit.tooltip}>
                  <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </span>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex justify-center animate-fade-in-up delay-300">
            <Card className="w-full max-w-md p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-white mb-2 animate-typewriter">
                  Choose your sign-in method
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm">
                  We use secure OAuth providers to protect your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {providers && Object.values(providers).map((provider: any, index: number) => (
                  <Button
                    key={provider.name}
                    onClick={() => handleSignIn(provider.id)}
                    className={`w-full py-4 text-lg font-semibold bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up delay-${(index + 4) * 100} group`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {provider.id === "google" ? "🔍" : "🐙"}
                      </span>
                      <span className="text-white">Continue with {provider.name}</span>
                      {isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      )}
                    </div>
                  </Button>
                ))}
                
                {!providers && (
                  <div className="text-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto mb-3"></div>
                    <p className="text-sm text-gray-400">Loading sign-in options...</p>
                  </div>
                )}
              </CardContent>

              <div className="text-center mt-6">
                <div className="inline-block px-4 py-2 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                    ← Back to homepage
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}