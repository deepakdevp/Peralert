import { google } from 'googleapis'
import { createClient } from './supabase/server'

export async function getGmailClient(userId: string) {
  const supabase = createClient()
  
  // Get user session from Supabase
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session?.provider_token) {
    throw new Error('No Google access token found')
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    access_token: session.provider_token,
    refresh_token: session.provider_refresh_token,
  })

  return google.gmail({ version: 'v1', auth: oauth2Client })
}

export async function getImportantEmails(userId: string, integration: any) {
  try {
    const gmail = await getGmailClient(userId)
    
    // Build query based on integration settings
    let query = 'is:important'
    if (integration.label_filter && integration.label_filter !== 'INBOX') {
      query += ` label:${integration.label_filter}`
    }
    
    // Get messages from the last 5 minutes to avoid duplicates
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const timestamp = Math.floor(fiveMinutesAgo.getTime() / 1000)
    query += ` newer_than:${timestamp}`

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10,
    })

    if (!response.data.messages) {
      return []
    }

    const emails = []
    for (const message of response.data.messages) {
      const details = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
        format: 'metadata',
        metadataHeaders: ['From', 'Subject', 'Date'],
      })

      const headers = details.data.payload?.headers || []
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown'
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No subject'
      const date = headers.find(h => h.name === 'Date')?.value || ''

      // Get a snippet of the email
      const snippet = details.data.snippet || ''

      emails.push({
        id: message.id,
        threadId: details.data.threadId,
        from,
        subject,
        snippet,
        date,
        gmailLink: `https://mail.google.com/mail/u/0/#inbox/${details.data.threadId}`,
      })
    }

    return emails
  } catch (error) {
    console.error('Error fetching Gmail messages:', error)
    throw error
  }
}

export function formatEmailForWhatsApp(email: any) {
  return {
    title: "📧 New important email",
    body: `From: ${email.from}\nSubject: ${email.subject}\nPreview: ${email.snippet.substring(0, 100)}...\nOpen: ${email.gmailLink}`
  }
}