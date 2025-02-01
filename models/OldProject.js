import { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
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
    materialFinish: {
      type: String,
    },
    edge: [
      {
        type: String,
      },
    ],
    sinkQuantity: {
      type: String,
    },
    sinkType: {
      type: String,
    },
    sinkLocation: {
      type: String,
    },
    sinkInfo: {
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
      type: Boolean,
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
