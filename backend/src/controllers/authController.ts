import { clerkClient, getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { User } from '../models/User.js'

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
    next(err)
  }
}

export const authCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: clerkId } = getAuth(req)

    if (!clerkId) {
      return res.status(401).json({ message: 'No user ID from Clerk' })
    }

    let user = await User.findOne({ clerkId })

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId)
      if (!clerkUser) {
        return res.status(404).json({ message: 'Clerk user not found' })
      }
      user = await User.create({
        clerkId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
          : clerkUser.emailAddresses[0].emailAddress?.split('@')[0],
        avatar: clerkUser.imageUrl,
      })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
    next(err)
  }
}
