import { useSSO } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Alert } from 'react-native'

export const useAuthSocial = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
  const { startSSOFlow } = useSSO()

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
    setLoadingStrategy(strategy)
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy })
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
      }
    } catch (error) {
      console.error('Error during social authentication:', error)
      const provider = strategy === 'oauth_google' ? 'Google' : 'Apple'
      Alert.alert(`Failed to authenticate with ${provider}. Please try again.`)
    } finally {
      setLoadingStrategy(null)
    }
  }

  return {
    handleSocialAuth,
    loadingStrategy,
  }
}
