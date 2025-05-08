import { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    schedules: {
      type: [Schema.Types.ObjectId],
      ref: 'Schedule',
      default: [],
    },
    customerType: {
      type: String,
      trim: true,
    },
    storeId: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        'will call',
        'for template',
        'material order',
        'need additional',
        'seam diagram',
        'in fabrication',
        'hold',
        'pending',
        'for install',
        'completed',
        'service',
      ], // 🔥 Example Statuses
      trim: true,
    },
    purchaseOrders: [
      {
        purchaseOrderNumber: {
          type: String,
          trim: true,
        },
        purchaseOrderDate: {
          type: Date,
        },
        squareFeet: {
          type: Number,
          trim: true,
        },
        purchaseOrderAmount: {
          type: Number,
          get: (v) => Number(v).toFixed(2),
          set: (v) => Number(Number(v).toFixed(2)),
          min: 0,
          default: 0.0,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    materialType: {
      type: String,
      trim: true,
    },
    materialThickness: {
      type: String,
    },
    materialBrand: {
      type: String,
      trim: true,
    },
    materialColor: {
      type: String,
      trim: true,
    },
    materialFinish: {
      type: String,
      trim: true,
    },
    edge: [
      {
        type: String,
        trim: true,
      },
    ],
    sinkQuantity: {
      type: Number,
      min: 0,
    },
    sinkType: {
      type: String,
      trim: true,
    },
    sinkLocation: {
      type: String,
      trim: true,
    },
    sinkInfo: {
      type: String,
    },
    stove: {
      type: Boolean,
      default: false,
      trim: true,
    },
    splash: [
      {
        type: String,
        trim: true,
      },
    ],
    cooktop: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable getters when converting to JSON
    toObject: { getters: true }, // Enable getters when converting to object
  }
)

const Project = models.Project || model('Project', ProjectSchema)

export default Project
