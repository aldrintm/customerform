'use server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmailAction(to) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'your-verified@email.com', // Use verified sender
      subject: 'New Notification',
      text: 'This is a default message',
      html: <p>This is a default message</p>,
    }

    const response = await sgMail.send(msg)
    return { success: true, messageId: response[0]?.headers['x-message-id'] }
  } catch (error) {
    console.error('SendGrid Error:', error)
    return {
      success: false,
      error: error.response?.body?.errors?.[0]?.message || error.message,
    }
  }
}
