import { io } from 'socket.io-client'

const SOCKET_URL = 'https://react-native-fullstack-whisper-chat.onrender.com'

export const createSocketClient = (token: string) =>
  io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
  })
