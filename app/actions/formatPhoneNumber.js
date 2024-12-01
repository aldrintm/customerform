const formatPhoneNumber = (number) => {
  // check if the number is a string and remove any non-digit character
  const cleaned = ('' + number).replace(/\D/g, '')

  // format the number as (xxx) xxx-xxxx
  const match = cleaned.match(/(\d{3})(\d{3})(\d{4})/)

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  return number // return the number as-is if it doesn't match the expected pattern
}

export default formatPhoneNumber
