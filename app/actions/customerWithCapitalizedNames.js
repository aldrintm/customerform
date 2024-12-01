const customerWithCapitalizedNames = (name) => {
  let newName
  const nameParts = name.split(' ')
  const capitalizedParts = nameParts.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  })

  newName = capitalizedParts.join('')

  return newName
}

export default customerWithCapitalizedNames


