"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Alert = {
  id: string
  name: string
  channel: string
  to: string
  scheduleCron: string
  enabled: boolean
  template: any
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/alerts")
      if (response.ok) {
        const data = await response.json()
        setAlerts(data.alerts || [])
      }
    } catch (error) {
      console.error("Error fetching alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAlert = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: !enabled }),
      })
      
      if (response.ok) {
        fetchAlerts() // Refresh the list
      }
    } catch (error) {
      console.error("Error toggling alert:", error)
    }
  }

  const deleteAlert = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alert?")) return
    
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        fetchAlerts() // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting alert:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-2">
            Manage your WhatsApp alerts and reminders
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/alerts/new">Create Alert</Link>
        </Button>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>No alerts yet</CardTitle>
            <CardDescription>
              Create your first alert to get started with WhatsApp notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/dashboard/alerts/new">Create Your First Alert</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardHeader>
                <CardTitle>{alert.name}</CardTitle>
                <CardDescription>
                  {alert.enabled ? "Active" : "Paused"} • {alert.channel} • {alert.scheduleCron}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">To: {alert.to}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Message: {alert.template?.title || "No title"}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleAlert(alert.id, alert.enabled)}
                  >
                    {alert.enabled ? "Pause" : "Resume"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}