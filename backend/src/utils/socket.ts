import { verifyToken } from '@clerk/express'
import { Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { Chat } from '../models/Chat.js'
import { Message } from '../models/Message.js'
import { User } from '../models/User.js'

interface SocketSendMessageData {
  chatId: string
  text: string
}

export const onlineUsers: Map<string, string> = new Map()

const allowedOrigins = [
  'http://localhost:8081',
  'http://localhost:5173',
  process.env.FRONTEND_URL as string,
].filter(Boolean)

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: allowedOrigins,
    },
  })

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error: No token provided'))
    }

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY as string,
      })

      const clerkId = session.sub

      const user = await User.findOne({ clerkId })
      if (!user) {
        return next(new Error('Authentication error: User not found'))
      }

      socket.data.userId = user._id.toString()
      next()
    } catch (error: any) {
      return next(new Error(error))
    }
  })

  io.on('connection', (socket) => {
    const userId = socket.data.userId

    // send the list of online user
    socket.emit('online-users', {
      userIds: Array.from(onlineUsers.keys()),
    })

    // check if userId is defined before setting it in the onlineUsers map
    if (userId) {
      onlineUsers.set(userId, socket.id)
    }

    //let the other users know that a new user has come online
    socket.broadcast.emit('user-online', { userId })

    socket.join(`user:${userId}`)

    socket.on('join-chat', (chatId: string) => {
      socket.join(`chat:${chatId}`)
    })

    socket.on('leave-chat', (chatId: string) => {
      socket.leave(`chat:${chatId}`)
    })

    socket.on('send-message', async (data: SocketSendMessageData) => {
      try {
        const { chatId, text } = data

        const chat = await Chat.findOne({ _id: chatId, participants: userId })

        if (!chat) {
          socket.emit('socket-error', { message: 'Chat not found or user not a participant' })
          return
        }

        const message = await Message.create({
          chat: chatId,
          sender: userId,
          text,
        })

        chat.lastMessage = message._id
        chat.lastMessageAt = new Date()
        await chat.save()
        await message.populate('sender', 'name avatar')

        io.to(`chat:${chatId}`).emit('new-message', {
          message,
        })

        for (const participantId of chat.participants) {
          io.to(`user:${participantId}`).emit('new-message', {
            message,
          })
        }
      } catch {
        socket.emit('socket-error', { message: 'Error sending message' })
      }
    })

    // typing

    socket.on('typing', (data: { chatId: string }) => {
      const { chatId } = data
      socket.broadcast.to(`chat:${chatId}`).emit('typing', { userId })
    })

    // when the user disconnects, remove them from the onlineUsers map and notify other users
    socket.on('disconnect', () => {
      if (userId) {
        onlineUsers.delete(userId)
        socket.broadcast.emit('user-offline', { userId })
      }
    })
  })

  return io
}
