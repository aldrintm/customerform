import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Message = models.Message || model('Message', MessageSchema)

export default Message
