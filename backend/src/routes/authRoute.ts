import { Router } from 'express'
import { authCallback, getMe } from '../controllers/authController.js'
import { protectRoute } from '../middleware/auth.js'

const router = Router()

router.get('/me', protectRoute, getMe)
router.post('/me', authCallback)

export default router
