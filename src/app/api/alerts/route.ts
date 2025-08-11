import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createAlertSchema = z.object({
  name: z.string().min(1).max(100),
  to: z.string().regex(/^\+[1-9]\d{1,14}$/), // E.164 format
  scheduleCron: z.string().min(1),
  template: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    variables: z.record(z.any()).optional(),
  }),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const alerts = await prisma.alert.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json(
      { error: "Failed to fetch alerts" }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = createAlertSchema.parse(body)

    // Calculate next run time (simplified for demo)
    // In production, use a proper cron parser
    const nextRunAt = new Date()
    nextRunAt.setHours(nextRunAt.getHours() + 1) // Next hour for demo

    const alert = await prisma.alert.create({
      data: {
        userId: session.user.id,
        name: data.name,
        channel: "whatsapp",
        to: data.to,
        scheduleCron: data.scheduleCron,
        nextRunAt,
        template: data.template,
      },
    })

    return NextResponse.json({ alert }, { status: 201 })
  } catch (error) {
    console.error("Error creating alert:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create alert" }, 
      { status: 500 }
    )
  }
}