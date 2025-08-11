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
  const router = useRouter()

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

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              PerAlert
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your account to manage your alerts
            </p>
          </div>

          {/* Sign In Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Choose your sign-in method</CardTitle>
              <CardDescription>
                We use secure OAuth providers to protect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {providers && Object.values(providers).map((provider: any) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  className="w-full"
                  variant={provider.id === "google" ? "default" : "outline"}
                >
                  <span className="mr-2">
                    {provider.id === "google" ? "🔍" : "🐙"}
                  </span>
                  Continue with {provider.name}
                </Button>
              ))}
              
              {!providers && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading sign-in options...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <h3 className="font-semibold text-gray-900 mb-4">
              What you get with PerAlert:
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                100 free WhatsApp alerts per month
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                Gmail integration for important emails
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                Custom scheduled reminders
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                No credit card required
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}