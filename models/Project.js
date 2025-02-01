import { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    customerType: {
      type: String,
    },
    storeId: {
      type: Number,
    },
    status: {
      type: String,
    },
    purchaseOrders: [
      {
        purchaseOrderNumber: {
          type: String,
        },
        purchaseOrderDate: {
          type: Date,
        },
        squareFeet: {
          type: Number,
        },
        purchaseOrderAmount: {
          type: Number,
        },
      },
    ],
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
