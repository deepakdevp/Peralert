"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSupabase } from "@/components/providers"
import { createClient } from "@/lib/supabase/client"

export function Navbar() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              PerAlert
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium hover:underline">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                    <AvatarFallback>
                      {user.user_metadata?.name?.[0] || user.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}