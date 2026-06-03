import { LoaderIcon } from 'lucide-react'
import React from 'react'

interface Props {}

export const PageLoader: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <LoaderIcon className="text-orange-500 size-12 animate-spin" />
    </div>
  )
}
