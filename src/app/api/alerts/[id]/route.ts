import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { enabled } = await request.json()

    const alert = await prisma.alert.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const updatedAlert = await prisma.alert.update({
      where: { id: params.id },
      data: { enabled },
    })

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
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const alert = await prisma.alert.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    await prisma.alert.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json(
      { error: "Failed to delete alert" }, 
      { status: 500 }
    )
  }
}