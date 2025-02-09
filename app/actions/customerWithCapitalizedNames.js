const customerWithCapitalizedNames = (name) => {
  // let newName
  // const nameParts = name.split(' ')
  // const capitalizedParts = nameParts.map((part) => {
  //   return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  // })
  // newName = capitalizedParts.join('')
  // return newName

  // Split the name by spaces, map over each part to capitalize the first letter,
  // and then join the parts back with a space.
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

export default customerWithCapitalizedNames
