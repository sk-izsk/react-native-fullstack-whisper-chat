import { Stack } from 'expo-router'
import { AppProvider } from '../AppProvider'
import '../global.css'

const RootLayout = () => {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  )
}

export default RootLayout
