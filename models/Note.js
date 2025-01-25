import { Schema, model, models } from 'mongoose'

const NoteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    date: {
      type: Date,
    },
    note: {
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

const Note = models.Note || model('Note', NoteSchema)

export default Note
