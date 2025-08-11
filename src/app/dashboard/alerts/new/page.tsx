"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function NewAlertPage() {
  const [formData, setFormData] = useState({
    name: "",
    to: "",
    scheduleCron: "30 9 * * 1-5", // Default: weekdays at 9:30 AM
    title: "",
    body: "",
    variables: {}
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          to: formData.to,
          scheduleCron: formData.scheduleCron,
          template: {
            title: formData.title,
            body: formData.body,
            variables: formData.variables,
          },
        }),
      })

      if (response.ok) {
        // Redirect to alerts page on success
        window.location.href = "/dashboard/alerts"
      } else {
        const error = await response.json()
        alert("Failed to create alert: " + (error.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error creating alert:", error)
      alert("Failed to create alert")
    }
  }

  const cronExamples = [
    { label: "Every weekday at 9:30 AM", value: "30 9 * * 1-5" },
    { label: "Every day at 6:00 PM", value: "0 18 * * *" },
    { label: "Monday at 10:00 AM", value: "0 10 * * 1" },
    { label: "Every hour", value: "0 * * * *" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/alerts">← Back</Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Alert</h1>
          <p className="text-gray-600 mt-2">
            Set up a recurring WhatsApp reminder
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Details</CardTitle>
            <CardDescription>
              Configure when and how your alert will be sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Alert Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Daily Standup Reminder"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="to">WhatsApp Number</Label>
                <Input
                  id="to"
                  placeholder="+1234567890"
                  value={formData.to}
                  onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Include country code (e.g., +1 for US)
                </p>
              </div>

              <div>
                <Label htmlFor="schedule">Schedule (Cron)</Label>
                <Input
                  id="schedule"
                  placeholder="30 9 * * 1-5"
                  value={formData.scheduleCron}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleCron: e.target.value }))}
                  required
                />
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">Quick examples:</p>
                  {cronExamples.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setFormData(prev => ({ ...prev, scheduleCron: example.value }))}
                    >
                      {example.label} ({example.value})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Message Title</Label>
                <Input
                  id="title"
                  placeholder="Daily Standup Reminder"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="body">Message Body</Label>
                <textarea
                  id="body"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Hey there! Don't forget about the standup meeting at {{time}}."
                  value={formData.body}
                  onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use {"{{now.tz}}"} for current time in your timezone
                </p>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  Create Alert
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/alerts">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How your WhatsApp message will look
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="font-semibold text-green-800 mb-2">
                {formData.title || "Message Title"}
              </div>
              <div className="text-green-700">
                {formData.body || "Your message body will appear here..."}
              </div>
              <div className="text-sm text-green-600 mt-2">
                WhatsApp • {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Schedule Details</h4>
              <p className="text-sm text-gray-600">
                <strong>Cron:</strong> {formData.scheduleCron}
              </p>
              <p className="text-sm text-gray-600">
                <strong>To:</strong> {formData.to || "Your WhatsApp number"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timezone:</strong> Asia/Singapore (default)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}