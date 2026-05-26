import { useAuth } from '@clerk/clerk-expo'
import * as Sentry from '@sentry/react-native'
import ky, { HTTPError, Options } from 'ky'
import { useCallback } from 'react'

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://react-native-fullstack-whisper-chat.onrender.com/api'

type KyRequestConfig = Options & {
  url: string
}

const api = ky.create({
  prefix: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeError: [
      async ({ error, request }) => {
        if (error instanceof HTTPError) {
          Sentry.logger.error(
            Sentry.logger.fmt`API request failed: ${request.method} ${request.url}`,
            {
              status: error.response.status,
              endpoint: request.url,
              method: request.method,
            },
          )
        } else {
          Sentry.logger.warn('API request failed - no response', {
            endpoint: request.url,
            method: request.method,
          })
        }

        return error
      },
    ],
  },
})

export const useApi = () => {
  const { getToken } = useAuth()

  const apiWithAuth = useCallback(
    async <T>({ url, headers, ...config }: KyRequestConfig) => {
      const token = await getToken()

      const response = await api(url, {
        ...config,
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      const contentType = response.headers.get('content-type') ?? ''

      if (!contentType.includes('application/json')) {
        const responseText = await response.text()
        const message = `Expected JSON from ${response.url}, received ${contentType || 'unknown content type'}`

        Sentry.logger.error(message, {
          endpoint: response.url,
          contentType,
          bodyPreview: responseText.slice(0, 200),
        })

        throw new Error(message)
      }

      return response.json<T>()
    },
    [getToken],
  )

  return { api, apiWithAuth }
}
