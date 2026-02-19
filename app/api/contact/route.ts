import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, properties, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, message' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission (Resend not configured):', {
        firstName,
        lastName,
        email,
        phone,
        properties,
        message,
      })
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send admin notification
    const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; color: #111827; }
  .card { max-width: 560px; margin: 24px auto; background: white; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; }
  .header { background: linear-gradient(135deg, #0d9488, #0e7490); padding: 20px 24px; color: white; }
  .header h2 { margin: 0; font-size: 18px; }
  .body { padding: 24px; }
  .row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
  .row:last-child { border-bottom: none; }
  .label { width: 120px; color: #6b7280; font-size: 13px; font-weight: 600; flex-shrink: 0; }
  .value { color: #111827; font-size: 14px; }
  .message { background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; line-height: 1.6; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h2>New Contact Form Submission</h2>
  </div>
  <div class="body">
    <div class="row"><span class="label">Name</span><span class="value">${firstName} ${lastName}</span></div>
    <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
    ${phone ? `<div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>` : ''}
    ${properties ? `<div class="row"><span class="label">Properties</span><span class="value">${properties}</span></div>` : ''}
    <div class="message"><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</div>
  </div>
</div>
</body>
</html>`

    // Send admin notification email
    await resend.emails.send({
      from: 'Ready Rental Cleaning <hello@readyrentalcleaning.com>',
      to: 'hello@readyrentalcleaning.com',
      subject: `New Contact: ${firstName} ${lastName}`,
      html: adminHtml,
      reply_to: email,
    })

    // Send auto-reply to the sender
    const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; color: #111827; }
  .card { max-width: 560px; margin: 24px auto; background: white; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; }
  .header { background: linear-gradient(135deg, #0d9488, #0e7490); padding: 24px; color: white; }
  .header h2 { margin: 0; font-size: 20px; }
  .body { padding: 24px; }
  .body p { font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 14px; }
  .cta { display: inline-block; background: #0d9488; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 8px; }
  .footer { padding: 16px 24px; background: #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h2>Thanks for reaching out!</h2>
  </div>
  <div class="body">
    <p>Hi ${firstName},</p>
    <p>Thanks for reaching out to Ready Rental Cleaning! We received your message and will respond within 2 hours during business hours (7 AM - 8 PM PT).</p>
    <p>In the meantime, you can book a cleaning directly on our website:</p>
    <a href="https://readyrentalcleaning.com/book" class="cta">Book a Cleaning</a>
  </div>
  <div class="footer">
    <p>Ready Rental Cleaning &middot; Los Angeles, CA &middot; (323) 555-0180</p>
  </div>
</div>
</body>
</html>`

    await resend.emails.send({
      from: 'Ready Rental Cleaning <hello@readyrentalcleaning.com>',
      to: email,
      subject: 'We received your message - Ready Rental Cleaning',
      html: autoReplyHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
