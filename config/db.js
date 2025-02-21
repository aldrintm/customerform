import mongoose from 'mongoose'

// let connected = false

// const connectDB = async () => {
//   mongoose.set('strictQuery', true)

//   //If DB is already connected, do not connect again
//   if (connected) {
//     console.log('MongoDB is connected')
//     return
//   }

//   // Connect to MongoDB
//   try {
//     await mongoose.connect(process.env.MONGODB_URI)
//     connected = true
//   } catch (error) {
//     console.log(error)
//   }
// }

// export default connectDB

let cachedConnection = null

export default async function connectDB() {
  if (cachedConnection) {
    return cachedConnection
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {})
    cachedConnection = conn
    return conn
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
