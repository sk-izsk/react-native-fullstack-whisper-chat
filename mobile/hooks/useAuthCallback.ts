import { useMutation } from '@tanstack/react-query'
import { useApi } from '../lib/ky'

export const useAuthCallback = () => {
  const { apiWithAuth } = useApi()

  return useMutation({
    mutationFn: async () => {
      const response = await apiWithAuth({
        url: 'auth/me',
        method: 'POST',
      })

      return response
    },
  })
}
