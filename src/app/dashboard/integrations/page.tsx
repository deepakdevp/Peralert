"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function IntegrationsPage() {
  const handleConnectGmail = () => {
    // TODO: Implement Gmail OAuth flow
    console.log("Connecting Gmail...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-2">
          Connect your accounts to get alerts for important events
        </p>
      </div>

      {/* Available Integrations */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-3">📧</span>
              Gmail Integration
            </CardTitle>
            <CardDescription>
              Get WhatsApp alerts for important emails in your Gmail inbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automatic importance detection</li>
                  <li>• Custom label filtering</li>
                  <li>• Real-time email monitoring</li>
                  <li>• Rich message previews</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Not Connected
                    </p>
                    <p className="text-sm text-yellow-700">
                      Connect your Gmail to start receiving email alerts
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleConnectGmail} className="w-full">
                Connect Gmail Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Future integrations */}
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-3">📅</span>
              Calendar Integration
              <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                Coming Soon
              </span>
            </CardTitle>
            <CardDescription>
              Get reminders for upcoming meetings and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              This integration will be available in a future update.
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-3">📱</span>
              Slack Integration
              <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                Coming Soon
              </span>
            </CardTitle>
            <CardDescription>
              Get WhatsApp alerts for important Slack messages and mentions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              This integration will be available in a future update.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-0.5">💡</span>
              <div>
                <p className="font-medium">Start with Gmail</p>
                <p className="text-sm text-gray-600">
                  Gmail integration is the most popular way to get started with PerAlert
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-0.5">✅</span>
              <div>
                <p className="font-medium">Your data is secure</p>
                <p className="text-sm text-gray-600">
                  We only read email metadata to check importance. Email content is never stored.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-0.5">⚙️</span>
              <div>
                <p className="font-medium">Customize your alerts</p>
                <p className="text-sm text-gray-600">
                  Each integration can be configured to match your specific needs
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}