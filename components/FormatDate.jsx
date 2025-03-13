export const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  // Add timezone offset to keep local date
  const userTimezone = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() + userTimezone)

  return localDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC', // Force UTC to prevent double conversion
  })
}
