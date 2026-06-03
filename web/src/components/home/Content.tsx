import React from 'react'
import { Navbar } from '../Navbar'
import { AccessButtons } from './AccessButtons'
import { AvatarGroup } from './AvatarGroup'
import { Stats } from './Stats'

export const Content: React.FC = () => {
  return (
    <div className="relative flex flex-col flex-1 p-8 overflow-hidden lg:p-12">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col justify-center flex-1 max-w-xl">
        {/* Tag */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase border rounded-full bg-amber-500/10 border-amber-500/20 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Now Available
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono">
          Messaging for
          <br />
          <span className="text-transparent bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text">
            everyone
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-md mt-6 text-lg leading-relaxed text-base-content/70">
          Secure, blazing-fast conversations with real-time presence and instant delivery. Connect
          with anyone, anywhere.
        </p>

        {/* CTA BTNS */}
        <AccessButtons />
        {/* Avatars */}
        <div className="flex items-center gap-4 mt-8">
          <AvatarGroup
            sources={[
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            ]}
            alt="User avatar"
          />

          <span className="text-sm text-base-content/70">
            Join <span className="font-mono text-base-content/80">10,000+</span> happy users
          </span>
        </div>

        {/* STATS */}
        <Stats />
      </div>
    </div>
  )
}
