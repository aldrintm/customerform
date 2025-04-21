'use server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export async function sendEmailAction(to) {
//   const msg = {
//     to,
//     from: process.env.SENDGRID_FROM_EMAIL, // Use verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>This is coming from Customer Form Marblesoft</strong>',
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log(`Email sent to ${to}`)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }

export async function sendEmailAction(to) {
  // Check if SendGrid API key and sender email are set
  // This is important for security and to avoid sending emails without proper configuration
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    return {
      success: false,
      error: 'SendGrid configuration is missing',
    }
  }

  // Check if the recipient email is provided
  if (!to) {
    return {
      success: false,
      error: 'Recipient email is required',
    }
  }

  // Check if the recipient email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(to)) {
    return {
      success: false,
      error: 'Invalid recipient email address',
    }
  }

  // Check if the SendGrid API key is valid
  // This is a basic check; in a real-world scenario, you might want to handle this differently
  if (process.env.SENDGRID_API_KEY.length < 20) {
    return {
      success: false,
      error: 'Invalid SendGrid API key',
    }
  }

  // Check if the sender email is verified in SendGrid
  // This is a basic check; in a real-world scenario, you might want to handle this differently
  if (!process.env.SENDGRID_FROM_EMAIL.includes('@')) {
    return {
      success: false,
      error: 'Sender email is not verified in SendGrid',
    }
  }

  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL, // Use verified sender
      subject: 'Schedule Notification from Plamar USA',
      text: 'This is a text default message - not sure if it will be used',
      html: '<h1>This note is from Marblesoft</h1>',
    }

    sgMail.send(msg)

    return { success: true }
  } catch (error) {
    console.error('SendGrid Error:', error)
    return {
      success: false,
      error: error.response?.body?.errors?.[0]?.message || error.message,
    }
  }
}
