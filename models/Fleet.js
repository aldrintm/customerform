import { Schema, model, models } from 'mongoose'

const FleetSchema = new Schema(
  {
    vin: {
      type: Number,
      required: [true, 'VIN Number is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    license: {
      type: String,
      required: [true, 'License is required'],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    driver: {
      type: String,
      trim: true,
    },
    purchaseDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'repair', 'sold'],
      default: 'active',
    },
    fasTrack: {
      type: String,
      trim: true,
    },
    other: {
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

const Fleet = models.Fleet || model('Fleet', FleetSchema)

export default Fleet
