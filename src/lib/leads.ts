export type LeadPayload = {
  name?: string | FormDataEntryValue
  company?: string | FormDataEntryValue
  email?: string | FormDataEntryValue
  phone?: string | FormDataEntryValue
  brief?: string | FormDataEntryValue
  budget?: string | FormDataEntryValue
  ref?: string | FormDataEntryValue
  createdAtIso?: string
  page?: string
  userAgent?: string
}

export async function sendLeadToWebhook(lead: LeadPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL as string | undefined
  if (!webhookUrl) return

  const payload = {
    ...lead,
    createdAtIso: lead.createdAtIso ?? new Date().toISOString(),
  }

  try {
    // Use text/plain to keep the request "simple" and avoid CORS preflight with Apps Script
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'cors',
      keepalive: true,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('sendLeadToWebhook error:', error)
  }
}

export async function sendLeadToTelegram(lead: LeadPayload): Promise<void> {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined
  if (!botToken || !chatId) return

  const text = [
    'Новая заявка 📨',
    `Имя: ${lead.name ?? ''}`,
    `Компания: ${lead.company ?? ''}`,
    `Email/TG: ${lead.email ?? ''}`,
    `Телефон: ${lead.phone ?? ''}`,
    `Бюджет: ${lead.budget ?? ''}`,
    `Источник: ${lead.ref ?? ''}`,
    `Страница: ${lead.page ?? ''}`,
  ].join('\n')

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('sendLeadToTelegram error:', error)
  }
}


