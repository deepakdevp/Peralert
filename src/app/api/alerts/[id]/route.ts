import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { enabled } = await request.json()

    const { data: alert, error: findError } = await supabase
      .from('alerts')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (findError || !alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const { data: updatedAlert, error: updateError } = await supabase
      .from('alerts')
      .update({ enabled })
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({ alert: updatedAlert })
  } catch (error) {
    console.error("Error updating alert:", error)
    return NextResponse.json(
      { error: "Failed to update alert" }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data: alert, error: findError } = await supabase
      .from('alerts')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (findError || !alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const { error: deleteError } = await supabase
      .from('alerts')
      .delete()
      .eq('id', params.id)

    if (deleteError) throw deleteError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json(
      { error: "Failed to delete alert" }, 
      { status: 500 }
    )
  }
}