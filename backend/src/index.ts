import app from './app.js'
import { connectDB } from './config/database.js'
import { createServer } from 'http'
import { initializeSocket } from './utils/socket.js'

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

initializeSocket(httpServer)

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  })
