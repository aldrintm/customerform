'use server'

import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export async function sendSmsAction(to, body) {
  // Check if Twilio credentials are set
  if (!to || !body) {
    return {
      success: false,
      error: 'Recipient number and message body are required.',
    }
  }

  // Validate the phone number format (basic validation)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  if (!phoneRegex.test(to)) {
    return { success: false, error: 'Invalid phone number format.' }
  }

  try {
    // Ensure phone number has correct format
    const formattedTo = to.replace(/^\+?1?/, '+1')
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedTo,
    })
    return { success: true, messageId: message.sid }
  } catch (error) {
    console.error('SMS Error:', error)
    return { success: false, error: error.message }
  }
}
