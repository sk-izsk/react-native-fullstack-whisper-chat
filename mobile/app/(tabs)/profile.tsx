import { useAuth } from '@clerk/clerk-expo'
import { ScrollView } from 'react-native'
import { Logout } from '../../components/Logout'
import { Account } from '../../components/Profile/Account'
import { MenuSection } from '../../components/Profile/MenuSection'

const ProfileTab = () => {
  const { signOut } = useAuth()

  return (
    <ScrollView
      className="bg-surface-dark"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      indicatorStyle="white"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Account />
      <MenuSection />
      <Logout onPress={signOut} />
    </ScrollView>
  )
}

export default ProfileTab
