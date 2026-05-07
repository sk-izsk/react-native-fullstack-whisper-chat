import type { NextFunction, Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Chat } from '../models/Chat.js'
import { Message } from '../models/Message.js'

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId

    const { chatId } = req.params

    const chat = await Chat.findById({
      _id: chatId,
      participants: userId,
    })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name email avatar')
      .sort({ createdAt: 1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
    next(error)
  }
}
