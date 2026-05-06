import { model, Schema, type Types } from 'mongoose'

export interface IMessage extends Document {
  chat: Types.ObjectId
  sender: Types.ObjectId
  text: string
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

MessageSchema.index({ chat: 1, createdAt: 1 })

export const Message = model<IMessage>('Message', MessageSchema)
