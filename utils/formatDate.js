import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

export function formatDate(date) {
  if (!date) return ''

  try {
    const parsedDate = parseISO(date)

    // Use UTC timezone to prevent any conversions
    return formatInTimeZone(parsedDate, 'UTC', 'MMM dd, yyyy')
  } catch (error) {
    console.error('Date formatting error:', error)
    return ''
  }
}
