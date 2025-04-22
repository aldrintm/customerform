'use server'
import mail from '@sendgrid/mail'
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
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // this regex is more strict and checks for common TLDs + international domains
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz|co)$/i

  if (!emailRegex.test(to)) {
    return {
      success: false,
      error: 'Invalid recipient email address; Check email input/format',
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
      mailSettings: {
        // Enable tracking settings for the email
        sandboxMode: {
          enable: false, // Set to true for testing without sending emails
        },
        bypassListManagement: {
          enable: false, // Set to true to bypass list management
        },
      },
      trackingSettings: {
        // Enable click and open tracking for the email
        clickTracking: {
          enable: true,
          enableText: true,
        },
        openTracking: {
          enable: true,
        },
        subscriptionTracking: {
          enable: false,
        },
      },
    }

    const response = await sgMail.send(msg)

    // Log the response for debugging purposes
    console.log('Email sent successfully:', response[0].statusCode)
    console.log('Response body:', response[0].body)
    console.log('Response headers:', response[0].headers)
    console.log('Response message:', response[0].headers['x-message-id'])
    console.log('Response message:', response[0].headers['x-queue-id'])
    console.log(
      'Response message:',
      response[0].headers['x-ratelimit-remaining']
    )
    console.log('Response message:', response[0].headers['x-ratelimit-reset'])

    // Check the response status code
    if (response[0]?.statusCode === 202) {
      return {
        success: true,
        messageId: response[0]?.headers['x-message-id'],
      }
    } else if (response[0]?.statusCode === 400) {
      return {
        success: false,
        error: 'Bad Request - Invalid email address or other parameters',
      }
    } else if (response[0]?.statusCode === 401) {
      return {
        success: false,
        error: 'Unauthorized - Invalid API key',
      }
    } else if (response[0]?.statusCode === 403) {
      return {
        success: false,
        error: 'Forbidden - Access denied to the requested resource',
      }
    } else if (response[0]?.statusCode === 429) {
      return {
        success: false,
        error: 'Too Many Requests - Rate limit exceeded',
      }
    }
  } catch (error) {
    console.error('SendGrid Error:', error)

    // Handle specific SendGrid errors
    if (error.response?.body?.errors) {
      const sgError = error.response.body.errors[0]
      console.error('SendGrid Error:', sgError.message)

      // Check for common delivery related errors
      switch (sgError.message) {
        case 'Invalid email address':
          return {
            success: false,
            error: 'Invalid email address',
            code: 'INVALID_EMAIL',
          }
        case 'Email address is not verified':
          return {
            success: false,
            error: 'Email address is not verified',
            code: 'UNVERIFIED_EMAIL',
          }
        case 'Recipient email address is invalid':
          return {
            success: false,
            error: 'Recipient email address is invalid',
            code: 'INVALID_RECIPIENT',
          }
        case 'Blocked email address':
        case 'Bounced email address':
          return {
            success: false,
            error: 'Email rejected by recipient server',
            code: 'DELIVERY_FAILED',
          }
        default:
          return {
            success: false,
            error: sgError.message,
            code: 'OTHER_ERROR',
          }
      }
    }
    return {
      success: false,
      error: 'An error occurred while sending the email',
      code: 'UNKNOWN_ERROR',
    }
  }
}
