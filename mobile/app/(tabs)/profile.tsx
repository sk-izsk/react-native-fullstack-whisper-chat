import { useAuth } from '@clerk/clerk-expo'
import React from 'react'
import { Pressable, ScrollView, Text } from 'react-native'

const ProfileTab = () => {
  const { signOut } = useAuth()
  return (
    <ScrollView className="bg-surface" contentInsetAdjustmentBehavior="automatic">
      <Text className="text-white">Profile Tab</Text>
      <Pressable className="px-4 py-2 mt-4 bg-red-600" onPress={() => signOut()}>
        <Text>Sign out</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTab
