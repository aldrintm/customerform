'use server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmailAction({ to }) {
  // Validate required fields
  //   if (!to || !from || !subject || (!text && !html)) {
  //     return {
  //       success: false,
  //       error: 'Missing required fields',
  //     }
  //   }

  try {
    await sgMail.send({
      to,
      from: 'aldrin@plamarusa.com',
      subject: 'Sending with the new email notification',
      // You can also use the HTML content instead of plain text
      text: 'and it works!',
      html: 'this is coming from our application',
    })

    return { success: true }
  } catch (error) {
    console.error('Email Error:', error)
    return {
      success: false,
      error: error.response?.body || error.message,
    }
  }
}
