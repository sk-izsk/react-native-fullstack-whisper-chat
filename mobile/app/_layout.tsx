import { Stack } from 'expo-router'
import { AppProvider } from '../AppProvider'
import '../global.css'

const RootLayout = () => {
  return (
    <AppProvider>
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

export default RootLayout
