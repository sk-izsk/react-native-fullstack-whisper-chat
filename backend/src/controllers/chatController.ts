import type { NextFunction, Response } from 'express'
import { Types } from 'mongoose'
import type { AuthRequest } from '../middleware/auth.js'
import { Chat } from '../models/Chat.js'

export const getChats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId

    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'name email avatar')
      .populate('lastMessage')
      .sort({ lastMessageAt: -1 })
    res.status(200).json(chats)

    const formattedChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId)
      return {
        _id: chat._id,
        participant: otherParticipant ?? null,
        lastMessage: chat.lastMessage,
        createdAt: chat.createdAt,
      }
    })

    res.status(200).json(formattedChats)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
    next(error)
  }
}

export const getOrCreateChat = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { participantId } = req.params

    if (!participantId) {
      return res.status(400).json({ message: 'Participant ID is required' })
    }

    if (!Types.ObjectId.isValid(participantId as string)) {
      return res.status(400).json({ message: 'Invalid participant ID' })
    }

    if (participantId === userId) {
      return res.status(400).json({ message: 'Cannot create chat with yourself' })
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    })
      .populate('participants', 'name email avatar')
      .populate('lastMessage')

    if (!chat) {
      const newChat = new Chat({
        participants: [userId, participantId],
      })
      await newChat.save()
      chat = await newChat.populate('participants', 'name email avatar')
    }

    const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId)

    res.status(200).json({
      _id: chat._id,
      participant: otherParticipant ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
    next(error)
  }
}
