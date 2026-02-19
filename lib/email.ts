import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM = 'Ready Rental Cleaning <hello@readyrentalcleaning.com>'

const emailBase = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; }
  .wrapper { max-width: 600px; margin: 40px auto; }
  .header { background: linear-gradient(135deg, #0d9488, #0e7490); padding: 32px 40px; border-radius: 16px 16px 0 0; }
  .logo { color: white; font-size: 22px; font-weight: 800; }
  .logo span { opacity: 0.7; }
  .body { background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
  .footer { background: #f3f4f6; padding: 24px 40px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; border-top: none; text-align: center; }
  .footer p { color: #9ca3af; font-size: 12px; line-height: 1.6; }
  h1 { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 8px; }
  p { font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 16px; }
  .highlight { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
  .highlight-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ccfbf1; font-size: 14px; }
  .highlight-row:last-child { border-bottom: none; }
  .label { color: #6b7280; }
  .value { font-weight: 600; color: #111827; }
  .btn { display: inline-block; background: #0d9488; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 8px 0; }
  .step { display: flex; gap: 16px; margin-bottom: 16px; align-items: flex-start; }
  .step-num { background: #0d9488; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; margin-top: 2px; }
  .step-text h4 { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 2px; }
  .step-text p { font-size: 13px; color: #6b7280; margin: 0; }
  .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="logo">Ready<span>Rental</span></div>
    <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px;">Premium Airbnb Turnover Cleaning · Los Angeles</p>
  </div>
  <div class="body">
    ${content}
  </div>
  <div class="footer">
    <p>Ready Rental Cleaning · Los Angeles, CA · <a href="https://readyrentalcleaning.com" style="color: #0d9488;">readyrentalcleaning.com</a></p>
    <p style="margin-top: 6px;">Questions? Email <a href="mailto:hello@readyrentalcleaning.com" style="color: #0d9488;">hello@readyrentalcleaning.com</a> or call (323) 555-0180</p>
  </div>
</div>
</body>
</html>
`

export async function sendBookingConfirmation({
  email, name, address, service, date, time, price,
}: {
  email: string; name: string; address: string; service: string; date: string; time: string; price?: number
}) {
  if (!resend) { console.log('Email: RESEND_API_KEY not configured'); return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>🎉 Booking Confirmed!</h1>
    <p>Hi ${name},</p>
    <p>Your cleaning is booked and confirmed. We will be there on time, ready to make your property spotless.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Address</span><span class="value">${address}</span></div>
      <div class="highlight-row"><span class="label">Service</span><span class="value">${service}</span></div>
      <div class="highlight-row"><span class="label">Date</span><span class="value">${date}</span></div>
      <div class="highlight-row"><span class="label">Time</span><span class="value">${time}</span></div>
      ${price ? `<div class="highlight-row"><span class="label">Total</span><span class="value" style="color:#0d9488">$${price}</span></div>` : ''}
    </div>

    <p><strong>What happens next:</strong></p>
    <div class="step"><div class="step-num">1</div><div class="step-text"><h4>24-Hour Reminder</h4><p>You will get a text and email the day before with your cleaner's details.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text"><h4>Cleaner Arrives</h4><p>Background-checked and insured. Arrives with all professional supplies.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text"><h4>Before/After Photos</h4><p>Photos sent to you after every cleaning for remote verification.</p></div></div>

    <hr class="divider" />
    <p style="font-size:13px;color:#6b7280;">Need to reschedule? Contact us at least 24 hours before: <a href="mailto:hello@readyrentalcleaning.com" style="color:#0d9488;">hello@readyrentalcleaning.com</a> or (323) 555-0180</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `✓ Cleaning Confirmed — ${service} on ${date}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendReminderEmail({
  email, name, address, service, date, time, cleanerName,
}: {
  email: string; name: string; address: string; service: string; date: string; time: string; cleanerName?: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>⏰ Reminder: Cleaning Tomorrow</h1>
    <p>Hi ${name},</p>
    <p>Just a friendly reminder that your Ready Rental Cleaning is scheduled for <strong>tomorrow</strong>.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Address</span><span class="value">${address}</span></div>
      <div class="highlight-row"><span class="label">Service</span><span class="value">${service}</span></div>
      <div class="highlight-row"><span class="label">Date</span><span class="value">${date}</span></div>
      <div class="highlight-row"><span class="label">Time</span><span class="value">${time}</span></div>
      ${cleanerName ? `<div class="highlight-row"><span class="label">Your Cleaner</span><span class="value">${cleanerName}</span></div>` : ''}
    </div>

    <p>Please make sure your property is accessible at the scheduled time. If you need to make any changes, contact us right away.</p>
    <p style="font-size:13px;color:#6b7280;">Call or text: (323) 555-0180 · <a href="mailto:hello@readyrentalcleaning.com" style="color:#0d9488;">hello@readyrentalcleaning.com</a></p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `⏰ Tomorrow: Your Ready Rental Cleaning at ${address}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendCompletionEmail({
  email, name, address, photos,
}: {
  email: string; name: string; address: string; photos?: string[]
}) {
  if (!resend) { return { success: true, skipped: true } }

  const photoHtml = photos && photos.length > 0
    ? `<p><strong>Before/After Photos:</strong></p>${photos.map(url => `<img src="${url}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`).join('')}`
    : '<p>Your photo report will be sent separately within 30 minutes.</p>'

  const html = emailBase(`
    <h1>✅ Your Property is Ready!</h1>
    <p>Hi ${name},</p>
    <p>Your property at <strong>${address}</strong> has been cleaned and is guest-ready. We passed our quality checklist before leaving.</p>

    ${photoHtml}

    <div class="highlight" style="background:#f0fdf4;border-color:#86efac;">
      <div class="highlight-row"><span class="label">✓ All linens changed</span></div>
      <div class="highlight-row"><span class="label">✓ Bathrooms cleaned & disinfected</span></div>
      <div class="highlight-row"><span class="label">✓ Kitchen wiped down</span></div>
      <div class="highlight-row"><span class="label">✓ Floors vacuumed & mopped</span></div>
      <div class="highlight-row"><span class="label">✓ Trash emptied & replaced</span></div>
    </div>

    <p>Your property is guest-ready. Enjoy 5-star reviews!</p>
    <a href="https://readyrentalcleaning.com/book" class="btn">Book Next Cleaning</a>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `✅ Property Ready — ${address}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendReviewRequest({
  email, name, googleReviewUrl,
}: {
  email: string; name: string; googleReviewUrl?: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>⭐ How Did We Do?</h1>
    <p>Hi ${name},</p>
    <p>We hope your guests are loving your fresh, spotless property! Your feedback means everything to us.</p>
    <p>It takes less than 60 seconds and helps other LA hosts find us.</p>

    ${googleReviewUrl ? `<a href="${googleReviewUrl}" class="btn">Leave a Google Review ⭐</a>` : ''}

    <hr class="divider" />
    <p style="font-size:13px;color:#6b7280;">Not satisfied with your cleaning? Reply to this email and we will make it right — 100% guaranteed.</p>
    <p style="font-size:13px;color:#6b7280;">Ready to book your next cleaning? <a href="https://readyrentalcleaning.com/book" style="color:#0d9488;">Book online in 60 seconds</a>.</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `How was your Ready Rental Cleaning? ⭐`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendReferrerWelcome({
  email, name, code,
}: {
  email: string; name: string; code: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://readyrentalcleaning.com'}/referral/track?code=${code}`
  const html = emailBase(`
    <h1>Welcome to the Referral Program</h1>
    <p>Hi ${name},</p>
    <p>You are officially a Ready Rental referral partner. Here is your unique referral link:</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Your Code</span><span class="value">${code}</span></div>
      <div class="highlight-row"><span class="label">Your Link</span><span class="value" style="word-break:break-all;font-size:12px;">${referralLink}</span></div>
    </div>

    <p><strong>How it works:</strong></p>
    <div class="step"><div class="step-num">1</div><div class="step-text"><h4>Share your link</h4><p>Send it to Airbnb hosts, property managers, or anyone who needs cleaning in LA.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text"><h4>They book a cleaning</h4><p>When someone books through your link, you earn a commission.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text"><h4>Get paid every Friday</h4><p>Once your balance hits $50, request a payout via your dashboard.</p></div></div>

    <hr class="divider" />
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://readyrentalcleaning.com'}/referrer/dashboard" class="btn">Go to Your Dashboard</a>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `Welcome to the Ready Rental Referral Program — Your Code: ${code}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendReferralOTP({
  email, name, otp,
}: {
  email: string; name: string; otp: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>Your Login Code</h1>
    <p>Hi ${name},</p>
    <p>Use this code to log in to your referral dashboard:</p>

    <div class="highlight" style="text-align:center;">
      <p style="font-size:36px;font-weight:800;letter-spacing:8px;color:#0d9488;margin:16px 0;">${otp}</p>
      <p style="font-size:13px;color:#6b7280;margin:0;">This code expires in 10 minutes.</p>
    </div>

    <p style="font-size:13px;color:#6b7280;">If you did not request this code, ignore this email.</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `Your Ready Rental login code: ${otp}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendReferralCommission({
  email, name, service, amount, newBalance,
}: {
  email: string; name: string; service: string; amount: number; newBalance: number
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>Commission Earned</h1>
    <p>Hi ${name},</p>
    <p>Great news — one of your referrals just booked a cleaning. You earned a commission.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Service</span><span class="value">${service}</span></div>
      <div class="highlight-row"><span class="label">Commission</span><span class="value" style="color:#0d9488;font-size:20px;">+$${amount}</span></div>
      <div class="highlight-row"><span class="label">New Balance</span><span class="value">$${newBalance.toFixed(2)}</span></div>
    </div>

    ${newBalance >= 50 ? '<p><strong>Your balance is above $50 — you can request a payout from your dashboard.</strong></p>' : '<p>Keep sharing your link to reach the $50 payout threshold.</p>'}

    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://readyrentalcleaning.com'}/referrer/dashboard" class="btn">View Dashboard</a>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `You earned $${amount} — Referral Commission`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendPayoutRequest({
  email, name, amount, method,
}: {
  email: string; name: string; amount: number; method: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>Payout Requested</h1>
    <p>Hi ${name},</p>
    <p>Your payout request has been submitted. We process payouts every Friday.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Amount</span><span class="value" style="color:#0d9488;">$${amount.toFixed(2)}</span></div>
      <div class="highlight-row"><span class="label">Method</span><span class="value">${method}</span></div>
      <div class="highlight-row"><span class="label">Status</span><span class="value">Pending</span></div>
    </div>

    <p style="font-size:13px;color:#6b7280;">You will receive a confirmation once the payout is processed.</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: email, subject: `Payout Request: $${amount.toFixed(2)} via ${method}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendAdminPayoutNotification({
  referrerName, referrerEmail, amount, method, payoutHandle,
}: {
  referrerName: string; referrerEmail: string; amount: number; method: string; payoutHandle: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>New Payout Request</h1>
    <p>A referrer has requested a payout.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Referrer</span><span class="value">${referrerName} (${referrerEmail})</span></div>
      <div class="highlight-row"><span class="label">Amount</span><span class="value" style="color:#0d9488;">$${amount.toFixed(2)}</span></div>
      <div class="highlight-row"><span class="label">Method</span><span class="value">${method}</span></div>
      <div class="highlight-row"><span class="label">Handle</span><span class="value">${payoutHandle}</span></div>
    </div>

    <p>Log in to the admin dashboard to approve or reject this payout.</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: 'hello@readyrentalcleaning.com', subject: `Payout Request: $${amount.toFixed(2)} from ${referrerName}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}

export async function sendCleanerAssignment({
  cleanerEmail, address, date, time, service, accessNotes,
}: {
  cleanerEmail: string; address: string; date: string; time: string; service: string; accessNotes?: string
}) {
  if (!resend) { return { success: true, skipped: true } }

  const html = emailBase(`
    <h1>🧹 New Job Assignment</h1>
    <p>You have been assigned a new cleaning job. Please confirm receipt by replying to this email.</p>

    <div class="highlight">
      <div class="highlight-row"><span class="label">Address</span><span class="value">${address}</span></div>
      <div class="highlight-row"><span class="label">Service</span><span class="value">${service}</span></div>
      <div class="highlight-row"><span class="label">Date</span><span class="value">${date}</span></div>
      <div class="highlight-row"><span class="label">Arrival Time</span><span class="value">${time}</span></div>
      ${accessNotes ? `<div class="highlight-row"><span class="label">Access Notes</span><span class="value">${accessNotes}</span></div>` : ''}
    </div>

    <p><strong>Reminders:</strong></p>
    <div class="step"><div class="step-num">1</div><div class="step-text"><h4>Arrive 10 minutes early</h4><p>Confirm access before your scheduled time.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text"><h4>Take photos before & after</h4><p>Upload to the app within 30 minutes of completion.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text"><h4>Follow the checklist</h4><p>Mark every item complete before leaving.</p></div></div>

    <p style="font-size:13px;color:#6b7280;">Questions? Call (323) 555-0180 immediately.</p>
  `)

  try {
    return await resend.emails.send({ from: FROM, to: cleanerEmail, subject: `New Job: ${service} at ${address} on ${date}`, html })
  } catch (err) { console.error('Email error:', err); throw err }
}
