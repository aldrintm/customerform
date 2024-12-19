import { Schema, model, models } from 'mongoose'

const ScheduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    description: {
      type: String,
    },
    measureDate: {
      type: Date,
    },
    measuredBy: {
      type: String,
    },
    installDate: {
      type: String,
    },
    installBy: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Schedule = models.Schedule || model('Schedule', ScheduleSchema)

export default Schedule
