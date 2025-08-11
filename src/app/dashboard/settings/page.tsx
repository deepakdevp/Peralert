"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [timezone, setTimezone] = useState("Asia/Singapore")
  const [defaultPhone, setDefaultPhone] = useState("")

  const handleSaveSettings = () => {
    // TODO: Implement settings save
    console.log("Saving settings:", { timezone, defaultPhone })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and alert settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your account information from your sign-in provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={session?.user?.name || ""} disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={session?.user?.email || ""} disabled />
            </div>
            <p className="text-sm text-gray-500">
              Profile information is managed by your sign-in provider (Google/GitHub)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>
            Configure default settings for your alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="timezone">Default Timezone</Label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Asia/Singapore">Asia/Singapore</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <option value="Australia/Sydney">Australia/Sydney</option>
              </select>
            </div>

            <div>
              <Label htmlFor="defaultPhone">Default WhatsApp Number</Label>
              <Input
                id="defaultPhone"
                placeholder="+1234567890"
                value={defaultPhone}
                onChange={(e) => setDefaultPhone(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                This number will be pre-filled when creating new alerts
              </p>
            </div>

            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Manage your PerAlert subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-gray-600">Free Tier</p>
              </div>
              <div className="text-right">
                <p className="font-medium">100 alerts/month</p>
                <p className="text-sm text-gray-600">100 remaining</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">💡</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Upgrade to Pro
                  </p>
                  <p className="text-sm text-blue-700">
                    Get 1,000 alerts/month and faster email polling for just $9/month
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-600 mb-2">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}