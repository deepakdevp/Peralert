"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Active Alerts",
      value: "0",
      description: "Currently monitoring",
    },
    {
      title: "This Month",
      value: "0",
      description: "Alerts sent",
    },
    {
      title: "Remaining",
      value: "100",
      description: "Free tier alerts",
    },
  ]

  const quickActions = [
    {
      title: "Create Manual Alert",
      description: "Set up a recurring WhatsApp reminder",
      href: "/dashboard/alerts/new",
      icon: "⏰",
    },
    {
      title: "Connect Gmail",
      description: "Get alerts for important emails",
      href: "/dashboard/integrations",
      icon: "📧",
    },
    {
      title: "View History",
      description: "Check your recent alert deliveries",
      href: "/dashboard/deliveries",
      icon: "📋",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your alerts today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <span className="text-2xl mr-3">{action.icon}</span>
                  {action.title}
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={action.href}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Onboarding Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Complete these steps to get the most out of PerAlert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="font-medium">Sign up completed</p>
                <p className="text-sm text-gray-600">You're logged in with {session?.user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">○</span>
              </div>
              <div>
                <p className="font-medium">Create your first alert</p>
                <p className="text-sm text-gray-600">Set up a custom reminder or email alert</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">○</span>
              </div>
              <div>
                <p className="font-medium">Connect your Gmail</p>
                <p className="text-sm text-gray-600">Get WhatsApp alerts for important emails</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}