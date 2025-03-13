export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const formats = {
    short: {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
    long: {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    },
  }

  return date.toLocaleDateString('en-US', formats[format])
}
