import { useSSO } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Alert } from 'react-native'

function useAuthSocial() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
  const { startSSOFlow } = useSSO()

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    if (loadingStrategy) {
      return
    }
    setLoadingStrategy(strategy)

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy })

      if (!createdSessionId || !setActive) {
        const provider =
          strategy === 'oauth_google' ? 'Google' : strategy === 'oauth_apple' ? 'Apple' : 'Facebook'
        Alert.alert('Sign-in incomplete', `${provider} sign-in did not complete. Please try again.`)
        return
      }

      await setActive({ session: createdSessionId })
    } catch (error) {
      console.log('💥 Error in social auth:', error)
      const provider =
        strategy === 'oauth_google' ? 'Google' : strategy === 'oauth_apple' ? 'Apple' : 'Facebook'
      Alert.alert(`Failed to authenticate with ${provider}. Please try again.`)
    } finally {
      setLoadingStrategy(null)
    }
  }

  return { handleSocialAuth, loadingStrategy }
}

export default useAuthSocial
export { useAuthSocial }
