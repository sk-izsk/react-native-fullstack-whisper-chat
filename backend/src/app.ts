import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoute.js'
import chatRoutes from './routes/chatRoute.js'
import messageRoutes from './routes/messageRoute.js'
import userRoutes from './routes/userRoute.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const webDistPath = path.resolve(__dirname, '../../web/dist')

app.use(cors({}))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(clerkMiddleware())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(webDistPath))

  app.get('/{*any}', (_, res) => {
    res.sendFile(path.join(webDistPath, 'index.html'))
  })
}

export default app
