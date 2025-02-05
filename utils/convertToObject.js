// utils/convertToObject.js
import { Types } from 'mongoose'

export function convertToSerializeableObject(doc) {
  // Base cases:
  if (doc === null || doc === undefined) return doc
  if (typeof doc !== 'object') return doc
  if (doc instanceof Date) return doc.toISOString()
  // If it's a Mongoose ObjectId, convert it to a string.
  if (doc instanceof Types.ObjectId) return doc.toString()
  // If it's a Buffer, convert it to a base64 string.
  if (Buffer.isBuffer(doc)) return doc.toString('base64')
  // If it's an array, recursively process each element.
  if (Array.isArray(doc))
    return doc.map((item) => convertToSerializeableObject(item))

  // Otherwise, iterate over its keys.
  const plainObj = {}
  for (const key in doc) {
    if (Object.prototype.hasOwnProperty.call(doc, key)) {
      plainObj[key] = convertToSerializeableObject(doc[key])
    }
  }
  return plainObj
}
