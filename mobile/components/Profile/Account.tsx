import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export const Account: React.FC = () => {
  const { user } = useUser()

  return (
    <View className="relative">
      <View className="items-center mt-10">
        <View className="relative">
          <View className="border-2 rounded-full border-primary">
            <Image source={user?.imageUrl} style={{ width: 100, height: 100, borderRadius: 999 }} />
          </View>

          <Pressable className="absolute items-center justify-center w-8 h-8 border-2 rounded-full bottom-1 right-1 bg-primary border-surface-dark">
            <Ionicons name="camera" size={16} color="#0D0D0F" />
          </Pressable>
        </View>

        {/* NAME & EMAIL */}
        <Text className="mt-4 text-2xl font-bold text-foreground">
          {user?.firstName} {user?.lastName}
        </Text>

        <Text className="mt-1 text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</Text>

        <View className="flex-row items-center mt-3 bg-green-500/20 px-3 py-1.5 rounded-full">
          <View className="w-2 h-2 mr-2 bg-green-500 rounded-full" />
          <Text className="text-sm font-medium text-green-500">Online</Text>
        </View>
      </View>
    </View>
  )
}
