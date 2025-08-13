import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Product Manager at TechCorp",
      quote: "PerAlert has revolutionized how I manage critical communications. Never miss important emails again!"
    },
    {
      name: "Michael Rodriguez", 
      title: "CEO at StartupX",
      quote: "The custom reminders feature is a game-changer. It keeps my team aligned and projects on track."
    },
    {
      name: "Jessica Kim",
      title: "Operations Director",
      quote: "Lightning-fast WhatsApp alerts ensure I'm always in the loop, even when I'm away from my desk."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-black/80"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                  <span className="text-white">🚀 New: Custom Reminders Available</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-fade-in-up">
                  <span className="block animate-wave">Never Miss What</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                    Matters Most
                  </span>
                </h1>
              </div>
              
              <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                Transform your productivity with intelligent WhatsApp alerts for critical emails and custom reminders. Stay focused on what truly matters.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in-up delay-300">
                <Button size="lg" className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 animate-pulse-glow" asChild>
                  <Link href="/auth/signin">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" className="group relative px-8 py-4 text-lg font-semibold border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 transform hover:scale-105" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400 animate-fade-in-up delay-400">
                <div className="flex items-center group cursor-pointer hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse group-hover:animate-bounce"></div>
                  <span>100 free alerts/month</span>
                </div>
                <div className="flex items-center group cursor-pointer hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse group-hover:animate-bounce delay-100"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center group cursor-pointer hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse group-hover:animate-bounce delay-200"></div>
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-300 mb-8 animate-typewriter overflow-hidden border-r-2 border-white/50">
              Trusted by professionals at leading companies worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
              <div className="h-12 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300 animate-float">
                <span className="text-gray-300 font-semibold">TechCorp</span>
              </div>
              <div className="h-12 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300 animate-float delay-100">
                <span className="text-gray-300 font-semibold">StartupX</span>
              </div>
              <div className="h-12 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300 animate-float delay-200">
                <span className="text-gray-300 font-semibold">InnovateNow</span>
              </div>
              <div className="h-12 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300 animate-float delay-300">
                <span className="text-gray-300 font-semibold">FutureStack</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                How PerAlert Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-100">
                Three simple steps to transform how you handle important communications
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="md:col-span-2 group">
                <Card className="h-full border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">📧</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      Smart Email Filtering
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      AI-powered filtering ensures you only get notified about emails that truly matter
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="group">
                <Card className="h-full border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up delay-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">⏰</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      Custom Reminders
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Set intelligent reminders for deadlines and important tasks
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="group">
                <Card className="h-full border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in-up delay-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">💬</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors">
                      WhatsApp Delivery
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Instant delivery to your WhatsApp where you're always connected
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <div className="md:col-span-2 group">
                <Card className="h-full border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in-up delay-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">📊</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                      Real-time Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Track delivery rates, response times, and optimization insights
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up group">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  10k+
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Active Users</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up delay-100 group">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  1M+
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Alerts Delivered</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in-up delay-200 group">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent animate-pulse">
                  99.9%
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Uptime</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in-up delay-300 group">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-pulse">
                  &lt;2s
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Avg Delivery</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                What Our Users Say
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className={`p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up delay-${index * 100} group`}>
                  <CardContent className="space-y-4">
                    <div className="text-gray-300 italic group-hover:text-white transition-colors">
                      "{testimonial.quote}"
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up group">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors">
                Ready to Transform Your Productivity?
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto group-hover:text-white transition-colors">
                Join thousands of professionals who never miss important communications. Start your free trial today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 animate-pulse-glow" asChild>
                  <Link href="/auth/signin">Start Free Trial</Link>
                </Button>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>No credit card • 100 free alerts • Cancel anytime</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                PerAlert
              </h3>
              <p className="text-gray-400">
                Never miss what matters most with intelligent WhatsApp alerts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white transition-colors hover:underline">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 text-center border-t border-white/10">
            <div className="inline-block px-6 py-2 text-gray-400 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              &copy; 2025 PerAlert. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}