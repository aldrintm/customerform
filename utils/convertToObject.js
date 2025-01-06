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
    if (value && typeof value.toJSON === 'function') {
      // Convert to a plain value (using toJSON or toString)
      serializedObject[key] = value.toJSON ? value.toJSON() : value.toString()
    } else if (value !== null && value !== undefined) {
      // If it's a plain value (non-object), keep it
      serializedObject[key] = value
    } else {
      // For null or undefined values, set them directly
      serializedObject[key] = value
    }
  }

  return serializedObject
}
