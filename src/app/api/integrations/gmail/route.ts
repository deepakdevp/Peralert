import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { labelFilter, importance } = await request.json()

    // Check if user has Google OAuth enabled (they signed in with Google)
    if (!user.app_metadata?.providers?.includes('google')) {
      return NextResponse.json(
        { error: "No Google account connected" }, 
        { status: 400 }
      )
    }

    // Create or update Gmail integration
    const { data: integration, error } = await supabase
      .from('integrations')
      .upsert({
        user_id: user.id,
        type: "gmail",
        label_filter: labelFilter || "INBOX",
        importance: importance || "important-only",
        enabled: true,
      }, {
        onConflict: 'user_id,type',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ integration }, { status: 201 })
  } catch (error) {
    console.error("Error creating Gmail integration:", error)
    return NextResponse.json(
      { error: "Failed to create Gmail integration" }, 
      { status: 500 }
    )
  }
}