export function convertToSerializeableObject(leanDocument) {
  // Check if leanDocument is valid before proceeding
  if (!leanDocument || typeof leanDocument !== 'object') {
    throw new Error('Invalid input: expected an object')
  }

  // for (const key of Object.keys(leanDocument)) {
  //   const value = leanDocument[key]
  //   if (
  //     value &&
  //     typeof value.toJSON === 'function' &&
  //     value.toString === 'function'
  //   ) {
  //     leanDocument[key] = value.toString()
  //   }
  // }
  // return leanDocument

  const serializedObject = {}

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key]

    // Check if value is not null and has the toJSON method
    // if (value && typeof value.toJSON === 'function') {
    //   // Convert to a plain value (using toJSON or toString)
    //   serializedObject[key] = value.toJSON ? value.toJSON() : value.toString()
    // } else if (value !== null && value !== undefined) {
    //   // If it's a plain value (non-object), keep it
    //   serializedObject[key] = value
    // } else {
    //   // For null or undefined values, set them directly
    //   serializedObject[key] = value
    // }

    // If the value is a Buffer, convert it to a base64 string.
    if (value && typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
      serializedObject[key] = value.toString('base64')
    }
    // If the value is an array, recursively process its items.
    else if (Array.isArray(value)) {
      serializedObject[key] = value.map((item) =>
        typeof item === 'object' ? convertToSerializeableObject(item) : item
      )
    }
    // If the value has a toJSON method, use it.
    else if (value && typeof value.toJSON === 'function') {
      serializedObject[key] = value.toJSON()
    }
    // Otherwise, assign the value directly.
    else {
      serializedObject[key] = value
    }
  }

  return serializedObject
}
