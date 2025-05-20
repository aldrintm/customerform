import { Schema, model, models } from 'mongoose'

const EmployeeSchema = new Schema(
  {
    employeeId: {
      type: Number,
      required: [true, 'Employee ID is required'],
      trim: true,
    },
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
    emergencyContact: {
      type: String,
      trim: true,
    },
    emergencyRelation: {
      type: String,
      trim: true,
    },
    emergencyContactPhone: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    hireDate: {
      type: Date,
      required: [true, 'Hire Date is required'],
    },
    terminationDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'terminated'],
      default: 'active',
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

// Add single field indexes for frequent lookups
EmployeeSchema.index({ employeeId: 1 })
EmployeeSchema.index({ firstName: 1 })
EmployeeSchema.index({ lastName: 1 })
EmployeeSchema.index({ phone: 1 })
EmployeeSchema.index({ email: 1 }, { unique: true })

// Add index for frequently accessed fields together
EmployeeSchema.index({
  _id: 1,
  firstName: 1,
  lastName: 1,
  createdAt: -1,
})

const Employee = models.Employee || model('Employee', EmployeeSchema)

export default Employee
