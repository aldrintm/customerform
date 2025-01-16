import { Schema, model, models } from 'mongoose'

const CallSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    callDate: {
      type: Date,
    },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Call = models.Call || model('Call', CallSchema)

export default Call
