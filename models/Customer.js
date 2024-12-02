import { Schema, model, models } from 'mongoose'

const CustomerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    contractorName: {
      type: String,
    },
    contractorPhone: {
      type: Number,
    },
    purchaseOrderNumber: [
      {
        type: String,
      },
    ],
    storeId: {
      type: String,
    },
    purchaseOrderDate: {
      type: Date,
    },
    purchaseOrderAmount: {
      type: Number,
    },
    squareFeet: {
      type: Number,
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
    materialColor: {
      type: String,
    },
    orderNotes: {
      type: String,
    },
    status: {
      type: String,
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

const Customer = models.Customer || model('Customer', CustomerSchema)

export default Customer
