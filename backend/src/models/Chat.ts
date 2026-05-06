import { model, Schema, type Document, type Types } from 'mongoose'

export interface IChat extends Document {
  participants: Types.ObjectId[]
  lastMessage?: Types.ObjectId
  lastMessageAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ChatSchema = new Schema<IChat>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message', default: null },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export const Chat = model<IChat>('Chat', ChatSchema)
