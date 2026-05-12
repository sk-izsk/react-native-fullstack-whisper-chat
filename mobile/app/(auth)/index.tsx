import { AnimatedOrb } from '@/components/AnimatedOrb'
import useAuthSocial from '@/hooks/useSocialAuth'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, Dimensions, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial()

  const isLoading = loadingStrategy !== null

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={['#0D0D0F', '#1A1A2E', '#16213E', '#0D0D0F']}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <AnimatedOrb
          colors={['#F4A261', '#E76F51']}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />
        <AnimatedOrb
          colors={['#E76F51', '#F4A261']}
          size={250}
          initialX={width - 100}
          initialY={height * 0.3}
          duration={5000}
        />
        <AnimatedOrb
          colors={['#FFD7BA', '#F4A261']}
          size={200}
          initialX={width * 0.3}
          initialY={height * 0.6}
          duration={3500}
        />
        <AnimatedOrb
          colors={['#F4B183', '#E76F51']}
          size={180}
          initialX={-50}
          initialY={height * 0.75}
          duration={4500}
        />

        <BlurView
          intensity={70}
          tint="dark"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      </View>

      <SafeAreaView className="flex-1">
        <View className="items-center pt-10">
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 100, height: 100, marginVertical: -20 }}
            contentFit="contain"
          />
          <Text className="font-serif text-4xl font-bold tracking-wider uppercase text-primary">
            Whisper
          </Text>
        </View>

        <View className="items-center justify-center flex-1 px-6">
          <Image
            source={require('../../assets/images/auth.png')}
            style={{ width: width - 48, height: height * 0.3 }}
            contentFit="contain"
          />

          <View className="items-center mt-6">
            <Text className="font-sans text-5xl font-bold text-center text-foreground">
              Connect & Chat
            </Text>
            <Text className="font-mono text-3xl font-bold text-primary">Seamlessly</Text>
          </View>

          <View className="flex-row gap-4 mt-10">
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-white/95 py-4 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={() => !isLoading && handleSocialAuth('oauth_google')}
            >
              {loadingStrategy === 'oauth_google' ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                  />
                  <Text className="text-sm font-semibold text-gray-900">Google</Text>
                </>
              )}
            </Pressable>

            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-4 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={() => !isLoading && handleSocialAuth('oauth_apple')}
            >
              {loadingStrategy === 'oauth_apple' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                  <Text className="text-sm font-semibold text-foreground">Apple</Text>
                </>
              )}
            </Pressable>

            {/* Future Facebook integration */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-4 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Facebook"
              onPress={() => !isLoading && handleSocialAuth('oauth_facebook')}
            >
              {loadingStrategy === 'oauth_facebook' ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                  <Text className="text-sm font-semibold text-foreground">Facebook</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default AuthScreen
