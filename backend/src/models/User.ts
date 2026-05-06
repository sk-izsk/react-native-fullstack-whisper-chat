import { model, Schema, type Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  clerkId: string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    avatar: { type: String, default: '' },
    clerkId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

export const User = model<IUser>('User', UserSchema)
