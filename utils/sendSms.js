import { twilio } from 'twilio'
import { sendSmsAction } from '@/app/actions/sendSmsAction'

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

async function createMessage() {
  const message = await client.messages.create({
    body: 'Code so nice, we checked it twice! Poopy McPoopface',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+16506847304',
  })

  console.log(message.body)
}

createMessage()

export async function sendSMS(to, body) {
  try {
    const result = await sendSmsAction(to, body)
    if (!result.success) throw new Error(result.error)
    return result.messageId
  } catch (error) {
    console.error('SMS sending failed:', error)
    throw error
  }
}
