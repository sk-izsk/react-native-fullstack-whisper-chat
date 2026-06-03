import React from 'react'
import { Content } from '../components/home/Content'
import { Poster } from '../components/home/Poster'

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  return (
    <div className="flex h-screen text-base bg-base-100">
      {/* LEFT SIDE */}
      <Content />
      {/* RIGHT SIDE */}
      <Poster />
    </div>
  )
}

export default HomeScreen
