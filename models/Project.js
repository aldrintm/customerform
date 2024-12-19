import { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    area: {
      type: String,
    },
    description: {
      type: String,
    },
    materialType: {
      type: String,
    },
    materialThickness: {
      type: String,
    },
    materialBrand: {
      type: String,
    },
    materialName: {
      type: String,
    },
    edge: [
      {
        type: String,
      },
    ],
    sink: [
      {
        type: String,
      },
    ],
    sinkLocation: {
      type: String,
    },
    stove: {
      type: String,
    },
    splash: [
      {
        type: String,
      },
    ],
    windowSill: {
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

const Project = models.Project || model('Project', ProjectSchema)

export default Project
