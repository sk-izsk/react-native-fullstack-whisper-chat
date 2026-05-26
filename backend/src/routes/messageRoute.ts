import { Router } from 'express'
import { getMessages } from '../controllers/messageController.js'
import { protectRoute } from '../middleware/auth.js'

const router = Router()

router.use(protectRoute)

router.get('/chat/:chatId', getMessages)

export default router
