import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { labelFilter, importance } = await request.json()

    // Check if user has a Google account
    const googleAccount = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "google",
      },
    })

    if (!googleAccount) {
      return NextResponse.json(
        { error: "No Google account connected" }, 
        { status: 400 }
      )
    }

    // Create or update Gmail integration
    const integration = await prisma.integration.upsert({
      where: {
        userId_type: {
          userId: session.user.id,
          type: "gmail",
        },
      },
      update: {
        labelFilter: labelFilter || "INBOX",
        importance: importance || "important-only",
        enabled: true,
      },
      create: {
        userId: session.user.id,
        type: "gmail",
        labelFilter: labelFilter || "INBOX",
        importance: importance || "important-only",
        enabled: true,
      },
    })

    return NextResponse.json({ integration }, { status: 201 })
  } catch (error) {
    console.error("Error creating Gmail integration:", error)
    return NextResponse.json(
      { error: "Failed to create Gmail integration" }, 
      { status: 500 }
    )
  }
}