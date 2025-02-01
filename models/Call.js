import { Schema, model, models } from 'mongoose'

const CallSchema = new Schema(
  {
    noteBy: {
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
