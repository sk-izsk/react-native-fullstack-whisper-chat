import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View, Text } from 'react-native'

interface Props {
  onPress: () => void
}

export const Logout: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable
      className="items-center py-4 mx-5 mt-8 border bg-red-500/10 rounded-2xl active:opacity-70 border-red-500/20"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text className="ml-2 font-semibold text-red-500">Log Out</Text>
      </View>
    </Pressable>
  )
}
