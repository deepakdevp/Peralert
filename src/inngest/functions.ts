import { inngest } from "@/lib/inngest"
import { prisma } from "@/lib/prisma"
import twilio from "twilio"

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// Send WhatsApp message function
export const sendWhatsAppAlert = inngest.createFunction(
  { id: "send-whatsapp-alert" },
  { event: "alerts.send" },
  async ({ event, step }) => {
    const { alertId, userId, to, message, title } = event.data

    // Log the delivery attempt
    const delivery = await step.run("log-delivery", async () => {
      return prisma.delivery.create({
        data: {
          alertId,
          userId,
          channel: "whatsapp",
          payload: { to, message, title },
          status: "queued",
        },
      })
    })

    // Send WhatsApp message
    const result = await step.run("send-message", async () => {
      try {
        const response = await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
          to: `whatsapp:${to}`,
          body: `*${title}*\n\n${message}`,
        })

        await prisma.delivery.update({
          where: { id: delivery.id },
          data: { 
            status: "sent",
            payload: { 
              ...delivery.payload as any,
              twilioSid: response.sid 
            }
          },
        })

        return { success: true, sid: response.sid }
      } catch (error) {
        await prisma.delivery.update({
          where: { id: delivery.id },
          data: { 
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error"
          },
        })

        throw error
      }
    })

    return result
  }
)

// Schedule alerts function - runs every minute to check for due alerts
export const scheduleAlerts = inngest.createFunction(
  { id: "schedule-alerts" },
  { cron: "0 * * * *" }, // Every hour
  async ({ step }) => {
    const dueAlerts = await step.run("find-due-alerts", async () => {
      return prisma.alert.findMany({
        where: {
          enabled: true,
          nextRunAt: {
            lte: new Date(),
          },
        },
        include: {
          user: true,
        },
      })
    })

    const results = await step.run("process-alerts", async () => {
      const results = []
      
      for (const alert of dueAlerts) {
        try {
          // Parse template and variables
          const template = alert.template as any
          let message = template.body || ""
          
          // Replace variables
          if (template.variables) {
            Object.entries(template.variables).forEach(([key, value]) => {
              message = message.replace(new RegExp(`{{${key}}}`, 'g'), value)
            })
          }
          
          // Replace built-in variables
          const now = new Date()
          const timeZone = alert.user.timezone || 'UTC'
          const localTime = now.toLocaleString('en-US', { timeZone })
          message = message.replace(/{{now\.tz}}/g, localTime)

          // Trigger WhatsApp send
          await inngest.send({
            name: "alerts.send",
            data: {
              alertId: alert.id,
              userId: alert.userId,
              to: alert.to,
              message,
              title: template.title || alert.name,
            },
          })

          // Update next run time based on cron schedule
          // For now, we'll skip the complex cron parsing and update manually
          await prisma.alert.update({
            where: { id: alert.id },
            data: {
              nextRunAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day for demo
            },
          })

          results.push({ alertId: alert.id, status: "scheduled" })
        } catch (error) {
          results.push({ 
            alertId: alert.id, 
            status: "error", 
            error: error instanceof Error ? error.message : "Unknown error"
          })
        }
      }
      
      return results
    })

    return { processed: results.length, results }
  }
)

// Gmail polling function
export const pollGmail = inngest.createFunction(
  { id: "poll-gmail" },
  { cron: "*/5 * * * *" }, // Every 5 minutes
  async ({ step }) => {
    const integrations = await step.run("get-gmail-integrations", async () => {
      return prisma.integration.findMany({
        where: {
          type: "gmail",
          enabled: true,
        },
        include: {
          user: {
            include: {
              accounts: {
                where: {
                  provider: "google"
                }
              }
            }
          }
        },
      })
    })

    const results = await step.run("poll-emails", async () => {
      const results = []
      
      for (const integration of integrations) {
        const googleAccount = integration.user.accounts.find(
          account => account.provider === "google"
        )
        
        if (!googleAccount?.access_token) {
          results.push({
            integrationId: integration.id,
            status: "error",
            error: "No Google access token found"
          })
          continue
        }

        try {
          // Import Gmail functions
          const { getImportantEmails, formatEmailForWhatsApp } = await import("@/lib/gmail")
          
          const emails = await getImportantEmails(integration.userId, integration)
          
          for (const email of emails) {
            const formatted = formatEmailForWhatsApp(email)
            
            // Send WhatsApp alert for each important email
            await inngest.send({
              name: "alerts.send",
              data: {
                alertId: null, // This is a system-generated alert
                userId: integration.userId,
                to: integration.user.accounts[0]?.access_token, // Would need user's WhatsApp number
                message: formatted.body,
                title: formatted.title,
              },
            })
          }
          
          results.push({
            integrationId: integration.id,
            status: "success",
            processed: emails.length
          })
        } catch (error) {
          results.push({
            integrationId: integration.id,
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error"
          })
        }
      }
      
      return results
    })

    return { processed: results.length, results }
  }
)