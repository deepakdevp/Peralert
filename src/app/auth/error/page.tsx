"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  const getErrorMessage = (error: string | null | undefined) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "You do not have permission to sign in. Please contact support if you believe this is an error."
      case "Verification":
        return "The verification link is invalid or has expired. Please try signing in again."
      default:
        return "An unexpected error occurred during sign in. Please try again."
    }
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
          </div>

          {/* Error Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <CardTitle className="text-red-700">Sign In Error</CardTitle>
              <CardDescription>
                {getErrorMessage(error)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/auth/signin">Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Still having trouble?{" "}
              <a 
                href="mailto:support@peralert.com" 
                className="text-blue-600 hover:text-blue-800"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
      <AuthErrorContent />
    </Suspense>
  )
}