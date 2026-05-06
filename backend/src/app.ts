import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoute.js'
import chatRoutes from './routes/chatRoute.js'
import messageRoutes from './routes/messageRoute.js'
import userRoutes from './routes/userRoute.js'

const app = express()

app.use(cors({}))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

export default app
