import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Pressable, Text } from 'react-native'

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Edit Profile', color: '#F4A261' },
      { icon: 'shield-checkmark-outline', label: 'Privacy & Security', color: '#10B981' },
      { icon: 'notifications-outline', label: 'Notifications', value: 'On', color: '#8B5CF6' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'moon-outline', label: 'Dark Mode', value: 'On', color: '#6366F1' },
      { icon: 'language-outline', label: 'Language', value: 'English', color: '#EC4899' },
      { icon: 'cloud-outline', label: 'Data & Storage', value: '1.2 GB', color: '#14B8A6' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center', color: '#F59E0B' },
      { icon: 'chatbubble-outline', label: 'Contact Us', color: '#3B82F6' },
      { icon: 'star-outline', label: 'Rate the App', color: '#F4A261' },
    ],
  },
]

interface Props {}

export const MenuSection: React.FC<Props> = () => {
  return (
    <>
      {MENU_SECTIONS.map((section) => (
        <View key={section.title} className="mx-5 mt-6">
          <Text className="mb-2 ml-1 text-xs font-semibold tracking-wider uppercase text-subtle-foreground">
            {section.title}
          </Text>
          <View className="overflow-hidden bg-surface-card rounded-2xl">
            {section.items.map((item, index) => (
              <Pressable
                key={item.label}
                className={`flex-row items-center px-4 py-3.5 active:bg-surface-light ${
                  index < section.items.length - 1 ? 'border-b border-surface-light' : ''
                }`}
              >
                <View
                  className="items-center justify-center w-9 h-9 rounded-xl"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text className="flex-1 ml-3 font-medium text-foreground">{item.label}</Text>
                {item.value && (
                  <Text className="mr-1 text-sm text-subtle-foreground">{item.value}</Text>
                )}
                <Ionicons name="chevron-forward" size={18} color="#6B6B70" />
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </>
  )
}
