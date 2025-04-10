import twilio from 'twilio'

export function generateRandomSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function generateSixDigitNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000)
  const randomSixDigitStr = randomNumber.toString().padStart(6, '0')
  return randomSixDigitStr
}

// send sms
export async function sendSms(phoneNumber: string, message: string) {
  const plamarVerificationCode = generateRandomSixDigitCode()

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )

    client.messages
      .create({
        body:
          plamarVerificationCode + ' is your verification code from Plamar USA',
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .catch((error) => {
        console.error('Error sending SMS:', error)
        throw new Error('Failed to send SMS')
      })
  } catch (error) {
    console.error('Error sending SMS:', error)
    throw new Error('Failed to send SMS')
  }
}
