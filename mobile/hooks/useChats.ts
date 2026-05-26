import { useQuery } from '@tanstack/react-query'
import { useApi } from '../lib/ky'
import { Chat } from '../lib/socket'

const isLegacyChatsRouteError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false
  }

  return (
    error.message.includes('/api/chats') &&
    (error.message.includes('Expected JSON') || error.message.includes('404'))
  )
}

export const useChats = () => {
  const { apiWithAuth } = useApi()

  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      try {
        return await apiWithAuth<Chat[]>({
          url: 'chats',
          method: 'GET',
        })
      } catch (error) {
        if (!isLegacyChatsRouteError(error)) {
          throw error
        }

        return apiWithAuth<Chat[]>({
          url: 'messages',
          method: 'GET',
        })
      }
    },
  })
}
