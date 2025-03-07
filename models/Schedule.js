import { Schema, model, models } from 'mongoose'

const ScheduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false, // Optional
    },
    measureDescription: {
      type: String,
      trim: true,
    },
    measureDate: {
      type: Date,
    },
    measureTime: {
      type: String,
      trim: true,
    },
    measureBy: {
      type: String,
      trim: true,
    },
    measureNotes: {
      type: String,
      trim: true,
    },
    installDescription: {
      type: String,
      trim: true,
    },
    installDate: {
      type: Date,
    },
    installTime: {
      type: String,
      trim: true,
    },
    installBy: {
      type: String,
      trim: true,
    },
    installNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Schedule = models.Schedule || model('Schedule', ScheduleSchema)

export default Schedule
