import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest"
import { sendWhatsAppAlert, scheduleAlerts, pollGmail } from "@/inngest/functions"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendWhatsAppAlert,
    scheduleAlerts,
    pollGmail,
  ],
})