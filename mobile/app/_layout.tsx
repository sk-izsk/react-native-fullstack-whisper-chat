import * as Sentry from '@sentry/react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AppProvider } from '../AppProvider'
import { AuthSync } from '../components/AuthSync'
import '../global.css'

Sentry.init({
  dsn: 'https://592b5ba41b44ea5847c991d79cef6892@o4511363073638400.ingest.us.sentry.io/4511424718438400',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.mobileReplayIntegration()],
})

const RootLayout = () => {
  return (
    <AppProvider>
      <AuthSync />
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0D0D0F' } }}>
        <Stack.Screen
          name="(auth)"
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: 'fade',
          }}
        />
      </Stack>
    </AppProvider>
  )
}

export default Sentry.wrap(RootLayout)
