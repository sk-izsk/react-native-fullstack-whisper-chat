import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export const ChatHeader: React.FC = () => {
  const router = useRouter()

  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable
          className="items-center justify-center rounded-full size-10 bg-primary"
          onPress={() => router.push('/new-chat')}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  )
}
