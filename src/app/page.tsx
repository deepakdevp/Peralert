import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Never Miss What Matters
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant WhatsApp alerts for important emails and custom reminders. 
            Stay on top of what's crucial without checking your inbox constantly.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/auth/signin">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">📧</span>
                  Smart Email Filtering
                </CardTitle>
                <CardDescription>
                  Connect your Gmail and get notified only about important emails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Filters by importance automatically</li>
                  <li>• Customizable label filtering</li>
                  <li>• Real-time notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">⏰</span>
                  Custom Reminders
                </CardTitle>
                <CardDescription>
                  Set up recurring WhatsApp reminders for anything you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Flexible scheduling with cron</li>
                  <li>• Custom message templates</li>
                  <li>• Timezone-aware alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">💬</span>
                  WhatsApp Delivery
                </CardTitle>
                <CardDescription>
                  Receive alerts where you're most active - your WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Instant message delivery</li>
                  <li>• Rich message formatting</li>
                  <li>• Delivery confirmation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Stay Alert?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start with 100 free alerts per month. No credit card required.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signin">Start Free Trial</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 PerAlert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}