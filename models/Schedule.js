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
    },
    description: {
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
    measuredBy: {
      type: String,
      trim: true,
    },
    installDate: {
      type: String,
    },
    installBy: {
      type: String,
      trim: true,
    },
    notes: {
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
