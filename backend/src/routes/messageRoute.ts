import { Router } from 'express'
import { getChats, getOrCreateChat } from '../controllers/chatController.js'
import { protectRoute } from '../middleware/auth.js'

const router = Router()

router.use(protectRoute)

router.get('/', getChats)
router.get('/with/:participantId', getOrCreateChat)

export default router
