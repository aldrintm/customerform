import { Schema, model, models } from 'mongoose'

const CustomerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: String,
      zipcode: { type: String, trim: true },
    },
    contractorName: {
      type: String,
      trim: true,
    },
    contractorPhone: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    // Reference to projects
    projects: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      default: [],
    },
    // Reference to notes
    officeNotes: {
      type: [Schema.Types.ObjectId],
      ref: 'Note',
      default: [],
    },

    is_flagged: {
      type: Boolean,
      default: false,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Add single field indexes for frequent lookups

CustomerSchema.index({ phone: 1 })
CustomerSchema.index({ email: 1 }, { unique: true })

// Add compound index for customer lookup with project and note population
CustomerSchema.index({ _id: 1})

// Add index for projects array to improve population performance
CustomerSchema.index({ projects: 1 })

// Add index for office notes to improve population performance
CustomerSchema.index({ officeNotes: 1 })

// Add index for frequently accessed fields together
CustomerSchema.index({
  _id: 1,
  firstName: 1,
  lastName: 1,
  createdAt: -1,
})

const Customer = models.Customer || model('Customer', CustomerSchema)

export default Customer
