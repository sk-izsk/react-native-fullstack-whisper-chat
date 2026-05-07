import { getAuth } from '@clerk/express'
import type { NextFunction, Request, Response } from 'express'
import { User } from '../models/User.js'

export type AuthRequest = Request & { userId?: string }

export const protectRoute = [
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req)
      if (!clerkId) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' })
      }

      const user = await User.findOne({ clerkId })
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      req.userId = user._id.toString()
      next()
    } catch {
      res.status(401).json({ error: 'Unauthorized' })
    }
  },
]
