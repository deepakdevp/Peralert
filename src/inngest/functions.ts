import { inngest } from "@/lib/inngest"
import { createClient } from "@/lib/supabase/server"
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
      const supabase = createClient()
      const { data, error } = await supabase
        .from('deliveries')
        .insert({
          alert_id: alertId,
          user_id: userId,
          channel: "whatsapp",
          payload: { to, message, title },
          status: "queued",
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    })

    // Send WhatsApp message
    const result = await step.run("send-message", async () => {
      try {
        const response = await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
          to: `whatsapp:${to}`,
          body: `*${title}*\n\n${message}`,
        })

        const supabase = createClient()
        await supabase
          .from('deliveries')
          .update({ 
            status: "sent",
            payload: { 
              ...delivery.payload as any,
              twilioSid: response.sid 
            }
          })
          .eq('id', delivery.id)

        return { success: true, sid: response.sid }
      } catch (error) {
        const supabase = createClient()
        await supabase
          .from('deliveries')
          .update({ 
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error"
          })
          .eq('id', delivery.id)

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
      const supabase = createClient()
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          profiles (*)
        `)
        .eq('enabled', true)
        .lte('next_run_at', new Date().toISOString())
      
      if (error) throw error
      return data || []
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
          const timeZone = alert.profiles?.timezone || 'UTC'
          const localTime = now.toLocaleString('en-US', { timeZone })
          message = message.replace(/{{now\.tz}}/g, localTime)

          // Trigger WhatsApp send
          await inngest.send({
            name: "alerts.send",
            data: {
              alertId: alert.id,
              userId: alert.user_id,
              to: alert.to,
              message,
              title: template.title || alert.name,
            },
          })

          // Update next run time based on cron schedule
          // For now, we'll skip the complex cron parsing and update manually
          const supabase = createClient()
          await supabase
            .from('alerts')
            .update({
              next_run_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Next day for demo
            })
            .eq('id', alert.id)

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
      const supabase = createClient()
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('type', 'gmail')
        .eq('enabled', true)
      
      if (error) throw error
      return data || []
    })

    const results = await step.run("poll-emails", async () => {
      const results = []
      
      for (const integration of integrations) {
        try {
          // Get user's Google OAuth tokens from Supabase auth
          const supabase = createClient()
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          
          if (userError || !user) {
            results.push({
              integrationId: integration.id,
              status: "error",
              error: "User not authenticated"
            })
            continue
          }

          // Check if user has Google provider
          if (!user.app_metadata?.providers?.includes('google')) {
            results.push({
              integrationId: integration.id,
              status: "error",
              error: "No Google account connected"
            })
            continue
          }

          // Import Gmail functions
          const { getImportantEmails, formatEmailForWhatsApp } = await import("@/lib/gmail")
          
          const emails = await getImportantEmails(integration.user_id, integration)
          
          for (const email of emails) {
            const formatted = formatEmailForWhatsApp(email)
            
            // Send WhatsApp alert for each important email
            await inngest.send({
              name: "alerts.send",
              data: {
                alertId: null, // This is a system-generated alert
                userId: integration.user_id,
                to: "+1234567890", // Would need user's WhatsApp number from profile
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