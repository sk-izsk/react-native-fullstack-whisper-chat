import { useAuth } from '@clerk/clerk-react'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PageLoader } from './components/PageLoader'
import { useUserSync } from './hooks/useUserSync'

const HomeScreen = lazy(() => import('./screen/HomeScreen'))
const ChatScreen = lazy(() => import('./screen/ChatScreen'))

const App = () => {
  const { isLoaded, isSignedIn } = useAuth()

  useUserSync()

  if (!isLoaded) {
    return <PageLoader />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomeScreen /> : <Navigate to="/chat" />} />
        <Route path="/chat" element={isSignedIn ? <ChatScreen /> : <Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
