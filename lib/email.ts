import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendBookingConfirmation({
  email,
  name,
  address,
  service,
  date,
  time,
}: {
  email: string
  name: string
  address: string
  service: string
  date: string
  time: string
}) {
  if (!resend) {
    console.log('Email service not configured, skipping confirmation email')
    return { success: true, skipped: true }
  }

  if (!resend) {
    console.log('Email service not configured')
    return { success: true, skipped: true }
  }

  try {
    const result = await resend.emails.send({
      from: 'noreply@swivelclean.la',
      to: email,
      subject: '✓ Your Cleaning is Confirmed!',
      html: `
        <h1>Cleaning Confirmed!</h1>
        <p>Hi ${name},</p>
        <p>Your cleaning is scheduled for:</p>
        <ul>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>We'll send you a reminder 24 hours before. Your cleaner will arrive on time with supplies and full liability coverage.</p>
        <p>Questions? Reply to this email or call us.</p>
        <p>See you soon!<br/>SwivelClean LA</p>
      `,
    })
    console.log('Confirmation email sent:', result)
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}

export async function sendCleanerAssignment({
  cleanerEmail,
  address,
  date,
  time,
  service,
}: {
  cleanerEmail: string
  address: string
  date: string
  time: string
  service: string
}) {
  if (!resend) {
    console.log('Email service not configured')
    return { success: true, skipped: true }
  }

  try {
    const result = await resend.emails.send({
      from: 'noreply@swivelclean.la',
      to: cleanerEmail,
      subject: 'New Cleaning Job Assignment',
      html: `
        <h1>New Job!</h1>
        <p>You have been assigned a new cleaning:</p>
        <ul>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Please confirm receipt and arrive 10 minutes early.</p>
      `,
    })
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}

export async function sendReviewRequest({
  email,
  name,
  googleReviewUrl,
  airbnbReviewUrl,
}: {
  email: string
  name: string
  googleReviewUrl: string
  airbnbReviewUrl: string
}) {
  if (!resend) {
    console.log('Email service not configured')
    return { success: true, skipped: true }
  }

  try {
    const result = await resend.emails.send({
      from: 'noreply@swivelclean.la',
      to: email,
      subject: 'How was your cleaning? Leave a review!',
      html: `
        <h1>How did we do?</h1>
        <p>Hi ${name},</p>
        <p>We'd love to know what you thought of your cleaning!</p>
        <p>
          <strong><a href="${googleReviewUrl}" style="color: #0ea5e9;">Leave a Google Review</a></strong> or
          <strong><a href="${airbnbReviewUrl}" style="color: #0ea5e9;">Post on Airbnb</a></strong>
        </p>
        <p>Your feedback helps us serve hosts better.</p>
        <p>Thanks!<br/>SwivelClean LA</p>
      `,
    })
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}

export async function sendCompletionEmail({
  email,
  name,
  address,
  photos,
}: {
  email: string
  name: string
  address: string
  photos: string[]
}) {
  if (!resend) {
    console.log('Email service not configured')
    return { success: true, skipped: true }
  }

  try {
    const photoHtml = photos.map(url => `<img src="${url}" style="max-width: 300px; margin: 10px 0;" />`).join('')

    const result = await resend.emails.send({
      from: 'noreply@swivelclean.la',
      to: email,
      subject: '✓ Your Property is Ready!',
      html: `
        <h1>Cleaning Complete!</h1>
        <p>Hi ${name},</p>
        <p>Your property at <strong>${address}</strong> is now spotless and ready for your next guest.</p>
        <h2>Photos:</h2>
        ${photoHtml}
        <p>Your property passed our quality check. Invoice attached.</p>
        <p>Book again anytime!<br/>SwivelClean LA</p>
      `,
    })
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
