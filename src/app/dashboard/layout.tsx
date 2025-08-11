"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) router.push("/")
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/alerts"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Alerts
              </Link>
              <Link
                href="/dashboard/integrations"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Integrations
              </Link>
              <Link
                href="/dashboard/deliveries"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Delivery History
              </Link>
              <Link
                href="/dashboard/settings"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Settings
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}