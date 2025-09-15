import mongoose from 'mongoose'

// Global is used here to maintain a cached connection across hot reloads in development
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectDB() {
  // If we have a connection, return it
  if (cached.conn) {
    return cached.conn
  }

  // Check if MongoDB URI exists
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  // If we don't have a connection, but we have a promise, return the promise
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferMaxEntries: 0,
      retryWrites: true,
      w: 'majority',
      // Add these for better connection handling
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
    }

    mongoose.set('strictQuery', true)

    console.log('🔄 Attempting to connect to MongoDB...')
    cached.promise = mongoose.connect(process.env.MONGODB_URI, options).then((mongoose) => {
      console.log('✅ Connected to MongoDB successfully')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection failed:', error.message)
      cached.promise = null // Reset promise on failure
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection error:', e.message)
    throw new Error(`Failed to connect to MongoDB: ${e.message}`)
  }

  return cached.conn
}
