import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exist'],
      required: [true, 'Email is required'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = models.User || model('User', UserSchema)

export default User
