import { Schema, model, models } from 'mongoose'

const NoteSchema = new Schema(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    noteDate: {
      type: Date,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Note = models.Note || model('Note', NoteSchema)

export default Note
