import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromPhone = process.env.TWILIO_PHONE_NUMBER

const client =
  accountSid && authToken ? twilio(accountSid, authToken) : null

async function sendSMS(to: string, body: string) {
  if (!client || !fromPhone) {
    console.log('SMS: Twilio not configured (missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER)')
    return { success: true, skipped: true }
  }

  try {
    const message = await client.messages.create({
      body,
      from: fromPhone,
      to,
    })
    return { success: true, sid: message.sid }
  } catch (err) {
    console.error('SMS send error:', err)
    throw err
  }
}

export async function sendBookingConfirmationSMS({
  phone,
  name,
  service,
  date,
  time,
  address,
}: {
  phone: string
  name: string
  service: string
  date: string
  time: string
  address: string
}) {
  const body = `Hi ${name}! Your Ready Rental Cleaning is confirmed: ${service} at ${address} on ${date} at ${time}. Questions? Reply to this text or call (323) 555-0180.`
  return sendSMS(phone, body)
}

export async function sendCleanerAssignmentSMS({
  phone,
  address,
  date,
  time,
  service,
}: {
  phone: string
  address: string
  date: string
  time: string
  service: string
}) {
  const body = `Ready Rental Cleaning Job: ${service} at ${address} on ${date} at ${time}. Arrive 10 min early. Take before/after photos. Reply CONFIRM.`
  return sendSMS(phone, body)
}

export async function send24hReminderSMS({
  phone,
  name,
  address,
  date,
  time,
  cleanerName,
}: {
  phone: string
  name: string
  address: string
  date: string
  time: string
  cleanerName?: string
}) {
  const cleanerNote = cleanerName ? `Your cleaner: ${cleanerName}. ` : ''
  const body = `Reminder: Your Ready Rental Cleaning is tomorrow at ${time}. ${cleanerNote}Address: ${address}. Need to reschedule? Call (323) 555-0180.`
  return sendSMS(phone, body)
}
